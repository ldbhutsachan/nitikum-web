<template>
    <div>
        <v-card elevation="5" rounded="lg">
            <v-card-title style="border-bottom: 1px solid #ccc;">ຂໍ້ມູນ User ເຂົ້າໃຊ້ງານ</v-card-title>
            <v-card-text class="pt-4">
                <div class="d-flex align-center">
                    <v-btn color="#035F9F" rounded="lg" to="/users/create-user">ເພີ່ມ User</v-btn>
                    <h3 class="ml-6">ທັງໝົດ: 20</h3>
                </div>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Calories
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in 5" :key="index">
                            <td>{{ index }}</td>
                            <td>{{ index }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>

        </v-card>
    </div>
</template>