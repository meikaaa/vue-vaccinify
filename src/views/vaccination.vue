<script setup>
import { onMounted, ref } from 'vue'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue';
import { useRouter } from 'vue-router';

const token = ref(localStorage.getItem('token'))
const loggedIn = ref(localStorage.getItem('loggedIn'))
const router = useRouter()

const dose = ref('')
const spot_id = ref('')
const place = ref('')
const message = ref('')

function vaccination(){

    let formData = new FormData()
    formData.append('spot_id', spot_id.value)
    formData.append('dose', dose.value)
    formData.append('place', place.value)

    Api.post(`/api/v1/vaccinations?token=${token.value}`, formData).then(res => {
    console.log(res.data)
    alert('Request vaccinations successfull')
    router.push({name: 'dashboard'})
    }).catch(err => {
        console.log(err.response.data)
        message.value = err.response.data.message
    })
}

onMounted(() => {
if(!loggedIn.value){
    router.push({name: 'auth'})
}
})
</script>

<template>
<AppLayout>
    <main>
        <header style="background-color: rgb(242, 245, 248);">
                <br><br><br>
                <div class="container">
                    <br><br>
                    <h4 class="display-4"> Request Vaccination</h4>
                    <br><br><br>
                </div>
            </header><br><br>

            <div class="container">
                    <div class="col-md-8">

                        <form class="card card-default" @submit.prevent="vaccination">
                            <div class="card-header">
                                <h5 class="mb-0">Vaccination</h5>
                            </div>
                            <div class="card-body content-center">
                               <div v-if="message" class="alert alert-danger">{{ message }}</div> 
                               <div class="form-group row align-items-center">
                                <div class="col-4">Spots</div>
                                <div class="col-8"><input v-model="spot_id" type="number" class="form-control" id=""></div>
                              </div>
                              <div class="form-group row align-items-center">
                                <div class="col-4">Dose</div>
                                <div class="col-8"><input v-model="dose" type="number" class="form-control" id=""></div>
                              </div>
                              <div class="form-group row align-items-center">
                                <div class="col-4">Place</div>
                                <div class="col-8"><input v-model="place" type="text" class="form-control" id=""></div>
                              </div>

                              <div class="form-group row align-items-center">
                                <div class="col-4"></div>
                                <div class="col-8"><button class="btn btn-dark">SEND</button></div>
                              </div>

                        </div>
                        </form>
                    </div>
                </div>
    </main>
</AppLayout>

</template>