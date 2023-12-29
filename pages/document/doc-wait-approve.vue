<template>
    <div>
        <v-card width="1500" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <!-- <v-btn @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນເອກະສານ
            </v-btn> -->
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ documentList?.length
            }})</span>
        </v-card>

        <v-card width="1500" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A;">
                        <th class="text-left text-white">
                            ຫົວຂໍ້ເອກະສານ
                        </th>
                        <th class="text-left text-white">
                            ເລກທີເອກະສານ
                        </th>
                        <th class="text-left text-white">
                            ລົງວັນທີ
                        </th>
                        <th class="text-left text-white">
                            ປະເພດເອກະສານ
                        </th>
                        <th class="text-left text-white">
                            ປະເພດ Share
                        </th>
                        <th class="text-left text-white">
                            ສະຖານະ
                        </th>
                        <th class="text-left text-white">
                            PDF(LAO)
                        </th>
                        <th class="text-left text-white">
                            PDF(EN)
                        </th>

                        <th class="text-left text-white" colspan="2">
                            ຈັດການ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in documentList?.slice(startPage, endPage)" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="height: 10;">{{ item?.subjectName }}</td>
                        <td style="font-size: 12pt;">{{ item?.docNo }} </td>
                        <td style="font-size: 12pt;">{{ item?.docDate }}</td>
                        <td style="font-size: 12pt;">{{ item?.docDescLao }}</td>
                        <td style="font-size: 12pt;">{{ item?.sharingType }}</td>
                        <td v-if="item?.docStatus === 'ອະນຸມັດເເລ້ວ'" style="font-size: 12pt;" class="text-green">
                            <Icon name="simple-line-icons:check" color="green" /> {{ item?.docStatus }}
                        </td>
                        <td v-if="item?.docStatus === 'ລາຍການຖືກປະຕິເສດ'" style="font-size: 12pt;width: 200px;"
                            class="text-red">
                            <Icon name="simple-line-icons:close" color="red" /> {{ item?.docStatus }}
                        </td>
                        <td v-if="item?.docStatus === 'ລໍຖ້າອະນຸມັດ'" style="font-size: 12pt;" class="text-red">
                            <Icon name="carbon:pending" /> {{ item?.docStatus }}
                        </td>
                        <td>
                            <a v-if="item?.docPathLa !== '' && item?.docPathLa !== null" :href="item?.docPathLa"
                                target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td style="font-size: 12pt;">
                            <a v-if="item?.docPath !== '' && item?.docPath !== null" :href="item?.docPath" target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td>
                            <v-btn v-if="item?.docStatus === 'ລໍຖ້າອະນຸມັດ' && item?.docStatus !== 'ລາຍການຖືກປະຕິເສດ'"
                                @click="onAskBeforeApprove(item?.id)" density="comfortable" color="#243A7A">
                                ອະນຸມັດ
                            </v-btn>
                        </td>
                        <td>
                            <v-btn v-if="item?.docStatus === 'ລໍຖ້າອະນຸມັດ' && item?.docStatus !== 'ລາຍການຖືກປະຕິເສດ'"
                                class="ml-2" @click="onAskBeforeReject(item?.id)" density="comfortable" color="red">
                                ປະຕິເສດ
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <!-- <span>{{ startPage }}======{{ setBranchList?.resData?.length }}=====</span>
            <span>{{ endPage }}</span> -->
            <div class="d-flex" style="padding-left: 200px;padding-right: 200px;">
                <!-- <div style="width: 50%;"></div> -->
                <div style="width: 100%">
                    <v-pagination v-model="page" :length="countPage" rounded="circle"></v-pagination>
                </div>
            </div>
        </v-card>

        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
const api = useRuntimeConfig()
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
//global state
import { useManageState } from '~/stores/manage-state'
import Swal from 'sweetalert2';
const manageState = useManageState()
const { setDocumentList } = manageState

const documentList = computed(() => { return manageState.documentList })
// state

const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(20)
const countPage = ref<number>(0)
const active = ref<string>('')
//form data


const onGetInfo = async () => {
    if (documentList.value.length === 0) {
        showLoading.value = true
    }
    try {
        var body = {
            docNo: ''
        }
        await axios.post(`${api.public.API_URL}/Audit/getAuditListCheck`, body).then((data) => {
            const count: any = data?.data?.resData?.length
            const resMath = (count / 20).toFixed(1)?.toString()
            const splitRes = resMath.split('.')
            if (splitRes[1] === '0') {
                countPage.value = parseFloat(splitRes[0])
            } else {
                countPage.value = parseFloat(splitRes[0]) + 1
            }
            setDocumentList(data?.data?.resData)
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }



}
const onAskBeforeApprove = (key: any) => {
    Swal.fire({
        icon: 'question',
        text: `ທ່ານຕ້ອງການອະນຸມັດແທ້ບໍ`,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
        if (result.isConfirmed) {
            onApprove(key)
        }
    })
}
const onApprove = async (key: any) => {
    try {
        var body = {
            approveId: localStorage.getItem('userId'),
            id: parseFloat(key)
        }
        await axios.post(`${api.public.API_URL}/Audit/AuditDoc`, body).then((data) => {
            if (data?.data.message?.resCode === '00') {
                showAlert.value = true
                iconType.value = 'success'
                messageAlert.value = data?.data?.message?.resMgs
                onGetInfo()
            } else {
                showAlert.value = true
                iconType.value = 'error'
                messageAlert.value = data?.data?.message?.resMgs
            }
        })
    } catch (error) {
        console.log()
    }
}
const onAskBeforeReject = (key: any) => {
    Swal.fire({
        icon: 'question',
        text: `ທ່ານຕ້ອງການປະຕິເສດແທ້ບໍ`,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
        if (result.isConfirmed) {
            onReject(key)
        }
    })
}
const onReject = async (key: any) => {
    try {
        showLoading.value = true
        var body = {
            approveId: localStorage.getItem('userId'),
            id: key
        }
        await axios.post(`${api.public.API_URL}/Audit/rejectDocument`, body).then((data) => {
            if (data?.data.message?.resCode === '00') {
                showLoading.value = false
                showAlert.value = true
                iconType.value = 'success'
                messageAlert.value = data?.data?.message?.resMgs
                onGetInfo()
            } else {
                showLoading.value = false
                showAlert.value = true
                iconType.value = 'error'
                messageAlert.value = data?.data?.message?.resMgs
            }
        })
    } catch (error) {
        console.log(error)
    }

}
if (process.server) {
    await onGetInfo()
}

watch(page, () => {
    startPage.value = (page.value - 1) * 20
    endPage.value = page.value * 20
})
onMounted(() => {

    onGetInfo()
})
</script>