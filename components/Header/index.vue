<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="5">
        <div class="pa-4 pl-4" style="display: flex;justify-content: center;align-items: center;">
            <img src="../../assets/icons/logo.png" width="40" height="40" />
        </div>
        <h2>LDB Biz</h2>
        <div style="width: 60px;"></div>
        <v-btn v-if="!customizer.mini_sidebar" icon @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)" ><Icon name="tdesign:menu-unfold" size="20" /></v-btn>
        <v-btn v-else icon @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)" ><Icon name="ant-design:menu-unfold-outlined" size="20" /></v-btn>
        <v-spacer></v-spacer>
        <v-btn icon class="mr-4"><Icon name="fa:wifi" size="30" /></v-btn>
        <v-btn icon class="mr-4"><Icon name="arcticons:searchbar-ex" size="30" /></v-btn>
        <v-btn icon class="mr-4"><Icon name="carbon:notification-new" size="30" /></v-btn>
        <v-btn icon class="mr-4"><Icon name="et:profile-male" size="30" /></v-btn>
    </v-app-bar>
</template>
<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();
</script>