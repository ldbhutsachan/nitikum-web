<template>
    <div class="bg">
        <!-- Login Card with Beautiful Animations -->
        <div class="login-container">
            <v-card 
                width="450" 
                class="mx-auto login-card" 
                rounded="xl" 
                elevation="24">
                
                <!-- Logo Section with Animation -->
                <div class="text-center pt-8 pb-4">
                    <div class="logo-container">
                        <img class="mx-auto logo-image" src="../assets/icons/ldb.webp" width="100" />
                        <div class="logo-glow"></div>
                    </div>
                    
                    <!-- Title with Gradient Text -->
                    <div class="login-title mt-4">
                        <h1>ລະບົບຄຸ້ມຄອງນິຕິກຳ</h1>
                        <div class="title-underline"></div>
                    </div>
                </div>

                <!-- Login Form -->
                <div class="pa-8">
                    <!-- Username Field -->
                    <div class="input-group mb-6">
                        <div class="input-icon">
                            <Icon name="mdi:account" size="24" />
                        </div>
                        <v-text-field 
                            v-model="loginForm.userName" 
                            label="ຊື່ຜູ້ໃຊ້" 
                            variant="outlined"
                            color="#F5D579" 
                            base-color="rgba(255,255,255,0.7)"
                            bg-color="rgba(255,255,255,0.1)"
                            class="custom-input"
                            hide-details="auto"
                        ></v-text-field>
                    </div>

                    <!-- Password Field -->
                    <div class="input-group mb-6">
                        <div class="input-icon">
                            <Icon name="mdi:lock" size="24" />
                        </div>
                        <v-text-field 
                            v-model="loginForm.passWord" 
                            :type="hideP ? 'text' : 'password'" 
                            label="ລະຫັດຜ່ານ"
                            variant="outlined"
                            color="#F5D579" 
                            base-color="rgba(255,255,255,0.7)"
                            bg-color="rgba(255,255,255,0.1)"
                            class="custom-input"
                            hide-details="auto"
                            @click:append-inner="hideP = !hideP"
                            :append-inner-icon="hideP ? 'mdi-eye' : 'mdi-eye-off'"
                        ></v-text-field>
                    </div>

                    <!-- Remember Me -->
                    <v-checkbox 
                        v-model="remember" 
                        label="ຈື່ຊື່ຜູ້ໃຊ້" 
                        color="#F5D579"
                        class="remember-checkbox mb-6"
                        hide-details
                    ></v-checkbox>

                    <!-- Login Button -->
                    <v-btn 
                        @click="onLogin" 
                        block 
                        height="55" 
                        rounded="xl"
                        class="login-btn"
                        elevation="8"
                    >
                        <Icon name="circum:login" size="24" class="mr-2" />
                        ເຂົ້າສູ່ລະບົບ
                    </v-btn>
                </div>
            </v-card>
            
            <!-- Decorative Elements -->
            <div class="floating-elements">
                <div class="floating-circle circle-1"></div>
                <div class="floating-circle circle-2"></div>
                <div class="floating-circle circle-3"></div>
            </div>
        </div>
        
        <loading v-model="showLoading" />
    </div>
</template>

<script setup lang="ts">
const menu1 = ref<boolean>(false)
const api = useRuntimeConfig()
import axios from 'axios';
import Swal from 'sweetalert2';
import loading from '~/components/loading/loading.vue'
const showLoading = ref<boolean>(false)
const remember = ref<boolean>(false)

definePageMeta({
    layout: false
})

const dateFormatted = ref<any>(null)
const loginForm = ref({
    userName: '',
    passWord: ''
})
const hideP = ref<boolean>(false)

const onLogin = async () => {
    if (loginForm.value.passWord === '' || loginForm.value.userName === '') return
    showLoading.value = true
    try {
        await axios.post(`${api.public.API_URL}/Auth/login`, loginForm.value).then((data) => {
            if (data?.data?.message?.resCode === '00') {
                if(remember.value){
                    localStorage.setItem('userLoginNitikam',loginForm.value.userName)
                }else{
                    localStorage.removeItem('userLoginNitikam')
                }
                localStorage.setItem('token', data?.data?.resData[0]?.toKen)
                localStorage.setItem('userId', data?.data?.resData[0]?.userId)
                localStorage.setItem('userName', data?.data?.resData[0]?.userName)
                localStorage.setItem('status', data?.data?.resData[0]?.userStatus)
                localStorage.setItem('role', data?.data?.resData[0]?.typeDesc)
                navigateTo('/home')
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

const today = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    let month: any = now.getMonth() + 1;
    let day: any = now.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${day}/${month}/${year}`;
})

const onGetRememberId = () =>{
    loginForm.value.userName = localStorage.getItem('userLoginNitikam') ?? ''
    if(localStorage.getItem('userLoginNitikam') !== null && localStorage.getItem('userLoginNitikam') !== ''){
        remember.value = true
    }else{
        remember.value = false
    }
}

onMounted(() => {
    dateFormatted.value = today
})
onGetRememberId()
</script>

<style scoped>
.bg {
    background-image: url('../assets/images/BG.png');
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.login-container {
    position: relative;
    z-index: 10;
}

.login-card {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: cardSlideIn 0.8s ease-out;
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3);
}

/* Logo Animation */
.logo-container {
    position: relative;
    display: inline-block;
    animation: logoFloat 3s ease-in-out infinite;
}

.logo-image {
    border-radius: 50%;
    border: 3px solid rgba(245, 213, 121, 0.5);
    box-shadow: 0 0 30px rgba(245, 213, 121, 0.3);
    transition: all 0.3s ease;
}

.logo-image:hover {
    transform: scale(1.1);
    box-shadow: 0 0 50px rgba(245, 213, 121, 0.6);
}

.logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(245, 213, 121, 0.3), transparent 70%);
    border-radius: 50%;
    animation: glow 2s ease-in-out infinite alternate;
}

/* Title Styling */
.login-title h1 {
    font-size: 28px;
    font-weight: bold;
    background: linear-gradient(45deg, #F5D579, #FFE55C, #F5D579);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    animation: gradientShift 3s ease infinite;
    text-shadow: 0 0 20px rgba(245, 213, 121, 0.5);
}

.title-underline {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #F5D579, #FFE55C);
    margin: 10px auto;
    border-radius: 2px;
    animation: underlineGlow 2s ease-in-out infinite alternate;
}

/* Input Styling */
.input-group {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #F5D579;
    z-index: 1;
    animation: iconPulse 2s infinite;
}

.custom-input {
    padding-left: 50px;
}

.custom-input :deep(.v-field__field) {
    padding-left: 50px;
    color: white;
    font-weight: 500;
}

.custom-input :deep(.v-field__outline) {
    border-color: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
}

.custom-input :deep(.v-field__outline):hover {
    border-color: rgba(245, 213, 121, 0.6);
    box-shadow: 0 0 15px rgba(245, 213, 121, 0.3);
}

.custom-input :deep(.v-field--focused .v-field__outline) {
    border-color: #F5D579;
    box-shadow: 0 0 20px rgba(245, 213, 121, 0.4);
}

.custom-input :deep(.v-label) {
    color: rgba(255, 255, 255, 0.8) !important;
    font-weight: 500;
}

/* Remember Checkbox */
.remember-checkbox :deep(.v-selection-control__input) {
    color: #F5D579;
}

.remember-checkbox :deep(.v-label) {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 500;
}

/* Login Button */
.login-btn {
    background: linear-gradient(135deg, #003E73, #065D9E, #0978BF) !important;
    color: white !important;
    font-weight: bold !important;
    font-size: 18px !important;
    text-transform: none !important;
    transition: all 0.3s ease !important;
    position: relative;
    overflow: hidden;
}

.login-btn:hover {
    background: linear-gradient(135deg, #0052A3, #0A6CB8, #0B8BD9) !important;
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(0, 62, 115, 0.4);
}

.login-btn:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}

.login-btn:hover:before {
    width: 300px;
    height: 300px;
}

/* Floating Decorative Elements */
.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.floating-circle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(245, 213, 121, 0.1), rgba(245, 213, 121, 0.05));
    animation: float 6s ease-in-out infinite;
}

.circle-1 {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.circle-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: 2s;
}

.circle-3 {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 20%;
    animation-delay: 4s;
}

/* Animations */
@keyframes cardSlideIn {
    from {
        opacity: 0;
        transform: translateY(50px) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes logoFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

@keyframes glow {
    from { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    to { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes underlineGlow {
    from { box-shadow: 0 0 5px rgba(245, 213, 121, 0.5); }
    to { box-shadow: 0 0 20px rgba(245, 213, 121, 0.8), 0 0 30px rgba(245, 213, 121, 0.4); }
}

@keyframes iconPulse {
    0%, 100% { opacity: 0.7; transform: translateY(-50%) scale(1); }
    50% { opacity: 1; transform: translateY(-50%) scale(1.1); }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.1;
    }
    33% {
        transform: translateY(-20px) rotate(120deg);
        opacity: 0.2;
    }
    66% {
        transform: translateY(10px) rotate(240deg);
        opacity: 0.1;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .login-card {
        width: 90% !important;
        margin: 0 20px;
    }
    
    .login-title h1 {
        font-size: 24px;
    }
    
    .pa-8 {
        padding: 24px !important;
    }
}
</style>