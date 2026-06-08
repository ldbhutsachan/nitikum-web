<template>
    <div style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);height: 100vh;">
        <div style="display: flex;justify-content: center;flex-direction: column;text-align: center;align-items: center;"
            class="pt-5 font-weight-bold">
            <h3 class="text-white" >Monitor Services</h3>
            <div v-if="barType" style="width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center;"
                class="card-shadow pb-2 pt-4">
                <v-btn @click="barType = true"
                    :style="{ 'background': barType ? 'white' : 'transparent', 'color': barType ? 'black' : '#fff', 'border': '1px solid #fff' }"
                    height="50">ແບບ Bar Chart</v-btn>
                <div style="width: 10px;"></div>
                <v-btn @click="barType = false"
                    :style="{ 'background': !barType ? 'white' : 'transparent', 'color': !barType ? 'black' : '#fff', 'border': '1px solid #fff' }"
                    height="50">ແບບ Line Chart</v-btn>
                <div style="width: 10px;"></div>
                <div style="width: 300px;">
                    <v-menu v-model="menuStartDate" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-text-field :modelValue="startDate" v-bind:="props" base-color="#065D9E"
                                color="#065D9E" prepend-inner-icon="mdi-calendar-blank-outline" :hide-details=true
                                clearable variant="outlined" readonly placeholder="ເລີ່ມວັນທີ" bg-color="white"
                                @click:clear="startDate = null" class="card-shadow">
                            </v-text-field>
                        </template>
                        <v-date-picker @update:model-value="onUpdateStartDate" :hide-actions="true"
                            color="primary"></v-date-picker>
                    </v-menu>
                </div>
                <div style="width: 100px;">
                    <v-menu v-model="menuStartTime" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <div class="card-shadow" v-bind:="props"
                                style="background-color: white; border: 1px solid #003E73;height: 57px;border-radius: 5px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
                                <v-icon>mdi-clock-time-three-outline</v-icon>
                                <div style="width: 5px;" ></div>
                                <span style="color: grey;">{{ startTime !='' ? startTime:'ເວລາ' }}</span>
                            </div>
                        </template>
                        <v-time-picker @update:model-value="onUpdateTimeStart" :hide-actions="true"
                            color="primary"></v-time-picker>
                    </v-menu>
                </div>
                <div style="display: flex;justify-content: center;align-items: center;color: white;" class="px-5">ຫາ</div>
                <div style="width: 300px;">
                    <v-menu v-model="menuEndtDate" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-text-field :modelValue="endDate" v-bind:="props" base-color="#065D9E"
                                color="#065D9E" prepend-inner-icon="mdi-calendar-blank-outline" :hide-details=true
                                clearable variant="outlined" readonly placeholder="ຫາວັນທີ" bg-color="white"
                                @click:clear="endDate = null" class="card-shadow">
                            </v-text-field>
                        </template>
                        <v-date-picker @update:model-value="onUpdateEndDate" :hide-actions="true" color="primary"></v-date-picker>
                    </v-menu>
                </div>
                <div style="width: 100px;">
                    <v-menu v-model="menuEndTime" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            
                            <div class="card-shadow" v-bind:="props"
                                style="background-color: white; border: 1px solid #003E73;height: 55px;border-radius: 5px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
                                <v-icon>mdi-clock-time-three-outline</v-icon>
                                <div style="width: 5px;" ></div>
                                <span style="color: grey;">{{ endTime !='' ? endTime:'ເວລາ' }}</span>
                            </div>
                        </template>
                        <v-time-picker @update:model-value="onUpdateTimeEnd" :hide-actions="true" color="primary"></v-time-picker>
                    </v-menu>
                </div>
                <div style="width: 10px;"></div>
                <v-btn height="55" style="background: #003E73;color: white;" ><v-icon color="white">mdi-magnify</v-icon> ຄົ້ນຫາ</v-btn>
            </div>
            <div v-else style="width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center;"
                class="card-shadow pb-2 pt-4">
                <v-btn @click="barType = true"
                    :style="{ 'background': barType ? 'white' : 'transparent', 'color': barType ? 'black' : '#fff', 'border': '1px solid #fff' }"
                    height="50">ແບບ
                    Bar Chart</v-btn>
                <div style="width: 10px;"></div>
                <v-btn @click="barType = false"
                    :style="{ 'background': !barType ? 'white' : 'transparent', 'color': !barType ? 'black' : '#fff', 'border': '1px solid #fff' }"
                    height="50">ແບບ Line
                    Chart</v-btn>
                <div style="width: 10px;"></div>
                <div style="width: 300px;">
                    <v-menu v-model="menuStartDate1" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-text-field :modelValue="startDate1" v-bind:="props" base-color="#065D9E"
                                color="#065D9E" prepend-inner-icon="mdi-calendar-blank-outline" :hide-details=true
                                clearable variant="outlined" readonly placeholder="ເລີ່ມວັນທີ" bg-color="white"
                                @click:clear="startDate1 = null" class="card-shadow">
                            </v-text-field>
                        </template>
                        <v-date-picker @update:model-value="onUpdateStartDate1" :hide-actions="true"
                            color="primary"></v-date-picker>
                    </v-menu>
                </div>
                <div style="width: 100px;">
                    <v-menu v-model="menuStartTime1" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            
                            <div class="card-shadow" v-bind:="props"
                                style="background-color: white; border: 1px solid #003E73;height: 55px;border-radius: 5px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
                                <v-icon>mdi-clock-time-three-outline</v-icon>
                                <div style="width: 5px;" ></div>
                                <span style="color: grey;">{{ startTime1 !='' ? startTime1:'ເວລາ' }}</span>
                            </div>
                        </template>
                        <v-time-picker @update:model-value="onUpdateTimeStart1" :hide-actions="true"
                            color="primary"></v-time-picker>
                    </v-menu>
                </div>
                <div style="display: flex;justify-content: center;align-items: center;color:white" class="px-5">ຫາ</div>
                <div style="width: 300px;">
                    <v-menu v-model="menuEndtDate1" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-text-field :modelValue="endDate1" v-bind:="props" base-color="#065D9E"
                                color="#065D9E" prepend-inner-icon="mdi-calendar-blank-outline" :hide-details=true
                                clearable variant="outlined" readonly placeholder="ຫາວັນທີ" bg-color="white"
                                @click:clear="endDate1 = null" class="card-shadow">
                            </v-text-field>
                        </template>
                        <v-date-picker @update:model-value="onUpdateEndDate1" :hide-actions="true" color="primary"></v-date-picker>
                    </v-menu>
                </div>
                <div style="width: 100px;">
                    <v-menu v-model="menuEndTime1" :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            
                            <div class="card-shadow" v-bind:="props"
                                style="background-color: white; border: 1px solid #003E73;height: 55px;border-radius: 5px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
                                <v-icon>mdi-clock-time-three-outline</v-icon>
                                <div style="width: 5px;" ></div>
                                <span style="color: grey;">{{ endTime1 !='' ? endTime1:'ເວລາ' }}</span>
                            </div>
                        </template>
                        <v-time-picker @update:model-value="onUpdateTimeEnd1" :hide-actions="true" color="primary"></v-time-picker>
                    </v-menu>
                </div>
                <div style="width: 10px;"></div>
                <v-btn height="55" style="background: #003E73;color: white;" ><v-icon color="white">mdi-magnify</v-icon> ຄົ້ນຫາ</v-btn>
            </div>
        </div>
        <!-- <v-btn @click="onLoadBarInfo">Loading</v-btn> -->
        <div>
            <v-card v-if="barType" max-width="1290" class="mx-auto mt-4 card-shadow" rounded="lg">
                <apexchart v-if="!barLoading" type="bar" :options="columnChart.chartOptions"
                    :series="columnChart.series">
                </apexchart>
                <v-card v-else max-width="1290" class="mx-auto mt-4 card-shadow">
                    <div style="display: flex;flex-direction: row;justify-content: space-between;">
                        <div style="width: 80px;height: 70vh;display: flex;flex-direction: column; justify-content: space-between;border-right: 1px solid #ccc; "
                            class="py-2 px-2">
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                        </div>
                        <div style="width: 100%;height: 70vh;display: flex;flex-direction: row;justify-content: space-between;align-items: end;"
                            class="pa-10">
                            <v-progress-linear color="#f0f0f0" style="height: 40vh;width: 30px;border-radius: 10px;"
                                indeterminate>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" style="height: 50vh;width: 30px;border-radius: 10px;"
                                indeterminate>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" style="height: 60vh;width: 30px;border-radius: 10px;"
                                indeterminate>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" style="height: 60vh;width: 30px;border-radius: 10px;"
                                indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 30vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 45vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 60vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 60vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 55vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 30vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 65vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 60vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear><v-progress-linear color="#f0f0f0"
                                style="height: 20vh;width: 30px;border-radius: 10px;" indeterminate>
                            </v-progress-linear>
                        </div>
                    </div>
                    <div style="display: flex;flex-direction: row;justify-content: space-between;">
                        <div style="width: 100%;display: flex;flex-direction: row; justify-content: space-between; "
                            class="py-2">
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                            <v-progress-linear color="#f0f0f0" height="20" indeterminate rounded>
                            </v-progress-linear>
                        </div>
                        <div></div>
                    </div>
                </v-card>
            </v-card>
            <v-card v-else max-width="1290" class="mx-auto mt-4 card-shadow" rounded="lg">
                <apexchart type="line" :options="lineChartSimple.chartOptions" :series="lineChartSimple.series">
                </apexchart>
            </v-card>

        </div>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';

definePageMeta({
    layout: false
})
const menuStartDate = ref<boolean>(false);
const startDate = ref<any>(null)
const menuStartTime = ref<boolean>(false);
const startTime = ref<string>('')
const menuEndtDate = ref<boolean>(false);
const endDate = ref<any>(null)
const menuEndTime = ref<boolean>(false);
const endTime = ref<string>('')

const menuStartDate1 = ref<boolean>(false);
const startDate1 = ref<any>(null)
const menuStartTime1 = ref<boolean>(false);
const startTime1 = ref<string>('')
const menuEndtDate1 = ref<boolean>(false);
const endDate1 = ref<any>(null)
const menuEndTime1 = ref<boolean>(false);
const endTime1 = ref<string>('')

const barType = ref<boolean>(true)
const barLoading = ref<boolean>(false)
const lineLoading = ref<boolean>(false)

const columnChart = {
    series: [
        {
            name: "Service 1",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: "Service 2",
            data: [76, 85, 101, 98, 87, 105, 91, 104, 94],
        },
        {
            name: "Service 3",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
        {
            name: "Service 4",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ],
    chartOptions: {
        chart: {
            events: {
                click: function (event: any, chartContext: any, config: any) {
                    console.log(event);
                }
            },

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                endingShape: "rounded",
                columnWidth: "70%",
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            show: true,
            width: 4,
            colors: ["transparent"],
        },
        xaxis: {
            categories: [
                "10/08/2024 10:00:30",
                "11/08/2024 10:00:31",
                "12/08/2024 10:00:32",
                "13/08/2024 10:00:33",
                "14/08/2024 10:00:34",
                "15/08/2024 10:00:35",
                "16/08/2024 10:00:36",
                "17/08/2024 10:00:37",
                "18/08/2024 10:00:38",
            ],
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                },
            },
        },
        yaxis: {
            title: {
                text: "Service Speeds",
            },
            labels: {
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                },
            },
        },
        fill: {
            opacity: 1,
        },
        grid: {
            borderColor: "#f0f0f0",
            boderWidth: 4
        },
        tooltip: {
            theme: "dark",
            y: {
                formatter: function (val: any) {
                    return "$ " + val + " thousands";
                },
            },
        },
    },
}
const lineChartSimple = {
    series: [
        {
            name: "Services1",
            data: [28, 27, 30, 36, 32, 32, 33, 20, 32]
        },
        {
            name: "Services2",
            data: [30, 30, 14, 48, 17, 43, 13, 20, 32]
        },
        {
            name: "Services3",
            data: [20, 40, 24, 50, 17, 43, 13, 20, 22]
        },
        {
            name: "Services4",
            data: [35, 35, 44, 41, 27, 33, 23, 20, 20]
        }
    ],
    chartOptions: {
        chart: {
            // height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false
            }
        },
        // colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Services:",
            align: "center",
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },

        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: [
                "12/08/2024 10:00:32",
                "13/08/2024 10:00:33",
                "14/08/2024 10:00:34",
                "15/08/2024 10:00:35",
                "16/08/2024 10:00:36",
                "17/08/2024 10:00:37",
                "18/08/2024 10:00:38",
                "18/08/2024 10:00:38",
                "18/08/2024 10:00:38",
            ],
            labels: {
                style: {
                    fontWeight: "bold",
                    cssClass: "grey--text lighten-2--text fill-color",
                },
            },
            title: {
                text: '( Time )'
            }
        },
        yaxis: {
            labels: {
                style: {
                    cssClass: "grey--text lighten-2--text fill-color",
                    fontSize: '12pt',
                    fontWeight: 'bold'
                },
            },
            title: {
                text: 'Speeds',
            },
            // min: 5,
            // max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        // tooltip: {
        //     theme: "dark",
        // },
    },
};
const onUpdateStartDate = (val: any) => {
    startDate.value = moment(val).format('YYYY-MM-DD');
    menuStartDate.value = false
}
const onUpdateTimeStart = (val: any) => {
    startTime.value = val?.toString()
    menuStartTime.value = false
}
const onUpdateEndDate = (val: any) => {
    endDate.value = moment(val).format('YYYY-MM-DD');
    menuEndtDate.value = false
}
const onUpdateTimeEnd = (val: any) => {
    endTime.value = val?.toString()
    menuEndTime.value = false
}



const onUpdateStartDate1 = (val: any) => {
    startDate1.value = moment(val).format('YYYY-MM-DD');
    menuStartDate1.value = false
}
const onUpdateTimeStart1 = (val: any) => {
    startTime1.value = val?.toString()
    menuStartTime1.value = false
}
const onUpdateEndDate1 = (val: any) => {
    endDate1.value = moment(val).format('YYYY-MM-DD');
    menuEndtDate1.value = false
}
const onUpdateTimeEnd1 = (val: any) => {
    endTime1.value = val?.toString()
    menuEndTime1.value = false
}


const onLoadBarChartInfo = () => {
    barLoading.value = true
    setTimeout(() => {
        barLoading.value = false
    }, 2000);
}
const onLoadLineChartInfo = () => {

}
</script>