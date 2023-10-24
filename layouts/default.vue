<template>
    <v-app>
        <Header />
        <Drawer />
        <v-main>
            <div class="pa-10">
                <slot></slot>
            </div>
        </v-main>
    </v-app>
</template>
  
<script  setup lang="ts">
</script>
<style>
.selectNav-active {
    background: #3c98ce;
    color: #ffffff;
    border-radius: 50px;
}

.iconNav-active {
    background: #ffffff;
}
</style>