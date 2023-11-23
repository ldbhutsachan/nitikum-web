<template>
    <v-dialog v-model="loading" width="70" >
        <v-card color="#243B7A" rounded="lg" elevation="10" class="pa-2" style="display: flex;justify-content: center;align-items: center;">
            <!-- <v-card-text> -->
                <v-progress-circular :size="50" color="white" indeterminate></v-progress-circular>
            <!-- </v-card-text> -->
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