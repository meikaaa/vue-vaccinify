<script setup>
import { onMounted, ref } from 'vue'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue';
import { useRouter } from 'vue-router';

const token = ref(localStorage.getItem('token'))
const loggedIn = ref(localStorage.getItem('loggedIn'))
const router = useRouter()

const current_symptoms = ref('')
const current_symptoms_text = ref('')
const disease_history = ref('')
const disease_history_text = ref('')
const notes = ref('')
const message = ref('')

function consultation() {
    let formData = new FormData()
    formData.append('notes', notes.value)

    if (current_symptoms.value === 'yes') {
        formData.append('current_symptoms', current_symptoms_text.value)
    } else {
        formData.append('current_symptoms', 'no')
    }

    if (disease_history.value === 'yes') {
        formData.append('disease_history', disease_history_text.value)
    } else {
        formData.append('disease_history', 'no')
    }

    Api.post(`/api/v1/consultations?token=${token.value}`, formData)
        .then(res => {
            console.log(res.data)
            alert('Request consultations successful')
            router.push({name: 'dashboard'})
        })
        .catch(err => {
            console.log(err.response.data)
            message.value = err.response.data.message
        })
}

onMounted(() => {
    if (!loggedIn.value) {
        router.push({name: 'auth'})
    }
})
</script>

<template>
    <AppLayout>
        <header style="background-color: rgb(242, 245, 248);">
            <br><br><br>
            <div class="container">
                <br><br>
                <h4 class="display-4">Request Consultation</h4>
                <br><br><br>
            </div>
        </header><br><br>
        <div class="container">
            <form @submit.prevent="consultation">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="disease-history" class="mb-0">Do you have disease history?  </label>
                            <select class="form-control-sm mb-2" name="disease_history" v-model="disease_history">
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                            <textarea v-if="disease_history == 'yes'" class="form-control" rows="3" placeholder="Describe your disease history" v-model="disease_history_text"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="current-symptoms" class="mb-0">Do you have symptoms now?  </label>
                            <select class="form-control-sm mb-2" name="current_symptoms" v-model="current_symptoms">
                                <option value="yes">Yes, I have</option>
                                <option value="no">No</option>
                            </select>
                            <textarea v-if="current_symptoms == 'yes'" class="form-control" rows="3" placeholder="Describe your current symptoms" v-model="current_symptoms_text"></textarea>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="notes" class="mb-0">Notes: </label>
                    <textarea v-model="notes" class="form-control" rows="3" placeholder="Add any additional notes here"></textarea>
                </div>

                <button type="submit" class="btn btn-dark">Send Request</button>
            </form>
        </div>
    </AppLayout>
</template>
