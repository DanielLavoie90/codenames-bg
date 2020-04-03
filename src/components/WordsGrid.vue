<template>
    <div class="flex flex-row flex-wrap justify-between w-full h-full">
        <div v-for="(word, index) in words" :key="index"
              class="w-1/5 h-1/5">
            <word @word-checked="wordClicked"
                  :game-over="gameOver"
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
      gameOver: {
        type: Boolean,
        default: false
      },
      words: {
        type: Array
      },
      check: {
        type: Array
      },
      checked: {
        type: Array
      },
      master: {
        type: Boolean
      }
    },
    name: 'WordsGrid',
    methods: {
      getChecked(index) {
        return this.checked[index]
      },
      wordClicked(index) {
        if(this.gameOver || this.checked[index]) return
        this.$fb.ref('games/' + this.$route.params.gameId + '/checked').child(index).set(true)
      },
    },
    components: {
      Word
    }
  }
</script>

<style scoped>

</style>