<template>
    <div>
        <v-card max-width="2650" flat class="mx-auto pb-4 d-flex align-center" style="background-color: #ECF5F8;">
            <v-btn icon style="background: linear-gradient(to top, #003E73,#065D9E,#0978BF);color: white;"  @click="showDialogAddUser = true">
                <Icon name="mingcute:plus-line" />
            </v-btn>
            <span class="ml-4 text-green" style="font-weight: bold;font-size: 18pt;">ທັງໝົດ: ({{ userList?.length
            }})</span>
            <div class="d-flex align-center pl-5 pt-4" style="width: 600px;">
                <v-text-field v-model="filterUser" label="ຄົ້ນຫາດ້ວຍໄອດີ, ຊື່, ເບີໂທ" density="comfortable" clearable></v-text-field>
                
            </div>
        </v-card>
        
        <div style="padding-left: 90px;padding-right: 90px;" class="rounded-lg">
            <v-data-table :headers="headersT" :items="userList" :items-per-page="20" :search="filterUser">
                <template v-slot:item="row: any">
                    <tr>
                        <td style="height: 10;">{{ row?.item?.userId }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.userName }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.passWord }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.fullNameLa }} </td>
                        <td style="font-size: 12pt;">{{ row?.item?.dob }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.tel }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.email }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.typeDesc }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.brName }}</td>
                        <td style="font-size: 12pt;">{{ row?.item?.secDescLa }}</td>
                        <td>
                            <v-btn @click="onGetDataForUpdate(
                                row?.item?.id,
                                row?.item?.userId,
                                row?.item?.userName,
                                row?.item?.fullNameEn,
                                row?.item?.fullNameLa,
                                row?.item?.gender,
                                row?.item?.dob,
                                row?.item?.secCode?.toString(),
                                row?.item?.userType,
                                row?.item?.tel,
                                row?.item?.email,
                                row?.item?.passWord,
                                row?.item?.brCode?.toString()
                            )" density="comfortable" variant="outlined" color="primary" class="mr-2">
                                <Icon name="iconamoon:edit-light" size="20" />ແກ້ໄຂ
                            </v-btn>
                            <v-btn @click="onDelete(row?.item?.id)" density="comfortable" variant="outlined" color="red">
                                <Icon name="mingcute:delete-3-fill" color="red" size="20" />ລົບອອກ
                            </v-btn>
                        </td>
                    </tr>
                </template>
        </v-data-table>
        </div>
        <v-dialog max-width="800" v-model="showDialogAddUser" persistent>
            <v-card rounded="lg" >
                <v-card-title class="text-center py-4" >ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້</v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" @submit.prevent>
                    <v-card-text class="pt-8">
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.userId" label="ລະຫັດພະນັກງານ" hide-details="auto"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ']" variant="outlined"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formAdd.userName" label="ຊື່ເຂົ້າໃຊ້"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນຊື່ເຂົ້າໃຊ້']"
                                    hide-details="auto" variant="outlined"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.passWord" label="ລະຫັດຜ່ານ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນລະຫັດຜ່ານ']" hide-details="auto" variant="outlined"></v-text-field></v-col>
                            <v-col><v-text-field v-model="formAdd.fullNameLa" label="ຊື່ ແລະ ນາມສະກຸນ(ລາວ)"
                                    hide-details="auto" variant="outlined"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.fullNameEn" label="ຊື່ ແລະ ນາມສະກຸນ(ອັງກິດ)"
                                    hide-details="auto" variant="outlined"></v-text-field></v-col>
                            <v-col><v-select v-model="formAdd.gender" label="ເລືອກເພດ" :items="generItems"
                                    item-title="title" item-value="gender" hide-details="auto" variant="outlined"></v-select></v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field type="date" v-model="formAdd.dob" label="ວັນເດືອນປີເກີດ"
                                    hide-details="auto" variant="outlined"></v-text-field>

                            </v-col>
                            <v-col><v-text-field v-model="formAdd.tel" label="ເບີໂທລະສັບ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນເບີໂທ']" hide-details="auto" variant="outlined"></v-text-field></v-col>
                        </v-row>
                        <v-row>
                            <v-col><v-text-field v-model="formAdd.email" label="ອີແມວ"
                                    :rules="[v => !!v || 'ກະລຸນາປ້ອນອີເມວ']" hide-details="auto" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-select
                              v-model="formAdd.brCode"
                              label="ຂື້ນກັບຝ່າຍ"
                              :rules="[v => !!v || 'ກະລຸນາເລືອກຝ່າຍ']"
                              :items="branchList"
                              hide-details="auto"
                              variant="outlined"
                              item-title="brNameLa"
                              item-value="branchCode"
                              @update:modelValue="onAddUserBranchChange"
                            />
                          </v-col>
                          <v-col>
                            <v-select
                              v-model="formAdd.secCode"
                              label="ຂື້ນກັບຂະແໜງ"
                              :rules="[v => !!v || 'ກະລຸນາເລືອກຂະແໜງ']"
                              :items="sectionList"
                              hide-details="auto"
                              variant="outlined"
                              item-title="secDescLao"
                              item-value="secCode"
                            />
                          </v-col>
                          
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select v-model="formAdd.userType" :items="userTypeList" label="ເລືອກປະເພດ User"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກເລືອກປະເພດ User']" item-title="typeDescLao"
                                    item-value="id" hide-details="auto" variant="outlined">
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <div class="d-flex pa-4">
                        <v-spacer></v-spacer>
                        <v-btn @click="showDialogAddUser = false" variant="outlined" color="red" class="mr-2"><v-icon>mdi-close</v-icon>ປິດອອກ</v-btn>
                        <v-btn color="#243B7A" type="sumit" @click="onSave"><v-icon>mdi-check-circle</v-icon> ບັນທຶກ</v-btn>
                    </div>
                </v-form>

            </v-card>
        </v-dialog>
        <v-dialog max-width="800" v-model="showDialogUpdateUser" persistent>
            <v-card>
                <v-card-title>ແກ້ໄຂຂໍ້ມູນຜູໃຊ້</v-card-title>
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
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select
                                    v-model="formUpdate.brCode"
                                    :items="branchList"
                                    label="ຂື້ນກັບຝ່າຍ"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກຝ່າຍ']"
                                    hide-details="auto"
                                    variant="outlined"
                                    item-title="brNameLa"
                                    item-value="branchCode"
                                    :return-object="false"
                                    @update:modelValue="val => onUpdateUserBranchChange(val?.toString ? val.toString() : val)"
                                />
                            </v-col>
                            <v-col>
                                <v-select v-model="formUpdate.secCode" label="ຂື້ນກັບຂະແໜງ"
                                    :rules="[v => !!v || 'ກະລຸນາເລືອກຂະແໜງ']" :items="sectionList" hide-details="auto"
                                    item-title="secDescLao" item-value="secCode"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                           <v-col>
                          <v-select
                            v-model="formUpdate.userType"
                            :items="userTypeList"
                            label="ເລືອກປະເພດ User"
                            :rules="[v => !!v || 'ກະລຸນາເລືອກປະເພດ User']"
                            item-title="typeDescLao"
                            item-value="id"
                            hide-details="auto"
                            variant="outlined"
                          />
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
        <alert v-model="showAlert" :messageAlert="messageAlert" :iconType="iconType" @click="showAlert = false" />
    </div>
</template> 
<script setup lang="ts">
const api = useRuntimeConfig()
import axios from 'axios';
import loading from '~/components/loading/loading.vue'
import success from '~/components/Alerts/sucess.vue'
import Swal from 'sweetalert2';
import alert from '~/components/Alerts/alert-box.vue'
const showAlert = ref<boolean>(false)
const iconType = ref<string>('')
const messageAlert = ref<string>('')
// store sate
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const { setUserTypeList, setSectionList, setUserList, setBranchList } = manageState
const userTypeList = computed(() => { return manageState.userTypeList })
const sectiontList = computed(() => { return manageState.sectionList })
const branchList = computed(() => { return manageState.branchList })
const userList = computed(() => { return manageState.userList })
// state
const active = ref<string>('')
const showDialogAddUser = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const showDialogUpdateUser = ref<boolean>(false)
const page = ref<number>(1)
const startPage = ref<number>(0)
const endPage = ref<number>(20)
const countPage = ref<number>(0)
const headersT = ref<any>([
    { title: 'ລະຫັດພ/ງ', align: 'start', sortable: true, key: 'userId' },
    { title: 'ຊື່ເຂົ້າໃຊ້ລະບົບ', align: 'start', sortable: true, key: 'userName' },
    { title: 'ລະຫັດຜ່ານ', align: 'start', sortable: true, key: 'passWord' },
    { title: 'ຊື່ ແລະ ນາມສະກຸນ', align: 'start', sortable: true, key: 'fullNameLa' },
    { title: 'ວ.ດ.ປ', align: 'start', sortable: true, key: 'dob' },
    { title: 'ເບີໂທລະສັບ', align: 'start', sortable: true, key: 'tel' },
    { title: 'ອີແມວ', align: 'start', sortable: true, key: 'email' },
    { title: 'ປະເພດ', align: 'start', sortable: true, key: 'typeDesc' },
    { title: 'ຝ່າຍ', align: 'start', sortable: true, key: 'brName' },
    { title: 'ສາຂາ', align: 'start', sortable: true, key: 'secDescLa' },
    { title: 'ຈັດການ', align: 'start', sortable: true, key: 'actions' }
])
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
    brCode: '',
    userType: '',
    userStatus: 'N',
    tel: '',
    email: '',
    loginStatus: 'A',
    toKen: "000"

})
const formUpdate: any = ref({
    id: '',
    userId: '',
    passWord: '',
    userName: '',
    fullNameEn: '',
    fullNameLa: '',
    gender: '',
    dob: '',
    secCode: '',
    brCode: '',
    brName: '',
    userType: '',
    userStatus: 'N',
    tel: '',
    email: '',
    loginStatus: 'A',
    toKen: "000"

})
const formDelete = ref({ id: '' })
const formGet: any = ref({ userType: '', userName: '' })
const formGetSection = ref({ secCode: '' })
const formGetBranch = ref({ secCode: '' })
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
    
    try {
        var body= {secCode:''}
        axios.post(`${api.public.API_URL}/Section/getSections`,body).then((data) => {
            setSectionList(data?.data?.resData)
        })
    } catch (error) {
        console.log(error)
    }
    // }
}

const onGetBranch = async () => {
    
    try {
        const { data } = await axios.post(`${api.public.API_URL}/Branch/getBranchListAll`);
        setBranchList(data?.resData);
        // secList.value = data?.resData
    } catch (error) {
        console.log(error);
    }
}
const onSave = async () => {
    if (formAdd.value.userId === '' || formAdd.value.userName === ''
    || formAdd.value.passWord === '' || formAdd.value.tel === '' || formAdd.value.email === '' || formAdd.value.secCode === '' || formAdd.value.userType === '') return

    showLoading.value = true
    const { data } = await useServer('Auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(formAdd.value)
    })
    const res: any = data.value
    console.log(res)
    if (res?.message?.resCode === '00') {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        formAdd.value.dob = ''
        formAdd.value.email = ''
        formAdd.value.fullNameEn = ''
        formAdd.value.fullNameLa = ''
        formAdd.value.passWord = ''
        formAdd.value.tel = ''
        formAdd.value.userId = ''
        formAdd.value.userName = ''
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const userListNullFilter = ref<any>(null)
const onGetUserList = async () => {
    if (userList.value.length === 0) {
        showLoading.value = true
    }
    try {
        var data = {
            userName: localStorage.getItem('userName'),
            userType: localStorage.getItem('status')
        }
        axios.post(`${api.public.API_URL}/User/getShowUserInfo`, data).then((data) => {
            if (data?.data?.message?.resCode === '00') {
                setUserList(data?.data?.resData)
                userListNullFilter.value = data?.data?.resData
                const count: any = data?.data?.resData?.length
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
                    text: data?.data?.message?.resMgs
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const sectionList = ref([])


// Handler for branch selection in filter form (search/filter panel)
async function onBranchFilterChange(selectedBrCode: string) {
    formGetBranch.value.secCode = selectedBrCode;
    // Filter sectiontList by secCode (branchCode)
    const filteredSections = sectiontList.value.filter((section: any) => section.secCode === selectedBrCode || section.branchCode === selectedBrCode);
    setSectionList(filteredSections);
}

// Handler for branch selection in add-user form
async function onAddUserBranchChange(selectedBrCode: string) {
    formAdd.value.brCode = selectedBrCode;
    // Call API to get sections by branch
    try {
        const body = { secCode: selectedBrCode };
        const { data } = await axios.post(`${api.public.API_URL}/Section/getSections`, body);
        sectionList.value = data?.resData || [];
        // Optionally reset selected section if branch changes
        formAdd.value.secCode = '';
    } catch (error) {
        console.error(error);
        sectionList.value = [];
        formAdd.value.secCode = '';
    }
}

        const onUpdateUserBranchChange = async (selectedBrCode: string) => {
  if (!selectedBrCode) {
    formUpdate.value.brCode = '';
    formUpdate.value.brName = '';
    sectionList.value = [];
    formUpdate.value.secCode = '';
    return;
  }

  formUpdate.value.brCode = selectedBrCode;

  // Find branch by code
  const branch = branchList.value.find(
    (b: any) => String(b.brCode) === String(selectedBrCode)
  );
  formUpdate.value.brName = branch?.brNameLa || '';

  try {
    const body = { brCode: selectedBrCode };
    const { data } = await axios.post(
      `${api.public.API_URL}/Section/getSectionsData`,
      body
    );

    sectionList.value = data?.resData || [];

    // Keep secCode only if it exists in the new section list
    const found = sectionList.value.some(
      (s: any) => String(s.secCode) === String(formUpdate.value.secCode)
    );
    if (!found) {
      formUpdate.value.secCode = '';
    }
  } catch (error) {
    console.error(`Failed to fetch sections for brCode=${selectedBrCode}`, error);
    sectionList.value = [];
    formUpdate.value.secCode = '';
  }
};

// Watcher for formGetBranch.value.secCode (if you want to react to changes elsewhere)
// watch(() => formGetBranch.value.secCode, (newVal) => {
//   onBranchFilterChange(newVal);
// });

const onGetDataForUpdate = async (
    id: any, userId: any, userName: any, fullNameEn: any, fullNameLa: any, gender: any, dob: any, secCode: any, userType: any, tel: any, email: any, passWord: any, brCode?: any
) => {
    formUpdate.value.id = id
    formUpdate.value.userId = userId
    formUpdate.value.userName = userName
    formUpdate.value.fullNameEn = fullNameEn
    formUpdate.value.fullNameLa = fullNameLa
    formUpdate.value.gender = gender
    formUpdate.value.dob = dob
    formUpdate.value.userType = userType
    formUpdate.value.tel = tel
    formUpdate.value.email = email
    formUpdate.value.passWord = passWord
    formUpdate.value.secCode = secCode
    formUpdate.value.brCode = brCode ? brCode.toString() : ''
    formUpdate.value.userType = userType

    // Set branch and section for update dialog
    if (brCode) {
        formUpdate.value.brCode = brCode.toString();
        // Load sections for this branch and set secCode after loading
        try {
            const body = { secCode: brCode.toString() };
            const { data } = await axios.post(`${api.public.API_URL}/Section/getSections`, body);
            sectionList.value = data?.resData || [];
            // Set secCode if it exists in the list
            const found: any = sectionList.value.find((s: any) => s.secCode?.toString() === secCode?.toString());
            formUpdate.value.secCode = found ? found.secCode.toString() : '';
        // Handler for branch selection in update-user form
        async function onUpdateUserBranchChange(selectedBrCode: string) {
            formUpdate.value.brCode = selectedBrCode;
            // Call API to get sections by branch
            try {
                const body = { secCode: selectedBrCode };
                const { data } = await axios.post(`${api.public.API_URL}/Section/getSections`, body);
                sectionList.value = data?.resData || [];
                // If the current secCode exists in the new section list, keep it, otherwise reset
                const found: any = sectionList.value.find((s: any) => s.secCode === formUpdate.value.secCode);
                if (!found) {
                    formUpdate.value.secCode = '';
                }
            } catch (error) {
                console.error(error);
                sectionList.value = [];
                formUpdate.value.secCode = '';
            }
        }
        } catch (error) {
            sectionList.value = [];
            formUpdate.value.secCode = '';
        }
    } else {
        formUpdate.value.brCode = '';
        formUpdate.value.secCode = '';
    }
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
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetUserList()
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
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
        showAlert.value = true
        iconType.value = 'success'
        messageAlert.value = res?.message?.resMgs
        onGetUserList()
    } else {
        showLoading.value = false
        showAlert.value = true
        iconType.value = 'error'
        messageAlert.value = res?.message?.resMgs
    }
}
const filterUser = ref<string>('')
const onFilterUserData = () =>{
    console.log(filterUser.value)
    if(filterUser.value !== '' && filterUser.value !== null){
        const userFilter = userList.value.filter((e:any )=>e.userId.includes(filterUser.value) || e.fullNameLa.includes(filterUser.value) || e.tel.includes(filterUser.value))
        const count: any = userFilter
                const resMath = (count / 20).toFixed(1)?.toString()
                const splitRes = resMath.split('.')
                if (splitRes[1] === '0') {
                    countPage.value = parseFloat(splitRes[0])
                } else {
                    countPage.value = parseFloat(splitRes[0]) + 1
                }
        setUserList(userFilter)
    }else{
        setUserList(userListNullFilter.value)
    }
}
watch(page, () => {
    startPage.value = (page.value - 1) * 20
    endPage.value = page.value * 20
})
onGetUserTypeList()
onGetSection()
onGetBranch()
onGetUserList()
</script>


