<template>
    <b-list-group-item class="d-flex">
        <span class="text-truncate">{{ file.name }}</span>
        <div class="ml-auto pl-2">
            <b-button variant="light" size="sm">Link para compartir</b-button>
            <b-button variant="danger" size="sm" @click.prevent="deleteFile">Eliminar</b-button>
        </div>
    </b-list-group-item>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
export default {
    props: {
        file: {
            required: true,
            type: Object
        }
    },
    methods: {
        ...mapActions({
            deleteFileAction: 'files/deleteFile'
        }),
        ...mapMutations({
            decrementUsage: 'usage/DECREMENT_USAGE'
        }),
        async deleteFile () {
            if (window.confirm('Quieres eliminar este video?')) {
                await this.deleteFileAction(this.file.uuid);
                //reduce storage
                this.decrementUsage(this.file.size)
            }
        }
    }
}
</script>
