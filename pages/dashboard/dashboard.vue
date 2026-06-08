<!-- pages/Dashboard.vue -->
<!-- pages/Dashboard.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ApexCharts from 'vue3-apexcharts'

const caltotal = ref(null)
const transactions = ref([])
const sections = ref([])

const startDate = ref('')
const endDate = ref('')

const fetchDashboard = async () => {
  try {
    const config = useRuntimeConfig()
    const base = config?.public?.API_URL
    const endpoint = base.includes('dashboard') ? base : `${base.replace(/\/$/, '')}/dashboard`

    const hasForm = typeof formGetType !== 'undefined' && formGetType && formGetType.value
    const payload = hasForm ? formGetType.value : { startDate: startDate.value, endDate: endDate.value }

    const { data } = await axios.post(endpoint, payload)

    caltotal.value = data.caltotalGroup
    transactions.value = data.transactionsGroup
    sections.value = data.sectionGroup
  } catch (err) {
    console.error('fetchDashboard error:', err)
  }
}

// Fetch data when component mounts
onMounted(() => {
  fetchDashboard()
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
const transactionItemsPaged = computed(() => {
  const start = (transactionPage.value - 1) * pageSize
  return transactionItems.value.slice(start, start + pageSize)
})

const sectionPage = ref(1)
const sectionPageCount = computed(() => Math.max(1, Math.ceil(sectionItems.value.length / pageSize)))
const sectionItemsPaged = computed(() => {
  const start = (sectionPage.value - 1) * pageSize
  return sectionItems.value.slice(start, start + pageSize)
})

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

// Format numbers with thousands separator
function formatNumber(n) {
  if (n === null || n === undefined) return ''
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const summaryChart = computed(() => ({
  series: [
    {
      name: 'ນິຕິກຳໃໝ່',
      type: 'column',
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    },
    {
      name: 'ນິຕິກຳທັງໝົດ',
      type: 'area',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
      name: 'ຮ່າງເອກະສານ',
      type: 'line',
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
    }
  ],

  chartOptions: {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show: true
      }
    },

    colors: ['#2196F3', '#00C853', '#FB8C00'],

    stroke: {
      width: [0, 3, 4],
      curve: 'smooth'
    },

    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 6
      }
    },

    fill: {
      opacity: [1, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: 'vertical',
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },

    labels: [
      '2024-01',
      '2024-02',
      '2024-03',
      '2024-04',
      '2024-05',
      '2024-06',
      '2024-07',
      '2024-08',
      '2024-09',
      '2024-10',
      '2024-11'
    ],

    markers: {
      size: 4
    },

    xaxis: {
      type: 'category'
    },

    yaxis: {
      title: {
        text: 'ຈຳນວນເອກະສານ'
      }
    },

    legend: {
      position: 'bottom'
    },

    tooltip: {
      shared: true,
      intersect: false
    }
  }
}))
</script>

<template>
  <v-container>
    <!-- Search form -->
    <v-card class="pa-4 mb-6 elevation-12">
      <v-card-title class="blue--text text-h6">
        <v-icon start color="blue">mdi-magnify</v-icon>
        ຄົ້ນຫາຂໍ້ມູນ Dashboard
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="startDate"
              label="Start Date (YYYYMMDD)"
              prepend-inner-icon="mdi-calendar"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="endDate"
              label="End Date (YYYYMMDD)"
              prepend-inner-icon="mdi-calendar"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="4" class="d-flex align-center">
            <v-btn color="blue darken-2" dark @click="fetchDashboard">
              <v-icon start>mdi-magnify</v-icon>
              Search
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
       <v-row>
      <v-col cols="12" sm="6" md="2">
        <v-card color="blue darken-2" dark class="pa-4 elevation-10">
          <v-card-title><v-icon start>mdi-file-document-multiple</v-icon>ລວມທັງໝົດ</v-card-title>
          <v-card-text class="text-h5">{{ caltotal?.totalAmt }} ລາຍການ</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-card color="blue lighten-1" dark class="pa-4 elevation-10">
          <v-card-title><v-icon start>mdi-file-plus</v-icon>ເອກະສານໃໝ່</v-card-title>
          <v-card-text class="text-h5">{{ caltotal?.totalAmtNew }} ລາຍການ</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-card color="cyan darken-2" dark class="pa-4 elevation-10">
          <v-card-title><v-icon start>mdi-file-clock</v-icon>ເອກະສານເກົ່າ</v-card-title>
          <v-card-text class="text-h5">{{ caltotal?.totalAmtOld }} ລາຍການ</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-card color="indigo" dark class="pa-4 elevation-10">
          <v-card-title><v-icon start>mdi-file-edit</v-icon>ຮ່າງໃໝ່</v-card-title>
          <v-card-text class="text-h5">{{ caltotal?.totalAmtDocNew }} ລາຍການ</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-card color="indigo lighten-1" dark class="pa-4 elevation-10">
          <v-card-title><v-icon start>mdi-file-refresh</v-icon>ຮ່າງປັບປຸ່ງ</v-card-title>
          <v-card-text class="text-h5">{{ caltotal?.totalAmtDocOld }} ລາຍການ</v-card-text>
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
          <div class="d-flex justify-center pa-3">
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
          <div class="d-flex justify-center pa-3">
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
          height="400"
          type="line"
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
