<template>
    <div>
        <v-card flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ documentList?.length
                }})</span>
        </v-card>
        <v-card class="mx-auto" rounded="lg" >
            <v-data-table :headers="headersT" :items="documentList" :items-per-page="20" :search="search">
                <template v-slot:item="row: any">
                    <tr>
                        <td class="text-center">{{ row?.index + 1 }}</td>
                        <td style="height: 10;">{{ row?.item?.subjectName }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.docNo }} </td>
                        <td style="font-size: 12pt;">{{ row?.item?.docDate }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.docDescLao }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.sharingType }}</td>
                        <td>
                            <div v-for="(items, i) in row?.item?.relatedShowList02">
                                <span>{{ items?.relatedShowName }} </span>
                            </div>
                        </td>
                        <td v-if="row?.item?.docStatus === 'ອະນຸມັດເເລ້ວ'" style="font-size: 12pt;" class="text-green">
                            <Icon name="simple-line-icons:check" color="green" /> {{ row?.item?.docStatus }}
                        </td>
                        <td v-if="row?.item?.docStatus === 'ລາຍການຖືກປະຕິເສດ'" style="font-size: 12pt;width: 200px;"
                            class="text-red">
                            <Icon name="simple-line-icons:close" color="red" /> {{ row?.item?.docStatus }}
                        </td>
                        <td v-if="row?.item?.docStatus === 'ລໍຖ້າອະນຸມັດ'" style="font-size: 12pt;" class="text-red">
                            <Icon name="carbon:pending" /> {{ row?.item?.docStatus }}
                        </td>
                        <td>
                            <a v-if="row?.item?.docPathLa !== '' && row?.item?.docPathLa !== null" :href="row?.item?.docPathLa"
                                target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td style="font-size: 12pt;">
                            <a v-if="row?.item?.docPath !== '' && row?.item?.docPath !== null" :href="row?.item?.docPath"
                                target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td v-if="row?.item?.ses_status === 'ເອກະສານໃໝ່'" style="width: 150px;font-weight: bold;">
                            <div style="display: flex;align-items: center;"><img src="../../assets/icons/new.png"
                                    width="30" /> {{ row?.item.ses_status }}</div>
                        </td>
                        <!-- ສ່ວນສະແດງຜົນ ຮ່າງໃໝ່ -->
                        <td v-if="row?.item?.typeDoc === 'ຮ່າງໃໝ່'" style="width: 150px; font-weight: bold;">
                            <div style="display: flex; align-items: center;">
                                <img src="../../assets/icons/new2.png" 
                                     width="30" 
                                     style="animation: pulse-new 1.5s infinite ease-in-out; margin-right: 8px;" /> 
                                <span style="color: #4CAF50;">{{ row?.item.typeDoc }}</span>
                            </div>
                        </td>

                        <!-- ສ່ວນສະແດງຜົນ ປັບປຸງ -->
                        <td v-if="row?.item?.typeDoc === 'ປັບປຸງ'" style="width: 150px; font-weight: bold;">
                            <div style="display: flex; align-items: center;">
                                <img src="../../assets/icons/old.png" 
                                     width="30" 
                                     style="animation: fade-old 2.5s infinite ease-in-out; margin-right: 8px;" /> 
                                <span style="color: #757575;">{{ row?.item.typeDoc }}</span>
                            </div>
                        </td>
                        <td colspan="3">
                            <div style="display: flex;flex-direction: column" class="pa-1">
                                <v-btn
                                    v-if="row?.item?.docStatus === 'ລໍຖ້າອະນຸມັດ' && row?.item?.docStatus !== 'ລາຍການຖືກປະຕິເສດ'"
                                    width="100" @click="onAskBeforeApprove(row?.item?.id)" density="comfortable"
                                    color="#243A7A">
                                    ອະນຸມັດ
                                </v-btn>
                                <div style="height: 5px;"></div>
                                <v-btn
                                    v-if="row?.item?.docStatus === 'ລໍຖ້າອະນຸມັດ' && row?.item?.docStatus !== 'ລາຍການຖືກປະຕິເສດ'"
                                    width="100" class="" @click="onAskBeforeReject(row?.item?.id)" density="comfortable"
                                    color="red">
                                    ປະຕິເສດ
                                </v-btn>
                                <div style="height: 5px;"></div>
                                <v-btn v-if="row?.item?.docStatus === 'ລໍຖ້າອະນຸມັດ'" width="100" class=""
                                    @click="onAskDeleteData(row?.item?.id)" density="comfortable">
                                    <Icon name="mingcute:delete-3-fill" color="red" size="20" /> ລົບອອກ
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                   
                </template>
            </v-data-table>
        </v-card>

        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template>

<style scoped>
/* ອານິເມຊັນຂະຫຍາຍ ແລະ ເຮືອງແສງເບົາໆ ສຳລັບ ຮ່າງໃໝ່ */
@keyframes pulse-new {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 2px rgba(76, 175, 80, 0.4));
  }
  50% {
    transform: scale(1.12);
    filter: drop-shadow(0 0 6px rgba(76, 175, 80, 0.8));
  }
}

/* ອານິເມຊັນຄ່ອຍໆ ແມບ-ຮຸ່ງ ແບບນຸ້ມນວນ ສຳລັບ ປັບປຸງ */
@keyframes fade-old {
  0%, 100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 0.9;
    transform: scale(1);
  }
}
</style>

<script setup lang="ts">
import axios from 'axios';
const api = useRuntimeConfig()
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import alert from '~/components/Alerts/alert-box.vue'
// import { VDataTable } from 'vuetify/labs/VDataTable'
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
const search = ref<string>('')
const headersT = ref<any>([
    { title: 'ລ.ດ', align: 'start', sortable: true, key: 'branchCode' },
    { title: 'ຫົວຂໍ້ເອກະສານ', align: 'start', sortable: true, key: 'subjectName' },
    { title: 'ເລກທີເອກະສານ', align: 'start', sortable: true, key: 'docNo' },
    { title: 'ເອກະສານລົງວັນທີ', align: 'start', sortable: true, key: 'docDate' },
    { title: 'ປະເພດເອກະສານ', align: 'start', sortable: true, key: 'docDescLao' },
    { title: 'ປະເພດ Share', align: 'start', sortable: true, key: 'sharingType' },
    { title: 'ພາກສ່ວນຮັບຜິດຊອບ', align: 'start', sortable: true, key: 'relatedList' },
    // { title: 'ຝ່າຍເຜີຍແຜ່', align: 'start', sortable: true, key: 'related' },
    { title: 'ສະຖານະເອກະສານ', align: 'start', sortable: true, key: 'docStatus' },
    { title: 'PDF(Lao)', align: 'start', sortable: true, key: 'docPathLa' },
    { title: 'PDF(En)', align: 'start', sortable: true, key: 'docPath' },
    { title: 'ສະຖານະ', align: 'start', sortable: true, key: 'ses_status'},
    { title: 'ຮ່າງເອກະສານ', align: 'start', sortable: true, key: 'typeDoc'},
    { title: 'ຈັດການ', align: 'start', sortable: true, key: 'edit' },
])
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

const onAskDeleteData = (key: any) => {
    Swal.fire({
        icon: 'question',
        text: `ທ່ານຕ້ອງການລົບຂໍ້ມູນແທ້ບໍ`,
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ຕົກລົງ',
        cancelButtonText: 'ຍົກເລີກ'
    }).then((result) => {
        if (result.isConfirmed) {
            onDelete(key)
        }
    })
}
const onDelete = async (key: any) => {
    try {
        showLoading.value = true
        var body = {
            deleteId: localStorage.getItem('userId'),
            id: key
        }
        await axios.post(`${api.public.API_URL}/document/DeleteDoc`, body).then((data) => {
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
//************************* */
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