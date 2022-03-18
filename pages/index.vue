<template>
    <div>
        <b-jumbotron
            header="iVideo"
            lead="Sube tus videos, compartelos y descargalos"
            fluid
        >
            <b-button variant="primary">Comienza ya</b-button>
        </b-jumbotron>
        <plans-list></plans-list>
    </div>
</template>

<script>
import PlanList from '@/components/PlansList'
export default {
  name: 'IndexPage',
  components: {
      PlanList
  }
}
</script>
