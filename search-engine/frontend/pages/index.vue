<template>
        <v-layout column>
                <v-alert :type="alertType" v-if="alertMessage">
                        {{ alertMessage }}
                </v-alert>
                <v-divider class="mt-10"></v-divider>
                <basic-form 
                        text-field-label="Add word" 
                        button-label="Add word"
                        @submit="addWord"
                />
                <v-divider class="mt-10"></v-divider>
                <basic-form 
                        text-field-label="Remove word" 
                        button-label="Remove word"
                        @submit="removeWord"
                />
                <v-divider class="mt-10"></v-divider>
                <search-form />
        </v-layout>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
        return {
                alertType: "",
                alertMessage: "",
                query: "",
                results: []
        }
  },
  methods: {
        async setAlert(type, message) {
                this.alertType = type
                this.alertMessage = message
        },
        async addWord(word) {
                try {
                        await this.$searchEngine.addWord(word)
                        this.newWord = ""
                        this.setAlert("success", "New word added")
                } catch {
                        this.setAlert("error", "Internal server error")
                }
        },
        async removeWord(word) {
                try {
                        const result = await this.$searchEngine.removeWord(word)
                        this.wordToRemove = ""
                        this.setAlert("success", `The word '${result.removedWord}' have been removed`)
                } catch (error) {
                        if (error.response.status) {
                                this.setAlert("error", "No matching word")
                        } else {
                                this.setAlert("error", "")
                        }
                }
        }
  }
}
</script>
