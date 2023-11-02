

<template>
    <div>
        <v-dialog v-model="loading" persistent width="200">
            <v-card color="primary">
                <div class="text-center mt-2" style="font-size: 16pt;">Loading...</div>
                <v-card-text>
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
const loading = ref<boolean>(false)
</script>