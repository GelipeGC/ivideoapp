<template>
    <div class="container mt-5">
        <b-tabs content-class="mt-3">
            <b-tab title="Mi cuenta">
                <app-account></app-account>

            </b-tab>
            <b-tab title="Cambiar contraseña">
                <app-change-password></app-change-password>
            </b-tab>
        </b-tabs>
    </div>
</template>
<script>
import AppAccount from '../components/Dashboard/AppAccount.vue'
import AppChangePassword from '../components/Dashboard/AppChangePassword.vue'
export default {
    head: {
        title: "Mi cuenta",
        lang: "es"
    },
  components: { AppAccount, AppChangePassword },
    middleware: 'auth'
}
</script>
