<template>
        <v-layout column>
                <v-form @submit.prevent="search(query)">
                        <v-layout align-center >
		                            <v-text-field
			                                  v-model="query"
			                                  label="Search"
		                            />

                                <v-btn type="submit" >Search</v-btn>

	                      </v-layout>
                </v-form>
                <div>Results</div>
		            <v-list v-if="results.length">
			                  <v-list-item
				                        v-for="(result, index) in results"
				                        :key="index"
			                  >
				                        <v-list-item-title>
                                        {{ result }}
				                        </v-list-item-title>
			                  </v-list-item>
		            </v-list>
        </v-layout>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
        return {
                query: "",
                results: []
        }
  },
  methods: {
        async search(query) {
                const results = await this.$searchEngine.search(query)
                this.results = results
        },
  }
}
</script>
