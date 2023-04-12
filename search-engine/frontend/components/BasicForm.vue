<template>
        <v-form @submit.prevent="onSubmit(value)">
		            <v-text-field
                        v-model="value"
			                  :label="textFieldLabel"
		            />
                <v-btn type="submit">{{ buttonLabel }}</v-btn>
        </v-form>
</template>

<script>
export default {
  name: 'BasicForm',
  data() {
        return {
                value: "",
        }
  },
  props: {
        textFieldLabel: String,
        buttonLabel: String
  },
  methods: {
        async onSubmit(value) {
                this.$emit("submit", value)
                this.value = ""
        }
  }
}
</script>
