<template>
    <div>
        <v-card width="2800" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn elevation="0" style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"
                @click="showDialogAdd = true">
                <Icon name="mingcute:plus-line" />
                ເພີ່ມຂໍ້ມູນຂະແໜງ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ sectiontList?.length
                }})</span>
        </v-card>
        <v-card width="2800" class="mx-auto card-shadow pa-10" rounded="lg" >
            <div class="d-flex align-center" >
                <v-text-field v-model="search" label="ຄົ້ນຫາ..." density="comfortable" clearable></v-text-field>
                
            </div>
            <v-data-table :headers="headersT" :items="sectiontList" :items-per-page="20" :search="search">
                <template v-slot:item="row: any">
                    <tr>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ row?.item?.secDesc
                                }}</span><br />{{ row?.item?.secDescLao }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ row?.item?.deptEN }}</span>
                            <br />
                            {{row?.item?.deptLa }}</td>
                        <td>
                            <v-btn @click="onGetDataForUpdate(
                                row?.item?.secId, row?.item?.secCode, row?.item?.secDesc, row?.item?.secDescLao, row?.item?.deptCode
                            )" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                        </td>
                        <td>
                            <v-btn @click="onDelete(row?.item?.secId)" density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>

        </v-card>
        <v-dialog max-width="500" v-model="showDialogAdd">
            <v-card>
                <v-card-title
                    class="bgg d-flex"><v-spacer></v-spacer>ເພີ່ມຂໍ້ມູນຂະແໜງ<v-spacer></v-spacer></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ລະຫັດຂະແໜງ" v-model="formAdd.secCode"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາອັງກິດ" v-model="formAdd.secDesc"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາລາວ" v-model="formAdd.secDescLao"></v-text-field>
                    <v-select label="ເລືອກສາຂາ ຫຼື ຝ່າຍ" v-model="formAdd.deptCode" :items="departmentList" item-title="deptLao"
                        item-value="deptId"></v-select>
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
                <v-card-title
                    class="bgg d-flex"><v-spacer></v-spacer>ແກ້ໄຂຂໍ້ມູນຂະແໜງ<v-spacer></v-spacer></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ລະຫັດຂະແໜງ" v-model="formUpdate.secCode"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາອັງກິດ" v-model="formUpdate.secDesc"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາລາວ" v-model="formUpdate.secDescLao"></v-text-field>
                    <v-select label="ເລືອກສາຂາ ຫຼື ຝ່າຍ" v-model="formUpdate.deptCode" :items="departmentList"
                        item-title="deptLao" item-value="deptId"></v-select>
                </v-card-text>
                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogUpdate = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onUpdate" color="#243B7A">ແກ້ໄຂ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template>
<script setup lang="ts">
import swal from 'sweetalert2'
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
// import { VDataTable } from 'vuetify/labs/VDataTable'
// alert 
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
// stores state
import Swal from 'sweetalert2';
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setSectionList, setDeparmentList } = manageState
const sectiontList = computed(() => { return manageState.sectionList })
const departmentList = computed(() => { return manageState.departmentList })
// state
const active = ref<string>('')
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const showDialogAdd = ref<boolean>(false)
const showDialogUpdate = ref<boolean>(false)
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(10)
const countPage = ref<number>(0)
const search = ref<string>('')
const headersT = ref<any>([
    { title: 'ຊື່ຂະແໜງ', align: 'start', sortable: true, key: 'secDescLao' },
    { title: 'ຂຶ້ນກັບຝ່າຍ', align: 'start', sortable: true, key: 'deptLa' },
    { title: 'ແກ້ໄຂ', align: 'start', sortable: true, key: 'edit' },
    { title: 'ລຶບອອກ', align: 'start', sortable: true, key: 'delete' },
])
// form data
const formAdd = ref({
    secCode: '',
    secDesc: '',
    secDescLao: '',
    deptCode: ''
})
const formUpdate = ref({
    secId: '',
    secCode: '',
    secDesc: '',
    secDescLao: '',
    deptCode: ''
})
const formDelete = ref({
    secId: ''
})
const formGet = ref({ secCode: '' })
const formGetDep = ref({ deptId: '' })
// functions
const onGetDeptMent = async () => {
    if (departmentList.value.length === 0) {
        const { data } = await useServer('Dept/get', {
            method: 'POST',
            body: JSON.stringify(formGetDep.value)
        })
        const res: any = data.value
        setDeparmentList(res?.resData)
    }
}
const onGetSectionList = async () => {
    if (sectiontList.value.length === 0) {
        showLoading.value = true
    }
    const { data } = await useServer('section/get', {
        method: 'POST',
        body: JSON.stringify(formGet.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        setSectionList(res?.resData)
        const count: any = res?.resData?.length
        const resMath = (count / 20).toFixed(1)?.toString()
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
if (process.server) {
    await onGetSectionList()
    await onGetDeptMent()
}
const onSave = async () => {
    showLoading.value = true
    const { data } = await useServer('section/create', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        onGetSectionList()
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        formAdd.value.deptCode = ''
        formAdd.value.secCode = ''
        formAdd.value.secDesc = ''
        formAdd.value.secDescLao = ''
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const onGetDataForUpdate = (secId: any, secCode: any, secDesc: any, secDescLao: any, deptCode: any) => {
    formUpdate.value.secId = secId
    formUpdate.value.secCode = secCode
    formUpdate.value.secDesc = secDesc
    formUpdate.value.secDescLao = secDescLao
    formUpdate.value.deptCode = deptCode
    showDialogUpdate.value = true
}
const onUpdate = async () => {
    showLoading.value = true
    const { data } = await useServer('section/update', {
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
        onGetSectionList()
    } else {
        console.log(res)
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const onDelete = async (key: any) => {
    formDelete.value.secId = key
    showLoading.value = true
    const { data } = await useServer('section/delete', {
        method: 'POST',
        body: JSON.stringify(formDelete.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetSectionList()
    } else {
        console.log(res)
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
watch(page, () => {
    startPage.value = (page.value - 1) * 10
    endPage.value = page.value * 10
})
onMounted(() => {
    onGetDeptMent()
    onGetSectionList()
})
</script>