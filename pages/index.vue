<template>
    <div class="bg">

        <v-card width="500" class="mx-auto" rounded="lg" elevation="10"
            style="background-color: rgba(12,13,14, .1);opacity: 0.9;">
            <div class="text-center pt-10 text-white" style="font-size: 20pt;font-weight: bold;"><span style=""
                    class="px-2">ເຂົ້າສູ່ລະບົບ</span></div>
            <div class="pa-10">
                <v-text-field v-model="loginForm.userName" label="Username" color="black" filter="red" bg-color="#fff"
                    style="font-weight: bold;"></v-text-field>
                <v-text-field v-model="loginForm.passWord" label="Password" color="black" bg-color="#fff"
                    style="font-weight: bold;" append-inner-icon="mdi-eye"></v-text-field>
                <div class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn @click="onLogin" height="45" rounded color="#243B7A">
                        <Icon name="circum:login" size="30" />ເຂົ້າສູ່ລະບົບ
                    </v-btn>
                    <v-spacer></v-spacer>
                </div>
            </div>
        </v-card>
        <loading v-model="showLoading" />
    </div>
</template>
<script setup lang="ts">
const api = useRuntimeConfig()
import axios from 'axios';
import loading from '~/components/loading/loading.vue'
const showLoading = ref<boolean>(false)

definePageMeta({
    layout: false
})
const loginForm = ref({
    userName: '',
    passWord: ''
})
const onLogin = async () => {
    // navigateTo('/')
    showLoading.value = true
    try {
        await axios.post(`${api.public.API_URL}/Auth/login`, loginForm.value).then((data) => {
            localStorage.setItem('token', data?.data?.resData[0]?.toKen)
            localStorage.setItem('userId', data?.data?.resData[0]?.userId)
            localStorage.setItem('userName', data?.data?.resData[0]?.userName)
            localStorage.setItem('status', data?.data?.resData[0]?.userStatus)
            localStorage.setItem('role', data?.data?.resData[0]?.typeDesc)
            navigateTo('/home')
            showLoading.value = false
        })
    } catch (error) {
        console.log(error)
    }
    // const {data} = await useServer('Auth/Login',{
    //     method:'POST',
    //     body:JSON.stringify(loginForm.value)
    // })
    // const res:any = data.value;
    // if(res?.message?.resCode === '00'){
    //     navigateTo('/home')
    //     localStorage.setItem('token',res?.resData[0]?.toKen)
    //     localStorage.setItem('userId',res?.resData[0]?.userId)
    //     localStorage.setItem('userName',res?.resData[0]?.userName)
    //     localStorage.setItem('status',res?.resData[0]?.userStatus)
    //     localStorage.setItem('role',res?.resData[0]?.typeDesc)
    // }else{
    //     swal.fire({
    //         icon:'error',
    //         text:res?.message?.resMgs
    //     })
    // }
}
</script>
<style>
.bg {
    background-image: url('../assets/images/bg-ldb.jpg');
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>