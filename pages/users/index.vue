<template>
    <div>
        <v-card width="1200" flat class="mx-auto pb-4" style="background-color: #ECF5F8;">
            <v-btn color="#243B7A" @click="showDialogAddUser = true">
                <Icon name="mingcute:plus-line" />ເພີ່ມຜູ້ເຂົ້າໃຊ້
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ 10
            }})</span>
        </v-card>
        <v-card width="1200" class="mx-auto">
            <v-table>
                <thead>
                    <tr style="background-color: #243B7A;">
                        <th class="text-left text-white">
                            ລະຫັດພ/ງ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ເຂົ້າໃຊ້
                        </th>
                        <th class="text-left text-white">
                            ລະຫັດຜ່ານ
                        </th>
                        <th class="text-left text-white">
                            ຊື່ ແລະ ນາມສະກຸນ
                        </th>
                        <th class="text-left text-white">
                            ວ,ດ,ປ
                        </th>
                        <th class="text-left text-white">
                            ເບີໂທ
                        </th>
                        <th class="text-left text-white">
                            ອີແມວ
                        </th>
                        <th class="text-left text-white">
                            ຈັດການ
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in 4" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="height: 10;">{{ }}</td>
                        <td style="font-size: 12pt;"></td>
                        <td style="font-size: 12pt;">{{ }}</td>
                        <td style="font-size: 12pt;">{{ }}</td>
                        <td style="font-size: 12pt;">{{ }}</td>
                        <td style="font-size: 12pt;">{{ }}</td>
                        <td style="font-size: 12pt;">{{ }}</td>
                        <td>
                            <v-btn density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                            <v-btn density="comfortable" variant="text">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>


                    </tr>
                </tbody>
            </v-table>
            <!-- <div class="d-flex">
                 <div style="width: 50%;"></div> 
                <div style="width: 100%">
                    <v-pagination v-model="page" :length="countPage" rounded="circle"></v-pagination>
                </div>
            </div> -->
        </v-card>
        <v-dialog max-width="800" v-model="showDialogAddUser" persistent>
            <v-card>
                <v-card-title>ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້</v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" @submit.prevent>
                    <v-card-text class="pt-8">
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.userId" label="ລະຫັດພະນັກງານ" hide-details="auto"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ']"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formAdd.userName" label="ຊື່ເຂົ້າໃຊ້"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນຊື່ເຂົ້າໃຊ້']"
                                    hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.passWord" label="ລະຫັດຜ່ານ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']" hide-details="auto"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formAdd.fullNameLa" label="ຊື່ ແລະ ນາມສະກຸນ(ລາວ)"
                                    hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.fullNameEn" label="ຊື່ ແລະ ນາມສະກຸນ(ອັງກິດ)"
                                    hide-details="auto"></v-text-field></v-col>
                            <v-col><v-select v-model="formAdd.gender" label="ເລືອກເພດ" :items="['ຍີງ', 'ຊາຍ']"
                                    hide-details="auto"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.dob" label="ວັນເດືອນປີເກີດ"
                                    hide-details="auto"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formAdd.tel" label="ເບີໂທລະສັບ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນເບີໂທ']" hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.email" label="ອີແມວ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນອີເມວ']" hide-details="auto"></v-text-field></v-col>
                            <v-col><v-select v-model="formAdd.secCode" label="ຂື້ນກັບຂະແໜງ"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກຂະແໜງ']" :items="sectiontList"
                                    hide-details="auto" item-title="secDescLao" item-value="secId"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select v-model="formAdd.userType" :items="userTypeList" label="ເລືອກປະເພດ User"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກເລືອກປະເພດ User']" item-title="typeDescLao"
                                    item-value="id" hide-details="auto">
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <div class="d-flex pa-4">
                        <v-spacer></v-spacer>
                        <v-btn @click="showDialogAddUser = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                        <v-btn color="#243B7A" type="sumit" @click="onSave">ບັນທຶກ</v-btn>
                    </div>
                </v-form>

            </v-card>
        </v-dialog>
        <loading v-model="showLoading" />
        <success v-model="showSuccess" />
    </div>
</template> 
<script setup lang="ts">
const api = useRuntimeConfig()
import axios from 'axios';
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import Swal from 'sweetalert2';
// store sate
const manageState = useManageState()
const { setUserTypeList, setSectionList } = manageState
const userTypeList = computed(() => { return manageState.userTypeList })
const sectiontList = computed(() => { return manageState.sectionList })
// state
const active = ref<string>('')
const showDialogAddUser = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
// form data
const formAdd = ref({
    userId: '',
    passWord: '',
    userName: '',
    fullNameEn: '',
    fullNameLa: '',
    gender: '',
    dob: '',
    secCode: '',
    userType: '',
    userStatus: 'N',
    tel: '',
    email: '',
    loginStatus: 'A',
    toKen: "000"

})

// fucntion
const onGetUserTypeList = async () => {
    if (userTypeList.value.length === 0) {
        try {
            await axios.post(`${api.public.API_URL}/UserType/getUserType`).then((data) => {
                setUserTypeList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }

}
const onGetSection = async () => {
    if (sectiontList.value.length === 0) {
        let data = { secCode: '' }
        try {
            await axios.post(`${api.public.API_URL}/Section/getSections`, data).then((data) => {
                setSectionList(data?.data?.resData)
            });
        } catch (error) {
            console.log(error)
        }
    }
}
const onSave = async () => {
    showLoading.value = true
    const { data } = await useServer('Auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    const res: any = data.value
    console.log(res)
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showSuccess.value = true
    } else {
        console.log(res)
        Swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
        showLoading.value = false
    }
}
onMounted(() => {
    onGetUserTypeList()
    onGetSection()
})
</script>