<script setup>
import { onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import Api from '../../api'

const router = useRouter()

const loggedIn = ref(localStorage.getItem('loggedIn'))
const name = ref(localStorage.getItem('name'))
const token = ref(localStorage.getItem('token'))

function logout(){
    Api.post(`/api/v1/auth/logout?token=${token.value}`).then(res=>{
        console.log(res.data)
        localStorage.clear();
        router.push({name: 'auth'})
    }).catch(err=>{
        console.log(err.response.data)
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
        <router-link :to="{name: 'dashboard'}" class="navbar-brand">Vaccinify</router-link>
        <div class="d-flex align-items-center">
            <router-link :to="{name: 'dashboard'}" class="navbar-brand text-muted">{{ name }}</router-link>
        <a @click.prevent="logout" href="javascript:void(0)" class="btn btn-outline-danger">Logout</a>   
        </div> 
    </div>
</nav>

<slot/>

<div class="footer">
    <div class="container text-center">
        <div class="text-center py-4 text-muted">Copyright &copy; WebTech-2024</div>
    </div>
</div>


</template>