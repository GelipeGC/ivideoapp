<template>
    <div>
        <b-jumbotron
            header="iVideo"
            lead="Sube tus videos, compartelos y descargalos"
            fluid
        >
            <b-button variant="primary" @click.prevent="handleClick">Comienza ya</b-button>
        </b-jumbotron>
        <plans-list @cardClick="handleClick"></plans-list>
    </div>
</template>

<script>
import PlanList from '@/components/PlansList'
export default {
  name: 'IndexPage',
  components: {
      PlanList
  },
  methods: {
      handleClick () {
          if (!this.$auth.loggedIn) {
              this.$router.push({'name': 'register'});
          }
      }
  },
}
</script>
