<template>
    <div class="w-screen">
        <div>
            <div v-if="Object.keys(words).length > 0">
                <div v-for="(word, ref) in words"
                     :key="ref"
                     class="flex flex-row text-2xl m-4">
                <span class="w-1/3">
                    "{{word.value}}"
                </span>
                    <span>
                    Vote: {{word.vote}}
                </span>
                    <button @click="voteWord(ref)"
                            class="btn btn-default btn-primary ml-4">
                        +1
                    </button>
                </div>
            </div>
            <div v-else class="text-2xl">
                Aucune suggestions de mots
            </div>
            <button @click="addWord"
                    class="btn btn-default btn-primary m-4">
                Suggérer un mot
            </button>
        </div>
        <div>
            <div v-if="Object.keys(features).length > 0">
                <div v-for="(feature, ref) in features"
                     :key="ref"
                     class="flex flex-row text-2xl m-4">
                <span class="w-1/3">
                    "{{feature.value}}"
                </span>
                    <span>
                    Vote: {{feature.vote}}
                </span>
                    <button @click="voteFeature(ref)"
                            class="btn btn-default btn-primary ml-4">
                        +1
                    </button>
                </div>
            </div>
            <div v-else class="text-2xl">
                Aucune suggestions de features
            </div>
            <button @click="addFeature"
                    class="btn btn-default btn-primary m-4">
                Suggérer une feature
            </button>
        </div>

    </div>
</template>

<script>
  export default {
    name: 'Suggestions',
    data() {
      return {
        words: {},
        features: {}
      }
    },
    created() {
      this.$fb.ref('suggestions').on('value', this.getSuggestions)
    },
    beforeDestroy() {
      this.$fb.ref('suggestions').off('value', this.getSuggestions)
    },
    methods: {
      getSuggestions(snap) {
        if (snap.val()) {
          this.words = snap.val().words ?? {}
          this.features = snap.val().features ?? {}
        }
      },
      addWord() {
        let word = ''
        while (!word || word.length < 3) {
          word = prompt('Veuillez entrer votre mot (3 caractère min)', word)
        }
        this.$fb.ref('suggestions/words').push({value: word, vote: 0})
      },
      voteWord(ref) {
        this.$fb.ref('suggestions/words/' + ref).update({vote: this.words[ref].vote + 1})
      },
      addFeature() {
        let feature = ''
        while (!feature || feature.length < 3) {
          feature = prompt('Veuillez entrer votre feature (3 caractère min)', feature)
        }
        this.$fb.ref('suggestions/features').push({value: feature, vote: 0})
      },
      voteFeature(ref) {
        this.$fb.ref('suggestions/features/' + ref).update({vote: this.features[ref].vote + 1})
      }
    }
  }
</script>

<style scoped>

</style>