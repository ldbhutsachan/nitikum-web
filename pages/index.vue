<template>
    <div>
        <h1>Hill</h1>
        <v-btn @click="onConsol(1,2)">Send</v-btn>
    </div>
</template>
<script setup lang="ts">
function onConsol(n:any,b:any) {
    console.log(n);
    console.log(b);
}
</script>