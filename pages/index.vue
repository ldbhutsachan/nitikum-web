<template>
    <div >
        <v-card width="1200" class="mx-auto">
            <v-card-text></v-card-text>
        </v-card>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
</script>
