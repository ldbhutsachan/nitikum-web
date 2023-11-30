<template>
    <div>
        <v-card width="1200" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນຂະແໜງ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ sectiontList?.length
            }})</span>
        </v-card>
        <v-card width="1200" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A">
                        <th class="text-left text-white">
                            ຊື່ຂະແໜງ
                        </th>
                        <th class="text-left text-white">
                            ຂຶ້ນກັບຝ່າຍ
                        </th>
                        <th class="text-left text-white" colspan="2">
                            ຈັດການ
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in sectiontList" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ item?.secDesc }}</span><br />{{ item?.secDescLao }}</td>
                        <td style="font-size: 10pt;"><span style="font-weight: bold;">{{ item?.deptEN }}</span> <br /> {{ item?.deptLa }}</td>
                        <!-- <td></td> -->
                        <td>
                            <v-btn @click="onGetDataForUpdate(
                                item?.secId, item?.secCode, item?.secDesc, item?.secDescLao, item?.deptCode
                            )" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>

                        </td>
                        <td>
                            <v-btn @click="onDelete(item?.secId)" density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>


                    </tr>
                </tbody>
            </v-table>
            <div class="d-flex">
                
                <div style="width: 100%;">
                    <v-pagination v-model="page" :length="countPage" rounded="circle"></v-pagination>
                </div>
            </div>
        </v-card>
        <v-dialog max-width="500" v-model="showDialogAdd">
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນຂະແໜງ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ລະຫັດຂະແໜງ" v-model="formAdd.secCode"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາອັງກິດ" v-model="formAdd.secDesc"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາລາວ" v-model="formAdd.secDescLao"></v-text-field>
                    <v-select label="ເລືອກຝ່າຍ" v-model="formAdd.deptCode" :items="departmentList" item-title="deptLao"
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
                <v-card-title>ແກ້ໄຂຂໍ້ມູນຂະແໜງ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ລະຫັດຂະແໜງ" v-model="formUpdate.secCode"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາອັງກິດ" v-model="formUpdate.secDesc"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາລາວ" v-model="formUpdate.secDescLao"></v-text-field>
                    <v-select label="ເລືອກຝ່າຍ" v-model="formUpdate.deptCode" :items="departmentList" item-title="deptLao"
                        item-value="deptId"></v-select>
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
    </div>
</template>
<script setup lang="ts">
const api = useRuntimeConfig()
import axios from 'axios';
import swal from 'sweetalert2'
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'

// stores state
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
    secId:''
})
// functions
const onGetDeptMent = async () => {
    if (departmentList.value.length === 0) {
        let data = { deptId: '' }
        try {
            await axios.post(`${api.public.API_URL}/Dept/getDeptList`, data).then((data) => {
                setDeparmentList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
const onGetSectionList = async () => {
    if (sectiontList.value.length === 0) {
        showLoading.value = true
    }
    let data = { secCode: '' }
    try {
        await axios.post(`${api.public.API_URL}/Section/getSections`, data).then((data) => {
            setSectionList(data?.data?.resData)
            const count: any = data?.data?.resData?.length
            const resMath = (count / 10).toFixed(1)?.toString()
            const splitRes = resMath.split('.')
            if (splitRes[1] === '0') {
                countPage.value = parseFloat(splitRes[0])
            } else {
                countPage.value = parseFloat(splitRes[0]) + 1
            }
            showLoading.value = false
        });
    } catch (error) {
        console.log(error)
        showLoading.value = false
    }
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
        showSuccess.value = true
        formAdd.value.deptCode = ''
        formAdd.value.secCode = ''
        formAdd.value.secDesc = ''
        formAdd.value.secDescLao = ''
    } else {
        console.log(res)
        showLoading.value = false
        showDialogAdd.value = false
        swal.fire({
            icon: 'error',
            text: 'ລະຫັດຂະແໜງຊໍ້າກັນ, ກະລຸນາປ້ອນໃໝ່'
        })
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
        showSuccess.value = true
        onGetSectionList()
    } else {
        console.log(res)
        showLoading.value = false
        showDialogUpdate.value = false
        swal.fire({
            icon: 'error',
            text: 'ລະຫັດຂະແໜງຊໍ້າກັນ, ກະລຸນາປ້ອນໃໝ່'
        })
    }
}
const onDelete = async (key:any) =>{
    formDelete.value.secId = key
    showLoading.value = true
    const { data } = await useServer('section/delete', {
        method: 'POST',
        body: JSON.stringify(formDelete.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showSuccess.value = true
        onGetSectionList()
    } else {
        console.log(res)
        showLoading.value = false
        swal.fire({
            icon: 'error',
            text: res?.massage?.resMgs
        })
    }
}
watch(page, () => {
        startPage.value = (page.value - 1)*10
        endPage.value = page.value * 10
})
onMounted(() => {
    onGetDeptMent()
    onGetSectionList()
})
</script>