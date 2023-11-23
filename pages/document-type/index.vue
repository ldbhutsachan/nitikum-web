<template>
    <div>
        <v-card width="1200" flat class="mx-auto py-4" style="background-color: #ECF5F8;">
            <v-btn color="#243B7A" @click="showDialogAddbranch = true">
                <Icon name="mingcute:plus-line" />ເພີ່ມສາຂາ
            </v-btn>
        </v-card>
        <v-card width="1200" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A;">
                        <th class="text-left text-white">
                            ລະຫັດສາຂາ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ສາຂາພາສາອັງກິດ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ສາຂາພາສາລາວ
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
                    <tr v-for="(item, index) in setBranchList?.resData" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="height: 10;">{{ item.branchCode }}</td>
                        <td>{{ item.brName }}</td>
                        <td>{{ item.brNameLa }}</td>
                        <td>{{ item.location }}</td>
                        <td>{{ item.brType }}</td>
                        <td>{{ item.underBr }}</td>
                        <td>
                            <v-btn density="comfortable" variant="text">
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
            <span>{{ endPage }}</span>
            <div class="d-flex">
                <div style="width: 50%;"></div>
                <div style="width: 50%;">
                    <v-pagination v-model="page" :length="setBranchList?.resData?.length" rounded="circle"></v-pagination>
                </div>
            </div> -->
        </v-card>
        <v-dialog max-width="500" v-model="showDialogAddbranch">
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
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
    </div>
</template>
<script setup lang="ts">
const api = useRuntimeConfig()
import swal from 'sweetalert2'
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import { type BranchModel } from '~/models/BranchModels'
import axios from 'axios';
// state management
const active = ref<string>('')
const showDialogAddbranch = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const setBranchList = ref<BranchModel>()
const page = ref<number>()
const startPage = ref<number>(0)
const endPage = ref<number>(10)
// functions
const branchFormCreate = ref({
    branchCode: '',
    brName: '',
    brNameLa: '',
    location: '',
    brType: '',
    underBr: ''
})
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
const onDelete = async (key:any) =>{
    deleteForm.value.id = key
    const { data } = await useServer('Branch/delete', {
        method: 'POST',
        body: JSON.stringify(deleteForm.value)
    })
    onGetBranchList()
}
const getBranchListForm = ref({
    branchCode: ''
})
const onGetBranchList = async () => {
    showLoading.value = true
    const { data } = await useServer('Branch/get-list', {
        method: 'POST',
        body: JSON.stringify(getBranchListForm.value)
    })
    const res: any = data.value
    setBranchList.value = res as BranchModel
    showLoading.value = false
    // let data = {
    //     branchCode:''
    // }
    // await axios.post(`${api.public.API_URL}Branch/getBranchList`,data).then((data)=>{
    //     console.log(data)
    // })
    // console.log(api.public.API_URL)
    // await axios.post(`${api.public.API_URL}/Branch/getBranchList`,data).then((data)=>{
    //     console.log(data)
    // })
}
watch(page, () => {
    if (page.value !== 0) {
        startPage.value = startPage.value + 10
        endPage.value = page.value ? page.value * 10 : 1 * 10
    }

})
onMounted(() => {
    onGetBranchList()
})
</script>