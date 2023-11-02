<script setup lang="ts">
import { ref, watch } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
const customizer = useCustomizerStore();
import sidebarItems from "./sidebarItem";
const sidebarMenu = ref(sidebarItems);
</script>

<template>
  <v-navigation-drawer v-model="customizer.Sidebar_drawer" elevation="10"
    :class="customizer.SidebarColor == 'white' ? '' : 'text-white'"
    :color="customizer.darktheme ? '' : customizer.SidebarColor" rail-width="75" mobile-breakpoint="960" app
    :rail="customizer.mini_sidebar">
    <v-list class="pt-5" bg-color="transparent" style="padding-bottom: 80px;">
      <template v-for="(item, i) in sidebarMenu" :key="item.title">
        <v-list-group v-if="item.children">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :value="item.title" rounded="lg" class="mb-1">
              <template v-slot:prepend class="ico-color">
                <Icon :name="item.icon" color="#999" size="30" />
              </template>
              <v-list-item-title v-text="item.title" class="ml-2"></v-list-item-title>
            </v-list-item>
          </template>
          <div v-for="(subitem, i) in item.children" :key="i" rounded="lg">
            <v-btn elevation="0" :to="subitem.to" block style="display: flex;justify-content: start;padding-left: 30px;">
              <Icon :name="subitem.icon" color="#ccc" size="20" />
              <span v-if="!customizer.mini_sidebar" class="ml-2">{{ subitem.title }}</span>
            </v-btn>
          </div>
        </v-list-group>
        <v-list-item v-if="!item.children" :key="i" rounded="lg" class="mb-1" :to="item.to">
            <v-list-item-title style="color: black;" >
              <Icon :name="item.icon" color="#999" size="30" />
              <span v-if="!customizer.mini_sidebar" class="ml-2">{{ item.title }}</span>
            </v-list-item-title>
        </v-list-item>
      </template>
      <div style="position: fixed;bottom: 0%;width: 100%;background-color: white;">
        <v-divider></v-divider>
        <v-btn elevation="0" rounded color="#860002"  class="ma-4" style="width: 88%;">
          <Icon name="uiw:logout" color="#fff" size="20" />
          <span v-if="!customizer.mini_sidebar" class="ml-2">ອອກຈາກລະບົບ</span>
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
