<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="5" app height="160">

        <div style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 100%;background: linear-gradient(to top, #003E73,#065D9E,#0978BF)">
            <div class="pt-6" style="width: 100%;">
                <v-card max-width="2800" color="transparent" class="mx-auto rounded-0" elevation="0">

                    <div class="d-flex align-center">
                        <img class="mx-auto" src="../../assets/icons/gold.webp" width="250" />
                        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;line-height: 30px;border-left: 0.5px solid #F4D478"
                            class="ml-4 pl-4">
                            <span style="font-size: 20pt;color: #F4D478;">ລະບົບຄຸ້ມຄອງນິຕິກຳ</span>
                            <span style="font-size: 18pt;font-weight: bold;color: #F4D478;" class="ml-2"> (Legal Management System)</span>
                        </div>
                        <v-spacer></v-spacer>
                        <v-menu>
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" rounded v-bind="props" height="40"
                                    style="background: linear-gradient(to left, #EFC362,#e0e0e0,#EFC362)">
                                    <Icon name="iconamoon:profile-light" size="20" color="#191947" />
                                    <span style="color: #191947">{{ userName }}</span>
                                    <Icon name="formkit:down" color="#191947" size="20" />
                                </v-btn>
                            </template>
                            <v-card rounded="lg" style="background: linear-gradient(to left, #003E73,#065D9E,#0978BF)">
                                <v-list style="background: linear-gradient(to left, #003E73,#065D9E,#0978BF)">
                                    
                                    <v-list-item style="cursor: pointer;" @click="dialogChangePass = true">
                                        <v-list-item-title class="d-flex align-center">
                                            <v-avatar color="white">
                                                <Icon name="material-symbols-light:change-circle-outline" size="30"
                                                    color="#191947" />
                                            </v-avatar>
                                            <span class="text-white ml-2">ປ່ຽນລະຫັດຜ່ານ</span>
                                        </v-list-item-title>
                                    </v-list-item>
                                    <v-divider></v-divider>
                                    <v-list-item style="cursor: pointer;" @click="onLogout">
                                        <v-list-item-title style="color: white;">
                                            <v-avatar color="red">
                                                <Icon name="ant-design:logout-outlined" size="30" color="white" />
                                            </v-avatar>
                                            ອອກຈາກລະບົບ
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-menu>
                    </div>
                </v-card>
            </div>
            <div style="width: 100% "
                class="mt-6">
                <v-card width="2800" color="transparent" class="mx-auto rounded-0" elevation="0" style="border-top: 1px solid #F2D074" >
                    <div class="d-flex align-center">
                        <v-btn color="white" height="40" to="/home">
                            <Icon name="iconoir:home-alt-slim" size="22"/> 
                            ໜ້າຫຼັກ
                        </v-btn>
                        <v-menu v-if="userRole === 'Admin'">
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    <Icon name="hugeicons:tools" size="22"/>
                                    ຈັດການຂໍ້ມູນພື້ນຖານ
                                    <Icon name="formkit:down" style="font-size: 10px;" />
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in mangeBasicInfo" :to="item.to" :key="index"
                                    :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-menu v-if="userRole === 'Admin' || userRole === 'Maker'">
                            <template v-slot:activator="{ props }">
                                <v-btn color="white" v-bind="props" height="40">
                                    <Icon name="hugeicons:tools" size="22"/>
                                    ຈັດການຂໍ້ມູນເອກະສານ
                                    <Icon name="formkit:down" style="font-size: 10px;"/>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item v-for="(item, index) in mangeDocumentInfo" :to="item.to" :key="index"
                                    :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-btn to="/document/doc-wait-approve" color="white" height="40"
                            v-if="userRole === 'Admin' || userRole === 'Authorizer'">
                            <Icon name="ic:baseline-pending-actions" size="22"/>
                            ລາຍການລໍຖ້າອະນຸມັດ
                        </v-btn>
                        <v-btn to="/document/report_document" color="white" height="40">
                            <Icon name="iconoir:reports-solid" size="22"/>
                            ລາຍງານເອກະສານ
                        </v-btn>
                        <v-btn v-if="userRole === 'Admin'" to="/statistics-login" color="white" height="40">
                            <Icon name="solar:graph-up-linear" size="22"/>
                            ສະຖິຕິເຂົ້າລະບົບ
                        </v-btn>
                         <v-btn v-if="userRole === 'Admin'" to="/dashboard/dashboard" color="white" height="40">
                            <Icon name="solar:graph-up-linear" size="22"/>
                            dashboard
                        </v-btn>
                        
                        <v-spacer></v-spacer>
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
const userName = ref<any>('')
const userIdNmame = ref<any>('')
const dialogChangePass = ref<boolean>(false)
const showLoading = ref<boolean>(false)
const onLogout = () => {
    navigateTo('/')
}
const onGetUserInfo = () => {
    userName.value = localStorage.getItem('userName') !== null ? localStorage.getItem('userName') : ""
    userIdNmame.value = localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : ''
}
const changePassForm = ref({
    oldUserId: '',
    oldPassword: '',
    newPwd: ''
})
const onChangePass = async () => {
    changePassForm.value.oldUserId = userIdNmame.value;
    showLoading.value = true
    const { data } = await useServer('Auth/change-user-pass', {
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
const userRole = ref<string>('')
const onGetRole = () => {
    const role = localStorage.getItem('role') !== null ? localStorage.getItem('role') : ''
    userRole.value = role ? role : ''
}
onMounted(() => {
    onGetRole()
    onGetUserInfo()
})
</script>