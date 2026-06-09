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
      // prefer Lao description when available
      docTypes.value = data.resData.map(d => ({ label: d.docDescLao || d.docDesc || d.docType, value: d.docType }))
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
      branches.value = data.resData.map(b => ({ label: b.brNameLa || b.brName || b.branchCode, value: b.branchCode }))
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

  return {
    series: [{ name: 'ຈຳນວນ', data }],
    chartOptions: {
      chart: { type: 'bar', fontFamily: 'Phetsalate, Noto Sans Lao UI, sans-serif' },
      plotOptions: { bar: { borderRadius: 8 } },
      dataLabels: { enabled: true, formatter: val => formatNumber(val) },
      xaxis: { categories: dates, labels: { formatter: val => val }, tooltip: { enabled: true } },
      yaxis: { labels: { formatter: val => formatNumber(val) } },
      title: { text: `ສະຫຼຸບສະຖິຕິ ( ${startDate.value || ''} → ${endDate.value || ''} )`, align: 'center' }
    }
  }
})
</script>

<template>
  <v-container>
    <!-- Search form -->
    <v-card class="pa-4 mb-6 elevation-12 search-card">
      <v-card-title class="blue--text text-h6 d-flex align-center" style="padding:12px 20px;">
            <div class="d-flex align-center">
              <v-icon start color="blue">mdi-magnify</v-icon>
              ຄົ້ນຫາຂໍ້ມູນ
            </div>
            <v-spacer />
            <div class="search-presets d-flex">
              <v-btn small class="preset" @click="setToday">ມື້ນີ້</v-btn>
              <v-btn small class="preset" @click="setThisMonth">ເດືອນນີ້</v-btn>
              <v-btn small class="preset muted" @click="clearDates">ລ້າງ</v-btn>
            </div>
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
                  label="Start Date"
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
                  label="End Date"
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
          
        </v-row>
      </v-card-text>
      <v-row class="stat-grid">
        <v-col class="stat-col" cols="12" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card">
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

      <v-col class="stat-col" cols="12" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card">
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

      <v-col class="stat-col" cols="12" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card">
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

      <v-col class="stat-col" cols="12" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card">
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
      <v-col class="stat-col" cols="12" sm="6" md="auto">
        <v-card class="pa-3 elevation-2 stat-card">
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
            <div style="width:30%;font-weight:500">{{ item.name }}</div>
            <div style="flex:1;margin:0 12px">
              <div style="background:#eceff1;border-radius:8px;height:10px;position:relative;overflow:hidden">
                <div :style="{ width: item.pct + '%', background: item.color, height: '10px', borderRadius: '8px' }"></div>
              </div>
            </div>
            <div style="width:96px;text-align:right;font-weight:600">
              <div>{{ formatNumber(item.value) }}</div>
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
            <div style="width:30%;font-weight:500">{{ item.name }}</div>
            <div style="flex:1;margin:0 12px">
              <div style="background:#eceff1;border-radius:8px;height:10px;position:relative;overflow:hidden">
                <div :style="{ width: item.pct + '%', background: item.color, height: '10px', borderRadius: '8px' }"></div>
              </div>
            </div>
            <div style="width:96px;text-align:right;font-weight:600">
              <div>{{ formatNumber(item.value) }}</div>
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
.stat-title { font-size:13px; color:#6b7280; font-weight:600 }
.stat-grid { display:flex; flex-wrap:wrap; gap:16px; }
.stat-grid .stat-col { flex: 0 0 20%; max-width: 20%; box-sizing: border-box; padding: 0 8px; }

@media (max-width: 1200px) {
  .stat-grid .stat-col { flex: 0 0 50%; max-width: 50%; }
}

@media (max-width: 600px) {
  .stat-grid .stat-col { flex: 0 0 100%; max-width: 100%; }
}
.stat-value { font-size:20px; font-weight:800; margin-top:6px; }
.stat-link { display:inline-block; margin-top:8px; font-size:13px; color:#2563eb }
.stat-right { width:72px; display:flex; justify-content:center; align-items:center }
.stat-icon-box { width:48px; height:48px; border-radius:8px; background: linear-gradient(180deg,#e6f4ff,#d9eefc); display:flex; justify-content:center; align-items:center; box-shadow: 0 6px 18px rgba(14,122,255,0.08) }

@media (max-width: 900px) {
  .stat-value { font-size:18px }
  .stat-icon-box { width:40px; height:40px }
  .stat-right { width:64px }
}

</style>
