<template>
    <div>
        <v-card width="1000" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn icon style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"
                @click="showDialogAdd = true">
                <Icon name="mingcute:plus-line" />
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ departmentList?.length
                }})</span>
        </v-card>
        <v-card width="1000" class="mx-auto" rounded="lg">
            <div class="d-flex align-center">
                <v-text-field v-model="search" label="ຄົ້ນຫາ..." density="comfortable" clearable></v-text-field>
            </div>
            <v-data-table :headers="headersT" :items="departmentList" :items-per-page="20" :search="search">
                <template v-slot:item="row: any">
                    <tr>
                        <td>{{ row?.index + 1 }}</td>
                        <td>{{ row?.item?.deptId }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ row?.item?.deptDesc }}</span><br />
                         {{row?.item?.deptLao }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ row?.item?.branchNameEn }}</span><br />
                            {{ row?.item?.branchNameLa }}</td>
                        <td>
                            <v-btn @click="onGetDataForUpdate(
                                row?.item?.deptId, row?.item?.branchCode, row?.item?.deptDesc, row?.item?.deptLao
                            )" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                        </td>
                        <td>
                            <v-btn @click="onDelete(row?.item?.deptId)" density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog max-width="500" v-model="showDialogAdd">
            <v-card rounded="lg">
                <v-card-title
                    class="bgg d-flex"><v-spacer></v-spacer>ເພີ່ມຂໍ້ມູນຝ່າຍ<v-spacer></v-spacer></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-10">
                    <v-text-field label="ຊື່ຝ່າຍພາສາອັງກິດ" v-model="formAdd.deptDesc"></v-text-field>
                    <v-text-field label="ຊື່ຝ່າຍພາສາລາວ" v-model="formAdd.deptLao"></v-text-field>
                    <v-select label="ເລືອກສາຂາ" v-model="formAdd.branchCode" :items="branchList" item-title="brNameLa"
                        item-value="branchCode"></v-select>
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
                    class="bgg d-flex"><v-spacer></v-spacer>ແກ້ໄຂຂໍ້ມູນຝ່າຍ<v-spacer></v-spacer></v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ຊື່ຝ່າຍພາສາອັງກິດ" v-model="formUpdate.deptDesc"></v-text-field>
                    <v-text-field label="ຊື່ຝ່າຍພາສາລາວ" v-model="formUpdate.deptLao"></v-text-field>
                    <v-select label="ເລືອກສາຂາ" v-model="formUpdate.branchCode" :items="branchList"
                        item-title="brNameLa" item-value="branchCode"></v-select>
                </v-card-text>
                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogUpdate = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onUpdateDept" color="#243B7A">ແກ້ໄຂ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template>
<script setup lang="ts">
import loading from '~/components/loading/loading.vue'
import { useManageState } from '~/stores/manage-state'

import Swal from 'sweetalert2';
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
const showDialogAdd = ref<boolean>(false)
const branchList: any = ref([])
const showLoading = ref<boolean>(false)
const showDialogUpdate = ref<boolean>(false)
const manageState = useManageState()
const { setDeparmentList } = manageState
const departmentList = computed(() => { return manageState.departmentList })
const formAdd = ref({ deptDesc: '', deptLao: '', branchCode: '' })
const formUpdate = ref({ deptId: '', deptDesc: '', deptLao: '', branchCode: '' })
const formDelete = ref({ deptId: '' })
const formGet = ref({ deptId: '' })
const formGetBranch = ref({ branchCode: '' })
const search = ref<string>('')
const headersT = ref<any>([
    { title: 'ລຳດັບ', align: 'start', sortable: true, key: 'index' },
    { title: 'ລະຫັດ', align: 'start', sortable: true, key: 'deptId' },
    { title: 'ຊື່ຝ່າຍ', align: 'start', sortable: true, key: 'deptLao' },
    { title: 'ຂຶ້ນກັບສາຂາ/ຝ່າຍ', align: 'start', sortable: true, key: 'branchNameLa' },
    { title: 'ແກ້ໄຂ', align: 'start', sortable: true, key: 'edit' },
    { title: 'ລຶບອອກ', align: 'start', sortable: true, key: 'delete' },
])
const onGetBranchList = async () => {
    const { data } = await useServer('Branch/get-list', {
        method: 'POST',
        body: JSON.stringify(formGetBranch.value)
    })
    const res: any = data.value
    branchList.value = res?.resData
}
const onSave = async () => {
    // console.log(formAdd.value)
    // return;
    showLoading.value = true
    const { data } = await useServer('Dept/create', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        formAdd.value.branchCode = ''
        formAdd.value.deptLao = ''
        formAdd.value.deptDesc = ''
        onGetDeptMent()
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const onGetDeptMent = async () => {
    if (departmentList.value.length === 0) {
        showLoading.value = true;
    }
    const { data } = await useServer('Dept/get', {
        method: 'POST',
        body: JSON.stringify(formGet.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        setDeparmentList(res?.resData)

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
    await onGetDeptMent()
    await onGetBranchList()
}
const onGetDataForUpdate = (deptId: any, branchCode: any, deptDesc: any, deptLao: any) => {
    formUpdate.value.deptId = deptId
    formUpdate.value.branchCode = branchCode
    formUpdate.value.deptDesc = deptDesc
    formUpdate.value.deptLao = deptLao
    showDialogUpdate.value = true
}
const onUpdateDept = async () => {
    showLoading.value = true
    const { data } = await useServer('Dept/update', {
        method: 'POST',
        body: JSON.stringify(formUpdate.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showDialogUpdate.value = false
        showLoading.value = false
        onGetDeptMent()
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
const onDelete = async (key: any,) => {
    formDelete.value.deptId = key
    const { data } = await useServer('Dept/delete', {
        method: 'POST',
        body: JSON.stringify(formDelete.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetDeptMent()
    } else {
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}

onGetBranchList()
onGetDeptMent()
</script>