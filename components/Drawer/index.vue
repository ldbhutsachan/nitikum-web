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
    :rail="customizer.mini_sidebar" expand-on-hover>
    <PerfectScrollbar class="scrollnavbar">
      <v-list class="pa-3" bg-color="transparent">
        <template v-for="(item, i) in sidebarMenu" :key="item.title">
          
          <!-- ground items list -->
          <!-- style="background-color: #0AB9C5;" -->
          <v-list-group v-if="item.children">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :value="item.title" rounded="lg" class="mb-1"
                >
                <v-list-item-title>
                  <v-icon color="#999" >mdi-{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-for="(subitem, i) in item.children" :key="i" :value="subitem.to" :to="subitem.to" rounded="lg">
              <v-list-item-title><v-icon color="#999">mdi-{{ subitem.icon }}</v-icon> {{ subitem.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <!-- items list -->
          <!-- <v-list-item v-else :key="i" :value="item" rounded="lg" class="mb-1">
            <v-list-item-title style="color: black;">
              <v-icon color="#999">mdi-account</v-icon>
              
            </v-list-item-title>
          </v-list-item> -->

        </template>
      </v-list>
    </PerfectScrollbar>

  </v-navigation-drawer>
</template>
