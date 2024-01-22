<template>
    <div>
        <v-card width="1500" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn variant="outlined" @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນເອກະສານ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ documentList?.length
            }})</span>
        </v-card>

        <v-card width="1500" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A;">
                        <th class="text-center text-white">
                            ລ/ດ
                        </th>
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
                            ພາກສ່ວນຮັບຜິດຊອບ
                        </th>
                        <th class="text-left text-white">
                            PDF(LAO)
                        </th>
                        <th class="text-left text-white">
                            PDF(EN)
                        </th>
                        <th class="text-left text-white">
                            ສະຖານະ
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
                        <td class="text-center">{{ index+1 }}</td>
                        <td style="height: 10;">{{ item?.subjectName }}</td>
                        <td style="font-size: 12pt;">{{ item?.docNo }} </td>
                        <td style="font-size: 12pt;">{{ item?.docDate }}</td>
                        <td style="font-size: 12pt;">{{ item?.docDescLao }}</td>
                        <td style="font-size: 12pt;">{{ item?.sharingType }}</td>
                        <td style="font-size: 12pt;">{{ item?.related_Name }}</td>
                        <td>
                            <a v-if="item?.docPathLa !== null && item?.docPathLa !== ''" :href="item?.docPathLa"
                                target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td style="font-size: 12pt;">
                            <a v-if="item?.docPath !== null && item?.docPath !== ''" :href="item?.docPath" target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td style="font-size: 12pt;" class="text-green" v-if="item?.docStatus === 'ອະນຸມັດເເລ້ວ'">
                            <v-btn color="green" density="compact" class="card-shadow">
                                <Icon name="simple-line-icons:check" color="white" /> {{ item?.docStatus }}
                            </v-btn>
                        </td>
                        <td style="font-size: 12pt;" class="text-green" v-if="item?.docStatus === 'ລາຍການຖືກປະຕິເສດ'">
                            <v-btn color="green" density="compact" class="card-shadow">
                                <Icon name="simple-line-icons:close" color="red" /> {{ item?.docStatus }}
                            </v-btn>
                        </td>
                        <td style="font-size: 12pt;" class="text-green" v-if="item?.docStatus === 'ລໍຖ້າອະນຸມັດ'">
                            <v-btn color="green" density="compact" class="card-shadow">
                                <Icon name="carbon:pending" />{{ item?.docStatus }}
                            </v-btn>
                        </td>
                        <!-- <td style="font-size: 12pt;" class="text-red" v-else>
                            <v-btn color="red" density="compact">{{ item?.docStatus }}</v-btn>
                        </td> -->
                        <td>
                            <v-btn 
                                class="ml-2" @click="onAskDeleteData(item?.id)" density="comfortable">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" /> ລົບອອກ
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="d-flex" style="padding-left: 200px;padding-right: 200px;">
                <div style="width: 100%">
                    <v-pagination v-model="page" :length="countPage" rounded="circle"></v-pagination>
                </div>
            </div>
        </v-card>
        <v-dialog max-width="1000" v-model="showDialogAdd">
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນເອກະສານ</v-card-title>
                <v-divider></v-divider>
                <v-form @submit.prevent>
                    <v-card-text class="pt-8">
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field v-model="formAdd.subjectName" label="ຫົວຂໍ້ເອກະສານ"
                                    hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field v-model="formAdd.docNo" label="ເລກທີເອກະສານ"
                                    hide-details="auto"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field type="date" v-model="formAdd.docDate" label="ເອກະສານລົງວັນທີ"
                                    hide-details="auto"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="formAdd.docType" label="ເລືອກປະເພດເອກະສານ" hide-details="auto"
                                    :items="docTypeList" item-title="docDescLao" item-value="docType"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດເອກະສານ']"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="formAdd.sharingType" label="ເລືອກປະເພດການ Share" hide-details="auto"
                                    :items="shareTypeItems" item-title="title" item-value="value"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດການ Share']"></v-select>
                            </v-col>
                            <v-col cols="12" md="6" sm="4" v-if="formAdd.sharingType === 'V'">
                                <v-select multiple chips v-model="formAdd.related" label="ເລືອກຝ່າຍທີຕ້ອງການເພີຍເເຜ່"
                                    hide-details="auto" :items="branchList" item-title="brNameLa" item-value="branchCode"
                                    @update:model-value="onGetDeptMent"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4" >
                                <v-select multiple chips v-model="formAdd.related_No" label="ເລືອກພາກສ່ວນຮັບຜິດຊອບ" style="color: crimson;"
                                    hide-details="auto" :items="branchList" item-title="brNameLa" item-value="branchCode"
                                    @update:model-value="onGetDeptMent"></v-select>
                            </v-col>
                        </v-row>
                        <!-- <v-row>
                            <v-col cols="12" md="6" sm="4"
                                v-if="formAdd.sharingType === 'S' || formAdd.sharingType === 'V'">
                                <v-select multiple chips v-model="formAdd.deptCode" label="ເອກະສານຕິດພັນກັບຝ່າຍ"
                                    hide-details="auto" :items="departmentList" item-title="secDescLao" item-value="secCode"
                                    @update:model-value="onGetUser"></v-select>
                            </v-col>
                            <v-col cols="12" md="6" sm="4" v-if="formAdd.sharingType === 'V'">
                                <v-select multiple chips v-model="formAdd.shareUserById" label="ເອກະສານຕິດພັນກັບໃຜ"
                                    hide-details="auto" :items="userList" item-title="userName"
                                    item-value="userId"></v-select>
                            </v-col>
                        </v-row> -->
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-file-input v-model="fileLa" label="ໄຟເອກະສານ(ລາວ)" hide-details="auto"></v-file-input>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-file-input v-model="fileEn" label="ໄຟເອກະສານ(ອັງກິດ)" hide-details="auto"></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea v-model="formAdd.details" label="ລາຍລະອຽດ" hide-details="auto"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <div class="d-flex pa-4">
                        <v-spacer></v-spacer>
                        <v-btn @click="showDialogAdd = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                        <v-btn type="sumit" @click="onSaveDoc" color="#243B7A">ບັນທຶກ</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>

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
// alert
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
//global state
import { useManageState } from '~/stores/manage-state'
import Swal from 'sweetalert2';
const manageState = useManageState()
const { setDocumentTypeList, setBranchList, setDeparmentList, setDocumentList } = manageState
const docTypeList = computed(() => { return manageState.documentTypeList })
const branchList = computed(() => { return manageState.branchList })
const departmentList = computed(() => { return manageState.departmentList })
const documentList = computed(() => { return manageState.documentList })
// state
const userChoosen = ref([])
const userList: any = ref([])
const branchCode = ref<string>('')
const sectionCode = ref<string>('')
const fileEn: any = ref('')
const fileLa: any = ref('')
const showDialogChoose = ref<boolean>(false)
const userShareList: any = ref([])
const shareTypeItems: any = ref([
    {
        title: 'Normal-ອະນຸຍາດໃຫ້ທຸກຄົນເຫັນຂໍ້ມູນ',
        value: 'N'
    },
    // {
    //     title: 'Section-ອະນຸຍາດໃຫ້ຂະເເໜ່ງຂອງຕົນເອງ ແລະ ຄະນະຝ່າຍ',
    //     value: 'S'
    // },
    {
        title: 'Special-ອະນຸຍາດໃຫ້ສະເພາະບຸກຄົນ',
        value: 'V'
    },
    // {
    //     title: 'Private-ເອກະສານສ່ວນຕົວ',
    //     value: 'P'
    // },
])
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(20)
const countPage = ref<number>(0)
const active = ref<string>('')
//form data
const formAdd: any = ref({
    subjectName: '',
    docNo: '',
    docDate: '',
    docType: '',
    related: [],
    deptCode: [],
    shareUserById: [],
    markerId: '',
    sharingType: '',
    docStatus: '',
    details: '',
    filesEn: '',
    filesLao: '',
    related_No: [],
    related_Name:[],
})
const formGetDoc: any = ref({
    markerId: ''
})
//function

const onGetDocType = async () => {
    if (docTypeList.value.length === 0) {
        let data = { secCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/DocumentType/getDocumentType`, data).then((data) => {
                setDocumentTypeList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
const onGetBranchList = async () => {
    if (branchList.value.length === 0) {
        let data = { branchCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/Branch/getComboxBranch`, data).then((data) => {
                setBranchList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
const onGetDeptMent = async () => {
    let data = {
        branchCode: formAdd.value.related
    }
    try {
        await axios.post(`${api.public.API_URL}/Section/getComboxSections`, data).then((data) => {
            setDeparmentList(data?.data?.resData)
        });
    } catch (error) {
        console.log(error)
    }
}
const onGetUser = async () => {
    let data = {
        secCode: formAdd.value.deptCode
    }
    try {
        await axios.post(`${api.public.API_URL}/User/getComboxUser`, data).then((data) => {
            const res: any = data?.data?.resData
            userList.value = res
        });
    } catch (error) {
        console.log(error)
    }
}
const onSaveDoc = async () => {
    if (formAdd.value.sharingType === '' || formAdd.value.docType === '') return
    // return
    const formData = new FormData()
    showLoading.value = true
    // const userId = useCookie('userId')
    const userId = localStorage.getItem('userId')

    // console.log(fileEn.value)
    if (fileEn.value !== '') {
        formData.append('filesEn', fileEn.value[0])
        console.log('end pdf')
    } else {
        formData.append('filesEn', '')
        console.log('no end')
    }
    if (fileLa.value !== '') {
        formData.append('filesLao', fileLa.value[0])
        console.log('lao pdf')
    } else {
        formData.append('filesLao', '')
        console.log('no lao')
    }
    formAdd.value.markerId = userId ? userId : ''
    // formData.append('filesEn', formAdd.value.filesEn)
    // formData.append('filesLao', formAdd.value.filesLao)
    formData.append('docNo', formAdd.value.docNo)
    formData.append('subjectName', formAdd.value.subjectName)
    formData.append('docDate', formAdd.value.docDate)
    formData.append('docType', formAdd.value.docType)
    formData.append('related', formAdd.value.related)
    formData.append('deptCode', formAdd.value.deptCode)
    formData.append('shareUserById', formAdd.value.shareUserById)
    formData.append('markerId', formAdd.value.markerId)
    formData.append('sharingType', formAdd.value.sharingType)
    formData.append('details', formAdd.value.details)
    formData.append('related_No',formAdd.value.related_No)
    formData.append('related_Name', formAdd.value.related_No)

    await axios.post(`${api.public.API_URL}/Document/SaveDoc`, formData).then((data) => {
        if (data?.data?.message?.resCode === '00') {
            formAdd.value.subjectName = ''
            formAdd.value.docNo = ''
            formAdd.value.docDate = ''
            formAdd.value.docType = ''
            formAdd.value.related = []
            formAdd.value.deptCode = []
            formAdd.value.shareUserById = []
            formAdd.value.sharingType = ''
            formAdd.value.details = ''
            formAdd.value.filesEn = ''
            formAdd.value.filesLao = ''
            formAdd.value.related_No = []
            formAdd.value.related_Name = []
            onGetInfo()
            showLoading.value = false
            showAlert.value = true
            iconType.value = 'success'
            messageAlert.value = data?.data?.message?.resMgs
        } else {
            showLoading.value = false
            showAlert.value = true
            iconType.value = 'error'
            messageAlert.value = data?.data?.message?.resMgs
        }
    })
}
//delete data

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
const locals = ref<any>('')
const onGetUserInfo = () => {
    locals.value = localStorage.getItem('userId')
}
const onGetInfo = async () => {

    if (documentList.value.length === 0) {
        showLoading.value = true
    }
    try {
        var body = {
            markerId: localStorage.getItem('userId')
        }
        await axios.post(`${api.public.API_URL}/Audit/getWaitListCheckByUser`, body).then((data) => {
            const count: any = data?.data?.resData
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
    showLoading.value = false
}


watch(page, () => {
    startPage.value = (page.value - 1) * 20
    endPage.value = page.value * 20
})
onMounted(() => {
    onGetDocType()
    onGetBranchList()
    onGetInfo()
    onGetUserInfo()
})
</script>