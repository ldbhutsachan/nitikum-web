<template>
    <div>
        <v-card max-width="2800" class="mx-auto card-shadow" rounded="lg">

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
                <div class="pt-5 text-center">
                    <br />
                    <span style="font-size: 14pt;font-weight: bold;">ບັນດານິຕິກຳ ທີ່ມີຜົນສັກສິດນຳໃຊ້ ຂອງ ທະນາຄານ
                        ພັດທະນາລາວ ຈຳກັດ</span><br /><br /><br />
                </div>
                <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
                    <div style="width: 100%;display: flex;justify-content:center;align-items: center;">
                        <v-text-field label="ຄົ້ນຫາດ້ວຍຫົວຂໍ້..." placeholder="ປ້ອນຫົວຂໍ້"
                            v-model="formGetBySub.subjectName" variant="outlined" density="compact"
                            @keydown.enter="onGetDocBySubj"></v-text-field>
                        <v-btn @click="onGetDocBySubj" class="ml-2" icon
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;margin-top: -20px;">
                            <Icon name="iconamoon:search-bold" size="24" />
                        </v-btn>
                    </div>
                    <div style="width: 100%;" class="px-10">
                        <v-select v-model="formGetS.secCode" :items="reposibleDeptList" @update:model-value="onGetDocBySec"
                            label="ຄົ້ນຫາດ້ວຍພາກສ່ວນຮັບຜິດຊອບ" item-title="brNameLa" item-value="branchCode"
                            variant="outlined" density="compact"></v-select>
                    </div>
                    <div style="width: 100%;">
                        <v-select :items="docTypeList" v-model="formGetType.docType"
                            @update:model-value="onGetDocByType" label="ຄົ້ນຫາດ້ວຍປະເພດເອກະສານ"
                            no-data-text="ບໍ່ມີຂໍ້ມູນ" variant="outlined" density="compact" item-title="docDescLao"
                            item-value="docType"></v-select>
                    </div>
                    <div
                        style="width: 100%;display: flex;justify-content: space-around;align-items: center;margin-top: -20px;">
                        <v-btn icon @click="onGetDocInfo"
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"
                            class="card-shadow">
                            <Icon name="tabler:refresh" size="24" />
                        </v-btn>
                    </div>
                </div>
                <v-divider></v-divider>
                <v-data-table :items="shareDocData" :headers="headers" :items-per-page="pageSize">
                    <template v-slot:headers="item">
                        <tr style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;">
                            <td>{{ headers[0]?.title }}</td>
                            <td>{{ headers[1]?.title }}</td>
                            <td>{{ headers[2]?.title }}</td>
                            <td>{{ headers[3]?.title }}</td>
                            <td>{{ headers[4]?.title }}</td>
                            <td>{{ headers[5]?.title }}</td>
                            <td>{{ headers[6]?.title }}</td>
                            <td>{{ headers[7]?.title }}</td>
                            <td>{{ headers[8]?.title }}</td>
                            <td>{{ headers[9]?.title }}</td>
                            <td>{{ headers[10]?.title }}</td>
                            <td>{{ headers[11]?.title }}</td>
                            <td>{{ headers[12]?.title }}</td>
                        </tr>
                    </template>
                    <template v-slot:item="row: any">
                        <tr :style="{ 'backgroundColor': active === row?.index.toString() ? '#BCE774' : row?.index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', }"
                            @mouseover="active = row?.index.toString()" @mouseleave="active = ''">
                            <td>{{ row?.item.subjectName }}</td>
                            <td>
                                <div v-for="(items, i) in row?.item?.relatedShowList02">
                                    <span
                                        v-if="items.relatedShowDocNo === row?.item?.relatedShowList02[0]?.relatedShowDocNo">{{
                                        items?.relatedShowName }} </span>
                                </div>
                            </td>
                            <td>{{ row?.item.sharingType }}</td>
                            <td>{{ row?.item.docNo }}</td>
                            <td>{{ row?.item.docDate }}</td>
                            <td>{{ row?.item.approveDate }}</td>
                            <td>{{ row?.item.docDescLao }}</td>
                            <td v-if="row?.item?.docStatus === 'N'" style="width: 150px;font-weight: bold;">
                                <div style="display: flex;align-items: center;justify-content: center;">
                                    <img src="../../assets/icons/new.png" width="30" /> <span>ເອກະສານໃໝ່</span>
                                </div>
                            </td>
                            <td v-else style="width: 120px;color: #999;">
                                ເອກະສານເກົ່າ
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

                            <td><v-btn @click="onGetDetailDataForShow(
                                row?.item.subjectName, row?.item.docDescLao, row?.item.depDescLAO, row?.item.createBy, row?.item.approveDate, row?.item.docDate
                            )" density="comfortable" variant="text" style="color: #243A7A;font-weight: bold;">
                                    <v-icon>mdi-magnify</v-icon> ເບິ່ງ
                                </v-btn></td>
                            <td>
                                <v-btn v-if="row?.item?.docPathLa !== '' && row?.item?.docPathLa !== null"
                                    @click="openPDFViewer(row?.item?.docNo,row?.item?.docPathLa, row?.item?.subjectName)" elevation="0"
                                    variant="text" color="red">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </td>
                            <td style="font-size: 12pt;">
                                <v-btn v-if="row?.item?.docPath !== '' && row?.item?.docPath !== null"
                                    @click="openPDFViewer(row?.item?.docNo,row?.item?.docPath, row?.item?.id)" elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        <!-- </v-card> -->

        <!-- Old Regulations Section -->
        <!-- <v-card max-width="1500" class="mx-auto card-shadow" rounded="lg"> -->

            <v-card-text>
                <div class="pt-5">
                    <h2 class="text-h5 font-weight-bold mb-4" style="color: #003E73;">ນິຕິກໍາ ສະບັບເກົ່າ</h2>
                    <div class="old-regulations-description mb-4" style="background: #f5f5f5; padding: 16px; border-radius: 8px; border-left: 4px solid #003E73;">
                        <p style="margin: 0; color: #333; line-height: 1.6;">
                            <strong>ນິຕິກໍາ ສະບັບເກົ່າ</strong> ແມ່ນ ນິຕິກໍາ ທີ່ມີ ສະບັບປັບປຸງໃໝ່ມາປ່ຽນແທນແລ້ວ ແຕ່ຍັງຄົງມີຜົນສັກສິດ ຍ້ອນຫລັງ ຕາມກໍານົດເວລາຂອງ ນິຕິກໍາ ສະບັບເກົ່ານັ້ນ
                        </p>
                    </div>
                </div>
                <div style="display: flex;justify-content: space-between;align-items: center;width: 100%;">
                    <div style="width: 100%;display: flex;justify-content:center;align-items: center;">
                        <v-text-field label="ຄົ້ນຫາດ້ວຍຫົວຂໍ້..." placeholder="ປ້ອນຫົວຂໍ້"
                            v-model="formGetBySubOld.subjectName" variant="outlined" density="compact"
                            @keydown.enter="onGetDocBySubjOld"></v-text-field>
                        <v-btn @click="onGetDocBySubjOld" class="ml-2" icon
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;margin-top: -20px;">
                            <Icon name="iconamoon:search-bold" size="24" />
                        </v-btn>
                    </div>
                    <div style="width: 100%;" class="px-10">
                        <v-select v-model="formGetSOld.secCode" :items="reposibleDeptList" @update:model-value="onGetDocBySecOld"
                            label="ຄົ້ນຫາດ້ວຍພາກສ່ວນຮັບຜິດຊອບ" item-title="brNameLa" item-value="branchCode"
                            variant="outlined" density="compact"></v-select>
                    </div>
                    <div style="width: 100%;">
                        <v-select :items="docTypeList" v-model="formGetTypeOld.docType"
                            @update:model-value="onGetDocByTypeOld" label="ຄົ້ນຫາດ້ວຍປະເພດເອກະສານ"
                            no-data-text="ບໍ່ມີຂໍ້ມູນ" variant="outlined" density="compact" item-title="docDescLao"
                            item-value="docType"></v-select>
                    </div>
                    <div
                        style="width: 100%;display: flex;justify-content: space-around;align-items: center;margin-top: -20px;">
                        <v-btn icon @click="onGetDocInfoOld"
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"
                            class="card-shadow">
                            <Icon name="tabler:refresh" size="24" />
                        </v-btn>
                    </div>
                </div>
                <v-divider></v-divider>
                <v-data-table :items="oldRegulationsData" :headers="headers" :items-per-page="pageSize">
                    <template v-slot:headers="item">
                        <tr style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;">
                            <td>{{ headers[0]?.title }}</td>
                            <td>{{ headers[1]?.title }}</td>
                            <td>{{ headers[2]?.title }}</td>
                            <td>{{ headers[3]?.title }}</td>
                            <td>{{ headers[4]?.title }}</td>
                            <td>{{ headers[5]?.title }}</td>
                            <td>{{ headers[6]?.title }}</td>
                            <td>{{ headers[7]?.title }}</td>
                            <td>{{ headers[8]?.title }}</td>
                            <td>{{ headers[9]?.title }}</td>
                            <td>{{ headers[10]?.title }}</td>
                            <td>{{ headers[11]?.title }}</td>
                            <td>{{ headers[12]?.title }}</td>
                        </tr>
                    </template>
                    <template v-slot:item="row: any">
                        <tr :style="{ 'backgroundColor': active === row?.index.toString() ? '#BCE774' : row?.index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', }"
                            @mouseover="active = row?.index.toString()" @mouseleave="active = ''">
                            <td>{{ row?.item.subjectName }}</td>
                            <td>
                                <div v-for="(items, i) in row?.item?.relatedShowList02">
                                    <span
                                        v-if="items.relatedShowDocNo === row?.item?.relatedShowList02[0]?.relatedShowDocNo">{{
                                        items?.relatedShowName }} </span>
                                </div>
                            </td>
                            <td>{{ row?.item.sharingType }}</td>
                            <td>{{ row?.item.docNo }}</td>
                            <td>{{ row?.item.docDate }}</td>
                            <td>{{ row?.item.approveDate }}</td>
                            <td>{{ row?.item.docDescLao }}</td>
                            <td v-if="row?.item?.docStatus === 'N'" style="width: 150px;font-weight: bold;">
                                <div style="display: flex;align-items: center;justify-content: center;">
                                    <img src="../../assets/icons/new.png" width="30" /> <span>ເອກະສານໃໝ່</span>
                                </div>
                            </td>
                            <td v-else style="width: 120px;color: #999;">
                                ເອກະສານເກົ່າ
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

                            <td><v-btn @click="onGetDetailDataForShow(
                                row?.item.subjectName, row?.item.docDescLao, row?.item.depDescLAO, row?.item.createBy, row?.item.approveDate, row?.item.docDate
                            )" density="comfortable" variant="text" style="color: #243A7A;font-weight: bold;">
                                    <v-icon>mdi-magnify</v-icon> ເບິ່ງ
                                </v-btn></td>
                            <!-- <td>
                                <v-btn v-if="row?.item?.docPathLa !== '' && row?.item?.docPathLa !== null"
                                    @click="openPDFViewer(row?.item?.docPathLa, row?.item?.subjectName)" elevation="0"
                                    variant="text" color="red">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </td>
                            <td style="font-size: 12pt;">
                                <v-btn v-if="row?.item?.docPath !== '' && row?.item?.docPath !== null"
                                    @click="openPDFViewer(row?.item?.docPath, row?.item?.id)" elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </td> -->
                                 <td>
                          <v-btn
                            v-if="row?.item?.docPathLa"
                            @click="openPDFViewer(row.item.docPathLa, row.item.id, row.item.subjectName)"
                            elevation="0"
                            variant="text"
                            color="red"
                          >
                            <Icon name="vscode-icons:file-type-pdf2" size="30" />
                          </v-btn>
                        </td>
                        <td style="font-size: 12pt;">
                          <v-btn
                            v-if="row?.item?.docPath"
                            @click="openPDFViewer(row.item.docPath, row.item.id, row.item.subjectName)"
                            elevation="0"
                            variant="text"
                          >
                            <Icon name="vscode-icons:file-type-pdf2" size="30" />
                          </v-btn>
                        </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        
        <!-- Test PDF Watermark Card -->
       
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
        
        <!-- PDF Viewer Dialog -->
        <v-dialog v-model="pdfViewerDialog" max-width="95vw" max-height="95vh" persistent>
            <v-card class="pdf-viewer-card">
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                    <div class="d-flex align-center">
                        <span class="text-h6 lao-font mr-2">{{ pdfTitle }}</span>
                    </div>
                    <div class="d-flex align-center">
                       
                        <v-btn v-if="allowDownload" @click="downloadPDF" 
                        
                        variant="outlined" color="primary" class="mr-2">
                            <v-icon left>mdi-download</v-icon>
                            ດາວໂລດ
                        </v-btn>
                        <v-btn v-else disabled variant="outlined" color="grey" class="mr-2" title="ບໍ່ມີສິດໃນການດາວໂລດ">
                            <v-icon left>mdi-lock</v-icon>
                            ດາວໂລດ
                        </v-btn>
                        <v-btn @click="closePDFViewer" variant="outlined" color="red">
                            <v-icon>mdi-close</v-icon>
                            ປິດ
                        </v-btn>
                    </div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                    <div v-if="pdfUrl" class="pdf-container" @contextmenu.prevent>
                        <iframe 
                            :src="`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`" 
                            width="100%" 
                            height="800px"
                            frameborder="0"
                            class="pdf-iframe"
                            oncontextmenu="return false"
                            @mousedown.prevent="preventDefaultActions"
                            @keydown.prevent="preventDefaultActions"
                        ></iframe>
                    </div>
                    <div v-else class="text-center pa-10">
                        <v-icon size="500" color="grey">mdi-file-pdf-box</v-icon>
                        <p class="text-h6 mt-4">ບໍ່ສາມາດໂຫລດເອກະສານໄດ້</p>
                    </div>
                </v-card-text>
            </v-card>
            
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
const headers = ref<any>([
  
    { title: 'ຫົວຂໍ້', value: 'subjectName' },
    { title: 'ພາກສ່ວນຮັບຜິດຊອບ', value: 'related_Name' },
    { title: 'ປະເພດການເຜີຍເເຜ່', value: 'sharingType' },
    { title: 'ເລກທີເອກະສານ', value: 'docNo' },
    { title: 'ວັນທີລົງ', value: 'docDate' },
    { title: 'ວັນທີເຜີຍແຜ່', value: 'approveDate' },
    { title: 'ປະເພດເອກະສານ', value: 'docDescLao' },
    { title: 'ສະຖານະ', value: 'docStatus' },
    { title: 'ຮ່າງເອກະສານ', value: 'typeDoc' },
    { title: 'ເນື້ອໃນ', value: '' },
    { title: 'PDF(Lao)', value: 'PEDLAO' },
    { title: 'PDF(En)', value: 'PEDENG' }
])

// Old regulations headers
const oldRegHeaders = ref<any>([
      { title: 'ຫົວຂໍ້', value: 'subjectName' },
    { title: 'ພາກສ່ວນຮັບຜິດຊອບ', value: 'related_Name' },
    { title: 'ປະເພດການເຜີຍເເຜ່', value: 'sharingType' },
    { title: 'ເລກທີເອກະສານ', value: 'docNo' },
    { title: 'ວັນທີລົງ', value: 'docDate' },
    { title: 'ວັນທີເຜີຍແຜ່', value: 'approveDate' },
    { title: 'ປະເພດເອກະສານ', value: 'docDescLao' },
    { title: 'ສະຖານະ', value: 'docStatus' },
    { title: 'ຮ່າງເອກະສານ', value: 'typeDoc' },
    { title: 'ເນື້ອໃນ', value: '' },
    { title: 'PDF(Lao)', value: 'PEDLAO' },
    { title: 'PDF(En)', value: 'PEDENG' }
  
])
import moment from 'moment';
const menuStartDate = ref<boolean>(false);
const startDate = ref<any>(null)
// import * as XLSX from 'xlsx';
import * as XLSX from "xlsx/xlsx.mjs";
import { PDFDocument, rgb, degrees } from 'pdf-lib';


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
const activeOld = ref<string>('')
const selectedDate = ref<any>(null)
// detail state
const title = ref<string>('')
const titleType = ref<string>('')
const by = ref<string>('')
const reposity = ref<string>('')
const dateCreate = ref<string>('')
const dataPublie = ref<string>('')

// Old regulations data
const oldRegulationsData: any = ref([])

// Old regulations pagination
const oldCurrentPage = ref<number>(1)
const pageSize = ref<number>(20)
const oldTotalItems = ref<number>(0)

const excelColumns: any = ref([
    ['ຫົວຂໍ້', 'ພາກສ່ວນຮັບຜິດຊອບ', 'ປະເພດການເຜີຍແຜ່', 'ເລກທີເອກະສານ', 'ວັນທີລົງ', 'ວັນທີເຜີຍແຜ່', 'ປະເພດເອກະສານ', 'ຊື່ຜູ້ບັນທຶກ', 'ລີ້ງເອກະສານລາວ', 'ລີ້ງເອກະສານອັງກິດ']
])
const excelData: any = ref([])
const concatExcelData: any = ref([])
const onDownloadExcel = () => {
    for (let i: number = 0; i < excelData.value.length; i++) {
        excelColumns.value.push(excelData.value[i])
    }
    const ws = XLSX.utils.aoa_to_sheet(excelColumns.value);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'document.xlsx';
    link.click();
}
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

// User type check for admin features
const userTypeDesc = ref<string>('')
const allowDownload = ref<boolean>(false)

// PDF Viewer variables
const pdfViewerDialog = ref<boolean>(false)
const pdfUrl = ref<string>('')
const pdfTitle = ref<string>('')
const currentPdfPath = ref<string>('')
const userName = ref<string>('')
const currentDateTime = ref<string>('')
// Auto-watermark is always enabled for all PDFs


// PDF Viewer functions - Auto-watermarks ALL PDFs
const formUpdate: any = ref({
  id: "",
  userId: localStorage.getItem("userName"),       // set from login/session
  fullNameLa: localStorage.getItem("userFullName") || "Admin User",
  tel: "02012345678",
  email: "user@test.com",
  secCode: "SEC001",
  secName: "Legal",
  brCode: "",
  brName: "",
  userType: "",
  userStatus: "N",
  loginStatus: "A",
  toKen: "000"
});
const openPDFViewer = async (docNo: string, pdfPath: string, title: string) => {
  const api = useRuntimeConfig();

  pdfTitle.value = title || "PDF Document";
  currentPdfPath.value = pdfPath;

  // Set watermark info
  userName.value =
    localStorage.getItem("userName") ||
    localStorage.getItem("userFullName") ||
    "Admin User";
  currentDateTime.value =
    new Date().toLocaleDateString("lo-LA") +
    " " +
    new Date().toLocaleTimeString("lo-LA", {
      hour: "2-digit",
      minute: "2-digit",
    });

  let finalPdfUrl = "";

  // Check if pdfPath is already a full URL or just a relative path
  if (pdfPath.startsWith("http://") || pdfPath.startsWith("https://")) {
    finalPdfUrl = pdfPath;
  } else {
    const baseUrl =
      api.public.DOC_URL ||
      "https://dehome.ldblao.la/mobile/QR/IMGMOBILE/iadoc/uploads";
    finalPdfUrl = `${baseUrl}/${pdfPath}`;
  }

  // 🔥 Save log before opening PDF
  try {
    const body = {
      userId: localStorage.getItem('userId'),
      secCode: formUpdate.value.secCode,
      secName: formUpdate.value.secName,
      docNo: docNo , // use title or row.id depending on your table
      subjectName: pdfTitle.value,
      fullName: localStorage.getItem('userFullName') ,
      tel: formUpdate.value.tel,
      email: formUpdate.value.email,
      type: "VIEW",
      nameDesc: "User opened document",
    };
      await axios.post(`${api.public.API_URL}/log/doLogByUser`, body);
    // await axios.post(
    //   "http://10.0.10.49:9001/meet-law/prod/api/v1/log/doLogByUser",
    //   body
    // );
    console.log("Log saved successfully");
  } catch (error) {
    console.error("Failed to save log", error);
  }

  // ALWAYS apply auto watermark to every PDF
  showLoading.value = true;
  pdfUrl.value = finalPdfUrl;
  showLoading.value = false;
  pdfViewerDialog.value = true;
};


const closePDFViewer = () => {
    pdfViewerDialog.value = false
    // Clean up watermarked URL if it was created
    if (pdfUrl.value.startsWith('blob:')) {
        URL.revokeObjectURL(pdfUrl.value)
    }
    pdfUrl.value = ''
    pdfTitle.value = ''
    currentPdfPath.value = ''
}

const preventDefaultActions = (event: KeyboardEvent | MouseEvent) => {
    // Prevent keyboard shortcuts for download (Ctrl+S, Ctrl+P, etc.)
    if (event instanceof KeyboardEvent) {
        if ((event.ctrlKey || event.metaKey) && (event.key === 's' || event.key === 'p' || event.key === 'd')) {
            event.preventDefault()
        }
    }
}



const downloadPDF = async () => {
    if (pdfUrl.value) {
        try {
            console.log('Starting PDF watermark process...')
            showLoading.value = true
            
            // Fetch the PDF
            const response = await fetch(pdfUrl.value, {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
        
            console.log('PDF fetched successfully, loading document...')
            const pdfArrayBuffer = await response.arrayBuffer()
            
            // Load the PDF document
            const pdfDoc = await PDFDocument.load(pdfArrayBuffer)
            const pages = pdfDoc.getPages()
            console.log(`PDF loaded with ${pages.length} pages, adding watermarks...`)
            
            // Get user info for watermark
            const userName = localStorage.getItem('userName') || 'Admin User'
            const userFullName = localStorage.getItem('userFullName') || userName
            const currentDate = new Date().toLocaleDateString('lo-LA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })
            const currentTime = new Date().toLocaleTimeString('lo-LA', {
                hour: '2-digit',
                minute: '2-digit'
            })
            
            const watermarkText = `ດາວໂລດໂດຍ: ${userFullName} | ວັນທີ: ${currentDate} ${currentTime}`
            const bankWatermark = 'ທະນາຄານພັດທະນາລາວ ຈຳກັດ'
            
            // Add watermark to each page
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i]
                const { width, height } = page.getSize()
                
                // Create more visible watermarks covering entire page
                const rows = 5
                const cols = 4
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const x = (width / (cols + 1)) * (col + 1)
                        const y = (height / (rows + 1)) * (row + 1)
                        
                        // More visible LDB BANK watermarks
                        page.drawText('LDB BANK', {
                            x: x - 40,
                            y: y,
                            size: 24,
                            color: rgb(0.85, 0.85, 0.85),
                            rotate: degrees(-45),
                        })
                    }
                }
                
                // Very visible center watermarks
                page.drawText('LDB BANK', {
                    x: width / 2 - 100,
                    y: height / 2 + 100,
                    size: 60,
                    color: rgb(0.7, 0.7, 0.7),
                    rotate: degrees(-45),
                })
                
                page.drawText('ທະນາຄານພັດທະນາລາວ ຈຳກັດ', {
                    x: width / 2 - 150,
                    y: height / 2,
                    size: 45,
                    color: rgb(0.75, 0.75, 0.75),
                    rotate: degrees(-45),
                })
                
                page.drawText('LDB BANK', {
                    x: width / 2 - 100,
                    y: height / 2 - 100,
                    size: 60,
                    color: rgb(0.7, 0.7, 0.7),
                    rotate: degrees(-45),
                })
                
                // Corner watermarks - more visible
                page.drawText('LDB BANK', {
                    x: 30,
                    y: height - 60,
                    size: 10,
                    color: rgb(0.6, 0.6, 0.6),
                    rotate: degrees(-90),
                })
                
                page.drawText('LDB BANK', {
                    x: width - 30,
                    y: height - 60,
                    size: 10,
                    color: rgb(0.6, 0.6, 0.6),
                    rotate: degrees(90),
                })
                
                page.drawText('LDB BANK', {
                    x: 80,
                    y: 30,
                    size: 10,
                    color: rgb(0.6, 0.6, 0.6),
                    rotate: degrees(0),
                })
                
                page.drawText('LDB BANK', {
                    x: width - 200,
                    y: 30,
                    size: 10,
                    color: rgb(0.6, 0.6, 0.6),
                    rotate: degrees(0),
                })
                
                // User info watermark - more visible
                page.drawText(watermarkText, {
                    x: 30,
                    y: height - 25,
                    size: 10,
                    color: rgb(0.3, 0.3, 0.3),
                    rotate: degrees(0),
                })
                
                // Page numbers - more visible
                page.drawText(`Page ${i + 1}/${pages.length} - LDB Official Document`, {
                    x: width / 2 - 100,
                    y: 15,
                    size: 10,
                    color: rgb(0.4, 0.4, 0.4),
                    rotate: degrees(0),
                })
                
                // Test watermark to ensure it's working
                page.drawText('WATERMARKED BY LDB', {
                    x: width / 2 - 80,
                    y: height - 100,
                    size: 16,
                    color: rgb(0.5, 0.5, 0.5),
                    rotate: degrees(0),
                })
            }
            
            // Save the modified PDF with embedded watermarks
            const pdfBytes = await pdfDoc.save({
                useObjectStreams: false,
                addDefaultPage: false,
                objectsPerTick: 50
            })
            
            // Validate PDF bytes before creating blob
            if (!pdfBytes || pdfBytes.length === 0) {
                throw new Error('Failed to generate PDF bytes')
            }
            
            // Create and download the watermarked PDF
         
            const link = document.createElement('a')
         
            link.download = `${pdfTitle.value}_LDB_WATERMARKED_${currentDate.replace(/\//g, '-')}.pdf`
            link.style.display = 'none'
            
            // Add to DOM, click, then remove
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
   
            showLoading.value = false
            
            // Show success message with watermark confirmation
            Swal.fire({
                title: 'ສຳເລັດ!',
                text: 'ດາວໂລດເອກະສານມີລາຍນໍ້າ LDB BANK ແລ້ວ',
                icon: 'success',
                timer: 3000,
                showConfirmButton: true,
                confirmButtonText: 'ຕົກລົງ'
            })
            
        } catch (error) {
            console.error('Error adding watermark:', error)
            showLoading.value = false
            
            // Show specific error message
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            
            Swal.fire({
                title: 'ຜິດພາດ!',
                text: `ບໍ່ສາມາດໃສ່ລາຍນໍ້າໄດ້: ${errorMessage}`,
                icon: 'warning',
                timer: 3000,
                showConfirmButton: false
            })
            
            // Fallback: direct download without watermark
            try {
                const link = document.createElement('a')
                link.href = pdfUrl.value
                link.download = `${pdfTitle.value}.pdf`
                link.target = '_blank'
                link.rel = 'noopener noreferrer'
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } catch (fallbackError) {
                console.error('Fallback download failed:', fallbackError)
                Swal.fire({
                    title: 'ຜິດພາດ!',
                    text: 'ບໍ່ສາມາດດາວໂລດເອກະສານໄດ້',
                    icon: 'error',
                    confirmButtonText: 'ຕົກລົງ'
                })
            }
        }
    }
}

const openPDFInNewTab = () => {
    if (pdfUrl.value) {
        window.open(pdfUrl.value, '_blank')
    }
}

const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(20)
async function onGetDocInfo() {
    showLoading.value = true
    try {
        var body = {
            markerId: localStorage.getItem('userId'),
            ses_status: 'N',
        }
        await axios.post(`${api.public.API_URL}/Share/getShareDocument`, body).then((data) => {
            excelData.value = data.data.resData?.map((item: any) => {
                return [item?.subjectName, item?.related_Name, item?.sharingType, item?.docNo, item?.docDate, item?.approveDate, item?.docDescLao, item?.userName, item?.docPathLa, item?.docPath]
            })
            shareDocData.value = data.data.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}

async function onGetDocInfoOld() {
    showLoading.value = true
    try {
        var body = {
            markerId: localStorage.getItem('userId'),
            ses_status: 'O',
        }
        await axios.post(`${api.public.API_URL}/Share/getShareDocument`, body).then((data) => {
            excelData.value = data.data.resData?.map((item: any) => {
                return [item?.subjectName, item?.related_Name, item?.sharingType, item?.docNo, item?.docDate, item?.approveDate, item?.docDescLao, item?.userName, item?.docPathLa, item?.docPath]
            })
            oldRegulationsData.value = data.data.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}

// Fetch old regulations data
async function onGetOldRegulations() {
    try {
        var body = {
            markerId: localStorage.getItem('userId'),
            ses_status: 'O',
        }
        await axios.post(`${api.public.API_URL}/Share/getShareDocument`, body).then((data) => {
            // You can filter or differentiate old regulations here if needed
            // For now, using the same data source
            oldRegulationsData.value = data.data.resData || []
            oldTotalItems.value = oldRegulationsData.value.length
        })
    } catch (error) {
        console.log('Error fetching old regulations:', error)
        oldRegulationsData.value = []
    }
}
const { setDocumentTypeList } = manageState
const docTypeList = computed(() => { return manageState.documentTypeList })
const reposibleDeptList = ref<any>([])
const onGetSectionList = async () => {
    try {
        var body = {
            secCode: ''
        }
        await axios.post(`${api.public.API_URL}/Branch/getComboxBranchStatus`, body).then((data) => {
            // setSectionList(data?.data?.resData)
            reposibleDeptList.value = data?.data?.resData
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
const formGetBySub: any = ref({ subjectName: '', markerId: '', ses_status: 'N' })
const onGetDocBySubj = async () => {
    formGetBySub.value.markerId = localStorage.getItem('userId'),
     formGetBySubOld.value.ses_status = 'N',
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



const formGetBySubOld: any = ref({ subjectName: '', markerId: '', ses_status: 'O' })
const onGetDocBySubjOld = async () => {
    formGetBySubOld.value.markerId = localStorage.getItem('userId'),
    formGetBySubOld.value.ses_status = 'O',
    showLoading.value = true
    try {
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentSubject`, formGetBySubOld.value).then((data) => {
            oldRegulationsData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}

const formGetS: any = ref({ secCode: '', markerId: '', docType: '', ses_status: 'N' })
const onGetDocBySec = async () => {
    showLoading.value = true
    try {
        formGetS.value.docType = formGetType.value.docType
        formGetS.value.markerId = localStorage.getItem('userId')
        formGetS.value.ses_status = 'N'
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentKanang`, formGetS.value).then((data) => {
            shareDocData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
        showLoading.value = false
    }
}

const formGetSOld: any = ref({ secCode: '', markerId: '', docType: '', ses_status: 'O' })
const onGetDocBySecOld= async () => {
    showLoading.value = true
    try {
        formGetSOld.value.docType = formGetType.value.docType
        formGetSOld.value.markerId = localStorage.getItem('userId')
        formGetSOld.value.ses_status = 'O'
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentKanang`, formGetSOld.value).then((data) => {
            oldRegulationsData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
        showLoading.value = false
    }
}
//SHOW  DATA 
const onViewDoc = (link: any, doc: any) => {
    window.open(`${link}`)
    onReadDoc(doc)
}
const onReadDoc = async (id: any) => {
    try {
        var data = { docNo: id, readBy: localStorage.getItem('userName') }
        await axios.post(`${api.public.API_URL}/Share/ReadyDoc`, data).then((data) => {
            onGetDocInfo()
        });
    } catch (error) {
        console.log(error)
    }
}
//delete data


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
const formGetType: any = ref({ docType: '', markerId: '', secCode: '', ses_status: 'N' })
const onGetDocByType = async () => {
    showLoading.value = true
    try {
        formGetType.value.secCode = formGetS.value.secCode
        formGetType.value.markerId = localStorage.getItem('userId'),
        formGetType.value.ses_status = 'N',
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentDoctype`, formGetType.value).then((data) => {
            shareDocData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}

const formGetTypeOld: any = ref({ docType: '', markerId: '', secCode: '', ses_status: 'O' })
const onGetDocByTypeOld = async () => {
    showLoading.value = true
    try {
        formGetTypeOld.value.secCode = formGetS.value.secCode
        formGetTypeOld.value.markerId = localStorage.getItem('userId'),
        formGetTypeOld.value.ses_status = 'O',
        await axios.post(`${api.public.API_URL}/Share/getShareDocumentDoctype`, formGetTypeOld.value).then((data) => {
            oldRegulationsData.value = data?.data?.resData
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
}

const userRole = ref<string>('')
const getUserType = () => {
    const role = localStorage.getItem('typeDesc') || localStorage.getItem('role') || ''
    userRole.value = role
    // Set download permission based on session/role
    allowDownload.value = role === 'Admin' // Only Admin can download
}

// Old regulations pagination functions
const nextPageOld = () => {
    const maxPage = Math.ceil(oldTotalItems.value / pageSize.value)
    if (oldCurrentPage.value < maxPage) {
        oldCurrentPage.value++
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const previousPageOld = () => {
    if (oldCurrentPage.value > 1) {
        oldCurrentPage.value--
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Watch old regulations data
watch(() => oldRegulationsData.value, (newData) => {
    oldTotalItems.value = newData?.length || 0
})

onGetDocInfo()
onGetSectionList()
onGetDocType()
onGetOldRegulations()
getUserType()

// Initialize old regulations (empty or load from API if available)
onMounted(() => {
    oldTotalItems.value = oldRegulationsData.value?.length || 0
})

// Initialize auto watermark system - ALWAYS ENABLED
onMounted(() => {
    console.log('🌊 PDF Auto-Watermark System ACTIVE - All PDFs will be automatically watermarked')
    console.log('📋 Features: Grid watermarks, user tracking, timestamp logging')
    console.log('🔒 Security: Every PDF view and download includes watermarks')
})
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.v-table {
    border-radius: 8px;
}

/* PDF Viewer Styles */
.pdf-viewer-card {
    height: 95vh;
    display: flex;
    flex-direction: column;
}

.pdf-container {
    height: 800px;
    overflow: auto;
    position: relative;
}

.pdf-watermark-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 10;
    overflow: hidden;
}

.watermark-text {
    position: absolute;
    font-size: 40px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.08);
    font-family: 'Arial', sans-serif;
    user-select: none;
    transform: rotate(-45deg);
}

.watermark-lao {
    position: absolute;
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.06);
    font-family: 'Phetsarath OT', sans-serif;
    user-select: none;
    transform: rotate(-45deg);
}

/* Position watermarks across the entire page */
.watermark-1 { top: 10%; left: 10%; }
.watermark-2 { top: 10%; left: 50%; }
.watermark-3 { top: 10%; left: 80%; }
.watermark-4 { top: 35%; left: 20%; }
.watermark-5 { top: 35%; left: 60%; }
.watermark-6 { top: 60%; left: 10%; }
.watermark-7 { top: 60%; left: 50%; }
.watermark-8 { top: 60%; left: 80%; }
.watermark-9 { top: 85%; left: 30%; }

/* Lao watermarks */
.watermark-lao-1 { top: 25%; left: 35%; }
.watermark-lao-2 { top: 50%; left: 15%; }
.watermark-lao-3 { top: 75%; left: 55%; }

.watermark-user {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.4);
    background: rgba(255, 255, 255, 0.8);
    padding: 4px 8px;
    border-radius: 4px;
    font-family: 'Phetsarath OT', sans-serif;
    user-select: none;
}

.pdf-iframe {
    border: none;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: auto;
}

.pdf-viewer-card .v-card-text {
    flex: 1;
    overflow: auto;
}

/* Responsive PDF viewer */
@media (max-width: 768px) {
    .pdf-viewer-card {
        height: 98vh;
    }
    
    .pdf-container {
        height: 500px;
    }
    
    .pdf-viewer-card .v-card-title {
        padding: 16px 12px;
    }
    
    .pdf-viewer-card .v-card-title .text-h6 {
        font-size: 16px !important;
    }
}

/* PDF viewer button styling */
.v-btn {
    text-transform: none;
}

/* Custom dialog styling */
.v-dialog {
    border-radius: 12px;
}

.v-dialog .v-card {
    border-radius: 12px;
}

/* Lao font styling */
.lao-font {
    font-family: 'Phetsarath OT', 'Saysettha OT', 'Lao Sangam MN', sans-serif;
    font-weight: bold;
}

/* Data Table Responsive Styling */
:deep(.v-data-table) {
    font-size: 14px;
}

:deep(.v-data-table__wrapper) {
    overflow-x: auto;
    scrollbar-width: thin;
}

:deep(.v-data-table td),
:deep(.v-data-table th) {
    padding: 12px 10px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
    word-break: break-word !important;
}

:deep(.v-data-table td:first-child),
:deep(.v-data-table th:first-child) {
    min-width: 60px;
    max-width: 70px;
    word-break: break-word !important;
}

/* Sequence column */
:deep(.v-data-table td:nth-child(1)),
:deep(.v-data-table th:nth-child(1)) {
    min-width: 430px !important;
    max-width: 10px !important;
    white-space: normal !important;
    word-break: break-word !important;
}

/* Title/Header column - wider */
:deep(.v-data-table td:nth-child(2)),
:deep(.v-data-table th:nth-child(2)) {
    min-width: 100px !important;
    max-width: 10px !important;
    white-space: normal !important;
    word-break: break-word !important;
}

/* Content column buttons */
:deep(.v-data-table td:nth-child(10)),
:deep(.v-data-table th:nth-child(10)) {
    min-width: 120px;
    max-width: 140px;
    white-space: normal !important;
    word-break: break-word !important;
}

/* PDF buttons column */
:deep(.v-data-table td:nth-child(11)),
:deep(.v-data-table th:nth-child(11)),
:deep(.v-data-table td:nth-child(12)),
:deep(.v-data-table th:nth-child(12)) {
    min-width: 90px;
    max-width: 100px;
    text-align: center;
    word-break: break-word !important;
}

/* For old regulations table - 9 columns */
:deep(.v-data-table tbody tr:has(td:nth-child(9))) td {
    max-width: 130px;
    word-break: break-word !important;
}

/* Pagination controls responsive */
:deep(.v-data-table-footer) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 12px 16px !important;
}

/* Tablet screens (768px - 1024px) */
@media (max-width: 1024px) {
    :deep(.v-data-table td),
    :deep(.v-data-table th) {
        padding: 10px 8px !important;
        font-size: 12px;
        max-width: 160px;
    }

    :deep(.v-data-table td:nth-child(2)),
    :deep(.v-data-table th:nth-child(2)) {
        min-width: 250px !important;
        max-width: 30px !important;
        white-space: normal !important;
    }

    :deep(.v-data-table td:nth-child(10)),
    :deep(.v-data-table th:nth-child(10)) {
        min-width: 110px;
        max-width: 130px;
        word-break: break-word !important;
    }

    :deep(.v-data-table-footer) {
        flex-direction: column;
        align-items: stretch;
    }
}

/* Mobile screens (max-width 768px) */
@media (max-width: 768px) {
    :deep(.v-data-table) {
        font-size: 12px;
    }

    :deep(.v-data-table td),
    :deep(.v-data-table th) {
        padding: 8px 6px !important;
        max-width: 100px;
        font-size: 11px;
    }

    :deep(.v-data-table td:first-child),
    :deep(.v-data-table th:first-child) {
        min-width: 45px;
        max-width: 50px;
    }

    :deep(.v-data-table td:nth-child(2)),
    :deep(.v-data-table th:nth-child(2)) {
        min-width: 200px !important;
        max-width: 250px !important;
        white-space: normal !important;
    }

    :deep(.v-data-table td:nth-child(3)),
    :deep(.v-data-table th:nth-child(3)) {
        min-width: 110px;
        max-width: 0px;
    }

    :deep(.v-data-table td:nth-child(10)),
    :deep(.v-data-table th:nth-child(10)) {
        min-width: 90px;
        max-width: 10px;
    }

    :deep(.v-data-table td:nth-child(11)),
    :deep(.v-data-table th:nth-child(11)),
    :deep(.v-data-table td:nth-child(12)),
    :deep(.v-data-table th:nth-child(12)) {
        min-width: 70px;
        max-width: 80px;
        padding: 6px 4px !important;
    }

    :deep(.v-data-table-footer) {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;
    }

    :deep(.v-data-table-footer > div) {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 8px;
    }

    :deep(.v-btn) {
        padding: 6px 8px !important;
        min-width: auto !important;
        font-size: 11px;
    }

    :deep(.v-btn i) {
        font-size: 18px !important;
    }
}

/* Small mobile (max-width 480px) */
@media (max-width: 480px) {
    :deep(.v-data-table) {
        font-size: 10px;
    }

    :deep(.v-data-table td),
    :deep(.v-data-table th) {
        padding: 6px 5px !important;
        max-width: 90px;
        font-size: 10px;
    }

    :deep(.v-data-table td:first-child),
    :deep(.v-data-table th:first-child) {
        min-width: 38px;
        max-width: 45px;
        padding: 4px 3px !important;
    }

    :deep(.v-data-table td:nth-child(2)),
    :deep(.v-data-table th:nth-child(2)) {
        min-width: 10px !important;
        max-width: 10px !important;
        white-space: normal !important;
    }

    :deep(.v-data-table td:nth-child(10)),
    :deep(.v-data-table th:nth-child(10)) {
        min-width: 10px;
        max-width: 1px;
    }

    :deep(.v-data-table td:nth-child(11)),
    :deep(.v-data-table th:nth-child(11)),
    :deep(.v-data-table td:nth-child(12)),
    :deep(.v-data-table th:nth-child(12)) {
        min-width: 0px;
        max-width: 0px;
        padding: 3px 2px !important;
    }

    :deep(.v-btn) {
        padding: 4px 6px !important;
        min-width: auto !important;
        font-size: 9px;
    }

    :deep(.v-btn i) {
        font-size: 16px !important;
    }
}
</style>
