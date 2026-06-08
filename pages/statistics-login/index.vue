<template>
    <div>
        <v-card max-width="1200" class="mx-auto pa-1 rounded-lg" elevation="2" color="transparent">
            <div class="py-2 d-flex align-center px-4">
                <h3>ສະຖິຕິການເຂົ້າລະບົບ</h3>
                <v-spacer></v-spacer>
                <h3>ຈຳນວນສະຖິຕິເຂົ້າລະບົບທັງໝົດ: <span class="text-orange" style="font-size: 18pt;">[ {{
                    Intl.NumberFormat('en-US').format(totalPrice) }} ]</span> ຄັ້ງ</h3>
            </div>
            <div class="px-4">
                <v-text-field v-model="search" variant="outlined" density="compact" placeholder="ຄົ້ນຫາ" append-inner-icon="mdi-magnify" prepend-inner-icon="mdi-magnify"></v-text-field>
            </div>
            <v-data-table-virtual v-if="staticticsList !== null" :headers="headers" :items="staticticsList" :search="search"
                no-data-text="( ຍັງບໍ່ມີລາຍການ !! )">
                <template v-slot:item="row: any">
                    <tr>
                        <td>{{ row?.index + 1 }}</td>
                        <td>{{ row?.item?.userId }}</td>
                        <td>{{ row?.item?.fullName }}</td>
                        <td>{{ row?.item?.secName }}</td>
                        <td style="font-size: 14pt;color: green;font-weight: bold;">{{
                            Intl.NumberFormat('en-US').format(row?.item?.amt) }} ຄັ້ງ</td>
                        <td><v-btn density="comfortable" elevation="0" color="primary" @click="onFetchDetails(row?.item?.userId)"><v-icon>mdi-magnify</v-icon> ເບິ່ງ</v-btn></td>
                    </tr>
                </template>
            </v-data-table-virtual>
        </v-card>
        <v-dialog v-model="dialogDetail" max-width="600" persistent scrollable>
            <v-card class="rounded-lg">
                <v-card-title class="d-flex align-center">ລາຍລະອຽດການເຂົ້າລະບົບແຕ່ລະຄັ້ງ <v-spacer></v-spacer> <v-btn icon elevation="0" @click="dialogDetail = false"><v-icon>mdi-close</v-icon></v-btn></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                    <v-data-table-virtual v-if="staticticsList !== null" :headers="headersDetail" :items="detailList" :search="search"
                    no-data-text="( ຍັງບໍ່ມີລາຍການ !! )">
                <template v-slot:item="row: any">
                    <tr>
                        <td class="pl-6">{{ row?.index + 1 }}</td>
                        <td>{{ row?.item?.fullName }}</td>
                        <td>{{ row?.item?.createDate }}</td>
                        <td>{{ row?.item?.docNo }}</td>
                        <td>{{ row?.item?.subjectName }}</td>
                    </tr>
                </template>
            </v-data-table-virtual>
                </v-card-text>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
const api = useRuntimeConfig()
const staticticsList = ref<any>([])
const search = ref<string>('')
const showLoading = ref<boolean>(false)
const headers = ref<any>([
    { title: 'ລຳດັບ', key: 'index' },
    { title: 'ລະຫັດພະນັກງານ', key: 'userId' },
    { title: 'ຊື່ ແລະ ນາມສະກຸນ', key: 'fullName' },
    { title: 'ຝ່າຍ / ສາຂາ / ຂະແໜງ', key: 'secName' },
     { title: 'ຈຳນວນເຂົ້າລະບົບ', key: 'amt' },
    { title: '', key: '' },
])
const headersDetail = ref<any>([
    { title: 'ລຳດັບ', key: 'index' },
    { title: 'ຊື່ ແລະ ນາມສະກຸນ', key: 'fullName' },
    { title: 'ວັນທີ່ເຂົ້າ', key: 'secName' },
    { title: 'ເລກທີເອກະສານ', key: 'docNo' },
    { title: 'ຊື່ຫົວຂໍ້ເອກະສານ', key: 'subName' },
])
const totalPrice = ref<any>('')
const onFetchStatistics = async () => {
    const userId = localStorage.getItem('userId')
    let data = { userName: userId, userType: 'A' }
    try {
        
        await axios.post(`${api.public.API_URL}/log/getStatisticLogin`, data).then((data) => {
            staticticsList.value = data?.data?.resData
            if (data?.data?.resData?.length > 0) {
                totalPrice.value = staticticsList.value.reduce((sum: any, item: any) => sum + parseInt(item.amt), 0);
            }
        });
    } catch (error) {
        console.log(error)
    }
}
const detailList = ref<any>([])
const dialogDetail = ref<boolean>(false)
const onFetchDetails = async (id:string) => {
    showLoading.value = true
    let data = { userName: id, userType: 'A' }
    try {
        await axios.post(`${api.public.API_URL}/log/dologStatisticDetailsLogin`, data).then((data) => {
            showLoading.value = false
            detailList.value = data?.data?.resData
            dialogDetail.value = true
        });
    } catch (error) {
        console.log(error)
    }
}
onFetchStatistics()
</script>