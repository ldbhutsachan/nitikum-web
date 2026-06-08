<template>
    <div>
        <v-card max-width="1000" flat class="mx-auto pb-4" style="background-color: #ECF5F8;">
            <v-btn icon style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"
                @click="showDialogAddbranch = true">
                <Icon name="mingcute:plus-line" />
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ branchList?.resData?.length }})</span>
        </v-card>
        <v-card max-width="1000" elevation="5" class="mx-auto rounded-lg">
            <div class="d-flex align-center" >
                <v-text-field v-model="search" label="ຄົ້ນຫາ..." density="comfortable" clearable></v-text-field>
            </div>
            <v-data-table :headers="headersT" :items="branchList?.resData" :items-per-page="20" :search="search">
                <template v-slot:item="row: any">
                    <tr>
                        <td style="height: 10;">{{ row?.item.branchCode }}</td>
                        <td style="font-size: 12pt;"><span style="font-weight: bold;font-size: 12pt;">{{ row?.item.brName }}
                            </span><br /> {{ row?.item.brNameLa }}</td>
                        <td v-if="row?.item?.status === 'Active'"><v-icon color="green">mdi-check-circle</v-icon> {{ row?.item?.status }}</td>
                        <td v-else class="d-flex align-center"><Icon name="fe:disabled" size="20" style="color:red" /> {{ row?.item?.status }}</td>
                        <td>
                            <div class="d-flex align-center">
                                <v-btn
                                @click="onGetUpdateDataForUp(row?.item.id, row?.item.branchCode, row?.item.brName, row?.item.brNameLa, row?.item.location, row?.item.brType, row?.item.underBr,row?.item?.status)"
                                density="comfortable" variant="outlined" color="primary">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                            </div>
                        </td>
                    </tr>
                </template> 
            </v-data-table>
        </v-card>
        <v-dialog max-width="600" v-model="showDialogAddbranch" persistent scrollable>
            <v-card rounded="lg">
                <v-card-title class="bgg d-flex"><v-spacer></v-spacer>ເພີ່ມສາຂາ ຫຼື ຝ່າຍ <v-spacer></v-spacer></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field v-model="branchFormCreate.branchCode" label="ລະຫັດສາຂາ" variant="outlined"></v-text-field>
                    <v-text-field v-model="branchFormCreate.brName" label="ຊື່ສາຂາພາສາອັງກິດ" variant="outlined"></v-text-field>
                    <v-text-field v-model="branchFormCreate.brNameLa" label="ຊື່ສາຂາ" variant="outlined"></v-text-field>
                    <v-text-field v-model="branchFormCreate.location" label="ສະຖານທີ່" variant="outlined"></v-text-field>
                    <v-text-field v-model="branchFormCreate.brType" label="ປະເພດສາຂາ" variant="outlined"></v-text-field>
                    <v-text-field v-model="branchFormCreate.underBr" label="ຂຶ້ນກັບສາຂາ" variant="outlined"></v-text-field>
                </v-card-text>
 
                <v-card-actions class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogAddbranch = false" variant="outlined" color="red"
                        class="mr-2"><v-icon>mdi-close</v-icon> ປິດອອກ</v-btn>
                    <v-btn @click="onSaveBranch" color="#fff" style="background-color: #09416e;"><v-icon>mdi-check-circle</v-icon> ບັນທຶກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
        <v-dialog max-width="500" v-model="showDialogUpdatebranch" persistent scrollable>
            <v-card>
                <v-card-title 
                    class="bgg d-flex"><v-spacer></v-spacer>ແກ້ໄຂຂໍ້ມູນ<v-spacer></v-spacer></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field v-model="branchFormUpdate.brNameLa" label="ຊື່ສາຂາພາສາລາວ" variant="outlined"></v-text-field>
                    <v-select v-model="branchFormUpdate.status" :items="statusList" label="ສະຖານະ" item-title="title"
                            item-value="value" hide-details="auto"  density="compact" variant="outlined">
                    </v-select>
                </v-card-text>
                <v-card-actions class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogUpdatebranch = false" variant="outlined" color="red"
                        class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onUpdateBranch" color="#243B7A">ແກ້ໄຂ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template>
<script setup lang="ts">

import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue' 
import { type BranchModel } from '~/models/branchModels'

// alert popup
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false) 
const iconType = ref<string>('')
const messageAlert = ref<string>('')
// store state
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setBranchList } = manageState
const branchList = computed(() => { return manageState.branchList as BranchModel })
// state management

const showDialogAddbranch = ref<boolean>(false)
const showDialogUpdatebranch = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)

const search = ref<string>('')
const headersT = ref<any>([
    { title: 'ລະຫັດສາຂາ', align: 'start', sortable: true, key: 'branchCode' },
    { title: 'ຊື່ສາຂາ', align: 'start', sortable: true, key: 'brNameLa' },
    { title: 'ສະຖານະ', align: 'start', sortable: true, key: 'status' },
    { title: 'ແກ້ໄຂ', align: 'start', sortable: true, key: 'edit' },
    // { title: 'ລຶບອອກ', align: 'start', sortable: true, key: 'delete' },
])
const statusList = ref<any>([{title:'Active',value:'Active'},{title:'Disable',value:'Disabled'}])
const selectedStatus = ref<any>('')
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
    id: '',
    branchCode: '',
    brName: '',
    brNameLa: '',
    location: '',
    brType: '',
    underBr: '',
    status:''
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
        showLoading.value = false
        onGetBranchList()
        branchFormCreate.value.branchCode = ''
        branchFormCreate.value.brName = ''
        branchFormCreate.value.brNameLa = ''
        branchFormCreate.value.location = ''
        branchFormCreate.value.brType = ''
        branchFormCreate.value.underBr = ''
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const deleteForm = ref({
    id: ''
})
const onDelete = async (key: any,) => {
    deleteForm.value.id = key
    const { data } = await useServer('Branch/delete', {
        method: 'POST',
        body: JSON.stringify(deleteForm.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetBranchList()
    } else {
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const onGetBranchList = async () => {
    if (!branchList.value) {
        showLoading.value = true
    }
    const { data } = await useServer('Branch/get-list', {
        method: 'POST',
        body: JSON.stringify(getBranchListForm.value)
    })
    const res: any = data.value
    
    setBranchList(res)
    showLoading.value = false
}
if (process.server) {
    await onGetBranchList()
}
const onGetUpdateDataForUp = (id: any, branchCode: any, brName: any, brNameLa: any, location: any, brType: any, underBr: any,status:string) => {
    branchFormUpdate.value.id = id
    branchFormUpdate.value.branchCode = branchCode
    branchFormUpdate.value.brName = brName
    branchFormUpdate.value.brNameLa = brNameLa
    branchFormUpdate.value.location = location
    branchFormUpdate.value.brType = brType
    branchFormUpdate.value.underBr = underBr
    branchFormUpdate.value.status = status
    console.log(status)
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
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
    } else {
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
        showLoading.value = false
    }
}

onGetBranchList()
</script>