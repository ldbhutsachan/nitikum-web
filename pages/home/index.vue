<template>
    <div>
        <v-card width="1500" class="mx-auto card-shadow" rounded="lg">
            <v-card-text>
                <v-carousel cycle show-arrows="hover" height="400" hide-delimiter-background>

                    <v-carousel-item
                        src="https://static.vecteezy.com/system/resources/previews/026/774/344/non_2x/handbook-and-judge-s-gavel-on-the-wooden-table-free-photo.jpeg"
                        cover></v-carousel-item>

                    <v-carousel-item
                        src="https://static.vecteezy.com/system/resources/previews/027/105/966/non_2x/legal-law-and-justice-concept-open-law-book-with-a-wooden-judges-gavel-in-a-courtroom-or-law-enforcement-office-free-photo.jpg"
                        cover></v-carousel-item>

                    <v-carousel-item
                        src="https://static.vecteezy.com/system/resources/previews/027/105/968/non_2x/legal-law-and-justice-concept-open-law-book-with-a-wooden-judges-gavel-in-a-courtroom-or-law-enforcement-office-free-photo.jpg"
                        cover></v-carousel-item>
                </v-carousel>
                
                <div class="pt-5 pl-5">
                    <span style="font-size: 14pt;font-weight: bold;">ນິຕິກໍາ ທີ່ມີຜົນສັກສິດ
                        ໃນຈົດໝາຍເຫດທາງລັດຖະການ</span><br /><br />
                    (ເພື່ອໃຫ້ມີຜົນສັກສິດ ອີງຕາມ ມາດ​ຕາ 108 ຂອງກົດໝາຍສ້າງນິຕິກໍາ)<br /><br />
                </div>
                <!-- <v-otp-input ></v-otp-input>
                <v-date-picker></v-date-picker> -->
                <v-divider></v-divider>
                <v-table>
                    <thead>
                        <tr style="background-color: #243B7A;">
                            <th class="text-left text-white">
                                ລ/ດ
                            </th>
                            <th class="text-left text-white" style="width: 600px;">
                                ຫົວຂໍ້
                            </th>
                            <th class="text-left text-white" style="width: 400px;">
                                ພາກສ່ວນຮັບຜິດຊອບ
                            </th>
                            <th class="text-left text-white" style="width: 400px;">
                                ປະເພດການເຜີຍເເຜ່
                            </th>
                            <th class="text-left text-white">
                                ເລກທີເອກະສານ
                            </th>
                            <th class="text-left text-white">
                                ວັນທີລົງ
                            </th>
                            <th class="text-left text-white">
                                ວັນທີເຜີຍແຜ່
                            </th>
                            <th class="text-left text-white" style="width: 300px;">
                                ປະເພດເອກະສານ
                            </th>
                            <th class="text-left text-white">
                                ສະຖານະ
                            </th>
                            <th class="text-left text-white">
                                ເນື້ອໃນ
                            </th>
                            <th class="text-left text-white">
                                PDF-LAO
                            </th>
                            <th class="text-left text-white">
                                PDF-ENG
                            </th>
                     

                        </tr>
                    </thead>

                    <tr style="background-color: #fff;">
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left pl-0 pt-4" style="width: 200px;">
                            <v-text-field placeholder="ຫົວຂໍ້" v-model="formGetBySub.subjectName" @input="onGetDocBySubj"
                                variant="outlined" density="compact"></v-text-field>
                        </th>
                        <th class="text-left  pl-4 pt-4">
                            <!-- <v-select :items="sectiontList" v-model="formGetS.secCode" @update:model-value="onGetDocBySec"
                                label="ເລືອກລາຍການ" item-title="brNameLa" item-value="branchCode" variant="outlined"
                                density="compact"></v-select> -->
                                <v-select :items="sectiontList" v-model="formGetS.secCode" @update:model-value="onGetDocBySec"
                                label="ເລືອກລາຍການ" item-title="brNameLa" item-value="brNameLa" variant="outlined"
                                density="compact"></v-select>
                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left pl-4 pt-4" style="width: 200px;">
                            <v-select :items="docTypeList" v-model="formGetType.docType"
                                @update:model-value="onGetDocByType" label="ເລືອກປະເພດ" variant="outlined" density="compact"
                                item-title="docDescLao" item-value="docType"></v-select>
                        </th>
                        <th class="text-left text-white pl-4">
                            <v-btn @click="onGetDocInfo" style="margin-top: -8px;" rounded color="#243A7A" height="43"
                                class="card-shadow">
                                <Icon name="tabler:refresh" size="30" />
                            </v-btn>
                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                    </tr>
                    <tbody>
                        <tr v-for="(item, index) in shareDocData" :key="index"
                            :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', }"
                            @mouseover="active = index.toString()" @mouseleave="active = ''">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.subjectName }}</td>
                            <td>{{ item.related_Name }}</td>
                            <td>{{ item.sharingType }}</td>
                            <td>{{ item.docNo }}</td>
                            <td>{{ item.docDate }}</td>
                            <td>{{ item.approveDate }}</td>
                            <td>{{ item.docDescLao }}</td>
                            <td>{{ item.docStatus }}</td>
                            <td><v-btn @click="onGetDetailDataForShow(
                                item.subjectName, item.docDescLao, item.depDescLAO, item.createBy, item.approveDate, item.docDate
                            )" density="comfortable" variant="text" style="color: #243A7A;font-weight: bold;">
                                    <!-- <Icon name="icon-park-outline:view-grid-detail" /> -->
                                    ເບິ່ງ
                                </v-btn></td>
                            <td>
                                <a v-if="item?.docPathLa !== '' && item?.docPathLa !== null"
                                    :href="item?.docPathLa ? item?.docPathLa : ''" target="_blank">
                                    <v-btn elevation="0" variant="text">
                                        <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                    </v-btn>
                                </a>
                            </td>
                            <td style="font-size: 12pt;">
                                <a v-if="item?.docPath !== '' && item?.docPath !== null"
                                    :href="item?.docPath ? item?.docPath : ''" target="_blank">
                                    <v-btn elevation="0" variant="text">
                                        <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                    </v-btn>
                                </a>
                            </td>
                            <!-- <td>
                                <v-btn 
                                class="ml-2" @click="onAskDeleteData(item?.id)" density="comfortable">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" /> ລົບອອກ
                            </v-btn>
                            </td> -->
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
        <loading v-model="showLoading" />
        <v-dialog v-model="diaLogDetail" max-width="600" persistent>
            <v-card class="pa-10">
                <v-card-title class="font-weight-bold">ນິຕິກຳ</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <span><span class="font-weight-bold">ຫົວຂໍ້:</span> {{ title }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ປະເພດນິຕິກຳ:</span> {{ titleType }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ອອກໂດຍ:</span> {{ by }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ພາກສ່ວນຮັບຜິດຊອບ:</span> {{ reposity }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ວັນທີນິຕິກຳ:</span> {{ dateCreate }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ວັນທີເຜີຍແຜ່:</span> {{ dataPublie }}</span>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pt-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="diaLogDetail = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
// definePageMeta({
//     // middleware: 'auth'
// })
import {VOtpInput} from 'vuetify/labs/VOtpInput'
import {VDatePicker} from 'vuetify/labs/VDatePicker'
const api = useRuntimeConfig()
import axios from 'axios';
import loading from '~/components/loading/loading.vue'
const showLoading = ref<boolean>(false)
const shareDocData: any = ref([])
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')


import { useManageState } from '~/stores/manage-state'
import Swal from 'sweetalert2';
const manageState = useManageState()
const active = ref<string>('')
const selectedDate = ref<any>(null)
// detail state
const title = ref<string>('')
const titleType = ref<string>('')
const by = ref<string>('')
const reposity = ref<string>('')
const dateCreate = ref<string>('')
const dataPublie = ref<string>('')
const onGetDetailDataForShow = (subjectName: any, docDescLao: any, depDescLAO: any, createBy: any, approveDate: any, docDate: any) => {
    title.value = subjectName
    titleType.value = docDescLao
    by.value = createBy
    reposity.value = depDescLAO
    dateCreate.value = approveDate
    dataPublie.value = docDate
    diaLogDetail.value = true
}
const diaLogDetail = ref<boolean>(false)

async function onGetDocInfo() {
    showLoading.value = true
    try {
        var body = {
            markerId: localStorage.getItem('userId')
        }
        await axios.post(`${api.public.API_URL}/Share/getShareDocument`, body).then((data) => {
            console.log("resp===", data?.data?.resData)
            shareDocData.value = data.data.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }

}
const { setSectionList, setDocumentTypeList } = manageState
const sectiontList = computed(() => { return manageState.sectionList })
const docTypeList = computed(() => { return manageState.documentTypeList })

const onGetSectionList = async () => {
    try {
        var body = {
            secCode: ''
        }
        await axios.post(`${api.public.API_URL}/Branch/getBranchList`, body).then((data) => {
            setSectionList(data?.data?.resData)
        })
    } catch (error) {
        console.log(error)
    }

}
const onGetDocType = async () => {
    try {
        var body = {
            docType: ''
        }
        await axios.post(`${api.public.API_URL}/DocumentType/getDocumentType`, body).then((data) => {
            setDocumentTypeList(data?.data?.resData)
        })
    } catch (error) {
        console.log(error)
    }
}
const formGetBySub: any = ref({ subjectName: '', markerId: '' })
const onGetDocBySubj = async () => {
    formGetBySub.value.markerId = localStorage.getItem('userId')
    showLoading.value = true
    try {
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentSubject`, formGetBySub.value).then((data) => {
            shareDocData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}
const formGetS: any = ref({ secCode: '', markerId: '' })
const onGetDocBySec = async () => {
    showLoading.value = true
    try {
        formGetS.value.markerId = localStorage.getItem('userId')
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentKanang`, formGetS.value).then((data) => {
            shareDocData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
        showLoading.value = false
    }
}
//SHOW  DATA 

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
            readBy: localStorage.getItem('userId'),
            id: key
        }
        await axios.post(`${api.public.API_URL}/Share/ReadyDoc`, body).then((data) => {
            if (data?.data.message?.resCode === '00') {
                showLoading.value = false
                showAlert.value = true
                iconType.value = 'success'
                messageAlert.value = data?.data?.message?.resMgs
                onGetDocInfo()
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
const formGetType: any = ref({ docType: '', markerId: '' })
const onGetDocByType = async () => {
    showLoading.value = true
    try {
        formGetType.value.markerId = localStorage.getItem('userId')
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentDoctype`, formGetType.value).then((data) => {
            shareDocData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}
onMounted(() => {
    onGetDocInfo()
    onGetSectionList()
    onGetDocType()
})
</script>
