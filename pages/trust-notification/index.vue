<template>
    <div style="height: 100vh;display: flex;justify-content: center;align-items: center;background: linear-gradient(to top, #003E73,#065D9E,#0978BF);" >
        <v-card max-width="1250" class="mx-auto mt-4 card-shadow pt-6" rounded="lg">
            <apexchart type="line" :options="lineChartSimple.chartOptions" :series="lineChartSimple.series">
            </apexchart>
        </v-card>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: false
})
const lineChartSimple = {
    series: [
        {
            name: "Success",
            data: [28, 27, 30, 36, 32, 32, 33, 20, 32]
        },
        {
            name: "Failed",
            data: [30, 30, 14, 48, 17, 43, 13, 20, 32]
        },
        {
            name: "Timeout",
            data: [20, 40, 24, 50, 17, 43, 13, 20, 22]
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
        colors: ['#4AAF41','#E83E36', '#F6C603'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Monitor Trust Notification",
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
                text: '( Date Times )'
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
                text: 'Notification Status',
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        },
        
    },
};
</script>