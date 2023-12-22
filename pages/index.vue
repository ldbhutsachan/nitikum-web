<template>
    <div>
        <v-card width="1400" class="mx-auto">
            <v-card-text>
                <v-carousel cycle show-arrows="hover" height="400" hide-delimiter-background>

                    <v-carousel-item src="https://vegw.ldblao.la/cat-storage/api/v1//Yuan-04.webp" cover></v-carousel-item>

                    <v-carousel-item src="https://vegw.ldblao.la/cat-storage/api/v1//Visa.webp" cover></v-carousel-item>

                    <v-carousel-item src="https://vegw.ldblao.la/cat-storage/api/v1//Website%20Update%20Point-01.webp"
                        cover></v-carousel-item>
                </v-carousel>
                <div class="pt-10 pl-5">
                    <span style="font-size: 14pt;font-weight: bold;">ນິຕິກໍາ ທີ່ມີຜົນສັກສິດ
                        ໃນຈົດໝາຍເຫດທາງລັດຖະການ</span><br /><br />
                    (ເພື່ອໃຫ້ມີຜົນສັກສິດ ອີງຕາມ ມາດ​ຕາ 108 ຂອງກົດໝາຍສ້າງນິຕິກໍາ)<br /><br />
                </div>
                <br /><br />
                <v-divider></v-divider>
                <v-table>
                    <thead>
                        <tr style="background-color: #243B7A;">
                            <th class="text-left text-white">
                                ຫົວຂໍ້
                            </th>
                            <th class="text-left text-white">
                                ພາກສ່ວນຮັບຜິດຊອບ
                            </th>
                            <th class="text-left text-white">
                                ເລກທີເອກະສານ
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

                    <tr style="background-color: #fff;">
                        <th class="text-left pl-0 pt-4" style="width: 200px;">
                            <v-text-field placeholder="ຫົວຂໍ້" v-model="subject" @input="onGetDocBySubj" variant="outlined"
                                density="compact"></v-text-field>
                        </th>
                        <th class="text-left  pl-4 pt-4">
                            <v-select :items="sectiontList" v-model="khanang" @update:model-value="onGetDocBySec"
                                label="ເລືອກລາຍການ" item-title="secDescLao" item-value="secCode" variant="outlined"
                                density="compact"></v-select>
                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left pl-4 pt-4" style="width: 200px;">
                            <v-select :items="docTypeList" v-model="docType" @update:model-value="onGetDocByType"
                                label="ເລືອກປະເພດ" variant="outlined" density="compact" item-title="docDescLao"
                                item-value="docType"></v-select>
                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                        <th class="text-left text-white pl-4">

                        </th>
                    </tr>
                    <tbody>
                        <tr v-for="(item, index) in shareDocData?.resData" :key="index"
                            :style="{ 'backgroundColor': active === index.toString() ? '#BCE774' : index % 2 === 0 ? '#E4F1F4' : '#F8F8F8', 'cursor': 'pointer', }"
                            @mouseover="active = index.toString()" @mouseleave="active = ''">
                            <td>{{ item.subjectName }}</td>
                            <td>{{ item.depDescLAO }}</td>
                            <td>{{ item.docNo }}</td>
                            <td>{{ item.docDate }}</td>
                            <td>{{ item.approveDate }}</td>
                            <td>{{ item.docDescLao }}</td>
                            <td>{{ item.docStatus }}</td>
                            <td><v-btn @click="onGetDetailDataForShow(
                                item.subjectName, item.docDescLao, item.depDescLAO, item.createBy, item.approveDate, item.docDate
                            )" density="comfortable" variant="text" style="color: #243A7A;font-weight: bold;">
                                    <!-- <Icon name="icon-park-outline:view-grid-detail" /> -->
                                    ເບິ່ງ
                                </v-btn></td>
                            <td>
                                <a v-if="item?.docPathLa !== '' && item?.docPathLa !== null" :href="item?.docPathLa ? item?.docPathLa : ''" target="_blank">
                                    <v-btn elevation="0" variant="text">
                                        <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                    </v-btn>
                                </a>
                            </td>
                            <td style="font-size: 12pt;">
                                <a v-if="item?.docPath !== '' && item?.docPath !== null" :href="item?.docPath ? item?.docPath : ''" target="_blank">
                                    <v-btn elevation="0" variant="text">
                                        <Icon name="vscode-icons:file-type-pdf2" size="30" />
                                    </v-btn>
                                </a>
                            </td>



                        </tr>
                    </tbody>
                </v-table>
            </v-card-text>
        </v-card>
        <loading v-model="showLoading" />
        <v-dialog v-model="diaLogDetail" max-width="600" persistent>
            <v-card class="pa-10">
                <v-card-title class="font-weight-bold">ນິຕິກຳ</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <span><span class="font-weight-bold">ຫົວຂໍ້:</span> {{ title }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ປະເພດນິຕິກຳ:</span> {{ titleType }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ອອກໂດຍ:</span> {{ by }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ພາກສ່ວນຮັບຜິດຊອບ:</span> {{ reposity }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ວັນທີນິຕິກຳ:</span> {{ dateCreate }}</span><br />
                    <div style="height: 15px;"></div>
                    <span><span class="font-weight-bold">ວັນທີເຜີຍແຜ່:</span> {{ dataPublie }}</span>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pt-4">
                    <v-spacer></v-spacer>
                    <v-btn @click="diaLogDetail = false" variant="outlined" color="red" class="mr-2">ປິດອອກ</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup lang="ts">
definePageMeta({
    // middleware: 'auth'
})

import loading from '~/components/loading/loading.vue'
import { type ShareDocument } from '~/models/shareDocModels/shareDoc'
const shareDocData: any = ref([])
const showLoading = ref<boolean>(false)
import { useManageState } from '~/stores/manage-state'
const manageState = useManageState()
const active = ref<string>('')
const subject = ref<string>('')
const khanang = ref<string>('')
const docType = ref<string>('')
const getShareForm = ref({
    markerId: ''
})
// detail state
const title = ref<string>('')
const titleType = ref<string>('')
const by = ref<string>('')
const reposity = ref<string>('')
const dateCreate = ref<string>('')
const dataPublie = ref<string>('')
const onGetDetailDataForShow = (subjectName: any, docDescLao: any, depDescLAO: any, createBy: any, approveDate: any, docDate: any) => {
    title.value = subjectName
    titleType.value = docDescLao
    by.value = createBy
    reposity.value = depDescLAO
    dateCreate.value = approveDate
    dataPublie.value = docDate
    diaLogDetail.value = true
}
const diaLogDetail = ref<boolean>(false)
const onGetDoc = async () => {
    showLoading.value = true
    const userId = useCookie('userId')
    getShareForm.value.markerId = userId.value ? userId.value : ''
    const { data } = await useServer('Share/get-share-doc', {
        method: 'POST',
        body: JSON.stringify(getShareForm.value)
    })
    const res: any = data.value
    shareDocData.value = res;
    showLoading.value = false
}
const { setSectionList, setDocumentTypeList } = manageState
const sectiontList = computed(() => { return manageState.sectionList })
const docTypeList = computed(() => { return manageState.documentTypeList })
const formGet = ref({ secCode: '' })
const onGetSectionList = async () => {

    const { data } = await useServer('section/get', {
        method: 'POST',
        body: JSON.stringify(formGet.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        setSectionList(res?.resData)
    }

}
const formGetD = ref({ docType: '' })
const onGetDocType = async () => {
    const { data } = await useServer('doc-type/get', {
        method: 'POST',
        body: JSON.stringify(formGetD.value)
    })
    const res: any = data.value
    if (res?.message?.resCode === '00') {
        setDocumentTypeList(res?.resData)

    }
}
const formGetBySub = ref({ subjectName: '', markerId: '' })
const onGetDocBySubj = async () => {
    showLoading.value = true
    shareDocData.value = []
    const userId = useCookie('userId')
    formGetBySub.value.markerId = userId.value ? userId.value : ''
    formGetBySub.value.subjectName = subject.value
    const { data } = await useServer('Share/get-doc-by-subj', {
        method: 'POST',
        body: JSON.stringify(formGetBySub.value)
    })
    const res: any = data.value
    shareDocData.value = res;
    showLoading.value = false
}
const formGetS = ref({ secCode: '', markerId: '' })
const onGetDocBySec = async () => {
    const userId = useCookie('userId')
    showLoading.value = true
    shareDocData.value = []
    formGetS.value.secCode = khanang.value
    formGetS.value.markerId = userId.value ? userId.value : ''
    const { data } = await useServer('Share/get-doc-by-khanang', {
        method: 'POST',
        body: JSON.stringify(formGetS.value)
    })
    const res: any = data.value
    shareDocData.value = res;
    showLoading.value = false
}
const formGetType = ref({ docType: '', markerId: '' })
const onGetDocByType = async () => {
    const userId = useCookie('userId')
    showLoading.value = true
    shareDocData.value = []
    formGetType.value.markerId = userId.value ? userId.value : ''
    formGetType.value.docType = docType.value
    const { data } = await useServer('Share/get-doc-by-type', {
        method: 'POST',
        body: JSON.stringify(formGetType.value)
    })
    const res: any = data.value
    shareDocData.value = res;
    showLoading.value = false
}
if (process.server) {
    await onGetDoc()
    await onGetSectionList()
    await onGetDocType()
}
onMounted(async () => {
    await onGetDoc()
    await onGetSectionList()
    await onGetDocType()
})
</script>
