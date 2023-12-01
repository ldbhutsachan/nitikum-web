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
                            <v-text-field label="ຫົວຂໍ້ເອກະສານ" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-text-field label="ເລກທີເອກະສານ" hide-details="auto"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-text-field label="ເອກະສານລົງວັນທີ" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select label="ເລືອກປະເພດເອກະສານ" hide-details="auto" :items="docTypeList" item-title="docDescLao" item-value="docType"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-select label="ເອກະສານຕິດພັນກັບສາຂາ" hide-details="auto" :items="branchList" item-title="brNameLa" item-value="branchCode"></v-select>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select label="ເອກະສານຕິດພັນກັບຝ່າຍ" hide-details="auto" :items="departmentList" item-title="deptLao" item-value="deptId"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-select label="ເອກະສານຕິດພັນກັບໃຜ" hide-details="auto" :items="['1','2']" item-title="deptLao" item-value="deptId"></v-select>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select label="ເລືອກປະເພດ share" hide-details="auto" :items="['1','2']" item-title="deptLao" item-value="deptId"></v-select>
                        </v-col>
                        
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-text-field label="ລາຍລະອຽດ" hide-details="auto"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-select label="ເລືອກສະຖານະເອກະສານ" hide-details="auto" :items="['1','2']" item-title="deptLao" item-value="deptId"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" sm="4">
                            <v-file-input label="ໄຟເອກະສານ(ລາວ)" hide-details="auto" item-title="deptLao" item-value="deptId"></v-file-input>
                        </v-col>
                        <v-col cols="12" md="6" sm="4">
                            <v-file-input label="ໄຟເອກະສານ(ອັງກິດ)" hide-details="auto" item-title="deptLao" item-value="deptId"></v-file-input>
                        </v-col>
                        
                    </v-row>
                </v-card-text>

                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogAdd = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn  color="#243B7A">ບັນທຶກ</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
const api = useRuntimeConfig()
const showDialogAdd = ref<boolean>(false)
//global state
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setDocumentTypeList,setBranchList,setDeparmentList } = manageState
const docTypeList = computed(() => { return manageState.documentTypeList })
const branchList = computed(()=>{ return manageState.branchList })
const departmentList = computed(() => { return manageState.departmentList })
//form data
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
    if(branchList.value.length === 0){
        let data = { branchCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/Branch/getBranchList`, data).then((data) => {
                setBranchList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
const onGetDeptMent = async () => {
    if (departmentList.value.length === 0) {
        let data = {
            deptId: ''
        }
        try {
            await axios.post(`${api.public.API_URL}/Dept/getDeptList`, data).then((data) => {
                setDeparmentList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
onMounted(()=>{
    onGetDocType()
    onGetBranchList()
    onGetDeptMent()
})
</script>