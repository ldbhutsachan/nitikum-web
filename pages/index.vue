<template>
    <div>
        <v-card width="1200" class="mx-auto">
            <v-card-text>
                <v-carousel cycle show-arrows="hover" height="300" hide-delimiter-background>
                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

                    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
                </v-carousel>
                <div class="pt-10 pl-5">
                    <span style="font-size: 14pt;font-weight: bold;">ນິຕິກໍາ ທີ່ມີຜົນສັກສິດ ໃນຈົດໝາຍເຫດທາງລັດຖະການ</span><br /><br />
                    (ເພື່ອໃຫ້ມີຜົນສັກສິດ ອີງຕາມ ມາດ​ຕາ 108 ຂອງກົດໝາຍສ້າງນິຕິກໍາ)<br /><br />
                </div>
                <br /><br />
                <v-divider></v-divider>
                <v-table>
                    <thead>
                        <tr style="background-color: #243B7A;" >
                            <th class="text-left text-white">
                                ຫົວຂໍ້
                            </th>
                            <th class="text-left text-white">
                                ພາກສ່ວນຮັບຜິດຊອບ
                            </th>
                            <th class="text-left text-white">
                                ວັນທີລົງ
                            </th>
                            <th class="text-left text-white">
                                ວັນທີເຜີຍແຜ່
                            </th>
                            <th class="text-left text-white">
                                ປະເພດເອກະສານ
                            </th>
                            <th class="text-left text-white">
                                ສະຖານະ
                            </th>
                            <th class="text-left text-white">
                                ເນື້ອໃນ
                            </th>
                            <th class="text-left text-white">
                                PDF-ENG
                            </th>
                            <th class="text-left text-white">
                                PDF-LAO
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in shareDocData?.resData" :key="index" :style="{'backgroundColor': active === index.toString() ? '#BCE774' : index%2 === 0 ? '#E4F1F4' : '#F8F8F8','cursor':'pointer','fontSize':'8pt'}" @mouseover="active = index.toString()" @mouseleave="active = ''">
                            <td>{{ item.subjectName }}</td>
                            <td>{{ item.depDescLAO }}</td>
                            <td>{{ item.docDate }}</td>
                            <td>{{ item.approveDate }}</td>
                            <td>{{ item.docDescLao }}</td>
                            <td>{{ item.docStatus }}</td>
                            <td><v-btn icon density="comfortable" variant="text">
                                    <Icon name="icon-park-outline:view-grid-detail" />
                                </v-btn></td>
                            <td><v-btn icon density="comfortable" variant="text">
                                    <Icon name="teenyicons:pdf-outline" />
                                </v-btn></td>
                            <td><v-btn icon density="comfortable" variant="text">
                                    <Icon name="teenyicons:pdf-outline" />
                                </v-btn></td>


                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>

    </div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
import { type ShareDocument } from '~/models/shareDocModels/shareDoc'
const shareDocData = ref<ShareDocument>()
const active = ref<string>('')
const getShareForm = ref({
    markerId: ''
})
const onGetDoc = async () => {
    const userId = useCookie('userId')
    getShareForm.value.markerId = userId.value ? userId.value : ''
    const { data } = await useServer('Share/get-share-doc', {
        method: 'POST',
        body: JSON.stringify(getShareForm.value)
    })
    const res: any = data.value
    shareDocData.value = res as ShareDocument;
}
onMounted(async () => {
    onGetDoc()
})
</script>
