<template>
    <div>
        <v-card flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn icon style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;" @click="showDialogAdd = true">
                <Icon name="mingcute:plus-line" />
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ documentList?.length
                }})</span>
        </v-card>

        <v-card class="mx-auto">

            <div class="d-flex align-center">
                <v-text-field v-model="search" label="ຄົ້ນຫາ..." density="comfortable" clearable></v-text-field>
            </div>
            <v-data-table :headers="headersT" :items="documentList" :items-per-page="20" :search="search">
                <template v-slot:item="row: any">
                    <tr>
                        <td class="text-center">{{ row?.index + 1 }}</td>
                        <td style="height: 10;">{{ row?.item?.subjectName }}</td>
                        <td>{{ row?.item?.docNo }} </td>
                        <td>{{ row?.item?.docDate }}</td>
                        <td>{{ row?.item?.docDescLao }}</td>
                        <td>{{ row?.item?.sharingType }}</td>

                        <td>
                            <div v-for="(items, i) in row?.item?.relatedShowList02">
                                <span>{{ items?.relatedShowName }} </span>
                            </div>
                        </td>
                        <td>
                            <a v-if="row?.item?.docPathLa !== null && row?.item?.docPathLa !== ''"
                                :href="row?.item?.docPathLa" target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td>
                            <a v-if="row?.item?.docPath !== null && row?.item?.docPath !== ''"
                                :href="row?.item?.docPath" target="_blank">
                                <v-btn elevation="0" variant="text">
                                    <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                </v-btn>
                            </a>
                        </td>
                        <td v-if="row?.item?.ses_status === 'ເອກະສານໃໝ່'" style="width: 150px;font-weight: bold;">
                            <div style="display: flex;align-items: center;"><img src="../../assets/icons/new.png"
                                    width="30" /> {{ row?.item.ses_status }}</div>
                        </td>
                        <td v-else style="width: 120px;color: #999;">{{ row?.item.ses_status }}</td>
                        <td class="text-green" v-if="row?.item?.docStatus === 'ອະນຸມັດເເລ້ວ'">
                            <v-btn color="green" density="compact" class="card-shadow px-1">
                                <Icon name="simple-line-icons:check" color="white" /> {{ row?.item?.docStatus }}
                            </v-btn>
                        </td>

                        <td class="text-green" v-if="row?.item?.docStatus === 'ລາຍການຖືກປະຕິເສດ'">
                            <v-btn color="red" density="compact" class="card-shadow px-1">
                                <Icon name="simple-line-icons:close" color="white" /> {{ row?.item?.docStatus }}
                            </v-btn>
                        </td>
                        <td class="text-green" v-if="row?.item?.docStatus === 'ລໍຖ້າອະນຸມັດ'">
                            <v-btn color="green" density="compact" class="card-shadow px-1">
                                <Icon name="carbon:pending" />{{ row?.item?.docStatus }}
                            </v-btn>
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

                        <td class="pa-2 text-center">
                            <v-btn color="#0765A8" class="px-2" @click="onGetDataUpdateInfo(row?.item)"
                                density="comfortable" width="130">
                                <Icon name="gala:data" color="white" size="20" /> ແກ້ໄຂຂໍ້ມູນ
                            </v-btn>
                            <div style="height: 4px;"></div>
                            <v-btn class=" px-1" @click="onGetDataUpdateStatus(row?.item?.id, row?.item?.ses_status)"
                                density="comfortable" width="130">
                                <Icon name="lets-icons:status" color="red" size="30" /> ແກ້ໄຂສະຖານະ
                            </v-btn>
                            <div style="height: 4px;"></div>
                            <v-btn color="red" class="" @click="onAskDeleteData(row?.item?.id)" density="comfortable"
                                width="130">
                                <Icon name="mingcute:delete-3-fill" color="white" size="20" /> ລົບອອກ
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="showDialogAdd" max-width="1000" persistent scrollable>
            <v-card rounded="lg">
                <v-card-title class="bgg d-flex align-center">
                    <v-spacer></v-spacer>
                    ເພີ່ມຂໍ້ມູນເອກະສານ
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogAdd = false" icon elevation="0"
                        color="transparent"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-form @submit.prevent>
                    <v-card-text class="pt-8">
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field v-model="subjectName" label="ປ້ອນຫົວຂໍ້ເອກະສານ"
                                    hide-details="auto" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field v-model="docNo" label="ປ້ອນເລກທີເອກະສານ"
                                    hide-details="auto" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-menu :close-on-content-click="false" v-model="menePopupDate">
                                <template v-slot:activator="{ props }">
                                    <v-text-field label="ເອກະສານລົງວັນທີ" :modelValue="docDate"
                                        v-bind:="props" hide-details="auto"
                                        prepend-inner-icon="mdi-calendar-blank-outline" variant="outlined"
                                        placeholder="YYYY-MM-DD"  ></v-text-field>
                                </template>
                                <v-date-picker @update:modelValue="updatePopUpDate" :hide-actions="true"
                                    hide-details="auto" color="primary"></v-date-picker>
                            </v-menu>
                            
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="docType" label="ເລືອກປະເພດເອກະສານ" hide-details="auto"
                                    :items="docTypeItems" item-title="docDescLao" item-value="docType"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດເອກະສານ']" variant="outlined">
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="sharingType" label="ເລືອກປະເພດການແຊຣ(Share)"
                                    hide-details="auto" :items="shareTypeItems" item-title="title" item-value="value"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດການ SHARE']" variant="outlined"></v-select>
                            </v-col>
                            <v-col v-if="sharingType === 'V'" cols="12" md="6" sm="4">
                                <v-select v-model="related" :items="brList" multiple chips label="ເລືອກຝ່າຍທີຕ້ອງການເຜີຍເເຜ່"
                                    hide-details="auto"  item-title="brNameLa"
                                    item-value="branchCode" @update:model-value="onGetDeptMent" variant="outlined"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="related_No" :items="brList" multiple chips  label="ເລືອກພາກສ່ວນຮັບຜິດຊອບ"
                                     hide-details="auto" 
                                    item-title="brNameLa" item-value="branchCode"
                                    @update:model-value="onGetDeptMent" variant="outlined"></v-select>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="type"  label="ເລືອກຮ່າງເອກະສານ"
                                hide-details="auto" :items="TypeItems" item-title="title" item-value="value"
                                :rules="[v => !!v || 'ກະລຸນາເລືອກຮ່າງເອກະສານ']" variant="outlined"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-file-input v-model="fileLa" :multiple="false" label="ເລືອກໄຟເອກະສານ(ລາວ)"
                                    hide-details="auto" variant="outlined"></v-file-input>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-file-input v-model="fileEn" :multiple="false" label="ເລືອກໄຟເອກະສານ(ອັງກິດ)"
                                    hide-details="auto" variant="outlined"></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea v-model="details" label="ປ້ອນລາຍລະອຽດ..."
                                    hide-details="auto"  variant="outlined"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex pa-4">
                        <v-spacer></v-spacer>
                        <v-btn @click="showDialogAdd = false" variant="outlined" color="red" class="mr-2"><v-icon>mdi-close</v-icon>ປິດອອກ</v-btn>
                        <v-btn type="sumit" @click="onSaveDoc"
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"><v-icon>mdi-check-circle</v-icon>ບັນທຶກ</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog max-width="1000" v-model="dialogUpdateInfo">
            <v-card rounded="lg">
                <v-card-title class="bgg d-flex align-center">
                    <v-spacer></v-spacer>
                    ແກ້ໄຂຂໍ້ມູນເອກະສານ
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogUpdateInfo = false" icon elevation="0"
                        color="transparent"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-form @submit.prevent>
                    <v-card-text class="pt-8">
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field v-model="updateTitle" label="ປ້ອນຫົວຂໍ້ເອກະສານ" hide-details="auto" variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-text-field v-model="updateDocNo" label="ປ້ອນເລກທີເອກະສານ" hide-details="auto" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <!-- <v-text-field v-model="updateDatetime" label="ປ້ອນເອກະສານລົງວັນທີ" hide-details="auto" variant="outlined"></v-text-field> -->
                                <v-menu :close-on-content-click="false" v-model="menePopupDate1">
                                <template v-slot:activator="{ props }">
                                    <v-text-field label="ເອກະສານລົງວັນທີ" :modelValue="updateDatetime"
                                        v-bind:="props" hide-details="auto"
                                        prepend-inner-icon="mdi-calendar-blank-outline" variant="outlined"
                                        placeholder="YYYY-MM-DD" ></v-text-field>
                                </template>
                                <v-date-picker @update:modelValue="updatePopUpDate1" :hide-actions="true"
                                    hide-details="auto" color="primary"></v-date-picker>
                            </v-menu>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="updateDocType" label="ເລືອກປະເພດເອກະສານ" hide-details="auto"
                                    :items="docTypeItems" item-title="docDescLao" item-value="docType"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດເອກະສານ']" variant="outlined"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="updateShareType" label="ເລືອກປະເພດການແຊຣ (Share)" hide-details="auto"
                                    :items="shareTypeItems" item-title="title" item-value="value"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດການແຊຣ (Share)']" variant="outlined"></v-select>
                            </v-col>
                            <v-col v-if="updateShareType === 'V'" cols="12" md="6" sm="4">
                                <v-select v-model="updateNeedDeploy" :items="brList" multiple chips label="ເລືອກຝ່າຍທີຕ້ອງການເພີຍເເຜ່"
                                    hide-details="auto" item-title="brNameLa"
                                    item-value="branchCode" @update:model-value="onGetDeptMent" variant="outlined"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="updateResponsible" :items="brList" multiple chips label="ເລືອກພາກສ່ວນຮັບຜິດຊອບ"
                                    style="color: black;" hide-details="auto" 
                                    item-title="brNameLa" item-value="branchCode"
                                    @update:model-value="onGetDeptMent" variant="outlined"></v-select>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-select v-model="updateType" label="ເລືອກຮ່າງເອກະສານ" hide-details="auto"
                                    :items="TypeItems" item-title="title" item-value="value"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກ ຮ່າງເອກະສານ']" variant="outlined"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6" sm="4">
                                <v-file-input v-model="updateDocFileLao" label="ເລືອກໄຟເອກະສານ(ລາວ)"
                                    hide-details="auto" variant="outlined"></v-file-input>
                            </v-col>
                            <v-col cols="12" md="6" sm="4">
                                <v-file-input v-model="updateDocFileEn" label="ເລືອກໄຟເອກະສານ(ອັງກິດ)"
                                    hide-details="auto" variant="outlined"></v-file-input>
                            </v-col>
                        </v-row>
                        <br />
                        <v-select label="ເລືອກສະຖານະເອກະສານ" v-model="statusUpdateVal" :items="statusList"
                            item-title="title" item-value="value" variant="outlined">
                        </v-select>
                        <v-row>
                            <v-col>
                                <v-textarea v-model="updateDescription" label="ປ້ອນລາຍລະອຽດ..." hide-details="auto" variant="outlined"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <div class="d-flex pa-4">
                        <v-spacer></v-spacer>
                        <v-btn @click="dialogUpdateInfo = false" variant="outlined" color="red"
                            class="mr-2"><v-icon>mdi-close</v-icon>ປິດອອກ</v-btn>
                        <v-btn type="sumit" @click="onUpdateData"
                            style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"><v-icon>mdi-check-circle</v-icon> ແກ້ໄຂ</v-btn>
                    </div>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate" max-width="600" persistent>
            <v-card class="pa-10">
                <v-card-title class="d-flex align-center">
                    ແກ້ໄຂຂໍ້ມູນສະຖານະເອກະສານ
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialogUpdate = false" elevation="0">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-select label="ເລືອກສະຖານະເອກະສານ" v-model="statusUpdateVal" :items="statusList"
                        item-title="title" item-value="value">
                    </v-select>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="onUpdateDocStatus"
                        style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;">ບັນທຶກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
        <alert v-model="showAlert" :messageAlert="messageAlert ?? ''" :iconType="iconType ?? ''" @click="showAlert = false" />
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
// import { VDataTable } from 'vuetify/labs/VDataTable'
const api = useRuntimeConfig()
const showDialogAdd = ref<boolean>(false)
    const showDialogAdds = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const dialogUpdateInfo = ref<boolean>(false)
const updateTitle = ref<string>('')
const updateDocNo = ref<string>('')
const updateDatetime = ref<string>('')
const updateDocType = ref<string>('')
const updateShareType = ref<string>('')
const updateType = ref<string>('')
const updateResponsible = ref<any>([])
const updateNeedDeploy = ref<any>([])
const updateDocFileLao = ref<any>(null)
const updateDocFileEn = ref<any>(null)
const updateDescription = ref<any>('')
const keyUpData = ref<string>('')
const onGetDataUpdateInfo = (items: any) => {
    statusUpdateVal.value = items?.ses_status === 'ເອກະສານໃໝ່' ? 'N' : 'O'
    keyUpData.value = items?.id
    updateTitle.value = items?.subjectName
    updateDocNo.value = items?.docNo
    // Normalize incoming date to YYYY-MM-DD so the picker/text field shows consistent format
    if (items?.docDate) {
        const parsed = moment(items.docDate, ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'MM/DD/YYYY', moment.ISO_8601], true)
        if (parsed.isValid()) {
            updateDatetime.value = parsed.format('YYYY-MM-DD')
        } else {
            // fallback: try non-strict parse
            const loose = moment(items.docDate)
            updateDatetime.value = loose.isValid() ? loose.format('YYYY-MM-DD') : items.docDate
        }
    } else {
        updateDatetime.value = ''
    }
    updateDocType.value = items?.docType
    updateShareType.value = items?.sharingType === 'Normal-ອະນຸຍາດໃຫ້ທຸກຄົນເຫັນຂໍ້ມູນ' ? 'N' : 'V'
    updateType.value = items?.typeDoc === 'ຮ່າງໃໝ່' ? 'ຮ່າງໃໝ່' : 'ປັບປຸງ'
    if (items?.related !== '' && items?.related !== null) {
        updateNeedDeploy.value = items?.relatedList?.map((val: any) => {
            return val?.relatedId
        })
    }
    updateResponsible.value = items?.relatedShowList02?.map((val: any) => {
        return val?.relatedShowId?.toString()
    })
    dialogUpdateInfo.value = true
}
const menePopupDate = ref<boolean>(false)
const menePopupDate1 = ref<boolean>(false)
function updatePopUpDate(val: any) {
    docDate.value = moment(val).format('YYYY-MM-DD');
    menePopupDate.value = false
}
function updatePopUpDate1(val: any) {
    updateDatetime.value = moment(val).format('YYYY-MM-DD');
    menePopupDate1.value = false
}
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import { useManageState } from '~/stores/manage-state'
import Swal from 'sweetalert2';
import moment from 'moment';
const manageState = useManageState()
const { setDocumentTypeList, setBranchList, setDeparmentList, setDocumentList } = manageState
// const docTypeList = computed(() => { return manageState.documentTypeList })
const documentList = computed(() => { return manageState.documentList })
const userList = ref<any>([])
const fileEn  = ref<any>(null)
const fileLa = ref<any>(null)
const dialogUpdate = ref<boolean>(false)
const shareTypeItems = ref<any>([
    {
        title: 'ອະນຸຍາດໃຫ້ທຸກຄົນເຫັນຂໍ້ມູນ',
        value: 'N'
    },
    {
        title: 'ອະນຸຍາດໃຫ້ສະເພາະບຸກຄົນ',
        value: 'V'
    },
])
const TypeItems = ref<any>([
    {
        title: 'ຮ່າງໃໝ່',
        value: 'ຮ່າງໃໝ່'
    },
    {
        title: 'ປັບປຸງ',
        value: 'ປັບປຸງ'
    },
])
const statusList = ref<any>([
    { title: 'ເອກະສານໃໝ່', value: 'N' },
    { title: 'ເອກະສານເກົ່າ', value: 'O' }
])
const search = ref<string>('')
const headersT = ref<any>([
    { title: 'ລ.ດ', align: 'start', sortable: true, key: 'branchCode' },
    { title: 'ຫົວຂໍ້ເອກະສານ', align: 'start', sortable: true, key: 'subjectName' },
    { title: 'ເລກທີເອກະສານ', align: 'start', sortable: true, key: 'docNo' },
    { title: 'ເອກະສານລົງວັນທີ', align: 'start', sortable: true, key: 'docDate' },
    { title: 'ປະເພດເອກະສານ', align: 'start', sortable: true, key: 'docDescLao' },
    { title: 'ປະເພດ Share', align: 'start', sortable: true, key: 'sharingType' },
    { title: 'ພາກສ່ວນຮັບຜິດຊອບ', align: 'start', sortable: true, key: 'relatedList' },
    { title: 'PDF(Lao)', align: 'start', sortable: true, key: 'docPathLa' },
    { title: 'PDF(En)', align: 'start', sortable: true, key: 'docPath' },
    { title: 'ສະຖານະ', align: 'start', sortable: true, key: 'docStatus' },
    { title: 'ສະຖານະເອກະສານ', align: 'start', sortable: true, key: 'docStatus' },
    { title: 'ຮ່າງເອກະສານ', align: 'start', sortable: true, key: 'typedoc' },
    { title: 'ຈັດການ', align: 'start', sortable: true, key: 'edit' },
    { title: '', align: 'start', sortable: true, key: 'delete' },
])
const statusUpdateVal = ref<string>('')
const keyUpdateStatus = ref<string>('')
// const formAdd: any = ref({
const subjectName = ref<string>('')
    const docNo= ref<string>('')
    const docDate= ref<string>('')
    const docType= ref<string>('')
    const related= ref<any>([])
    const deptCode= ref<any>([])
    const shareUserById= ref<any>([])
    const markerId= ref<string>('')
    const sharingType= ref<string>('')
    const type= ref<string>('')
    const docStatus= ref<string>('')
    const details= ref<string>('')
    const filesEn= ref<string>('')
    const filesLao= ref<string>('')
    const related_No= ref<any>([])
    const related_Name= ref<any>([])
// })
const onGetDataUpdateStatus = (key: any, status: any) => {
    statusUpdateVal.value = status === 'ເອກະສານໃໝ່' ? 'N' : 'O'
    keyUpdateStatus.value = key
    dialogUpdate.value = true
}
const onUpdateDocStatus = async () => {
    if (keyUpdateStatus.value === '') return
    showLoading.value = true
    const userL = localStorage.getItem('userLoginNitikam')
    let data = { id: keyUpdateStatus.value, statusShow: statusUpdateVal.value, userStatusShow: userL ?? '' }
    try {
        await axios.post(`${api.public.API_URL}/Document/updateStatusShow`, data).then((data) => {
            if (data?.data?.message?.resCode === '00') {
                dialogUpdate.value = false
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
        });
    } catch (error) {
        console.log(error)
    }
}
const docTypeItems = ref<any>([])
const onGetDocType = async () => {
    // if (docTypeList.value.length === 0) {
        let data = { secCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/DocumentType/getDocumentType`, data).then((data) => {
                docTypeItems.value =data?.data?.resData
            });
        } catch (error) {
            console.log(error)
        }
    // }
}
const brList = ref<any>([])
const onGetBranchList = async () => {
        var data = { branchCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/Branch/getComboxBranchStatus`, data).then((data) => {
                brList.value = data?.data?.resData
            });
        } catch (error) {
            console.log(error)
        }
}
const onGetDeptMent = async () => {
    let data = {
        branchCode: related.value
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
        secCode: deptCode.value
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
    if (sharingType.value === '' || docType.value === '') return
    try {
        const formData = new FormData()
        showLoading.value = true
        const userId = localStorage.getItem('userId')
        if (fileEn.value !== '') {
            formData.append('filesEn', fileEn.value)
            console.log('end pdf')
        } else {
            formData.append('filesEn', '')
            console.log('no end')
        }
        if (fileLa.value !== '') {
            formData.append('filesLao', fileLa.value)
            console.log('lao pdf')
        } else {
            formData.append('filesLao', '')
            console.log('no lao')
        }
        markerId.value = userId ? userId : ''
        formData.append('docNo', docNo.value)
        formData.append('subjectName', subjectName.value)
        formData.append('docDate', docDate.value)
        formData.append('docType', docType.value)
        formData.append('related', related.value)
        formData.append('deptCode', deptCode.value)
        formData.append('shareUserById', shareUserById.value)
        formData.append('markerId', markerId.value)
        formData.append('sharingType', sharingType.value)
        formData.append('type', type.value)
        formData.append('details', details.value)
        formData.append('related_No', related_No.value)
        formData.append('related_Name', related_No.value)
        await axios.post(`${api.public.API_URL}/Document/SaveDoc`, formData).then((data) => {

            subjectName.value = ''
            docNo.value = ''
            docDate.value = ''
            docType.value = ''
            related.value = []
            deptCode.value = []
            shareUserById.value = []
            sharingType.value = ''
            type.value = ''
            details.value = ''
            filesEn.value = ''
            filesLao.value = ''
            related_No.value = []
            related_Name.value = []
            onGetInfo()
            showLoading.value = false
            showAlert.value = true
            iconType.value = 'success'
            messageAlert.value = 'Success'

        })
    } catch (error) {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = 'error'
    }

}
const onUpdateData = async () => {
    const formData = new FormData()
    showLoading.value = true
    const userId = localStorage.getItem('userId')
    if (updateDocFileEn.value !== '' && updateDocFileEn.value !== null) {
        formData.append('filesEn', updateDocFileEn.value)
        console.log('end pdf')
    } else {
        formData.append('filesEn', 'en')
        console.log('no end')
    }
    if (updateDocFileLao.value !== '' && updateDocFileLao.value !== null) {
        formData.append('filesLao', updateDocFileLao.value)
        console.log('lao pdf')
    } else {
        formData.append('filesLao', 'lo')
        console.log('no lao')
    }
    formData.append('docNo', updateDocNo.value)
    formData.append('subjectName', updateTitle.value)
    formData.append('docDate', updateDatetime.value)
    formData.append('docType', updateDocType.value)
    formData.append('related', updateNeedDeploy.value)
    formData.append('markerId', markerId.value)
    formData.append('sharingType', updateShareType.value)
    formData.append('type', updateType.value)
    formData.append('details', updateDescription.value)
    formData.append('related_Name', updateResponsible.value)
    formData.append('w_status_show', userId ?? '')
    formData.append('ses_status', statusUpdateVal.value)
    formData.append('id', keyUpData.value)
    await axios.post(`${api.public.API_URL}/Document/updateDocument`, formData).then((data) => {
        if (data?.data?.message?.resCode === '00') {
            dialogUpdateInfo.value = false
            onGetInfo()
            showLoading.value = false
            showAlert.value = true
            iconType.value = 'success'
            messageAlert.value = data?.data?.message?.resMgs
            updateDocFileEn.value = null
            updateDocFileLao.value = null
        } else {
            showLoading.value = false
            showAlert.value = true
            iconType.value = 'error'
            messageAlert.value = data?.data?.message?.resMgs
        }
    })
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
const onGetInfo = async () => {
    if (documentList.value.length === 0) {
        showLoading.value = true
    }
    try {
        var body = {
            markerId: localStorage.getItem('userId')
        }
        await axios.post(`${api.public.API_URL}/Audit/getWaitListCheckByUser`, body).then((data) => {

            setDocumentList(data?.data?.resData)
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
    showLoading.value = false
}
onGetDocType()
onGetBranchList()
onGetInfo()
</script>