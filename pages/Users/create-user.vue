<template>
    <div>
        <v-card rounded="lg">
            <v-card-title class="pt-4 d-flex">
                <v-btn icon density="comfortable" to="/groups">
                    <Icon name="icon-park-outline:back" />
                </v-btn> <span class="ml-2">ສ້າງ User</span></v-card-title>
            <v-divider />
            <v-card-text class="pa-10">
                <v-row>
                    <v-col cols="12" md="6" sm="4">
                        <v-card class="pa-4" elevation="4">
                            <span>
                                <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                                    1
                                </v-btn> ຂໍ້ມູນບໍລິສັດ</span><br />
                            <br />
                            <v-autocomplete label="ເລືອກບໍລິສັດຫຼັກ"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" density="compact"></v-autocomplete>
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left font-weight-bold">
                                            ບໍລິສັດໃນເຄືອ
                                        </th>
                                        <th class="text-left">
                                        </th>
                                        <th class="text-left">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in 3" :key="index">
                                        <td><v-btn icon density="compact" color="#035F9F" variant="outlined">
                                                <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                            </v-btn> </td>
                                        <td>030 00940 09040 </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" sm="4">
                        <v-card class="pa-4" elevation="4">
                            <span>
                                <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                                    2
                                </v-btn> ຂໍ້ມູນຜູ້ໃຊ້ງານ
                            </span><br />
                            <v-row class="pt-2">
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນ Username" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ເພດ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນຊື່ (ພາສາລາວ)" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນນາມສະກຸນ (ພາສາລາວ)" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນຊື່ (ພາສາອັງກິດ)" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="ປ້ອນນາມສະກຸນ (ພາສາອັງກິດ)" density="compact" hide-details="auto"></v-text-field>
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
                                    <v-text-field label="ເປ້ອນບີໂທ1" density="compact" hide-details="auto"></v-text-field>
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
                                    <v-select label="ເລືອກປະເພດເຂົ້າໃຊ້ງານ"
                                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" density="compact" hide-details="auto"></v-select>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-select label="ເລືອກສະຖານະ"
                                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" density="compact" hide-details="auto"></v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>


                <v-card class="mt-4 pa-4" rounded="lg" elevation="4">
                    <div class="d-flex align-center">
                        <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                            3
                        </v-btn>
                        <span class="ml-2">ຂໍ້ມູນບັນຊີ</span>
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    ຊື່ບັນຊີ
                                </th>
                                <th class="text-left">
                                    ເລກບັນຊີ
                                </th>
                                <th class="text-left">
                                    ສະກຸນເງິນ
                                </th>
                                <th class="text-left">
                                    ປິດຍອດເງິນ
                                </th>
                                <th class="text-left">
                                    ອະນຸມັດ Auto
                                </th>
                                <th class="text-left">
                                    ຈຳນວນເງິນ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in 5" :key="index">
                                <td>Mr somsone bounvong </td>
                                <td>030 00940 09040 </td>
                                <td>LAK</td>
                                <td>
                                    <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                </td>
                                <td>
                                    <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                </td>
                                <td><v-text-field density="compact" label="ຈຳນວນເງິນ"></v-text-field></td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
                <br />
                <v-row>
                    <v-col cols="12" md="6" sm="4">
                        <v-card class="pa-4" elevation="4">
                            <span>
                                <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                                    4
                                </v-btn> ລີມິດການເຮັດທຸລະກຳຕໍ່ມື້
                            </span><br /><br />
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="₭ ເງິນກີບ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="฿ ເງິນບາດ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="$ ເງິນໂດລາ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <v-text-field label="¥ ເງິນຢວນ" density="compact" hide-details="auto"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" sm="4">
                        <v-card class="pa-4" elevation="4">
                            <span>
                                <v-btn icon color="#035F9F" density="comfortable" to="/groups">
                                    5
                                </v-btn> ຂໍ້ມູນເມນູ
                            </span><br /><br />
                            <v-row>
                                <v-col cols="12" md="6" sm="4">
                                    <div
                                        style="height: 40px;width: 100%; border:1px solid #999;display: flex;justify-content: start;align-items: center;border-radius: 5px;flex-direction: row;" class="pl-4">
                                        <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                        <span class="ml-2">ການກວດສອບ</span>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <div
                                        style="height: 40px;width: 100%; border:1px solid #999;display: flex;justify-content: start;align-items: center;border-radius: 5px;flex-direction: row;" class="pl-4">
                                        <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                        <span class="ml-2">ການກວດສອບ</span>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <div
                                        style="height: 40px;width: 100%; border:1px solid #999;display: flex;justify-content: start;align-items: center;border-radius: 5px;flex-direction: row;" class="pl-4">
                                        <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                        <span class="ml-2">ການກວດສອບ</span>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <div
                                        style="height: 40px;width: 100%; border:1px solid #999;display: flex;justify-content: start;align-items: center;border-radius: 5px;flex-direction: row;" class="pl-4">
                                        <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                        <span class="ml-2">ການກວດສອບ</span>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <div
                                        style="height: 40px;width: 100%; border:1px solid #999;display: flex;justify-content: start;align-items: center;border-radius: 5px;flex-direction: row;" class="pl-4">
                                        <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                        <span class="ml-2">ການກວດສອບ</span>
                                    </div>
                                </v-col>
                                <v-col cols="12" md="6" sm="4">
                                    <div
                                        style="height: 40px;width: 100%; border:1px solid #999;display: flex;justify-content: start;align-items: center;border-radius: 5px;flex-direction: row;" class="pl-4">
                                        <v-btn icon density="compact" color="#035F9F" variant="outlined">
                                        <Icon name="material-symbols-light:check" size="25" color="#035F9F" />
                                    </v-btn>
                                        <span class="ml-2">ການກວດສອບ</span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <div class="d-flex pa-4 pl-10">
                <v-btn color="#59B259" height="40" width="150">ບັນທຶກ</v-btn>
                <v-spacer />
            </div>
        </v-card>
    </div>
</template>