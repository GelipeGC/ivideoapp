<template>
    <div class="container mt-5">
        <h4>Planes disponibles</h4> <hr>
        <b-list-group>
            <app-plan v-for="plan in buyablePlans" :key="plan.slug" :plan="plan" />
        </b-list-group>
    </div>
</template>
<script>
import AppPlan from '../components/AppPlan.vue';
export default {
    head: {
        title: "Planes",
        lang: "es"
    },
    middleware: ['auth', 'canviewplanspage'],
    components: { AppPlan },
    data () {
        return {
            plans: []
        }
    },
    computed: {
        buyablePlans() {
            return this.plans.filter(plan => !plan.is_free)
        }
    },
    mounted () {
        this.getPlans()
    },
    methods: {
        async getPlans() {
            const response = await this.$axios.$get('/api/plans');

            this.plans = response.data;
        }
    }
}
</script>
