<template>
    <div>
        <v-card width="1200" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນເອກະສານ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ 10
            }})</span>
        </v-card>
        <v-dialog max-width="1000" v-model="showDialogAdd" persistent>
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນເອກະສານ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-text-field v-model="formAdd.subjectName" label="ຫົວຂໍ້ເອກະສານ"
                                hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-text-field v-model="formAdd.docNo" label="ເລກທີເອກະສານ" hide-details="auto"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-text-field type="date" v-model="formAdd.docDate" label="ເອກະສານລົງວັນທີ"
                                hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select v-model="formAdd.docType" label="ເລືອກປະເພດເອກະສານ" hide-details="auto"
                                :items="docTypeList" item-title="docDescLao" item-value="docType"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-select v-model="branchCode" label="ເອກະສານຕິດພັນກັບສາຂາ" hide-details="auto"
                                :items="branchList" item-title="brNameLa" item-value="branchCode"></v-select>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select v-model="sectionCode" label="ເອກະສານຕິດພັນກັບຂະແໜງ" hide-details="auto"
                                :items="departmentList" item-title="secDescLao" item-value="secCode"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-select multiple chips v-model="userShareList" label="ເອກະສານຕິດພັນກັບໃຜ"
                                hide-details="auto" :items="userList" item-title="userName" item-value="userId" ></v-select>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select v-model="formAdd.sharingType" label="ເລືອກປະເພດ share" hide-details="auto"
                                :items="shareTypeItems" item-title="title" item-value="value"></v-select>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-file-input v-model="fileEn" label="ໄຟເອກະສານ(ລາວ)" hide-details="auto"></v-file-input>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-file-input v-model="fileLa" label="ໄຟເອກະສານ(ອັງກິດ)" hide-details="auto"></v-file-input>
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
                    <v-btn @click="onSaveDoc" color="#243B7A">ບັນທຶກ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
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
//global state
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setDocumentTypeList, setBranchList, setDeparmentList } = manageState
const docTypeList = computed(() => { return manageState.documentTypeList })
const branchList = computed(() => { return manageState.branchList })
const departmentList = computed(() => { return manageState.departmentList })
const userList: any = ref([])
const branchCode = ref<string>('')
const sectionCode = ref<string>('')
const fileEn: any = ref()
const fileLa: any = ref()
const userShareList:any = ref(['AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA','AAAAAAAAAAA'])
const shareTypeItems: any = ref([
    {
        title: 'Normal-ອະນຸຍາດໃຫ້ທຸກຄົນເຫັນຂໍ້ມູນ',
        value: 'N'
    },
    {
        title: 'Section-ອະນຸຍາດໃຫ້ຂະເເໜ່ງຂອງຕົນເອງ ແລະ ຄະນະຝ່າຍ',
        value: 'S'
    },
    {
        title: 'Sepecial-ອະນຸຍາດໃຫ້ສະເພາະບຸກຄົນ',
        value: 'V'
    },
    {
        title: 'Private-ເອກະສານສ່ວນຕົວ',
        value: 'P'
    },
])
//form data
const formAdd = ref({
    subjectName: '',
    docNo: '',
    docDate: '',
    docType: '',
    related: '',
    deptCode: '',
    shareUserById: [],
    markerId: '',
    sharingType: '',
    docStatus: '',
    details: '',
    filesEn: '',
    filesLao: ''
})
//function
const chooseUser = (id:any) =>{
    console.log(id)
}
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
const onGetDeptMent = async (id: any) => {
    let data = {
        branchCode: id
    }
    try {
        await axios.post(`${api.public.API_URL}/Section/getComboxSections`, data).then((data) => {
            setDeparmentList(data?.data?.resData)
        });
    } catch (error) {
        console.log(error)
    }
}
const onGetUser = async (id: any) => {
    let data = {
        secCode: id
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
    const copy = formAdd.value.shareUserById?.join(',')
    const userId = useCookie('userId')
    formAdd.value.filesEn = fileEn.value[0]
    formAdd.value.filesLao = fileLa.value[0]
    formAdd.value.related = branchCode.value
    formAdd.value.deptCode = sectionCode.value
    formAdd.value.markerId = userId.value ? userId.value : ''
    // console.log(formAdd.value)
    const formData = new FormData()
    formData.append('filesEn', formAdd.value.filesEn)
    formData.append('filesLao', formAdd.value.filesLao)
    formData.append('docNo', formAdd.value.docNo)
    formData.append('subjectName', formAdd.value.subjectName)
    formData.append('docDate', formAdd.value.docDate)
    formData.append('docType', formAdd.value.docType)
    formData.append('related', formAdd.value.related)
    formData.append('deptCode', formAdd.value.deptCode)
    formData.append('shareUserById', copy)
    formData.append('markerId', formAdd.value.markerId)
    formData.append('sharingType', formAdd.value.sharingType)
    formData.append('details', formAdd.value.details)
    console.log("=-=--", formData)
    await axios.post(`${api.public.API_URL}/Document/SaveDoc`, formData).then((data) => {

    })
    // showLoading.value = true
    // const { data } = await useServer('document/create', {
    //     method: 'POST',
    //     body: JSON.stringify(formData)
    // })
    // const res: any = data.value
    // if (res?.message?.resCode === '00') {
    //     showLoading.value = false
    //     showSuccess.value = true
    // } else {
    //     console.log(res)
    //     showLoading.value = false
    //     showDialogAdd.value = false
    //     swal.fire({
    //         icon: 'error',
    //         text: res?.message?.resMgs
    //     })
    // }
}
watch(userShareList, () => {
    const indexItems = userShareList.value.length - 1
    // console.log(userShareList.value)
    // console.log(indexItems)
    console.log(userShareList.value[indexItems])
})
watch(branchCode, () => {
    onGetDeptMent(branchCode.value)
})
watch(sectionCode, () => {
    onGetUser(sectionCode.value)
})
onMounted(() => {
    onGetDocType()
    onGetBranchList()
    // onGetDeptMent()
})
</script>