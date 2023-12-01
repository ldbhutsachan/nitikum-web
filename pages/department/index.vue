<template>
    <div>
        <v-card width="1200" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn color="#243B7A" @click="showDialogAdd = true">
                <Icon name="mingcute:plus-line" />ເພີ່ມຝ່າຍ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ departmentList?.length
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
                            ຊື່ຝ່າຍ
                        </th>
                        <th class="text-left text-white">
                            ຂຶ້ນກັບສາຂາ
                        </th>
                        <th class="text-left text-white" colspan="2">
                            ຈັດການ
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in departmentList?.slice(startPage,endPage)" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td>{{ item?.deptId }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ item?.deptDesc }}</span><br /> {{
                            item?.deptLao }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ item?.branchNameEn }}</span><br />
                            {{ item?.branchNameLa }}</td>
                        <td>
                            <v-btn @click="onGetDataForUpdate(
                                item?.deptId, item?.branchCode, item?.deptDesc, item?.deptLao
                            )" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>

                        </td>
                        <td>
                            <v-btn @click="onDelete(item?.deptId)" density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>


                    </tr>
                </tbody>
            </v-table>
            <!-- <span>{{ startPage }}======{{ setBranchList?.resData?.length }}=====</span>
            <span>{{ endPage }}</span> -->
            <div class="d-flex " style="padding-left: 200px;padding-right: 200px;">
                
                <div style="width: 100%;">
                    <v-pagination v-model="page" :length="countPage" rounded="circle"></v-pagination>
                </div>
            </div>
        </v-card>
        <v-dialog max-width="500" v-model="showDialogAdd">
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນຝ່າຍ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
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
                <v-card-title>ແກ້ໄຂຂໍ້ມູນຝ່າຍ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ຊື່ຝ່າຍພາສາອັງກິດ" v-model="formUpdate.deptDesc"></v-text-field>
                    <v-text-field label="ຊື່ຝ່າຍພາສາລາວ" v-model="formUpdate.deptLao"></v-text-field>
                    <v-select label="ເລືອກສາຂາ" v-model="formUpdate.branchCode" :items="branchList" item-title="brNameLa"
                        item-value="branchCode"></v-select>
                </v-card-text>
                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogUpdate = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onUpdateDept" color="#243B7A">ແກ້ໄຂ</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
    </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import swal from 'sweetalert2'
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import { useManageState } from '~/stores/manage-state'
const api = useRuntimeConfig()
// state 
const active = ref<string>('')
const showDialogAdd = ref<boolean>(false)
const branchList: any = ref([])
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const showDialogUpdate = ref<boolean>(false)
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(10)
const countPage = ref<number>(0)
// stores state
const manageState = useManageState()
const { setDeparmentList } = manageState
const departmentList = computed(() => { return manageState.departmentList })
// form data
const formAdd = ref({ deptDesc: '', deptLao: '', branchCode: '' })
const formUpdate = ref({ deptId: '', deptDesc: '', deptLao: '', branchCode: '' })
const formDelete = ref({ deptId: '' })
// functions
const onGetBranchList = async () => {
    let data = {
        branchCode: ''
    }
    try {
        await axios.post(`${api.public.API_URL}/Branch/getBranchList`, data).then((data) => {
            console.log(data?.data?.resData)
            branchList.value = data?.data?.resData
        });
    } catch (error) {
        console.log(error)
    }
}
const onSave = async () => {
    showLoading.value = true
    const { data } = await useServer('Dept/create', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showSuccess.value = true
        formAdd.value.branchCode = ''
        formAdd.value.deptLao = ''
        formAdd.value.deptDesc = ''
    } else {
        swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
        showLoading.value = false
    }
}
const onGetDeptMent = async () => {
    if (departmentList.value.length === 0) {
        showLoading.value = true;
    }
    let data = {
        deptId: ''
    }
    try {
        await axios.post(`${api.public.API_URL}/Dept/getDeptList`, data).then((data) => {
            setDeparmentList(data?.data?.resData)
            const count: any = data?.data?.resData?.length
            const resMath = (count / 10).toFixed(1)?.toString()
            const splitRes = resMath.split('.')
            if (splitRes[1] === '0') {
                countPage.value = parseFloat(splitRes[0])
            } else {
                countPage.value = parseFloat(splitRes[0]) + 1
            }
            showLoading.value = false;
        });
    } catch (error) {
        console.log(error)
        showLoading.value = false;
    }
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
        showSuccess.value = true
    } else {
        swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
        showLoading.value = false
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
        showSuccess.value = true
        onGetDeptMent()
    } else {
        swal.fire({
            icon: 'error',
            text: res
        })
    }
}
watch(page, () => {
        startPage.value = (page.value - 1)*10
        endPage.value = page.value * 10
})
onMounted(() => {
    onGetBranchList()
    onGetDeptMent()
})
</script>