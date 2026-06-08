<template>
    <div>
        <v-card max-width="1500" elevation="0" class="mx-auto rounded-lg d-flex align-center">
            <v-card-text class="pt-4">
                <v-label>ຄົ້ນຫາຂໍ້ມູນ</v-label>
                <br><br>
                <div class="d-flex align-center" style="width: 100%;" >
                    
                    <div style="width: 100%;">
                        <div class="d-flex align-center w-100">
                            <v-select v-model="docNo" :items="docTypeItems" label="ເລືອກປະເພດເອກະສານ" item-title="docDescLao"
                            item-value="docType" hide-details="auto"  density="compact" variant="outlined">
                        </v-select>
                        
                        </div>
                    </div>
                    <div style="width: 100%;" class="pl-2">
                        <div class="d-flex align-center w-100">
                            <v-select v-model="schDept" :items="branchList" label="ເລືອກຝ່າຍ" item-title="brNameLa"
                            item-value="branchCode" hide-details="auto"  density="compact" variant="outlined">
                        </v-select>
                        
                        </div>
                    </div>
                    <div style="width: 100%;" class="d-flex align-center pl-2">
                        <v-select label="ສະຖານະເອກະສານ" v-model="docStatusSelected" :items="docStatusItems" item-title="title" item-value="value" hide-details="auto"  density="compact" variant="outlined"></v-select>

                        <v-btn @click="onGetInfo" hide-details="auto" height="39"
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"><v-icon
                                size="30">mdi-magnify</v-icon></v-btn>
                        
                    </div>
                    <div class="pl-2" style="width: 100%;">
                        <div class="d-flex align-center">
                            <v-text-field label="ປ້ອນເນື້ອໃນ" v-model="schName" hide-details="auto"  density="compact" variant="outlined"></v-text-field>
                            <v-btn @click="onGetInfoByText" hide-details="auto" height="39"
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"><v-icon
                                size="30">mdi-magnify</v-icon></v-btn>
                        </div>
                    </div>
                </div>
                
                <div style="height: 15px;"></div>
                <v-btn @click="downloadExcel" rounded
                    style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"
                    class="card-shadow">
                    <Icon name="line-md:downloading-loop" size="24" /> ດາວໂຫລດ Excel
                </v-btn>
                <span class="ml-6" style="font-size: 14pt;font-weight: bold;">ທັງໝົດ: <span class="text-orange font-weight-bold" style="font-size: 14pt;">[ {{ totalPrice }} ]</span> ສະບັບ</span>
            </v-card-text>
        </v-card>

    </div>
    <div class="pt-5">
        <v-card max-width="1500" class="mx-auto">
            <div v-for="(data, index) in documentList" :key="index">
                <v-table id="export-excel">
                    <thead v-if="index === 0">
                        <tr class="bgg">
                            <th class="text-center text-white">
                                ລ.ດ
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
                            <th class="text-left " style="color: #f0f0f0;">
                                ສະຖານະ
                            </th>
                             <th class="text-left " style="color: #f0f0f0;">
                                ຮ່າງເອກະສານ
                            </th>
                            <th class="text-left text-white">
                                PDF(LAO)
                            </th>
                            <th class="text-left text-white">
                                PDF(EN)
                            </th>
                        </tr>
                        <tr style="background-color: #f0f0f0;">
                            <th class="text-center " style="color: #243A7A;">
                                <div style="width: 150px;">
                                    {{ data?.related_Name }} <h4 class="text-orange" style="font-size: 14pt;">[ {{ data?.details?.length }} ສະບັບ ]</h4>
                                </div>
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ຫົວຂໍ້ເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ເລກທີເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ລົງວັນທີ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ປະເພດເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ປະເພດ Share
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ສະຖານະ
                            </th>
                             <th class="text-left " style="color: #f0f0f0;">
                                ຮ່າງເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                PDF(LAO)
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                PDF(EN)
                            </th>
                        </tr>
                    </thead>
                    <thead v-else>
                        <tr class="bgg">
                            <th class="text-center ">
                                <div style="width: 150px;color: white;">
                                    {{ data?.related_Name }} <h4 class="text-orange font-weight-bold" style="font-size: 14pt;">[ {{ data?.details?.length }} ສະບັບ ]</h4>
                                </div>
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ຫົວຂໍ້ເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ເລກທີເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ລົງວັນທີ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ປະເພດເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ປະເພດ Share
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ສະຖານະ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                ຮ່າງເອກະສານ
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                PDF(LAO)
                            </th>
                            <th class="text-left " style="color: #f0f0f0;">
                                PDF(EN)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data?.details" :key="index" style="font-size: 10pt;">
                            <td class="text-center">{{ index + 1 }}</td>
                            <td style="height: 10;">{{ item?.subjectName }}</td>
                            <td>{{ item?.docNo }} </td>
                            <td>{{ item?.docDate }}</td>
                            <td>{{ item?.docDescLao }}</td>
                            <td>{{ item?.sharingType }}</td>
                            <td v-if="item?.docStatus === 'N'" style="width: 150px;font-weight: bold;">
                                <div style="display: flex;align-items: center;"><img src="../../assets/icons/new.png"
                                        width="30" /> ເອກະສານໃໝ່</div>
                            </td>
                            <td v-if="item?.docStatus === 'O'" style="width: 150px;font-weight: bold;">
                                <div style="display: flex;align-items: center;"> ເອກະສານເກົ່າ</div>
                            </td>
                             <!-- ສ່ວນສະແດງຜົນ ຮ່າງໃໝ່ -->
                            <td v-if="item?.typeDoc === 'ຮ່າງໃໝ່'" style="width: 150px; font-weight: bold;">
                                <div style="display: flex; align-items: center;">
                                    <img src="../../assets/icons/new2.png" 
                                         width="30" 
                                         style="animation: pulse-new 1.5s infinite ease-in-out; margin-right: 8px;" /> 
                                    <span style="color: #4CAF50;">{{ item.typeDoc }}</span>
                                </div>
                            </td>
                        
                            <!-- ສ່ວນສະແດງຜົນ ປັບປຸງ -->
                            <td v-if="item?.typeDoc === 'ປັບປຸງ'" style="width: 150px; font-weight: bold;">
                                <div style="display: flex; align-items: center;">
                                    <img src="../../assets/icons/old.png" 
                                         width="30" 
                                         style="animation: fade-old 2.5s infinite ease-in-out; margin-right: 8px;" /> 
                                    <span style="color: #757575;">{{item.typeDoc }}</span>
                                </div>
                            </td>
                            

                            <td v-else style="width: 120px;color: #999;">ເອກະສານເກົ່າ</td>
                
                             <!-- If user is Admin -->
                             <template v-if="userRole === 'Admin'">
                               <td>
                                 <a
                                   v-if="item?.docPathLa"
                                   :href="item.docPathLa"
                                   target="_blank"
                                 >
                                   <v-btn elevation="0" variant="text">
                                     <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                   </v-btn>
                                 </a>
                               </td>
                               <td>
                                 <a
                                   v-if="item?.docPath"
                                   :href="item.docPath"
                                   target="_blank"
                                 >
                                   <v-btn elevation="0" variant="text">
                                     <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                   </v-btn>
                                 </a>
                               </td>
                             </template>
                         
                             <!-- If user is NOT Admin -->
                             <template v-else>
                               <td colspan="2" style="text-align:center; font-size:12pt;">
                                 <span>📄 Document available only for Admins</span>
                               </td>
                             </template>
                        </tr>
                    </tbody>
                </v-table>
            </div>
            <div class="d-flex" style="padding-left: 200px;padding-right: 200px;">
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
const nuxtApp = useNuxtApp()
import * as XLSX from 'xlsx';
const exportWhoReadToExcel = () => {
    const wb = XLSX.utils.table_to_book(document.querySelector('#export-excel'));
    XLSX.writeFile(wb, 'report-document.xlsx');
}
const downloadExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(dataForDownload.value);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'report_document.xlsx';
    link.click();
};

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
import moment from 'moment';
const manageState = useManageState()
const { setDocumentList } = manageState
const documentList = computed(() => { return manageState.documentList })
const page = ref<number>(1)
const countPage = ref<number>(0)
const startDate = ref<any>(null)
const endDate = ref<any>(null)
const schName = ref<string>('')
const schDept = ref<string>('ທັງໝົດ')
const dataForDownload = ref<any>([])
const menus1 = ref<boolean>(false)
const menus2 = ref<boolean>(false)
function updatePopUpDate(val: any) {
    startDate.value = moment(val).format('YYYY-MM-DD');
    menus1.value = false
}
function updatePopUpDate1(val: any) {
    endDate.value = moment(val).format('YYYY-MM-DD');
    menus2.value = false
}
//form data
const deptObject = ref<any>([{ branchCode: '0', brNameLa: 'ທັງໝົດ' }])
const docStatusItems = ref<any>([{title:'ທັງໝົດ',value:'0'},{title:'ເອກະສານໃໝ່',value:'1'},{title:'ເອກະສານເກົ່າ',value:'2'}])
const docStatusSelected = ref<string>('0')
const docTypeItems = ref<any>([])
const docNo = ref<string>('ທັງໝົດ')
const onGetDocType = async () => {
        let data = { secCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/DocumentType/getDocumentType`, data).then((data) => {
                docTypeItems.value =data?.data?.resData
            });
        } catch (error) {
            console.log(error)
        }
}
onGetDocType()
const totalPrice = ref<string>('')
const onGetInfo = async () => {
    showLoading.value = true
    dataForDownload.value = []
    try {
        var body = {
            "startDate": startDate.value != null ? startDate.value : '0',
            "endDate": endDate.value != null ? endDate.value : '0',
            "related_Name": schDept.value === 'ທັງໝົດ' ? '0' : schDept.value,
            "status":docStatusSelected.value,
            "docId": docNo.value === 'ທັງໝົດ' ? '0': docNo.value
        }
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentReport`, body).then((data) => {
            totalPrice.value = data?.data?.groupHeader.reduce((sum: any, item: any) => sum + parseInt(item.related_amt), 0);
            for (let i: number = 0; i < data?.data?.groupHeader.length; i++) {
                dataForDownload.value.push([`${i + 1}.${data?.data?.groupHeader[i]?.related_Name}`])
                for (let j: number = 0; j < data?.data?.groupHeader[i]?.details.length; j++) {
                    dataForDownload.value.push([
                        data?.data?.groupHeader[i].details[j]?.subjectName,
                        data?.data?.groupHeader[i].details[j]?.related_Name,
                        data?.data?.groupHeader[i].details[j]?.sharingType,
                        data?.data?.groupHeader[i].details[j]?.docNo,
                        data?.data?.groupHeader[i].details[j]?.docDate,
                        data?.data?.groupHeader[i].details[j]?.approveDate,
                        data?.data?.groupHeader[i].details[j]?.docDescLao,
                        data?.data?.groupHeader[i].details[j]?.userName,
                        data?.data?.groupHeader[i].details[j]?.docPathLa,
                        data?.data?.groupHeader[i].details[j]?.docPath,
                        data?.data?.groupHeader[i].details[j]?.typeDoc,
                    ])
                }
            }
            setDocumentList(data?.data?.groupHeader)
            showLoading.value = false
        })
    } catch (error) {
        showLoading.value = false
        console.log(error)
    }
}

const onGetInfoByText = async () => {
    showLoading.value = true
    try {
        var body = {
            "textSearch": schName.value,
        }
        dataForDownload.value = []
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentReportText02`, body).then((data) => {
            totalPrice.value = data?.data?.groupHeader.reduce((sum: any, item: any) => sum + parseInt(item.related_amt), 0);
            for (let i: number = 0; i < data?.data?.groupHeader.length; i++) {
                dataForDownload.value.push([`${i + 1}.${data?.data?.groupHeader[i]?.related_Name}`])
                for (let j: number = 0; j < data?.data?.groupHeader[i]?.details.length; j++) {
                    dataForDownload.value.push([
                        data?.data?.groupHeader[i].details[j]?.subjectName,
                        data?.data?.groupHeader[i].details[j]?.related_Name,
                        data?.data?.groupHeader[i].details[j]?.sharingType,
                        data?.data?.groupHeader[i].details[j]?.docNo,
                        data?.data?.groupHeader[i].details[j]?.docDate,
                        data?.data?.groupHeader[i].details[j]?.approveDate,
                        data?.data?.groupHeader[i].details[j]?.docDescLao,
                        data?.data?.groupHeader[i].details[j]?.userName,
                        data?.data?.groupHeader[i].details[j]?.docPathLa,
                        data?.data?.groupHeader[i].details[j]?.docPath,
                        data?.data?.groupHeader[i].details[j]?.typeDoc,
                    ])
                }
            }
            setDocumentList(data?.data?.groupHeader)

            showLoading.value = false
        })
    } catch (error) {
        showLoading.value = false
        console.log(error)
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


const branchList = ref<any>([])
const onGetBranchList = async () => {
    let data = { branchCode: '' }
    try {
        await axios.post(`${api.public.API_URL}/Branch/getComboxBranchStatus`, data).then((data) => {
            branchList.value = deptObject.value.concat(data?.data?.resData)
        });
    } catch (error) {
        console.log(error)
    }
}
const userRole = ref<string>('')
const onGetRole = () => {
    const role = localStorage.getItem('role') !== null ? localStorage.getItem('role') : ''
    userRole.value = role ? role : ''
}
onMounted(() => {
    onGetRole()

    onGetDocType()

    onGetBranchList()

    onGetInfo()
})
</script>