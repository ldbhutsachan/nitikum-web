<template>
    <v-app-bar :color="customizer.darktheme ? '' : customizer.navbarColor" elevation="10">
        <div class="pa-4 pl-4" style="display: flex;justify-content: center;align-items: center;">
            <img src="../../assets/icons/logo.png" width="40" height="40" />
        </div>
        <h2>LDB Biz</h2>
        <div style="width: 20px;"></div>
        <v-app-bar-nav-icon color="lighten-2" class="hidden-sm-and-down" @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)" />
    </v-app-bar>
</template>
<script setup lang="ts">
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();
</script>