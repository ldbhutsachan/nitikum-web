<template>
    <div>
        <v-card width="1200" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນປະເພດເອກະສານ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ docTypeList?.length
            }})</span>
        </v-card>
        <v-card width="1200" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A">
                        <th class="text-left text-white">
                            ລະຫັດ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ປະເພດເອກະສານ
                        </th>
                        <th class="text-left text-white" colspan="2">
                            ຈັດການ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in docTypeList?.slice(startPage,endPage)" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="font-size: 10pt;">{{ item?.docType }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ item?.docDesc }}</span> <br /> {{ item?.docDescLao }}</td>
                        <td>
                            <v-btn @click="onGetDataForUpdate(item?.docType,item?.docDescLao,item?.docDesc)" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                        </td>
                        <td>
                            <v-btn @click="onDelete(item?.docType)" density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
            <div class="d-flex" style="padding-left: 200px;padding-right: 200px;">
                
                <div style="width: 100%;">
                    <v-pagination v-model="page" :length="countPage" rounded="circle"></v-pagination>
                </div>
            </div>
        </v-card>
        <v-dialog max-width="500" v-model="showDialogAdd">
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນປະເພດເອກະສານ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ຊື່ປະເພດເອກະສານ(ລາວ)" v-model="formAdd.docDescLao"></v-text-field>
                    <v-text-field label="ຊື່ປະເພດເອກະສານ(ອັງກິດ)" v-model="formAdd.docDesc"></v-text-field>
                </v-card-text>

                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogAdd = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onSave" color="#243B7A">ບັນທຶກ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-dialog max-width="500" v-model="showDialogUpdate">
            <v-card>
                <v-card-title>ແກ້ໄຂຂໍ້ມູນປະເພດເອກະສານ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ຊື່ປະເພດເອກະສານ(ລາວ)" v-model="formUpdate.docDescLao"></v-text-field>
                    <v-text-field label="ຊື່ປະເພດເອກະສານ(ອັງກິດ)" v-model="formUpdate.docDesc"></v-text-field>
                </v-card-text>

                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogUpdate = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onUpdate" color="#243B7A">ແກ້ໄຂ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template>
<script setup lang="ts">
import loading from '~/components/loading/loading.vue'
import Swal from 'sweetalert2';
const active = ref<string>('')
// alert
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
//global state
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setDocumentTypeList } = manageState
const docTypeList = computed(() => { return manageState.documentTypeList })
// state
const showDialogAdd = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showDialogUpdate = ref<boolean>(false)
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(10)
const countPage = ref<number>(0)
// form data
const formUpdate = ref({
    docDesc:'',
    docDescLao:'',
    docType:''
})
const formAdd = ref({
    docDesc:'',
    docDescLao:'',
})
const formDelete = ref({
    docType:''
})
const formGet = ref({ docType:''})
// function
const onGetDocType = async () => {
    if (docTypeList.value.length === 0) {
        showLoading.value = true
    }
    const { data } = await useServer('doc-type/get', {
        method: 'POST',
        body: JSON.stringify(formGet.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        setDocumentTypeList(res?.resData)
        const count: any = res?.resData?.length
        const resMath = (count / 10).toFixed(1)?.toString()
        const splitRes = resMath.split('.')
        if (splitRes[1] === '0') {
            countPage.value = parseFloat(splitRes[0])
        } else {
            countPage.value = parseFloat(splitRes[0]) + 1
        }
        showLoading.value = false
    } else {
        showLoading.value = false
        Swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
    }
}
if(process.server){
    await onGetDocType()
}
const onGetDataForUpdate = (docType:any,docDescLao:any,docDesc:any) =>{
    formUpdate.value.docDesc = docDesc
    formUpdate.value.docDescLao = docDescLao
    formUpdate.value.docType = docType
    showDialogUpdate.value = true
}
const onUpdate = async () =>{
    
    showLoading.value = true
    const { data } = await useServer('doc-type/update', {
        method: 'POST',
        body: JSON.stringify(formUpdate.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showDialogUpdate.value = false
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetDocType()
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const onDelete = async (key:any) =>{
    formDelete.value.docType = key
    showLoading.value = true
    const { data } = await useServer('doc-type/delete', {
        method: 'POST',
        body: JSON.stringify(formDelete.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetDocType()
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const onSave = async () =>{
    showLoading.value = true
    const { data } = await useServer('doc-type/create', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetDocType()
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
watch(page, () => {
        startPage.value = (page.value - 1)*10
        endPage.value = page.value * 10
})
onMounted(()=>{
    onGetDocType()
})
</script>