<template>
<div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand to="/">
            iVideo
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <client-only>
                    <template v-if="$auth.loggedIn">
                        <b-nav-item to="/upload">Mis videos</b-nav-item>
                    </template>
                </client-only>
                <b-nav-item href="">Planes</b-nav-item>
            </b-navbar-nav>
            <client-only>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right v-if="$auth.loggedIn">
                        <template #button-content>
                            {{ $auth.user.name}}
                        </template>
                        <b-dropdown-item href="">Mi cuenta</b-dropdown-item>
                        <b-dropdown-item href="#" @click.prevent="logout">Cerrar Sesión</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <template v-if="!$auth.loggedIn">
                        <b-nav-item to="/login">Iniciar Sesión</b-nav-item>
                        <b-nav-item to="/register">Crear cuenta</b-nav-item>
                    </template>

                </b-navbar-nav>
            </client-only>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>
export default {

    methods: {
        async logout() {
            await this.$auth.logout();

            this.$router.replace({ name: 'login'})
        }
    },
}
</script>
