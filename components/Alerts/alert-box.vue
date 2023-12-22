<template>
    <v-dialog v-model="showAlert" width="450"  persistent>
        <v-card width="100%" rounded="lg">
            <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;" class="pa-10">
                <Icon v-if="iconType === 'success'" name="mdi-light:check-circle" size="80" color="#59B259" />
                <Icon v-if="iconType === 'error'" name="codicon:error" size="80" color="#860002" />
                <Icon v-if="iconType === 'warning'" name="carbon:warning" size="80" color="#EF7003" />
                <Icon v-if="iconType === 'question'" name="ph:question-light" size="80" color="#21D2CE" />
                <span style="font-size: 16pt;color: #000;">{{ messageAlert }}</span>
            </div>
            <v-btn v-if="iconType === 'success'" color="#59B259"
                style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                @click="emit('click')">ຕົກລົງ</v-btn>
            <v-btn v-if="iconType === 'error'" color="#860002"
                style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                @click="emit('click')">ຕົກລົງ</v-btn>
            <v-btn v-if="iconType === 'warning'" color="#EF7003"
                style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                @click="emit('click')">ຕົກລົງ</v-btn>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
const props = defineProps({
    value: {
        type: Boolean,
        default: false
    },
    iconType: {
        type: String,
        default: null
    },
    messageAlert: {
        type: String,
        default: null
    }
})
const emit = defineEmits(['update:modelValue', 'click'])
const showAlert = computed({
    get() {
        return props.value
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>