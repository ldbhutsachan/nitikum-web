<template>
    <div>
        <v-card width="1200" flat class="mx-auto py-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn @click="showDialogAdd = true" color="#243B7A">
                <Icon name="mingcute:plus-line" />ເພີ່ມຂໍ້ມູນຂະແໜງ
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: (90)</span>
        </v-card>
        <v-card width="1200" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A">
                        <th class="text-left text-white">
                            ຊື່ຂະແໜງພາສາອັງກິດ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ຂະແໜງພາສາລາວ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ຝ່າຍພາສາອັງກິດ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ຝ່າຍພາສາລາວ
                        </th>
                        <th class="text-left text-white" colspan="2">
                            ຈັດການ
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in 2" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>{{ }}</td>
                        <td>
                            <v-btn density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>

                        </td>
                        <td>
                            <v-btn density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>


                    </tr>
                </tbody>
            </v-table>
            <!-- <span>{{ startPage }}======{{ setBranchList?.resData?.length }}=====</span>
            <span>{{ endPage }}</span> -->
            <!-- <div class="d-flex">
                <div style="width: 50%;"></div>
                <div style="width: 50%;">
                    <v-pagination v-model="page" :length="setBranchList?.resData?.length" rounded="circle"></v-pagination>
                </div>
            </div> -->
        </v-card>
        <v-dialog max-width="500" v-model="showDialogAdd">
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນຂະແໜງ</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pt-8">
                    <v-text-field label="ຊື່ຂະແໜງພາສາອັງກິດ"></v-text-field>
                    <v-text-field label="ຊື່ຂະແໜງພາສາລາວ"></v-text-field>
                    <v-select label="ເລືອກຝ່າຍ" :items="departmentList" item-title="deptLao"
                        item-value="deptId"></v-select>
                </v-card-text>

                <div class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="showDialogAdd = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                    <v-btn @click="onSave" color="#243B7A">ບັນທຶກ</v-btn>
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
// form data
const formAdd = ref({
    "secCode": "1011",
    "secDesc": "Audit Operations SectionTEST",
    "secDescLao": "ຂະແໜງປະຕິບັດການກວດສອບTEST",
    "deptCode": "1"
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
const onSave = async () => {
    showLoading.value = true
    const { data } = await useServer('section/create', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    // const res: any = data.value
    // if (res?.message?.resCode === '00') {
    //     showLoading.value = false
    //     showSuccess.value = true
    // } else {
    //     swal.fire({
    //         icon: 'error',
    //         text: res?.message?.resMgs
    //     })
    //     showLoading.value = false
    // }
}
onMounted(()=>{
    onGetDeptMent()
})
</script>