<template>
    <div>
        <v-card width="1400" flat class="mx-auto pb-4" style="background-color: #ECF5F8;">
            <v-btn color="#243B7A" @click="showDialogAddUser = true">
                <Icon name="mingcute:plus-line" />ເພີ່ມຜູ້ເຂົ້າໃຊ້
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ userList?.length
            }})</span>
        </v-card>
        <v-card width="1400" class="mx-auto">
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
                    <tr v-for="(item, index) in userList?.slice(startPage, endPage)" :key="index"
                        :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', 'height': '10px' }"
                        @mouseover="active = index.toString()" @mouseleave="active = ''">
                        <td style="height: 10;">{{ item?.userId }}</td>
                        <td style="font-size: 12pt;">{{ item?.userName }}</td>
                        <td style="font-size: 12pt;">{{ item?.passWord }}</td>
                        <td style="font-size: 12pt;">{{ item?.fullNameLa }} <br /> {{ item?.fullNameEn }}</td>
                        <td style="font-size: 12pt;">{{ item?.dob }}</td>
                        <td style="font-size: 12pt;">{{ item?.tel }}</td>
                        <td style="font-size: 12pt;">{{ item?.email }}</td>
                        <td>
                            <v-btn @click="onGetDataForUpdate(
                                item?.id, item?.userId, item?.userName, item?.fullNameEn, item?.fullNameLa, item?.gender, item?.dob, item?.secCode, item?.idtype, item?.tel, item?.email, item?.passWord
                            )" density="comfortable" variant="text">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                            <v-btn @click="onDelete(item?.id)" density="comfortable" variant="text">
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
                            <v-col><v-select v-model="formAdd.gender" label="ເລືອກເພດ" :items="generItems"
                                    item-title="title" item-value="gender" hide-details="auto"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field type="date" v-model="formAdd.dob" label="ວັນເດືອນປີເກີດ"
                                    hide-details="auto"></v-text-field>

                            </v-col>
                            <v-col><v-text-field v-model="formAdd.tel" label="ເບີໂທລະສັບ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນເບີໂທ']" hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.email" label="ອີແມວ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນອີເມວ']" hide-details="auto"></v-text-field></v-col>
                            <v-col><v-select v-model="formAdd.secCode" label="ຂື້ນກັບຂະແໜງ"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກຂະແໜງ']" :items="sectiontList" hide-details="auto"
                                    item-title="secDescLao" item-value="secCode"></v-select></v-col>
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
        <v-dialog max-width="800" v-model="showDialogUpdateUser" persistent>
            <v-card>
                <v-card-title>ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້</v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" @submit.prevent>
                    <v-card-text class="pt-8">
                        <v-row>
                            <v-col><v-text-field v-model="formUpdate.userId" label="ລະຫັດພະນັກງານ" hide-details="auto"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ']"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formUpdate.userName" label="ຊື່ເຂົ້າໃຊ້"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນຊື່ເຂົ້າໃຊ້']"
                                    hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formUpdate.passWord" label="ລະຫັດຜ່ານ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']" hide-details="auto"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formUpdate.fullNameLa" label="ຊື່ ແລະ ນາມສະກຸນ(ລາວ)"
                                    hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formUpdate.fullNameEn" label="ຊື່ ແລະ ນາມສະກຸນ(ອັງກິດ)"
                                    hide-details="auto"></v-text-field></v-col>
                            <v-col><v-select v-model="formUpdate.gender" label="ເລືອກເພດ" :items="generItems"
                                    item-title="title" item-value="gender" hide-details="auto"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field type="date" v-model="formUpdate.dob" label="ວັນເດືອນປີເກີດ"
                                    hide-details="auto"></v-text-field>

                            </v-col>
                            <v-col><v-text-field v-model="formUpdate.tel" label="ເບີໂທລະສັບ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນເບີໂທ']" hide-details="auto"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formUpdate.email" label="ອີແມວ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນອີເມວ']" hide-details="auto"></v-text-field></v-col>
                            <v-col><v-select v-model="formUpdate.secCode" label="ຂື້ນກັບຂະແໜງ"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກຂະແໜງ']" :items="sectiontList" hide-details="auto"
                                    item-title="secDescLao" item-value="secCode"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select v-model="formUpdate.userType" :items="userTypeList" label="ເລືອກປະເພດ User"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກເລືອກປະເພດ User']" item-title="typeDescLao"
                                    item-value="id" hide-details="auto">
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <div class="d-flex pa-4">
                        <v-spacer></v-spacer>
                        <v-btn @click="showDialogUpdateUser = false" variant="outlined" color="red"
                            class="mr-2">ປິດອອກ</v-btn>
                        <v-btn color="#243B7A" type="sumit" @click="onUpdate">ບັນທຶກ</v-btn>
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
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setUserTypeList, setSectionList, setUserList } = manageState
const userTypeList = computed(() => { return manageState.userTypeList })
const sectiontList = computed(() => { return manageState.sectionList })
const userList = computed(() => { return manageState.userList })
// state
const active = ref<string>('')
const showDialogAddUser = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const showDialogUpdateUser = ref<boolean>(false)
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(10)
const countPage = ref<number>(0)
// form data
const generItems = ref([
    {
        gender: 'F',
        title: 'ຍີງ'
    },
    {
        gender: 'M',
        title: 'ຊາຍ'
    }
])
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
const formUpdate = ref({
    id: '',
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
const formDelete = ref({ id: '' })
const formGet = ref({ userType: '', userName: '' })
const formGetSection = ref({secCode:''})
// fucntion
const onGetUserTypeList = async () => {
    if (userTypeList.value.length === 0) {
        const { data } = await useServer('Auth/get', {
            method: 'POST',
            body: ''
        })
        const res: any = data.value
        setUserTypeList(res?.resData)
    }

}

const onGetSection = async () => {
    if (sectiontList.value.length === 0) {
        const { data } = await useServer('section/get', {
            method: 'POST',
            body: JSON.stringify(formGetSection.value)
        })
        const res: any = data.value
        setSectionList(res?.resData)
    }
}
const onSave = async () => {
    if (formAdd.value.userId === '' || formAdd.value.userName === '' || formAdd.value.passWord === '' || formAdd.value.tel === '' || formAdd.value.email === '' || formAdd.value.secCode === '' || formAdd.value.userType === '') return

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
        formAdd.value.dob = ''
        formAdd.value.email = ''
        formAdd.value.fullNameEn = ''
        formAdd.value.fullNameLa = ''
        formAdd.value.passWord = ''
        formAdd.value.tel = ''
        formAdd.value.userId = ''
        formAdd.value.userName = ''
    } else {
        console.log(res)
        Swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
        showLoading.value = false
    }
}
const onGetUserList = async () => {
    const userT = useCookie('status')
    const username = useCookie('userName')
    if (userList.value.length === 0) {
        showLoading.value = true
    }
    formGet.value.userName = username.value ? username.value : ''
    formGet.value.userType = userT.value ? userT.value : ''
    const { data } = await useServer('Auth/get-user-list', {
        method: 'POST',
        body: JSON.stringify(formGet.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        setUserList(res?.resData)
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
const onGetDataForUpdate = (
    id: any, userId: any, userName: any, fullNameEn: any, fullNameLa: any, gender: any, dob: any, secCode: any, userType: any, tel: any, email: any, passWord: any
) => {
    formUpdate.value.id = id
    formUpdate.value.userId = userId
    formUpdate.value.userName = userName
    formUpdate.value.fullNameEn = fullNameEn
    formUpdate.value.fullNameLa = fullNameLa
    formUpdate.value.gender = gender
    formUpdate.value.dob = dob
    formUpdate.value.secCode = secCode
    formUpdate.value.userType = userType
    formUpdate.value.tel = tel
    formUpdate.value.email = email
    formUpdate.value.passWord = passWord
    showDialogUpdateUser.value = true
}
const onUpdate = async () => {
    showLoading.value = true

    const { data } = await useServer('Auth/update', {
        method: 'POST',
        body: JSON.stringify(formUpdate.value)
    })
    const res: any = data.value

    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showDialogUpdateUser.value = false
        showSuccess.value = true
        onGetUserList()
    } else {
        showLoading.value = false
        Swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
    }
}
const onDelete = async (key: any) => {
    formDelete.value.id = key
    showLoading.value = true
    const { data } = await useServer('Auth/delete', {
        method: 'POST',
        body: JSON.stringify(formDelete.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showSuccess.value = true
        onGetUserList()
    } else {
        showLoading.value = false
        Swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
    }
}
if (process.server) {
    await onGetUserTypeList()
    await onGetUserList()
    await onGetSection()
}
watch(page, () => {
    startPage.value = (page.value - 1) * 10
    endPage.value = page.value * 10
})
onMounted(() => {
    onGetUserTypeList()
    onGetSection()
    onGetUserList()
})
</script>