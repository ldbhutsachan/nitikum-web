<template>
    <v-overlay v-model="loading" persistent
        style="display: flex;justify-content: center;align-items: center;border: 1px solid red;text-align: center;">
        <div style="background-color: #0978BF;border-radius: 50px;">
            <v-progress-circular :size="90" :width="5" color="#fff" indeterminate>
                <img src="../../assets/icons/ldb.webp" width="70" style="border-radius: 100px;" />
            </v-progress-circular>
        </div>
    </v-overlay>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['update:modelValue'])
const loading = computed({
    get() {
        return props.value
    },
    set(value:any) {
        emit('update:modelValue', value)
    }
})
</script>