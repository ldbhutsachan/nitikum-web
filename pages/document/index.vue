<template>
    <div>
        <v-card width="1500" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນເອກະສານ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ 10
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
                        <td style="height: 10;">{{ item?.subjectName }}</td>
                        <td style="font-size: 12pt;">{{ item?.docNo }} </td>
                        <td style="font-size: 12pt;">{{ item?.docDate }}</td>
                        <td style="font-size: 12pt;">{{ item?.docDescLao }}</td>
                        <!-- <td style="font-size: 12pt;">{{  }}</td>
                        <td style="font-size: 12pt;">{{  }}</td>
                        <td style="font-size: 12pt;">{{  }}</td> -->
                        <td style="font-size: 12pt;">{{ item?.sharingType }}</td>
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
                        <td style="font-size: 12pt;" class="text-red">{{ item?.docStatus }}</td>
                        <td>

                            <v-btn density="comfortable" variant="text" v-if="item?.docStatus !== 'ອະນຸມັດເເລ້ວ'">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
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
        <v-dialog max-width="1000" v-model="showDialogAdd" >
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
                            <v-select v-model="formAdd.sharingType" label="ເລືອກປະເພດ share" hide-details="auto"
                                :items="shareTypeItems" item-title="title" item-value="value"></v-select>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select v-model="branchCode" label="ເອກະສານຕິດພັນກັບສາຂາ" hide-details="auto"
                                :items="branchList" item-title="brNameLa" item-value="branchCode"></v-select>

                        </v-col>
                        <!-- <v-col cols="12" md="6" sm="4">
                            <v-select v-model="sectionCode" label="ເອກະສານຕິດພັນກັບຂະແໜງ" hide-details="auto"
                                :items="departmentList" item-title="secDescLao" item-value="secCode"></v-select>
                        </v-col> -->
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-select multiple chips v-model="userShareList" label="ເອກະສານຕິດພັນກັບໃຜ" hide-details="auto"
                                :items="userList" item-title="userName" item-value="userId"></v-select>
                            <!-- <v-btn @click="showDialogChoose = true" color="#f6f6f6" block elevation="1"
                                height="55">ເລືອກເອກະສານຕິດພັນກັບໃຜ</v-btn> -->
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
        <v-dialog v-model="showDialogChoose" max-width="500" persistent>
            <v-card>
                <v-card-title>ເລືອກເອກະສານຕິດພັນກັບໃຜ</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="d-flex pb-2">
                        <input type="checkbox" @change="onPushAll" style="height: 25px;width: 25px;" />
                        <span style="margin-left: 15px;">ເລືອກທັງໝົດ</span>
                    </div>
                    <v-divider></v-divider>
                    <div v-for="(item, index) in userList"
                        style="height: 40px;display: flex;justify-content: start;align-items: center;border-bottom: 1px solid #f6f6f6;"
                        :key="index">
                        <input type="checkbox" @change="onPushSingleItem(item?.check, index)"
                            :checked="item?.check === 'true' ? true : false" style="height: 25px;width: 25px;" />
                        <span style="margin-left: 15px;">{{ item?.userName }}</span>
                    </div>
                </v-card-text>
                <v-card-actions>
                    {{ userList }}
                    ===================
                    {{ userChoosen }}
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogChoose = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn color="#243B7A" variant="outlined">ຕົກລົງ</v-btn>
                </v-card-actions>
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
const fileEn: any = ref()
const fileLa: any = ref()
const showDialogChoose = ref<boolean>(false)
const userShareList: any = ref([])
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
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(10)
const countPage = ref<number>(0)
const active = ref<string>('')
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
const formGetDoc = ref({
    markerId: ''
})
//function
const onPushAll = () => {
    // userChoosen.value = []
    if (userList.value.length !== userChoosen.value.length) {
        for (let i: number = 0; i < userList.value.length; i++) {
            userList.value[i].check = 'true'
        }
        userChoosen.value = userList.value.map((list: any) => {
            return list?.userId
        })
    } else {
        for (let i: number = 0; i < userList.value.length; i++) {
            userList.value[i].check = 'false'
        }
        userChoosen.value = []
    }
}
const onPushSingleItem = (item: any, index: any) => {
    // console.log(userChoosen.value.includes(0))
    // const checkA = userChoosen.value.includes(item)
    // console.log(checkA)
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
            const push = { 'check': 'false' }
            userList.value = res?.map((list: any) => {
                return { ...list, ...push }
            })
            // userList.value = res
        });
    } catch (error) {
        console.log(error)
    }
}
const onSaveDoc = async () => {
    showLoading.value = true
    const userId = useCookie('userId')
    formAdd.value.filesEn = fileEn.value[0]
    formAdd.value.filesLao = fileLa.value[0]
    formAdd.value.related = branchCode.value
    formAdd.value.deptCode = sectionCode.value
    formAdd.value.markerId = userId.value ? userId.value : ''
    const formData = new FormData()
    formData.append('filesEn', formAdd.value.filesEn)
    formData.append('filesLao', formAdd.value.filesLao)
    formData.append('docNo', formAdd.value.docNo)
    formData.append('subjectName', formAdd.value.subjectName)
    formData.append('docDate', formAdd.value.docDate)
    formData.append('docType', formAdd.value.docType)
    formData.append('related', formAdd.value.related)
    formData.append('deptCode', formAdd.value.deptCode)
    formData.append('shareUserById', userShareList.value.join())
    formData.append('markerId', formAdd.value.markerId)
    formData.append('sharingType', formAdd.value.sharingType)
    formData.append('details', formAdd.value.details)
    await axios.post(`http://10.0.10.49:9001/financial/iadoc/v1/prod/doc/Document/SaveDoc`, formData).then((data) => {
        if (data?.data?.message?.resCode === '00') {
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
const onGetInfo = async () => {
    const userId = useCookie('userId')
    if (documentList.value.length === 0) {
        showLoading.value = true
    }
    formGetDoc.value.markerId = userId.value ? userId.value : ''
    const { data } = await useServer('document/get-audit', {
        method: 'POST',
        body: JSON.stringify(formGetDoc.value)
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
if (process.server) {
    await onGetInfo()
}
watch(userShareList, () => {
    const indexItems = userShareList.value.length - 1
    console.log(userShareList.value[indexItems])
})
watch(branchCode, () => {
    onGetDeptMent(branchCode.value)
})
watch(sectionCode, () => {
    onGetUser(sectionCode.value)
})
watch(page, () => {
    startPage.value = (page.value - 1) * 10
    endPage.value = page.value * 10
})
onMounted(() => {
    onGetDocType()
    onGetBranchList()
    onGetInfo()
})
</script>