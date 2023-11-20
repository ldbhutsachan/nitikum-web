<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="5">
        <div class="pa-4 pl-4" style="display: flex;justify-content: center;align-items: center;">
            <img src="../../assets/icons/logo.png" width="40" height="40" />
        </div>
        <h2>LDB Biz</h2>
        <div style="width: 60px;"></div>
        <v-btn v-if="!customizer.mini_sidebar" icon @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)">
            <Icon name="tdesign:menu-unfold" size="20" />
        </v-btn>
        <v-btn v-else icon @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)">
            <Icon name="ant-design:menu-unfold-outlined" size="20" />
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon class="mr-4">
            <Icon name="carbon:notification-new" size="30" />
        </v-btn>
        <!-- <v-btn icon class="mr-4"><Icon name="et:profile-male" size="30" /></v-btn> -->
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                    <Icon name="et:profile-male" size="30" />
                </v-btn>
            </template>
            <v-card width="280" class="pa-2" rounded="lg">
                <v-card-title>User profile</v-card-title>
                <v-divider></v-divider>

                <div style="width: 100%;display: flex;flex-direction: row;justify-content: start;align-items: center;"
                    class="pa-2 pt-4">
                    <div
                        style="width: 45px;height: 45px;border-radius: 50px;background-color: #000;display: flex;justify-content: center;align-items: center;flex-direction: row;">
                        <Icon name="et:profile-male" color="white" size="30" />
                    </div>
                    <h3 class="ml-4">Some one</h3>
                </div>

                <div v-if="acitve" style="width: 100%;display: flex;flex-direction: row;justify-content: start;align-items: center;background-color: #E0E0E0;border-radius: 5px;cursor: pointer;"
                    class="pa-2" @mouseleave="acitve = false">
                    <div
                        style="width: 45px;height: 45px;border-radius: 50px;background-color: #FFEAED;display: flex;justify-content: center;align-items: center;flex-direction: row;">
                        <Icon name="streamline:interface-logout-circle-arrow-enter-right-logout-point-circle"
                            color="#FC4A6C" size="20" />
                    </div>
                    <span class="ml-4">ອອກຈາກລະບົບ</span>
                </div>
                <div v-else style="width: 100%;display: flex;flex-direction: row;justify-content: start;align-items: center;border-radius: 5px;cursor: pointer;"
                    class="pa-2" @mouseover="acitve = true" >
                    <div
                        style="width: 45px;height: 45px;border-radius: 50px;background-color: #FFEAED;display: flex;justify-content: center;align-items: center;flex-direction: row;">
                        <Icon name="streamline:interface-logout-circle-arrow-enter-right-logout-point-circle"
                            color="#FC4A6C" size="20" />
                    </div>
                    <span class="ml-4">ອອກຈາກລະບົບ</span>
                </div>
                
            </v-card>

        </v-menu>
    </v-app-bar>
</template>
<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();
const acitve = ref<boolean>(false)
</script>