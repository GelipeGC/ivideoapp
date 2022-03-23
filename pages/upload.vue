<template>
    <b-container class="mt-5">
        <div v-if="errors.size">
            <b-alert variant="danger" show>
                {{ errors.size[0]}}
            </b-alert>
        </div>
        <div class="mb-4">
            <app-uploader @onprocessfile="storeFile"
                        @validation="setValidationErrors"
            />
        </div>
        <div>
            <h4>Tus videos</h4>
            <hr>
            <b-list-group v-if="files.length">
                <AppFile v-for="file in files" :key="file.uuid" :file="file"/>
            </b-list-group>
        </div>
    </b-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import AppFile from '@/components/Files/AppFile.vue';
import AppUploader from '@/components/Files/AppUploader.vue';

export default {
    middleware:  'auth',
    components: {
        AppFile,
        AppUploader
    },
    data () {
        return {
            errors: {}
        }
    },
    mounted() {
        this.getFiles()
    },
    methods: {
        ...mapActions({
            getFiles: 'files/getFiles'
        }),
        ...mapMutations({
            addFile: 'files/ADD_FILES',
            incrementUsage: 'usage/INCREMENT_USAGE'
        }),
        async storeFile (file) {
            const response = await this.$axios.$post("api/files", {
                name: file.filename,
                size: file.fileSize,
                path: file.serverId
            });

            this.addFile(response.data)
            this.incrementUsage(file.fileSize)

        },
        setValidationErrors(errors) {
            this.errors = errors;
        }
    },
    computed: {
        ...mapGetters({
            files: 'files/files'
        })
    }

}
</script>
