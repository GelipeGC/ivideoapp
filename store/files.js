export const state = () => ({
    files: []
});

export const mutations = {
    SET_FILES(state, files) {
        state.files = files
    },
    ADD_FILES(state, file) {
        state.files = [file, ...state.files]
    },
    REMOVE_FILE(state, uuid) {
        state.files = state.files.filter(file => file.uuid !== uuid);
    }
}

export const getters = {
    files(state) {
        return state.files
    }
}

export const actions = {
    async getFiles({ commit }) {
        const { data } = await this.$axios.$get('/api/files');
        commit('SET_FILES', data )
    },
    async deleteFile({ commit }, uuid) {
        await this.$axios.$delete(`/api/files/${uuid}`)

        commit('REMOVE_FILE', uuid)
    }
}
