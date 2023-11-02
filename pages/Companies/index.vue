<template>
    <div>
        <v-card elevation="5" rounded="lg">
            <v-card-title style="border-bottom: 1px solid #ccc;">ຂໍ້ມູນບໍລິສັດ</v-card-title>
            <v-card-text class="pt-4">
                <div class="d-flex align-center">
                    <v-btn color="#035F9F" rounded="lg" to="/companies/create-company">ເພີ່ມບໍລິສັດ</v-btn>
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
        <!-- <div>Data will be here</div> -->
        <!-- <div>
            <div v-for="(item, index) in posts" :key="index">
                {{ item.id }}
                {{ item.name }}
                {{ item.email }}
            </div>
        </div> -->
        <!-- <div v-if="loading">Loading...</div> -->
        <!-- <div>
            {{ posts }}
            <v-btn @click="tests">s</v-btn>
            <v-btn @click="test">e</v-btn>
            <v-btn @click="testss">w</v-btn>
            <v-btn @click="testsss">q</v-btn>
        </div> -->
        <!-- <v-dialog v-model="loading" width="350" persistent>
            <v-card width="100%" rounded="lg">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
                    class="pa-10">
                    <Icon name="mdi-light:check-circle" size="80" color="#59B259" />
                    <span style="font-size: 16pt;color: #59B259;">ສຳເລັດແລ້ວ</span>
                </div>
                <v-btn color="#59B259" style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                    @click="loading = false">ຕົກລົງ</v-btn>
            </v-card>
        </v-dialog> -->
        <v-dialog v-model="erroring" width="350" persistent>
            <v-card width="100%" rounded="lg">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
                    class="pa-10">
                    <Icon name="codicon:error" size="80" color="#860002" />
                    <span style="font-size: 16pt;color: #59B259;">Error status 404</span>
                </div>
                <v-btn color="#860002" style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                    @click="erroring = false">ຕົກລົງ</v-btn>
            </v-card>
        </v-dialog>
        <v-dialog v-model="warning" width="350" persistent>
            <v-card width="100%" rounded="lg">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
                    class="pa-10">
                    <Icon name="carbon:warning" size="80" color="#EF7003" />
                    <span style="font-size: 16pt;color: #59B259;">Error status 404</span>
                </div>
                <v-btn color="#EF7003" style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;"
                    @click="warning = false">ຕົກລົງ</v-btn>
            </v-card>
        </v-dialog>
        <v-dialog v-model="question" width="350" persistent>
            <v-card width="100%" rounded="lg">
                <div style="display: flex;justify-content: center;align-items: center;flex-direction: column;"
                    class="pa-10">
                    <Icon name="ph:question-light" size="80" color="#21D2CE" />
                    <span style="font-size: 16pt;color: #000;">ທ່ານໝັ້ນໃຈແລ້ວບໍ</span>
                </div>
                <div style="display: flex;justify-content: space-between;flex-direction: row;width: 100%;">
                    <v-btn color="#860002" elevation="0"
                        style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;width: 50%;"
                        @click="question = false">ຍົກເລີກ</v-btn>
                    <v-btn color="#035F9F" elevation="0"
                        style="border-radius: 0%;height: 50px;font-size: 12pt;font-weight: bold;width: 50%;"
                        @click="question = false">ຕົກລົງ</v-btn>

                </div>
            </v-card>
        </v-dialog>
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
const config = useRuntimeConfig()
interface Name {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}
// const testArray = ref<Name[]>()
// const dummy: any = ref([])
const loading = ref<any>(false)
const erroring = ref<any>(false)
const warning = ref<any>(false)
const question = ref<any>(false)
import axios from 'axios';
import { useTestStore } from '~/stores/test'
const testStore = useTestStore();
const { setPosts } = testStore
const posts = computed(() => {
    return testStore.posts as Name[]
})

// const { data } : any = await useFetch('https://jsonplaceholder.org/posts')

// const data: Name[] = await $fetch('https://jsonplaceholder.org/posts')
function test() {
    // loading.value = true
    erroring.value = true
}
function tests() {
    loading.value = true
}
function testss() {
    warning.value = true
}
function testsss() {
    question.value = true
}

async function onGetOnline() {
    if (posts.value.length === 0) {
        loading.value = true 
    }
    // loading.value = true
    const { data, status }: any = await axios.get(`https://jsonplaceholder.typicode.com/posts/1/comments`)
    // testArray.value = data
    setPosts(data);
    loading.value = false
    // dummy.value = data
}
onMounted(async () => {
    onGetOnline()
})
</script>