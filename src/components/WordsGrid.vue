<template>
    <div class="flex flex-row flex-wrap justify-between w-full h-full">
        <div v-for="(word, index) in words" :key="index"
              class="w-1/5">
            <word @word-checked="wordClicked"
                  :value="word"
                  :index="index"
                  :checked="getChecked(index)"
                  :owner="check[index]"
                  :master="master"/>
        </div>
    </div>
</template>

<script>
    import Word from './Word'
  export default {
    props: {
      words: {
        type: Array
      },
      check: {
        type: Array
      },
      master: {
        type: Boolean
      }
    },
    name: 'WordsGrid',
    data() {
      return {
        checked: []
      }
    },
    mounted() {
      this.resetChecked()
    },
    methods: {
      resetChecked() {
        this.$set(this, 'checked', Array(25).fill(false))
      },
      getChecked(index) {
        return this.checked[index]
      },
      wordClicked(index) {
        if(this.checked[index]) return
        this.$set(this.checked, index, true)
      },
    },
    components: {
      Word
    }
  }
</script>

<style scoped>

</style>