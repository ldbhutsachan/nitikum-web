<template>
    <v-dialog v-model="loading" width="350">
            <v-card width="100%" rounded="lg">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
                    class="pa-10">
                    <Icon name="mdi-light:check-circle" size="80" color="#59B259" />
                    <span style="font-size: 16pt;color: #59B259;">ສຳເລັດແລ້ວ</span>
                </div>
                <v-btn color="#59B259" style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                    >ຕົກລົງ</v-btn>
            </v-card>
        </v-dialog>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        loading: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
}
</script>