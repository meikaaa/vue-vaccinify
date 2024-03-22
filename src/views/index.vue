<script setup>
import { onMounted, ref } from 'vue'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue';

const token = ref(localStorage.getItem('token'))

const consultation = ref([])
const vaccination = ref([])

function getConsultation(){
    Api.get(`/api/v1/consultations?token=${token.value}`).then(res => {
        console.log(res.data)
        consultation.value = res.data.consultation
    }).catch(err => {
        console.log(err.response.data)
    })
}
function getVaccination(){
    Api.get(`/api/v1/vaccinations?token=${token.value}`).then(res => {
        console.log(res.data)
        vaccination.value = res.data.vaccination
    }).catch(err => {
        console.log(err.response.data)
    })
}


onMounted(() => {
    getConsultation()
    getVaccination()
})
</script>

<template>
    <AppLayout>
        <main>
            <header style="background-color: rgb(242, 245, 248);">
                <br><br><br>
                <div class="container">
                    <br><br>
                    <h4 class="display-4">Vaccination Platform</h4>
                    <br><br><br>
                </div>
            </header>
            <br>
            <div class="container">
                <h5 class="text-muted">My Data Consultation</h5><br>
                <div class="row">
                    <div v-if="!consultation" class="col-md-5">
                        <div class="card card-header mb-0">
                            <h5 class="mb-0">Consultation</h5>
                        </div>
                        <div class="card card-body">
                            <router-link :to="{name: 'consultations'}" class="btn btn-dark">+Request Consultation</router-link>
                        </div>
                    </div>
                    <div v-else class="col-md-4">
                        <div class="card card-default">
                            <div class="card-header border-0">
                                <h5 class="mb-0">Consultation</h5>
                            </div>
                        <div class="card card-body p-0">
                            <table class="table table-striped table-hover mb-0">
                                <tr>
                                    <th>Status</th>
                                    <td v-if="consultation?.status == 'pending'"><span class="badge badge-info">Pending</span></td>
                                    <td v-if="consultation?.status == 'declined'"><span class="badge badge-danger">Declined</span></td>
                                    <td v-if="consultation?.status == 'accepted'"><span class="badge badge-success">Accepted</span></td>
                                </tr>
                                <tr>
                                    <th>Societies ID</th>
                                    <td class="text-muted">{{ consultation?.societies_id || '-' }}</td>
                                </tr>
                                <tr>
                                    <th>Regional ID</th>
                                    <td class="text-muted">{{ consultation?.regional_id || '-' }}</td>
                                </tr>
                                <tr>
                                    <th>Current Symptoms</th>
                                    <td class="text-muted">{{ consultation?.current_symptoms || '-' }}</td>
                                </tr>
                                <tr>
                                    <th>Disease History</th>
                                    <td class="text-muted">{{ consultation?.disease_history || '-' }}</td>
                                </tr>
                         
                                <tr>
                                    <th>Notes</th>
                                    <td class="text-muted">{{ consultation?.notes || '-' }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div><br><br>
            <div class="container">
                <h5 class="text-muted">My Data Vaccination</h5><br>
                <div class="row">

                            
                    <div v-if="consultation?.status != 'accepted'" class="col-md-5">
                       <div class="alert alert-warning">
                        <h5> Your consultation must be accepted! </h5>
                        </div>
                    </div>
                    <div v-if="consultation?.status == 'accepted' && vaccination.length === 0" class="col-md-4">
                            <router-link :to="{ name: 'vaccinations' }" class="btn btn-dark btn-lg btn-block">+ Add Vaccination</router-link>
                        </div>


                    <div v-else-if="vaccination" class="col-md-4">
                        <div class="card card-header">
                            <h5 class="mb-0">Vaccination</h5>
                        </div>
                        <div class="card card-body">
                            <table class="table table-stripped mb-0">
                                <tr>
                                    <th>Spot ID</th>
                                    <td class="text-muted">{{ vaccination?.spot?.id || '-' }}</td>
                                </tr>
                                <tr>
                                    <th>Dose</th>
                                    <td class="text-muted">{{ vaccination?.dose || '-' }}</td>
                             </tr>
                                <tr>
                                    <th>Place</th>
                                    <td class="text-muted">{{ vaccination?.place || '-' }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AppLayout>
</template>
