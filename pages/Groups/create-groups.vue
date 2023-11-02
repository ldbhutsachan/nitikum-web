<template>
    <div>

        <v-card rounded="lg" elevation="6">
            <v-card-title class="pt-4 d-flex">
                <v-btn icon density="comfortable" to="/groups">
                    <Icon name="icon-park-outline:back" />
                </v-btn> <span class="ml-2">ສ້າງກຸ່ມບໍລິສັດຫຼັກ</span></v-card-title>
            <v-divider />
            <v-card-text class="pa-10">
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card class="pa-4" elevation="4">
                            <span>
                                <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                                    1
                                </v-btn> ຂໍ້ມູນບໍລິສັດຫຼັກ</span><br />
                            <v-row class="pt-2">
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນຊື່ອັກສອນຫຍໍ້ຂອງບໍລິສັດ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນເລກວິສະຫະກິດ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນຊື່ບໍລິສັດ (ພາສາລາວ)" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນຊື່ບໍລິສັດ (ພາສາອັງກິດ)" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນຖະໜົນ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນບ້ານ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນເມືອງ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນແຂວງ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນເບີໂທ1" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນເບີໂທ2" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນອີເມວ1" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນອີເມວ2" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-select label="ເລືອກສະຖານະ"
                                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" density="compact" hide-details="auto"></v-select>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນໝາຍເຫດ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>

                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card elevation="4" class="pa-4" rounded="lg">
                            <div class="d-flex align-center">
                                <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                                    2
                                </v-btn>
                                <span class="ml-2">ຂໍ້ມູນບັນຊີ</span>
                                <v-spacer></v-spacer>
                                <v-btn color="#035F9F" class="mt-2" rounded @click="dialogAddAccount = true">
                                    <Icon name="ic:baseline-plus" />ເພີ່ມບັນຊີ
                                </v-btn>
                            </div>
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            ເລກບັນຊີ
                                        </th>
                                        <th class="text-left">
                                            ຊື່ບັນຊີ
                                        </th>
                                        <th class="text-left">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in 5" :key="index">
                                        <td>030 00940 09040 </td>
                                        <td>Mr somsone bounvong </td>
                                        <td><v-btn icon density="comfortable">
                                                <Icon name="line-md:close-small" size="20" color="red" />
                                            </v-btn> </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>
                    </v-col>
                </v-row>

            </v-card-text>
            <v-divider />
            <div class="d-flex pa-4">
                <v-spacer />
                <v-btn color="#59B259" height="40" width="150">ບັນທຶກ</v-btn>
            </div>
        </v-card>
        <v-dialog max-width="800" v-model="dialogAddAccount" persistent>
            <v-card>
                <v-card-title>ເພີ່ມບັນຊີ</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <div style="display: flex;justify-content: center;align-items: center;">
                        <v-text-field density="compact" placeholder="CIF..." prepend-inner-icon="mdi-magnify"
                            variant="outlined"></v-text-field>

                        <v-btn style="margin-top: -23px;" height="43" elevation="0" color="#035F9F"
                            class="ml-2">ຄົ້ນຫາ</v-btn>
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    ເລືອກ
                                </th>
                                <th class="text-left">
                                    ເລກບັນຊີ
                                </th>
                                <th class="text-left">
                                    ຊື່ບັນຊີ
                                </th>
                                <th class="text-left">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in 5" :key="index">
                                <td><v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn> </td>
                                <td>030 00940 09040 </td>
                                <td>Mr somsone bounvong </td>
                                <td>LAK</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                <div class="pa-4 d-flex">
                    <v-spacer />
                    <v-btn class="mr-4" color="red" variant="outlined" @click="dialogAddAccount = false">ປິດ</v-btn>
                    <v-btn color="#035F9F">ຕົກລົງ</v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
const dialogAddAccount = ref<boolean>(false);
</script>
