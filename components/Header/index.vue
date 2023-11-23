<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="5" height="150">

        <div style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 100%;">
            <div class="pt-6">
                <v-card width="1200" color="#191947" class="mx-auto " elevation="0">
                    <div class="d-flex align-center">
                        <div style="display: flex;justify-content: start;align-items: center;">
                            <img class="mx-auto" src="../../assets/icons/newLogo.jpeg" width="60"
                                style="border-radius: 50px;" />
                            <div class="pl-2" style="line-height: 18px">
                                <span style="color:#F4D478;font-size: 13pt;">ທະນາຄານພັດທະນາລາວ</span><br />
                                <v-divider color="#fff"></v-divider>
                                <span style="color:#F4D478;font-size: 10pt;">老挝开发银行LDB BANK</span>
                            </div>
                        </div>
                        <v-spacer></v-spacer>
                        <div
                            style="display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 30px;">
                            <span style="font-size: 20pt;">ລະບົບຄຸ້ມຄອງນິຕິກຳ</span>
                            <span style="font-size: 12pt;font-weight: bold;">Legal Management System</span>
                        </div>
                        <v-spacer></v-spacer>
                        <img src="../../assets/icons/logo.png" width="60" />
                    </div>
                </v-card>
            </div>
            <div style="width: 100%;background-color: #243B7A;" class="mt-6">
                <v-card width="1200" color="#243B7A" class="mx-auto" elevation="0">
                    <div class="d-flex align-center">
                        <v-divider vertical color="white"></v-divider>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    ຈັດການຂໍ້ມູນພື້ນຖານ
                                    <Icon name="formkit:down" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in mangeBasicInfo" :to="item.to" :key="index"
                                    :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    ຈັດການຂໍ້ມູນເອກະສານ
                                    <Icon name="formkit:down" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in mangeDocumentInfo" :to="item.to" :key="index"
                                    :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    ລາຍການລໍຖ້າອະນຸມັດ
                                    <Icon name="formkit:down" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in mangeWaitApproveInfo" :to="item.to" :key="index"
                                    :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    ລາຍການລໍຖ້າດຳເນີນງານ
                                    <Icon name="formkit:down" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in itemWaitContunue" :to="item.to" :key="index"
                                    :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    ລາຍງານ
                                    <Icon name="formkit:down" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in reports" :to="item.to" :key="index" :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    ໂປຣໄຟ
                                    <Icon name="formkit:down" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title>
                                        <Icon name="ph:user" size="25" color="#191947" /> {{ userName }}
                                    </v-list-item-title>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item style="cursor: pointer;" @click="dialogChangePass = true">
                                    <v-list-item-title>
                                        <Icon name="material-symbols-light:change-circle-outline" size="30"
                                            color="#191947" /> ປ່ຽນລະຫັດຜ່ານ
                                    </v-list-item-title>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item style="cursor: pointer;" @click="onLogout">
                                    <v-list-item-title>
                                        <Icon name="ant-design:logout-outlined" size="30" color="red" /> ອອກຈາກລະບົບ
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                    </div>
                </v-card>
            </div>
            <v-dialog v-model="dialogChangePass" persistent width="400">
                <v-card>
                    <v-card-title class="text-center"> ປ່ຽນລະຫັດຜ່ານ</v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <!-- <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear> -->
                        <v-text-field label="ລະຫັດຜ່ານເກົ່າ" v-model="changePassForm.oldPassword"></v-text-field>
                        <v-text-field label="ລະຫັດຜ່ານໃໝ່" v-model="changePassForm.newPwd"></v-text-field>
                        <div class="d-flex">
                            <v-spacer></v-spacer>
                            <v-btn @click="dialogChangePass = false" color="red" variant="outlined" class="mr-2">
                                <Icon name="jam:close" size="20" />ປິດອອກ
                            </v-btn>
                            <v-btn color="#243B7A" @click="onChangePass">
                                <Icon name="arcticons:fastsave" size="20" color="white" />ບັນທຶກ
                            </v-btn>
                        </div>
                    </v-card-text>

                </v-card>
            </v-dialog>
            <loading v-model="showLoading" />
        </div>


    </v-app-bar>
</template>
<script setup lang="ts">
import swal from 'sweetalert2'
import { useCustomizerStore } from "@/stores/customizer";
import loading from '../loading/loading.vue'
import { mangeBasicInfo, mangeDocumentInfo, mangeWaitApproveInfo, itemWaitContunue, reports } from "@/components/MenusData"
const customizer = useCustomizerStore();
const userName = ref<string>('')
const userIdNmame = ref<string>('')
const dialogChangePass = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const onLogout = () => {
    const authCookie = useCookie('token')
    const userIdCookie = useCookie('userId')
    const userNameCookie = useCookie('userName')
    authCookie.value = null
    userIdCookie.value = null
    userNameCookie.value = null
    navigateTo('/signIn')
}
const onGetUserInfo = () => {
    const userCookie = useCookie('userName')
    const userId = useCookie('userId')
    userName.value = userCookie.value ? userCookie.value : 'No data'
    userIdNmame.value = userId.value ? userId.value : '0'
}
const changePassForm = ref({
    oldUserId: '',
    oldPassword: '',
    newPwd: ''
})
const onChangePass = async () => {
    changePassForm.value.oldUserId = userIdNmame.value;
    showLoading.value = true
    const { data } = await useServer('change-user-pass', {
        method: 'POST',
        body: JSON.stringify(changePassForm.value)
    })
    showLoading.value = false
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        dialogChangePass.value = false
        swal.fire({
            icon: 'success',
            text: res?.message?.resMgs
        })
    } else {
        dialogChangePass.value = false
        swal.fire({
            icon: 'error',
            text: res?.message?.resMgs
        })
    }
}
onMounted(() => {
    onGetUserInfo()
})
</script>