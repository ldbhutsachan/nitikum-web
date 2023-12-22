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
                        <!-- <th class="text-left text-white">
                            ຕິດພັນກັບສາຂາ
                        </th>
                        <th class="text-left text-white">
                            ຕິດພັນກັບຂະແໜງ
                        </th>
                        <th class="text-left text-white">
                            ຕິດພັນກັບໃຜ
                        </th> -->
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
                        
                        <th class="text-left text-white">
                            ຈັດການ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in documentList" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="height: 10;">{{ item?.subjectName }}</td>
                        <td style="font-size: 12pt;">{{ item?.docNo }} </td>
                        <td style="font-size: 12pt;">{{ item?.docDate }}</td>
                        <td style="font-size: 12pt;">{{ item?.docDescLao }}</td>
                        <!-- <td style="font-size: 12pt;">{{  }}</td>
                        <td style="font-size: 12pt;">{{  }}</td>
                        <td style="font-size: 12pt;">{{  }}</td> -->
                        <td style="font-size: 12pt;">{{ item?.sharingType }}</td>
                        <td style="font-size: 12pt;" class="text-red">{{ item?.docStatus }}</td>
                        <td>

                            <a :href="item?.docPathLa" target="_blank">
                                <v-btn  elevation="0" color="#243A7A">ເບີ່ງ</v-btn>
                            </a>
                        </td>
                        <td style="font-size: 12pt;">
                            <a :href="item?.docPath" target="_blank">
                                <v-btn  elevation="0" color="#243A7A">ເບີ່ງ</v-btn>
                            </a>
                        </td>
                        
                        <td>

                            <v-btn v-if="item?.docStatus !== 'ອະນຸມັດເເລ້ວ'" @click="onAskBeforeApprove(item?.id)" density="comfortable" color="#243A7A">
                                ອະນຸມັດ
                            </v-btn>
                            <v-btn v-if="item?.docStatus !== 'ອະນຸມັດເເລ້ວ'" class="ml-2" @click="onAskBeforeReject(item?.id)" density="comfortable" color="red">
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
const showDialogAdd = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
import swal from 'sweetalert2'
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
const endPage = ref<number>(10)
const countPage = ref<number>(0)
const active = ref<string>('')
//form data

const formGetDoc = ref({ markerId: '' })
const formGetWaitApp = ref({ docNo: '' })
const formApprove = ref({ approveId: '', id: '' })

const onGetInfo = async () => {
    const userId = useCookie('userId')
    if (documentList.value.length === 0) {
        showLoading.value = true
    }
    formGetDoc.value.markerId = userId.value ? userId.value : ''
    const { data } = await useServer('document/get-audit-wait-app', {
        method: 'POST',
        body: JSON.stringify(formGetWaitApp.value)
    })
    const res: any = data.value
    const count: any = res?.resData?.length
    const resMath = (count / 10).toFixed(1)?.toString()
    const splitRes = resMath.split('.')
    if (splitRes[1] === '0') {
        countPage.value = parseFloat(splitRes[0])
    } else {
        countPage.value = parseFloat(splitRes[0]) + 1
    }
    setDocumentList(res?.resData)
    showLoading.value = false
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
    const userId = useCookie('userId')
    formApprove.value.id = key
    formApprove.value.approveId = userId.value ? userId.value : ''
    const { data } = await useServer('document/approve', {
        method: 'POST',
        body: JSON.stringify(formApprove.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetInfo()
    } else {
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
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
    const userId = useCookie('userId')
    formApprove.value.id = key
    formApprove.value.approveId = userId.value ? userId.value : ''
    const { data } = await useServer('document/reject', {
        method: 'POST',
        body: JSON.stringify(formApprove.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetInfo()
    } else {
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
if (process.server) {
    await onGetInfo()
}
// watch(userShareList, () => {
//     const indexItems = userShareList.value.length - 1
//     // console.log(userShareList.value)
//     // console.log(indexItems)
//     console.log(userShareList.value[indexItems])
// })
// watch(branchCode, () => {
//     onGetDeptMent(branchCode.value)
// })
// watch(sectionCode, () => {
//     onGetUser(sectionCode.value)
// })
watch(page, () => {
    startPage.value = (page.value - 1) * 10
    endPage.value = page.value * 10
})
onMounted(() => {

    onGetInfo()
})
</script>