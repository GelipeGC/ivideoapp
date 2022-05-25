<template>
    <b-list-group-item class="d-flex">
        <span class="text-truncate">{{ file.name }} - <span class="text-primary">{{ sizeFormatted }}</span></span>
        <div class="ml-auto pl-2">
            <app-file-share :file="file"></app-file-share>
            <b-button variant="danger" size="sm" @click.prevent="deleteFile">Eliminar</b-button>
        </div>
    </b-list-group-item>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import AppFileShare from './AppFileShare.vue';
import filesize from "filesize";
export default {
  components: { AppFileShare },
    props: {
        file: {
            required: true,
            type: Object
        }
    },
    computed: {
        sizeFormatted() {
            return filesize(this.file.size)
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
            this.$bvModal.msgBoxConfirm("¿Quieres eliminar este video?", {
                okTitle: "Si",
                cancelTitle: "No"
            }).then(async(value) => {
                if (value) {
                    await this.deleteFileAction(this.file.uuid);
                    this.decrementUsage(this.file.size)
                }
            })
        }
    }
}
</script>
