<template>
    <div class="bg">
            <v-card width="500" class="mx-auto" height="400" rounded="lg" elevation="10" style="background-color: rgba(12,13,14, .1);opacity: 0.9;">
                <div class="text-center pt-10 text-white" style="font-size: 20pt;font-weight: bold;">ເຂົ້າສູ່ລະບົບ</div>
                <div class="pa-10">
                    <v-text-field label="Username" color="black" filter="red" bg-color="white" style="font-weight: bold;"></v-text-field>
                    <v-text-field label="Password" color="black" bg-color="white" style="font-weight: bold;"></v-text-field>
                    <v-btn>ok</v-btn>
                </div>
            </v-card>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    layout: false
})

</script>
<style>
.bg {
  background-image: url('../../assets/images/bg-ldb.jpg');
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}</style>