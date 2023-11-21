<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="5" height="150">

        <div style="display: flex;flex-direction: column;justify-content: space-between;align-items: center;width: 100%;">
            <div  class="pt-6">
                <v-card width="1200" color="#191947" class="mx-auto " elevation="0">
                    <div class="d-flex align-center" >
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
                                <v-list-item v-for="(item, index) in mangeBasicInfo" :key="index" :value="index">
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
                                <v-list-item v-for="(item, index) in mangeDocumentInfo" :key="index" :value="index">
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
                                <v-list-item v-for="(item, index) in mangeWaitApproveInfo" :key="index" :value="index">
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
                                <v-list-item v-for="(item, index) in itemWaitContunue" :key="index" :value="index">
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
                                <v-list-item v-for="(item, index) in reports" :key="index" :value="index">
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                        <v-divider vertical color="white"></v-divider>
                    </div>
                </v-card>
            </div>

        </div>


    </v-app-bar>
</template>
<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
import { mangeBasicInfo, mangeDocumentInfo, mangeWaitApproveInfo, itemWaitContunue, reports } from "@/components/MenusData"
const customizer = useCustomizerStore();
const acitve = ref<boolean>(false)

</script>