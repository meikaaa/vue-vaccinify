<script setup>
import { onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import Api from '../api'

const loggedIn = ref(localStorage.getItem('loggedIn'))
const router = useRouter()

const id_card_number = ref('')
const password = ref('')
const message = ref('')

function login(){
    let formData = new FormData()
    
    formData.append('id_card_number', id_card_number.value)
    formData.append('password', password.value)

    Api.post('/api/v1/auth/login', formData).then(res=>{
        console.log(res.data)
        localStorage.setItem('loggedIn', true)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('token', res.data.token)

        router.push({name: 'dashboard'})
    }).catch(err=>{
        console.log(err.response.data)
        message.value = err.response.data.message
    })
}
onMounted(()=>{
    if(!loggedIn.value){
        router.push({name: 'auth'})
    }
})

</script>

<template>
<nav class="navbar navbar-expand-xxl navbar-dark bg-dark fixed-top">
    <div class="container">
        <router-link :to="{name: 'auth'}" class="navbar-brand">Vaccinify</router-link>
        <div class="d-flex align-items-center">
            <router-link :to="{name: 'auth'}" class="btn btn-outline-light">Register</router-link> 
        </div>
   
 
    </div>
</nav>


<main>
    <header style="background-color: rgb(242, 245, 248);"><br><br><br>
        <div class="container text-center"><br><br>
            
                <h4 class="display-4">Vaccination Platform</h4><br><br><br>
            </div>
            </header><br>

            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">

                        <form class="card card-default" @submit.prevent="login">
                            <div class="card-header">
                                <h5 class="mb-0">Login</h5>
                            </div>
                            <div class="card-body content-center">
                               <div v-if="message" class="alert alert-danger">{{ message }}</div> 
                              <div class="form-group row align-items-center">
                                <div class="col-4 text-right">ID CARD NUMBER</div>
                                <div class="col-8"><input v-model="id_card_number" type="text" class="form-control" id=""></div>
                              </div>

                              <div class="form-group row align-items-center">
                                <div class="col-4 text-right">PASSWORD</div>
                                <div class="col-8"><input v-model="password" type="password" class="form-control" id=""></div>
                              </div>

                              <div class="form-group row align-items-center">
                                <div class="col-4 text-right"></div>
                                <div class="col-8"><button class="btn btn-dark">LOGIN</button></div>
                              </div>

                        </div>
                        </form>
                    </div>
                </div>
            </div>


        </main>



</template>