<!-- pages/Dashboard.vue -->
<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import ApexCharts from 'vue3-apexcharts'

const caltotal = ref(null)
const transactions = ref([])
const sections = ref([])

const startDate = ref('')
const endDate = ref('')

const fetchDashboard = async () => {
  const { data } = await axios.post(
    'http://10.0.10.49:9001/meet-law/prod/api/v1/dashboard',
    { startDate: startDate.value, endDate: endDate.value }
  )
  caltotal.value = data.caltotalGroup
  transactions.value = data.transactionsGroup
  sections.value = data.sectionGroup
}

// Chart configs
const transactionChart = computed(() => ({
  chart: { type: 'bar', toolbar: { show: false } },
  colors: ['#2196F3'],
  xaxis: { categories: transactions.value.map(t => t.typeDocumentName) },
  series: [{ name: 'Documents', data: transactions.value.map(t => Number(t.totalAmt)) }]
}))

const sectionChart = computed(() => ({
  chart: { type: 'bar', toolbar: { show: false } },
  colors: ['#42A5F5'],
  xaxis: { categories: sections.value.map(s => s.secName) },
  series: [{ name: 'Sections', data: sections.value.map(s => Number(s.totalAmt)) }]
}))

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
  <!-- Transactions Table Chart -->
  <v-col cols="12" md="6">
    <v-card class="elevation-12">
      <v-card-title class="blue--text text-h6">
        <v-icon start color="blue">mdi-file-table</v-icon>
        ປະເພດນິຕິກຳ
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="[
            { text: 'ປະເພດເອກະສານ', value: 'typeDocumentName' },
            { text: 'Chart', value: 'chart' },
            { text: 'ຈຳນວນ', value: 'totalAmt' }
          ]"
          :items="transactions"
          dense
          hide-default-footer
        >
          <!-- Chart column with auto gradient -->
          <template v-slot:item.chart="{ item }">
            <v-progress-linear
              :value="Number(item.totalAmt)"
              height="15"
              rounded
              :style="{ background: gradientFromName(item.typeDocumentName) }"
            ></v-progress-linear>
          </template>
          <!-- Number column -->
          <template v-slot:item.totalAmt="{ item }">
            <span class="font-weight-bold blue--text">{{ item.totalAmt }}</span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-col>

  <!-- Sections Table Chart -->
  <v-col cols="12" md="6">
    <v-card class="elevation-12">
      <v-card-title class="blue--text text-h6">
        <v-icon start color="blue">mdi-office-building</v-icon>
        ນິຕິກຳເເຕ່ລະຝ່າຍ
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="[
            { text: 'ພາກສ່ວນ/ຝ່າຍ', value: 'secName' },
            { text: 'Chart', value: 'chart' },
            { text: 'ຈຳນວນ', value: 'totalAmt' }
          ]"
          :items="sections"
          dense
          hide-default-footer
        >
          <!-- Chart column with auto gradient -->
          <template v-slot:item.chart="{ item }">
            <v-progress-linear
              :value="Number(item.totalAmt)"
              height="15"
              rounded
              :style="{ background: gradientFromName(item.secName) }"
            ></v-progress-linear>
          </template>
          <!-- Number column -->
          <template v-slot:item.totalAmt="{ item }">
            <span class="font-weight-bold blue--text">{{ item.totalAmt }}</span>
          </template>
        </v-data-table>
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
