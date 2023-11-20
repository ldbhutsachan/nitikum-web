<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="5" height="150">
        
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 100%;">
            <v-card width="1200" color="#191947" class="mx-auto pt-4" elevation="0">
                <div class="d-flex align-center">
                    <img src="../../assets/icons/logo.png" width="80" height="80" />
                    <v-spacer></v-spacer>
                    <div
                        style="display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 30px;">
                        <span style="font-size: 20pt;">ລະບົບຄຸ້ມຄອງນິຕິກຳ</span>
                        <span style="font-size: 20pt;">Legal Management System</span>
                    </div>
                    <v-spacer></v-spacer>
                    <img src="../../assets/icons/logo.png" width="80" height="80" />
                </div>
            </v-card>
            <!-- <div style="height: 15px;"></div> -->
            <div style="width: 100%;background-color: #243B7A;height: 50px;" class="mt-4">
                <v-card width="1200" color="#243B7A" class="mx-auto" elevation="0">
                    <div class="d-flex align-center">
                        <v-btn height="42">ໜ້າຫຼັກ</v-btn>
                        <v-divider vertical color="white"></v-divider>
                        <v-btn height="42">ລາຍງານ</v-btn>
                        <v-divider vertical color="white"></v-divider>
                    </div>
                </v-card>
            </div>

        </div>


    </v-app-bar>
</template>
<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();
const acitve = ref<boolean>(false)
</script>