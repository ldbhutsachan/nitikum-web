<!-- pages/Dashboard.vue -->
<!-- pages/Dashboard.vue -->
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import ApexCharts from 'vue3-apexcharts'

const caltotal = ref(null)
const transactions = ref([])
const sections = ref([])
const dailyGroup = ref([])

const startDate = ref('')
const endDate = ref('')
const startMenu = ref(false)
const endMenu = ref(false)
const docTypes = ref([])
const branches = ref([])
const selectedDocType = ref('')
const selectedBranch = ref('')
// popup state for stat cards
const popupDialog = ref(false)
const popupData = ref([])
const popupLoading = ref(false)
const popupStatus = ref('')
const popupStatusLabel = computed(() => {
  switch ((popupStatus.value || '').toString()) {
    case 'ALL': return 'ລວມທັງໝົດ'
    case 'N': return 'ເອກະສານໃໝ່'
    case 'O': return 'ເອກະສານເກົ່າ'
    case 'NN': return 'ຮ່າງໃໝ່'
    case 'OO': return 'ຮ່າງປັບປຸ່ງ'
    default: return 'ລາຍການ'
  }
})
const popupTotalCount = computed(() => (popupData.value ? popupData.value.length : 0))
const popupCustomLabel = ref('')
const popupTitleText = computed(() => {
  if (popupLoading.value) return `${popupStatusLabel.value} — ກຳລັງໂຫຼດ...`
  const label = popupCustomLabel.value || popupStatusLabel.value
  return `${label} — ${popupTotalCount.value} ລາຍການ`
})
const popupHeaders = computed(() => {
    return [
    { text: 'ລ/ດ', value: 'id' },
    { text: 'ເລກທີເອກະສານ', value: 'docNo' },
    { text: 'ປະເພດເອກະສານ', value: 'docDescLao' },
    { text: 'ຫົວຂໍ້ເອກະສານ', value: 'subjectName' },
    { text: 'ວັນທີ', value: 'docDate' },
    { text: 'ຕິດພັນກັບຝ່າຍ/ສາຂາ', value: 'relatedShow' },
    { text: 'PDF (LAO)', value: 'docPathLa' },
    { text: 'PDF (EN)', value: 'docPath' }
  ]
})

const popupPage = ref(1)
const popupPerPage = 7
const popupPageCount = computed(() => Math.max(1, Math.ceil((popupData.value || []).length / popupPerPage)))
const pagedPopupData = computed(() => {
  const items = popupData.value || []
  const start = (popupPage.value - 1) * popupPerPage
  return items.slice(start, start + popupPerPage)
})

// reset page when data changes
watch(popupData, () => { popupPage.value = 1 })

async function fetchPopup(ses_status) {
  popupLoading.value = true
  popupDialog.value = true
  try {
    const payload = {
      startDate: startDate.value || '',
      endDate: endDate.value || '',
      secCode: selectedBranch.value || '',
      docType: selectedDocType.value || '',
      ses_status: ses_status
    }
    const url = 'https://dehome.ldblao.la/meet-law/prod/api/v1/Share/getDocumentPopUp'
    const { data } = await axios.post(url, payload)
    // response may vary — prefer resData
    popupData.value = data?.resData || data || []
  } catch (e) {
    console.error('fetchPopup error', e)
    popupData.value = []
  } finally {
    popupLoading.value = false
  }
}

function openPopupFor(status) {
  // status should be one of: 'ALL','N','O','NN','OO'
  popupStatus.value = status
  popupPage.value = 1
  fetchPopup(status)
}

function openPopupForTransactionItem(item) {
  // map clicked transaction to the explicit doctype requested by user when appropriate
  // if the clicked item matches the special name, send that exact doctype string
  const specialName = 'ແຈ້ງການຜັນຂະຫຍາຍ ມະຕິກອງປະຊຸມ'
  if ((item.name || '').includes('ແຈ້ງການ') || item.name === specialName) {
    selectedDocType.value = specialName
  } else {
    const found = (transactions.value || []).find(t => (t.typeDocumentName === item.name) || (t.docDescLao === item.name) || (t.typeDocument === item.name) )
    selectedDocType.value = found ? (found.docType || found.typeDocument || found.typeDocumentId || '') : ''
  }
  popupCustomLabel.value = `ເອກະສານ: ${item.name}`
  popupStatus.value = 'ALL'
  popupPage.value = 1
  fetchPopup('ALL')
}

function openPopupForSectionItem(item) {
  // map clicked section to the explicit secCode requested by user when appropriate
  const specialSec = 'ຝ່າຍບັນຊີ ແລະ ການເງິນ'
  if ((item.name || '').includes('ບັນຊີ') || item.name === specialSec) {
    selectedBranch.value = specialSec
  } else {
    const found = (sections.value || []).find(s => (s.secName === item.name) || (s.brName === item.name) )
    selectedBranch.value = found ? (found.branchCode || found.brCode || found.branch || found.secBranch || '') : ''
  }
  popupCustomLabel.value = `ຝ່າຍ: ${item.name}`
  popupStatus.value = 'ALL'
  popupPage.value = 1
  fetchPopup('ALL')
}

const fetchDashboard = async () => {
  try {
    const config = useRuntimeConfig()
    const base = config?.public?.API_URL
    const endpoint = base.includes('dashboard') ? base : `${base.replace(/\/$/, '')}/dashboard`

    const payload = { startDate: startDate.value, endDate: endDate.value }
    if (selectedDocType.value) payload.docType = selectedDocType.value
    if (selectedBranch.value) payload.branchCode = selectedBranch.value

    const { data } = await axios.post(endpoint, payload)

    caltotal.value = data.caltotalGroup
    transactions.value = data.transactionsGroup
    sections.value = data.sectionGroup
    // handle daily group from API (name, txnDate, totalAmt)
    dailyGroup.value = data.dailyGroup || data.daily_counts || []

    // If server didn't provide combobox options separately, derive them from the dashboard data
    try {
      // populate docTypes from response if empty
      if ((!docTypes.value || docTypes.value.length === 0) && data) {
        if (data.docTypeList && Array.isArray(data.docTypeList) && data.docTypeList.length) {
          docTypes.value = data.docTypeList.map(d => ({ label: d.docDescLao || d.docDesc || d.docType, value: d.docType }))
        } else if (transactions.value && transactions.value.length) {
          const map = new Map()
          transactions.value.forEach(t => {
            const val = t.docType || t.typeDocument || t.typeDocumentId || t.typeDocumentName || t.docTypeCode || t.docType
            const label = t.typeDocumentName || t.docDescLao || t.docDesc || val
            if (val && !map.has(val)) map.set(val, label)
          })
          if (map.size > 0) docTypes.value = Array.from(map.entries()).map(([value, label]) => ({ label, value }))
        }
      }

      // populate branches from response if empty
      if ((!branches.value || branches.value.length === 0) && data) {
        if (data.branchList && Array.isArray(data.branchList) && data.branchList.length) {
          branches.value = data.branchList.map(b => ({ label: b.brNameLa || b.brName || b.branchCode, value: b.branchCode }))
        } else if (sections.value && sections.value.length) {
          const mapB = new Map()
          sections.value.forEach(s => {
            const val = s.branchCode || s.brCode || s.branch || s.secBranch || null
            const label = s.brNameLa || s.brName || s.branchName || s.secName || val
            if (val && !mapB.has(val)) mapB.set(val, label)
          })
          if (mapB.size > 0) branches.value = Array.from(mapB.entries()).map(([value, label]) => ({ label, value }))
        }
      }
    } catch (e) {
      console.error('derive combobox options error:', e)
    }
  } catch (err) {
    console.error('fetchDashboard error:', err)
  }
}

// Fetch combobox data
async function fetchDocTypes() {
  try {
    const config = useRuntimeConfig()
    const base = config?.public?.API_URL
    const endpoint = `${base.replace(/\/$/, '')}/DocumentType/getDocumentType`
    const { data } = await axios.post(endpoint, {})
    if (data && data.resData) {
        // prefer Lao description when available; prepend an 'All' option
        const mapped = data.resData.map(d => ({ label: d.docDescLao || d.docDesc || d.docType, value: d.docType }))
        docTypes.value = [{ label: 'ທັງໝົດ', value: '' }, ...mapped]
    }
  } catch (err) {
    console.error('fetchDocTypes error:', err)
  }
}

async function fetchBranches() {
  try {
    const config = useRuntimeConfig()
    const base = config?.public?.API_URL
    const endpoint = `${base.replace(/\/$/, '')}/Branch/getComboxBranchStatus`
    const { data } = await axios.post(endpoint, {})
    if (data && data.resData) {
        const mapped = data.resData.map(b => ({ label: b.brNameLa || b.brName || b.branchCode, value: b.branchCode }))
        branches.value = [{ label: 'ທັງໝົດ', value: '' }, ...mapped]
    }
  } catch (err) {
    console.error('fetchBranches error:', err)
  }
}

// Fetch data when component mounts
onMounted(() => {
  // load combobox options first, then fetch dashboard
  Promise.all([fetchDocTypes(), fetchBranches()]).then(() => fetchDashboard())
})
// Horizontal bar chart configs (Apex)
const transactionChart = computed(() => {
  const items = [...transactions.value].map(t => ({ name: t.typeDocumentName, value: Number(t.totalAmt) }))
    .sort((a, b) => b.value - a.value)

  const categories = items.map(i => i.name)
  const data = items.map(i => i.value)
  const colors = items.map(i => stringToColor(i.name))

  return {
    series: [{ name: 'ຈຳນວນ', data }],
    chartOptions: {
      chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '44%',
          borderRadius: 8,
          distributed: true,
          backgroundBarColors: ['#eceff1'],
          backgroundBarRadius: 8
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const max = Math.max(...data)
          const pct = max > 0 ? Math.round((val / max) * 100) : 0
          return pct + '%'
        },
        style: { colors: ['#263238'], fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' },
        offsetX: 0,
        dropShadow: { enabled: false },
        background: { enabled: false },
        // place labels outside at the end of the bar
        textAnchor: 'end'
      },
      colors,
      xaxis: { categories, labels: { formatter: val => formatNumber(val), style: { fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' } } },
      yaxis: { labels: { style: { fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' } } },
      grid: { show: true, borderColor: '#eaf2fb' },
      tooltip: { y: { formatter: val => formatNumber(val) } }
    }
  }
})

const sectionChart = computed(() => {
  const items = [...sections.value].map(s => ({ name: s.secName, value: Number(s.totalAmt) }))
    .sort((a, b) => b.value - a.value)

  const categories = items.map(i => i.name)
  const data = items.map(i => i.value)
  const colors = items.map(i => stringToColor(i.name))

  return {
    series: [{ name: 'ຈຳນວນ', data }],
    chartOptions: {
      chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '44%',
          borderRadius: 8,
          distributed: true,
          backgroundBarColors: ['#eceff1'],
          backgroundBarRadius: 8
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          const max = Math.max(...data)
          const pct = max > 0 ? Math.round((val / max) * 100) : 0
          return pct + '%'
        },
        style: { colors: ['#263238'], fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' },
        offsetX: 0,
        dropShadow: { enabled: false },
        background: { enabled: false },
        textAnchor: 'end'
      },
      colors,
      xaxis: { categories, labels: { formatter: val => formatNumber(val), style: { fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' } } },
      yaxis: { labels: { style: { fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' } } },
      grid: { show: true, borderColor: '#eaf2fb' },
      tooltip: { y: { formatter: val => formatNumber(val) } }
    }
  }
})

// Prepare items for custom list-style bars (label, track, colored fill, percent)
const transactionItems = computed(() => {
  const items = (transactions.value || []).map(t => ({ name: t.typeDocumentName, value: Number(t.totalAmt) || 0 }))
  const max = Math.max(...items.map(i => i.value), 1)
  return items
    .sort((a, b) => b.value - a.value)
    .map(i => ({ ...i, pct: Math.round((i.value / max) * 100), color: stringToColor(i.name) }))
})

const sectionItems = computed(() => {
  const items = (sections.value || []).map(s => ({ name: s.secName, value: Number(s.totalAmt) || 0 }))
  const max = Math.max(...items.map(i => i.value), 1)
  return items
    .sort((a, b) => b.value - a.value)
    .map(i => ({ ...i, pct: Math.round((i.value / max) * 100), color: stringToColor(i.name) }))
})

// Pagination: 10 rows per page
const pageSize = 10

const transactionPage = ref(1)
const transactionPageCount = computed(() => Math.max(1, Math.ceil(transactionItems.value.length / pageSize)))
// transaction filter combobox (client-side)
const transactionFilter = ref('')
const transactionFilterOptions = computed(() => [{ label: 'ທັງໝົດ', value: '' }, ...transactionItems.value.map(i => ({ label: i.name, value: i.name }))])

const transactionItemsPaged = computed(() => {
  const filtered = transactionFilter.value ? transactionItems.value.filter(i => i.name === transactionFilter.value) : transactionItems.value
  transactionPage.value = Math.min(transactionPage.value, Math.max(1, Math.ceil(filtered.length / pageSize)))
  const start = (transactionPage.value - 1) * pageSize
  return filtered.slice(start, start + pageSize)
})

// total number of transaction rows
const transactionItemsCount = computed(() => transactionItems.value.length)

// section filter combobox (client-side)
const sectionFilter = ref('')
const sectionFilterOptions = computed(() => [{ label: 'ທັງໝົດ', value: '' }, ...sectionItems.value.map(i => ({ label: i.name, value: i.name }))])

const sectionItemsPaged = computed(() => {
  const filtered = sectionFilter.value ? sectionItems.value.filter(i => i.name === sectionFilter.value) : sectionItems.value
  sectionPage.value = Math.min(sectionPage.value, Math.max(1, Math.ceil(filtered.length / pageSize)))
  const start = (sectionPage.value - 1) * pageSize
  return filtered.slice(start, start + pageSize)
})

// total number of section rows
const sectionItemsCount = computed(() => sectionItems.value.length)

const transactionRange = computed(() => {
  const total = transactionItemsCount.value || 0
  if (total === 0) return { start: 0, end: 0, pct: 0 }
  const start = (transactionPage.value - 1) * pageSize + 1
  const end = Math.min(total, start + transactionItemsPaged.value.length - 1)
  const visible = end - start + 1
  const pct = Math.round((visible / (total || 1)) * 100)
  return { start, end, pct }
})

const sectionRange = computed(() => {
  const total = sectionItemsCount.value || 0
  if (total === 0) return { start: 0, end: 0, pct: 0 }
  const start = (sectionPage.value - 1) * pageSize + 1
  const end = Math.min(total, start + sectionItemsPaged.value.length - 1)
  const visible = end - start + 1
  const pct = Math.round((visible / (total || 1)) * 100)
  return { start, end, pct }
})
 
const sectionPage = ref(1)
const sectionPageCount = computed(() => Math.max(1, Math.ceil(sectionItems.value.length / pageSize)))

const sectionDonut = computed(() => ({
  chart: { type: 'donut' },
  colors: ['#2196F3', '#64B5F6', '#90CAF9', '#BBDEFB'],
  labels: sections.value.map(s => s.secName),
  series: sections.value.map(s => Number(s.totalAmt))
}))

// ✅ function ສ້າງສີອັດຕະໂນມັດ
function stringToColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF
    color += ('00' + value.toString(16)).slice(-2)
  }
  return color
}

function gradientFromName(name) {
  const base = stringToColor(name)
  return `linear-gradient(90deg, ${base}, ${base}80)`
}

// Normalize date to YYYY-MM-DD for display and API
function ensureISO(d) {
  if (!d) return ''
  if (typeof d === 'string') {
    // already ISO
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d
    // compact YYYYMMDD -> YYYY-MM-DD
    if (/^\d{8}$/.test(d)) return `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`
  }
  if (d instanceof Date) {
    const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const day = String(d.getDate()).padStart(2,'0')
    return `${y}-${m}-${day}`
  }
  return String(d)
}

watch(startDate, (v) => {
  const iso = ensureISO(v)
  if (iso !== v) startDate.value = iso
})

watch(endDate, (v) => {
  const iso = ensureISO(v)
  if (iso !== v) endDate.value = iso
})

// Debounced auto-fetch when date filters change
let _fetchTimer = null
function scheduleFetch() {
  if (_fetchTimer) clearTimeout(_fetchTimer)
  _fetchTimer = setTimeout(() => {
    fetchDashboard()
    _fetchTimer = null
  }, 500)
}

watch(startDate, () => scheduleFetch())
watch(endDate, () => scheduleFetch())

// Auto-trigger fetch when doc type or branch selection changes
watch(selectedDocType, () => scheduleFetch())
watch(selectedBranch, () => scheduleFetch())

// Preset helpers for the search card
function setToday() {
  const d = new Date()
  const iso = ensureISO(d)
  startDate.value = iso
  endDate.value = iso
}

function setThisMonth() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const start = `${y}-${m}-01`
  const end = ensureISO(now)
  startDate.value = start
  endDate.value = end
}

function clearDates() {
  startDate.value = ''
  endDate.value = ''
}

// Format numbers with thousands separator
function formatNumber(n) {
  if (n === null || n === undefined) return ''
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Build summary chart from API dailyGroup: aggregate totals per date
const summaryChart = computed(() => {
  // aggregate by date
  const map = new Map()
  dailyGroup.value.forEach(item => {
    const d = (item.txnDate || item.date || '').slice(0, 10)
    if (!d) return
    const v = Number(item.totalAmt || item.count || 0) || 0
    map.set(d, (map.get(d) || 0) + v)
  })

  // sort dates asc
  const dates = Array.from(map.keys()).sort((a, b) => new Date(a) - new Date(b))
  const data = dates.map(d => map.get(d) || 0)

  // Lao month names for monthly labels
  const laoMonths = ['', 'ມັງກອນ', 'ກຸມພາ', 'ມີນາ', 'ເມສາ', 'ພຶດສະພາ', 'ມິຖຸນາ', 'ກໍລະກົດ', 'ສິງຫາ', 'ກັນຍາ', 'ຕຸລາ', 'ພະຈິກ', 'ທັນວາ']
  function monthLabelFromDate(d) {
    if (!d) return d
    // Accept formats like '01', '1', 'YYYY-MM' or 'YYYY-MM-DD'
    let m = ''
    if (/^\d{1,2}$/.test(d)) m = String(d).padStart(2, '0')
    else if (/^\d{4}-\d{2}/.test(d)) m = d.slice(5, 7)
    else if (/^\d{2}-\d{4}/.test(d)) m = d.slice(0, 2)
    const idx = parseInt(m.replace(/^0/, ''), 10)
    if (!isNaN(idx) && idx >= 1 && idx <= 12) return laoMonths[idx]
    return d
  }

  const categories = dates.map(d => monthLabelFromDate(d))

  return {
    series: [{ name: 'ຈຳນວນ', data }],
    chartOptions: {
      chart: { type: 'bar', fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' },
      plotOptions: { bar: { borderRadius: 8 } },
      dataLabels: { enabled: true, formatter: val => formatNumber(val) },
      xaxis: { categories, labels: { formatter: val => val }, tooltip: { enabled: true } },
      yaxis: { labels: { formatter: val => formatNumber(val) } },
      title: { text: `ສະຫຼຸບສະຖິຕິ ( ${startDate.value || ''} → ${endDate.value || ''} )`, align: 'center' }
    }
  }
})
</script>

<template>
  <v-container>
    <!-- Summary cards -->
<v-card class="pa-4 mb-6 elevation-12 search-card">
      <v-card-title class="blue--text text-h6 d-flex align-center" style="padding:12px 20px;">
            <div class="d-flex align-center">
              <v-icon start color="blue">mdi-magnify</v-icon>
              ຄົ້ນຫາຂໍ້ມູນ
            </div>
            <v-spacer />
            <!-- <div class="search-presets d-flex">
              <v-btn small class="preset" @click="setToday">ມື້ນີ້</v-btn>
              <v-btn small class="preset" @click="setThisMonth">ເດືອນນີ້</v-btn>
              <v-btn small class="preset muted" @click="clearDates">ລ້າງ</v-btn>
            </div> -->
          </v-card-title>
      <v-card-text>
        <v-row>
              <v-col cols="12" sm="6" md="2">
            <v-menu
              v-model="startMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290"
              min-width="290"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  v-model="startDate"
                  label="ວັນທີ່"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                  clearable
                  class="white-input"
                  @click:clear="startDate = ''"
                />
              </template>
              <v-date-picker v-model="startDate" @input="startMenu = false" scrollable />
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-menu
              v-model="endMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              max-width="290"
              min-width="290"
            >
              <template #activator="{ props }">
                <v-text-field
                  v-bind="props"
                  v-model="endDate"
                  label="ຫາວັນທີ່"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                  clearable
                  class="white-input"
                  @click:clear="endDate = ''"
                />
              </template>
              <v-date-picker v-model="endDate" @input="endMenu = false" scrollable />
            </v-menu>
          </v-col>
        
          <v-col cols="12" sm="6" md="3" v-if="docTypes.length > 0">
            <v-select
              :items="docTypes"
              v-model="selectedDocType"
              label="Filter ປະເພດ"
              item-title="label"
              item-value="value"
              dense
              outlined
              clearable
              class="white-input"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3" v-if="branches.length > 0">
            <v-select
              :items="branches"
              v-model="selectedBranch"
              label="Filter ຝ່າຍ"
              item-title="label"
              item-value="value"
              dense
              outlined
              clearable
              class="white-input"
            />
          </v-col>
         
        </v-row>
          <v-btn small class="preset muted" @click="clearDates">ເລີ່ມໃໝ່</v-btn>
      </v-card-text>
    </v-card>
    <!-- end title -->
    <!-- Search form -->
    <v-card class="pa-4 mb-6 elevation-12 search-card">
      <v-row class="stat-grid">
        <v-col class="stat-col card1" cols="6" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card" @click="openPopupFor('ALL')" style="cursor:pointer">
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-title">ລວມທັງໝົດ</div>
              <div class="stat-value">{{ formatNumber(caltotal?.totalAmt) }} ລາຍການ</div>
              
            </div>
            <div class="stat-right">
              <div class="stat-icon-box">
                <v-icon color="#1e7e34" large>mdi-file</v-icon>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col class="stat-col card2" cols="6" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card" @click="openPopupFor('N')" style="cursor:pointer">
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-title">ເອກະສານໃໝ່</div>
              <div class="stat-value">{{ formatNumber(caltotal?.totalAmtNew) }} ລາຍການ</div>
              
            </div>
            <div class="stat-right">
              <div class="stat-icon-box">
                <v-icon color="#17a2b8" large>mdi-file-plus</v-icon>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col class="stat-col card3" cols="6" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card" @click="openPopupFor('O')" style="cursor:pointer">
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-title">ເອກະສານເກົ່າ</div>
              <div class="stat-value">{{ formatNumber(caltotal?.totalAmtOld) }} ລາຍການ</div>
              
            </div>
            <div class="stat-right">
              <div class="stat-icon-box">
                <v-icon color="#ffc107" large>mdi-file-clock</v-icon>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col class="stat-col card4" cols="6" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card" @click="openPopupFor('NN')" style="cursor:pointer">
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-title">ຮ່າງໃໝ່</div>
              <div class="stat-value">{{ formatNumber(caltotal?.totalAmtDocNew) }} ລາຍການ</div>
              
            </div>
            <div class="stat-right">
              <div class="stat-icon-box">
                <v-icon color="#6f42c1" large>mdi-file-edit</v-icon>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="stat-col card5" cols="6" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card" @click="openPopupFor('OO')" style="cursor:pointer">
          <div class="stat-row">
            <div class="stat-left">
              <div class="stat-title">ຮ່າງປັບປຸ່ງ</div>
              <div class="stat-value">{{ formatNumber(caltotal?.totalAmtDocOld) }} ລາຍການ</div>
              
            </div>
            <div class="stat-right">
              <div class="stat-icon-box">
                <v-icon color="#6f42c1" large>mdi-file-account</v-icon>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    </v-card>
    

    <!-- Charts -->
    <v-row class="mt-6">
  <!-- Transactions Chart -->
  <v-col cols="12" md="6">
    <v-card class="elevation-12">
      <v-card-title class="blue--text text-h6">
        <v-icon start color="blue">mdi-file-table</v-icon>
        ປະເພດນິຕິກຳ
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="transactionFilterOptions"
              v-model="transactionFilter"
              label="Filter ປະເພດ"
              item-title="label"
              item-value="value"
              dense
              outlined
            />
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text>
        <div>
          <div v-for="item in transactionItemsPaged" :key="item.name" class="d-flex align-center" style="padding:10px 0;border-bottom:0px solid transparent">
                    <div @click.stop="openPopupForTransactionItem(item)" style="width:30%;font-weight:500;cursor:pointer">{{ item.name }}</div>
            <div style="flex:1;margin:0 12px">
              <div style="background:#eceff1;border-radius:8px;height:10px;position:relative;overflow:hidden">
                <div :style="{ width: item.pct + '%', background: item.color, height: '10px', borderRadius: '8px' }"></div>
              </div>
            </div>
            <div style="width:96px;text-align:right;font-weight:600">
              <div style="font-size:18px; color:black; font-weight:bold;">
                {{ formatNumber(item.value) }}
              </div>
              <div style="font-size:12px;color:#6b7280">{{ item.pct }}%</div>
            </div>
          </div>
          <div class="d-flex justify-space-between pa-3">
            <div class="d-flex align-center">ສະແດງ: <span class="ml-2 font-weight-medium">{{ transactionRange.start }}–{{ transactionRange.end }} ຈາກ {{ formatNumber(transactionItemsCount) }}</span> <span class="ml-2" style="color:#6b7280">({{ transactionRange.pct }}%)</span></div>
            <v-pagination v-model="transactionPage" :length="transactionPageCount" />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>

  <!-- Sections Chart -->
  <v-col cols="12" md="6">
    <v-card class="elevation-12">
      <v-card-title class="blue--text text-h6">
        <v-icon start color="blue">mdi-office-building</v-icon>
        ນິຕິກຳເເຕ່ລະຝ່າຍ
      </v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-select
              :items="sectionFilterOptions"
              v-model="sectionFilter"
              label="Filter ຝ່າຍ"
              item-title="label"
              item-value="value"
              dense
              outlined
            />
          </v-col>
        </v-row>
      </v-card-subtitle>
      <v-card-text>
        <div>
          <div v-for="item in sectionItemsPaged" :key="item.name" class="d-flex align-center" style="padding:10px 0;border-bottom:0px solid transparent">
            <div @click.stop="openPopupForSectionItem(item)" style="width:30%;font-weight:500;cursor:pointer">{{ item.name }}</div>
            <div style="flex:1;margin:0 12px">
              <div style="background:#eceff1;border-radius:8px;height:10px;position:relative;overflow:hidden">
                <div :style="{ width: item.pct + '%', background: item.color, height: '10px', borderRadius: '8px' }"></div>
              </div>
            </div>
            <div style="width:96px;text-align:right;font-weight:00">
                <div style="font-size:18px; color:black; font-weight:bold;">
                   {{ formatNumber(item.value) }}
                </div>
              <div style="font-size:12px;color:#6b7280">{{ item.pct }}%</div>
            </div>
          </div>
          <div class="d-flex justify-space-between pa-3">
            <div class="d-flex align-center">ສະແດງ: <span class="ml-2 font-weight-medium">{{ sectionRange.start }}–{{ sectionRange.end }} ຈາກ {{ formatNumber(sectionItemsCount) }}</span> <span class="ml-2" style="color:#6b7280">({{ sectionRange.pct }}%)</span></div>
            <v-pagination v-model="sectionPage" :length="sectionPageCount" />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
    <!-- end -->

    <!-- Popup dialog to show documents for a stat category -->
    <v-dialog v-model="popupDialog">
      <v-card class="popup-card elevation-12">
        <v-card-title class="popup-title d-flex align-center">
          <div class="title-text">{{ popupTitleText }}</div>
          <v-spacer />
          <v-btn icon style="color :red" @click="popupDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-progress-circular v-if="popupLoading" indeterminate color="primary"></v-progress-circular>
                <div v-else>
                  <div class="popup-table-wrap">
                    <table class="popup-table">
                      <thead>
                        <tr>
                          <th v-for="h in popupHeaders" :key="h.value">{{ h.text }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in pagedPopupData" :key="item.id">
                          <td>{{ item.id }}</td>
                          <td>{{ item.docNo }}</td>
                          <td>{{ item.docDescLao }}</td>
                          <td style="max-width:360px;">{{ item.subjectName }}</td>
                          <td>{{ item.docDate }}</td>
                          <td>
                            <div v-if="item.relatedShowList02 && item.relatedShowList02.length">
                              <div v-for="(r, idx) in item.relatedShowList02" :key="idx">{{ r.relatedShowName }} ({{ r.relatedShowDocNo }})</div>
                            </div>
                          </td>
                          <td style="max-width:360px;">
                            <a v-if="item.docPathLa" :href="item.docPathLa" target="_blank" class="icon-link">
                              <v-icon color="red">mdi-file-pdf-box</v-icon>
                            </a>
                          </td>
                          <td style="max-width:360px;">
                            <a v-if="item.docPath" :href="item.docPath" target="_blank" class="icon-link">
                              <v-icon color="blue">mdi-file-pdf-box</v-icon>
                            </a>
                          </td>
                        </tr>
                        <tr v-if="!pagedPopupData || pagedPopupData.length === 0">
                          <td :colspan="popupHeaders.length" class="text-center">No data</td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- pagination -->
                    <div class="d-flex justify-center pa-4" style="background: transparent;">
                      <v-pagination v-model="popupPage" :length="popupPageCount" total-visible="5" color="primary" />
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="popupDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- chart grap -->
    <v-row class="mt-6">
  <v-col cols="12">
    <v-card class="elevation-12">
      <v-card-title>
        <v-icon color="blue" class="mr-2">
          mdi-chart-line
        </v-icon>
        ສະຫຼຸບສະຖິຕິນິຕິກຳ
      </v-card-title>

      <v-card-text>
        <ApexCharts
          :height="350"
          type="bar"
          :options="summaryChart.chartOptions"
          :series="summaryChart.series"
        />
      </v-card-text>
    </v-card>
  </v-col>
</v-row>
    <!-- chart grap -->
  </v-container>
</template>

<style scoped>
.search-btn {
  background: linear-gradient(90deg, #1e88e5 0%, #42a5f5 100%);
  color: #fff !important;
  border-radius: 10px !important;
  padding: 8px 14px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  box-shadow: 0 6px 14px rgba(30,136,229,0.18);
}
.search-btn:hover {
  filter: brightness(0.95);
}
.search-btn .v-icon {
  margin-right: 6px;
}

.search-card {
  background: #fff;
  border-radius: 12px;
  color: inherit;
  border: 1px solid #e8f4ff;
}
.search-card .v-card-text {
  background: transparent;
}
.white-input .v-input__control {
  background: linear-gradient(180deg,#ffffff 0%, #fbfdff 100%) !important;
  border-radius: 10px !important;
}
.white-input {
  --input-border: rgba(30,136,229,0.12);
}
.white-input .v-input__control {
  border: 1px solid var(--input-border) !important;
  padding: 8px !important;
  box-shadow: 0 6px 18px rgba(2,136,209,0.06);
  transition: box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease;
}
.white-input .v-input__control:focus-within {
  border-color: #1e88e5 !important;
  box-shadow: 0 14px 40px rgba(30,136,229,0.12);
  transform: translateY(-2px);
}
.white-input .v-field__prepend-inner .v-icon,
.white-input .v-input__icon { color: #1e88e5 !important; }

/* Make the date text and placeholder more pleasant */
.white-input input {
  color: #0f172a !important;
}
.white-input .v-label {
  color: rgba(15,23,42,0.7) !important;
}
.search-presets .preset {
  background: #e3f2fd;
  color: #0d47a1 !important;
  margin-left: 8px;
  border-radius: 18px !important;
  text-transform: none !important;
}
.search-presets .preset.muted {
  background: rgba(13,71,161,0.06);
  color: #0d47a1 !important;
  opacity: 0.98;
}
/* Prominent preset button style (used by the reset button) */
.preset {

  box-shadow: 0 10px 26px rgba(11,121,208,0.18) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
}
.preset:hover { filter: brightness(0.95); transform: translateY(-1px); }
.preset.muted { background: linear-gradient(90deg,#6fb8ff 0%,#2a8ee0 100%); color: #fff !important; }
.search-card .v-label {
  color: rgba(0,0,0,0.65) !important;
}
.search-btn.prominent {
  background: linear-gradient(90deg,#29b6f6 0%,#0288d1 100%) !important;
  box-shadow: 0 10px 24px rgba(2,136,209,0.18) !important;
}

/* Make search button match combobox/textfield height and avoid oversized padding */
.search-btn {
  height: 52px !important;
  min-height: 44px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 10px !important;
  padding: 0 12px !important;
  min-width: 120px;
}
.search-btn .v-icon { margin-right: 8px !important; }

/* Metric cards (modernized) */
.metric-card {
  color: #fff;
  border-radius: 14px;
  overflow: hidden;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 18px;
  transition: transform 220ms ease, box-shadow 220ms ease;
  box-shadow: 0 8px 20px rgba(15,23,42,0.08), inset 0 -6px 18px rgba(255,255,255,0.03);
}
.metric-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(15,23,42,0.12); }

.metric-card .metric-title { display:flex; align-items:center; gap:12px; font-weight:700; font-size:14px; opacity:0.95 }
.metric-card .metric-icon { font-size:28px; background: rgba(255,255,255,0.14); padding:10px; border-radius:10px; }
.metric-card .metric-value { font-size:28px; margin-top:8px; font-weight:800; line-height:1.1 }
.metric-card .metric-sub { font-size:12px; opacity:0.9 }

.metric-card.blue-1 { background: linear-gradient(135deg,#2196F3 0%, #42A5F5 100%); }
.metric-card.blue-2 { background: linear-gradient(135deg,#42A5F5 0%, #64B5F6 100%); }
.metric-card.blue-3 { background: linear-gradient(135deg,#4FC3F7 0%, #26C6DA 100%); }
.metric-card.blue-4 { background: linear-gradient(135deg,#5C6BC0 0%, #3F51B5 100%); }
.metric-card.blue-5 { background: linear-gradient(135deg,#1E88E5 0%, #1976D2 100%); }

/* Make cards display nicely in the grid */
.metrics-row { display:flex; gap:16px; align-items:stretch; flex-wrap:wrap }
.metrics-row .metric-col { flex:1 1 0; max-width:none; padding:0 8px; box-sizing:border-box }
.metrics-row .metric-card { height:160px; display:flex; flex-direction:column; justify-content:flex-start }

/* New stat-card style to match the white dashboard cards */
.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 10px !important;
  color: #1f2937;
  display: flex;
  align-items: center;
  min-height: 100px;
}
.stat-row { display:flex; align-items:center; width:100%; }
.stat-left { flex:1 }
.stat-title { font-size:12px; color:#6b7280; font-weight:600 }
.stat-grid { display:flex; flex-wrap:wrap; gap:1px; align-items:stretch }
.stat-grid .stat-col {
  flex: 0 0 19.5% !important;
  max-width: 20% !important;
  box-sizing: border-box;
  padding: 1px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}

/* Card 1: Blue gradient */
.stat-grid .card1 {
  background: linear-gradient(to bottom right, #1e3c72, #2a5298);
}

/* Card 2: Light Blue gradient */
.stat-grid .card2 {
  background: linear-gradient(to bottom right, #00c6ff, #0072ff);
}

/* Card 3: Blue-Green gradient */
.stat-grid .card3 {
  background: linear-gradient(to bottom right, #43cea2, #185a9d);
}

/* Card 4: Purple-Blue gradient */
.stat-grid .card4 {
  background: linear-gradient(to bottom right, #6a11cb, #2575fc);
}

/* Card 5: Cyan gradient */
.stat-grid .card5 {
  background: linear-gradient(to bottom right, #00b4db, #0083b0);
}

/* Animation keyframes */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}



/* Ensure v-col wrapper honors the 20% width and avoid extra padding causing wrap */
.stat-grid > .v-col { flex: 0 0 20% !important; max-width: 20% !important; padding: 0 8px !important; box-sizing: border-box; }

/* On wide screens force no-wrap so all five fit on one row; allow scroll if viewport too small */
@media (min-width: 1201px) {
  .stat-grid { flex-wrap: nowrap !important; }
  .stat-grid { overflow-x: auto; }
  .stat-grid > .v-col { padding: 0 800px !important; }
  .stat-card { padding: 20px !important; }
}

/* Reduce icon size within the small icon box to avoid overflow */
.stat-icon-box .v-icon { font-size:20px !important; }

@media (max-width: 1200px) {
  .stat-grid .stat-col { flex: 0 0 50%; max-width: 50%; }
}

@media (max-width: 600px) {
  .stat-grid .stat-col { flex: 0 0 100%; max-width: 100%; }
}
.stat-value { font-size:16px; font-weight:800; margin-top:6px; }
.stat-link { display:inline-block; margin-top:8px; font-size:13px; color:#2563eb }
.stat-right { width:72px; display:flex; justify-content:center; align-items:center }
.stat-icon-box { width:40px; height:40px; border-radius:8px; background: linear-gradient(180deg,#e6f4ff,#d9eefc); display:flex; justify-content:center; align-items:center; box-shadow: 0 6px 18px rgba(14,122,255,0.08) }

@media (max-width: 1200px) {
  .stat-grid .stat-col { flex: 0 0 50% !important; max-width: 50% !important; }
}

@media (max-width: 900px) {
  .stat-grid .stat-col { flex: 0 0 100% !important; max-width: 100% !important; }
  .stat-value { font-size:15px }
  .stat-title { font-size:12px }
}
.popup-card { border-radius: 12px; overflow: hidden; }
.popup-card { border-radius: 12px; overflow: hidden; border: 2px solid rgba(212,175,55,0.18); box-shadow: 0 14px 40px rgba(3,60,98,0.18); }
.popup-title { background: linear-gradient(180deg,#0b66a8 0%, #094a7a 100%); color: #ffffff; padding: 14px 20px; border-bottom: 2px solid rgba(212,175,55,0.15) }
.popup-title .title-text { font-weight:800; font-size:16px; color: #fff }
.popup-close .v-icon { color: #fff }
.popup-table-wrap {
  padding: 8px;
  background: linear-gradient(180deg, #0e5998 0%, #0b4b79 100%);
  overflow-x: auto;
}
.popup-table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
  table-layout: auto;
  color: #fff;
}
.popup-table thead th {
  background: linear-gradient(180deg,#0b66a8 0%, #08466a 100%);
  color: #fff;
  font-weight: 800;
  border-right: 1px solid rgba(212,175,55,0.12);
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  position: sticky;
  top: 0;
  z-index: 3;
}
.popup-table thead th:last-child { border-right: none }
.popup-table tbody tr {
  background: linear-gradient(180deg,#0d4e86 0%, #083c62 100%);
  border-bottom: 1px solid rgba(212,175,55,0.06);
}
.popup-table tbody tr:hover { background: linear-gradient(90deg,#0f77c1,#0b5ea0) }
.popup-table td {
  vertical-align: middle;
  padding: 12px 16px;
  color: #fff;
  border-right: 1px solid rgba(212,175,55,0.04);
  white-space: normal;
  word-break: break-word;
}
.popup-table td:last-child { border-right: none }
.popup-table .icon-link { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px }
.popup-table .v-icon { color: #ffd666 }
.popup-table .text-center { color: #ffd666 }

/* Make popup pagination numbers white and visible */
.popup-table-wrap .v-pagination { display:flex; justify-content:center; padding:8px 0; }
.popup-table-wrap .v-pagination button {
  color: #fff !important;
  background: transparent !important;
  border: 1px solid rgba(255,255,255,0.06) !important;
  min-width: 36px;
  height: 36px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
}
.popup-table-wrap .v-pagination button:hover {
  background: rgba(255,255,255,0.06) !important;
  color: #fff !important;
}
.popup-table-wrap .v-pagination button.v-pagination-item--active {
  background: rgba(255,255,255,0.12) !important;
  color: #fff !important;
  border-color: rgba(255,255,255,0.12) !important;
}


/* Make dashboard area truly edge-to-edge: remove inner card margins and expand content */
.v-application .v-main .dashboard-bg {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.dashboard-bg .v-card {
  margin-left: 0 !important;
  margin-right: 0 !important;
  max-width: 100% !important;
  width: 100% !important;
  border-radius: 6px !important;
}
.dashboard-bg .search-card {
  border-radius: 6px !important;
  margin: 0 16px !important;
  width: calc(100% - 32px) !important;
}
.dashboard-bg .v-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

</style>
