<template>
    <div>
        <v-card width="1200" flat class="mx-auto pb-4" style="background-color: #ECF5F8;">
            <v-btn color="#243B7A" @click="showDialogAddbranch = true">
                <Icon name="mingcute:plus-line" />ເພີ່ມສາຂາ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ branchList?.resData?.length
            }})</span>
        </v-card>
        <v-card width="1200" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A;">
                        <th class="text-left text-white">
                            ລະຫັດສາຂາ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ສາຂາ
                        </th>
                        <th class="text-left text-white">
                            ສະຖານທີ
                        </th>
                        <th class="text-left text-white">
                            ປະເພດສາຂາ
                        </th>
                        <th class="text-left text-white">
                            ຂຶ້ນກັບສາຂາ
                        </th>
                        <th class="text-left text-white">
                            ຈັດການ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in branchList?.resData?.slice(startPage,endPage)" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="height: 10;">{{ item.branchCode }}</td>
                        <td style="font-size: 12pt;"><span style="font-weight: bold;font-size: 12pt;">{{ item.brName }} </span><br /> {{ item.brNameLa }}</td>
                        <td style="font-size: 12pt;">{{ item.location }}</td>
                        <td style="font-size: 12pt;">{{ item.brType }}</td>
                        <td style="font-size: 12pt;">{{ item.underBr }}</td>
                        <td>
                            <v-btn @click="onGetUpdateDataForUp(item.id,item.branchCode,item.brName,item.brNameLa,item.location,item.brType,item.underBr)" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                            <v-btn density="comfortable" variant="text" @click="onDelete(item.id)">
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
        <v-dialog max-width="500" v-model="showDialogAddbranch" persistent>
            <v-card>
                <v-card-title>ເພີ່ມສາຂາ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field v-model="branchFormCreate.branchCode" label="ລະຫັດສາຂາ"></v-text-field>
                    <v-text-field v-model="branchFormCreate.brName" label="ຊື່ສາຂາພາສາອັງກິດ"></v-text-field>
                    <v-text-field v-model="branchFormCreate.brNameLa" label="ຊື່ສາຂາພາສາລາວ"></v-text-field>
                    <v-text-field v-model="branchFormCreate.location" label="ສະຖານທີ່"></v-text-field>
                    <v-text-field v-model="branchFormCreate.brType" label="ປະເພດສາຂາ"></v-text-field>
                    <v-text-field v-model="branchFormCreate.underBr" label="ຂຶ້ນກັບສາຂາ"></v-text-field>
                </v-card-text>
                
                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogAddbranch = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onSaveBranch" color="#243B7A">ບັນທຶກ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500" v-model="showDialogUpdatebranch">
            <v-card>
                <v-card-title>ແກ້ໄຂຂໍ້ມູນສາຂາ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <!-- <v-text-field v-model="branchFormUpdate.branchCode" label="ລະຫັດສາຂາ"></v-text-field> -->
                    <v-text-field v-model="branchFormUpdate.brName" label="ຊື່ສາຂາພາສາອັງກິດ"></v-text-field>
                    <v-text-field v-model="branchFormUpdate.brNameLa" label="ຊື່ສາຂາພາສາລາວ"></v-text-field>
                    <v-text-field v-model="branchFormUpdate.location" label="ສະຖານທີ່"></v-text-field>
                    <v-text-field v-model="branchFormUpdate.brType" label="ປະເພດສາຂາ"></v-text-field>
                    <v-text-field v-model="branchFormUpdate.underBr" label="ຂຶ້ນກັບສາຂາ"></v-text-field>
                </v-card-text>
                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogUpdatebranch = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onUpdateBranch" color="#243B7A">ແກ້ໄຂ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
    </div>
</template>
<script setup lang="ts">
const api = useRuntimeConfig()
import swal from 'sweetalert2'
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import { type BranchModel } from '~/models/branchModels'
import axios from 'axios';
// store state
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setBranchList } = manageState
const branchList = computed(()=>{ return manageState.branchList as BranchModel })
// state management
const active = ref<string>('')
const showDialogAddbranch = ref<boolean>(false)
const showDialogUpdatebranch = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
// const setBranchList = ref<BranchModel>()
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(10)
const countPage = ref<number>(0)
// form data
const branchFormCreate = ref({
    branchCode: '',
    brName: '',
    brNameLa: '',
    location: '',
    brType: '',
    underBr: '',
})
const getBranchListForm = ref({
    branchCode: ''
})
const branchFormUpdate = ref({
    id:'',
    branchCode: '',
    brName: '',
    brNameLa: '',
    location: '',
    brType: '',
    underBr: ''
})


// functions
const onSaveBranch = async () => {
    showLoading.value = true
    const { data } = await useServer('Branch/create', {
        method: 'POST',
        body: JSON.stringify(branchFormCreate.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        onGetBranchList()
        branchFormCreate.value.branchCode = ''
        branchFormCreate.value.brName = ''
        branchFormCreate.value.brNameLa = ''
        branchFormCreate.value.location = ''
        branchFormCreate.value.brType = ''
        branchFormCreate.value.underBr = ''
        showSuccess.value = true
    } else {
        console.log(res)
        swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
        showLoading.value = false
    }
}
const deleteForm = ref({
    id:''
})
const onDelete = async (key:any,) =>{
    deleteForm.value.id = key
    const { data } = await useServer('Branch/delete', {
        method: 'POST',
        body: JSON.stringify(deleteForm.value)
    })
    const res:any = data.value
    if(res?.message?.resCode === '00'){
        showSuccess.value = true
        onGetBranchList()
    }else{
        swal.fire({
            icon:'error',
            text: res
        })
    }
}
const onGetBranchList = async () => {
    if(!branchList.value){
        showLoading.value = true
    }
    const { data } = await useServer('Branch/get-list', {
        method: 'POST',
        body: JSON.stringify(getBranchListForm.value)
    })
    const res: any = data.value
    const count:any = res?.resData?.length
    const resMath = (count/10).toFixed(1)?.toString()
    const splitRes = resMath.split('.')
    if(splitRes[1] === '0'){
        countPage.value = parseFloat(splitRes[0])
    }else{
        countPage.value = parseFloat(splitRes[0])+1 
    }
    setBranchList(res)
    showLoading.value = false
}
if(process.server){
    await onGetBranchList()
}
const onGetUpdateDataForUp = (id:any,branchCode:any,brName:any,brNameLa:any,location:any,brType:any,underBr:any) =>{
    branchFormUpdate.value.id = id
    branchFormUpdate.value.branchCode = branchCode
    branchFormUpdate.value.brName = brName
    branchFormUpdate.value.brNameLa = brNameLa
    branchFormUpdate.value.location = location
    branchFormUpdate.value.brType = brType
    branchFormUpdate.value.underBr = underBr
    showDialogUpdatebranch.value = true
}
const onUpdateBranch = async () => {
    showLoading.value = true
    const { data } = await useServer('Branch/update', {
        method: 'POST',
        body: JSON.stringify(branchFormUpdate.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showDialogUpdatebranch.value = false
        onGetBranchList()
        showSuccess.value = true
    } else {
        console.log(res)
        swal.fire({
            icon: 'error',
            text: res
        })
        showLoading.value = false
    }
}
watch(page, () => {
        startPage.value = (page.value - 1)*10
        endPage.value = page.value * 10
})
onMounted(() => {
    onGetBranchList()
})
</script>