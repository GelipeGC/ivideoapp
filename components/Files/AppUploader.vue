<template>
    <div>
        <input type="file" multiple ref="file">
    </div>
</template>

<script>
import * as Filepond from 'filepond'
import es_ES from "@/node_modules/filepond/locale/es-es";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { supportedFiles } from '@/config/supportedFiles.js'
export default {
    mounted() {
        Filepond.registerPlugin(FilePondPluginFileValidateType);

        Filepond.setOptions(es_ES);

        const pond = Filepond.create(this.$refs.file, {
            acceptedFileTypes: supportedFiles,
            allowRevert: false,
            onprocessfile: (error, file) => {
                if (error) {
                    return;
                }
                pond.removeFile(file);
                this.$emit('onprocessfile', file)
            },
            onaddfile: (error, file) => {
                if (error) {
                    return;
                }

                file.setMetadata("fileInfo", {
                    name: file.filenameWithoutExtension,
                    extension: file.fileExtension,
                    size: file.fileSize
                });
            },
            server: {
                process: (fieldName, file, metadata, load, error, progress, abort) => {
                    let formData = new FormData();
                    const source = this.$axios.CancelToken.source();

                    this.$axios.$post('/api/files/signed', {
                        name: metadata.fileInfo.name,
                        extension: metadata.fileInfo.extension,
                        sixe: metadata.fileInfo.size
                    }).then(response => {
                        file.additionalData = response.additionalData;

                        for (let field in file.additionalData) {
                            formData.append(field, file.additionalData[field])

                        }
                        formData.append("file", file);

                         this.$axios.$post(response.attributes.action, formData, {
                            onUploadProgress(e) {
                                progress(e.lengthComputable, e.loaded, e.total);
                            },
                            cancelToken: source.token
                        }).then(_ => load(`${response.additionalData.key}`));

                    });

                    return {
                        abort: () => {
                            source.cancel();
                            abort()
                        }
                    }

                }
            }
        });
    },
}
</script>
