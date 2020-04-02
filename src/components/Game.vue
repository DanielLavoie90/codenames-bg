<template>
    <div class="flex flex-row w-full">
        <words-grid ref="grid"
                    :words="gameWords"
                    :check="check"
                    :master="master"/>
        <div class="flex flex-col w-1/6">
            <button @click="newGame"
                    class="text-xl btn btn-default btn-primary my-2">
                New Game
            </button>
            <button @click="master = !master"
                    class="text-xl btn btn-default btn-primary my-2"
                    :class="master ? 'bg-primary-dark' : ''">
                Master
            </button>

            <div v-if="master">
                <div class="pt-4">
                    <div v-for="redWord in redWords" class="text-base text-center text-red-600">
                        {{redWord | uppercase}}
                    </div>
                </div>
                <div class="pt-4">
                    <div v-for="blueWord in blueWords" class="text-base text-center text-blue-600">
                        {{blueWord | uppercase}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import words from '../words-fr'
  import WordsGrid from './WordsGrid'

  export default {
    name: 'Game',
    data(){
      return {
        gameWords: [],
        check: [],
        starter: null,
        master: false
      }
    },
    components: {
      WordsGrid
    },
    created(){
      this.generateWordList()
      this.generateCheckList()
    },
    methods:{
      newGame(){
        this.generateWordList()
        this.generateCheckList()
        this.$refs.grid.resetChecked()
      },
      generateWordList() {
        this.gameWords = this.getRandom(words, 25)
      },
      generateCheckList() {
        const redStart = Math.floor(Math.random() * 2) === 0
        this.starter = redStart ? 'R' : 'B'
        const assignedCards = this.getRandom([...Array(25).keys()], 18);
        const starterCards = this.getRandom(assignedCards, 9)
        const otherCards = assignedCards.filter((c) => !starterCards.includes(c))
        const assassinCard = this.getRandom(otherCards, 1)
        const secondCards = otherCards.filter(c => !assassinCard.includes(c))
        this.check = Array(25)
        for (let i = 0; i < 25; i++) {
          if(starterCards.includes(i)){
            this.check[i] = redStart ? 'R' : 'B'
          } else if (secondCards.includes(i)){
            this.check[i] = !redStart ? 'R' : 'B'
          } else if (assassinCard.includes(i)){
            this.check[i] = 'A'
          } else {
            this.check[i] = 'N'
          }
        }
      },
      getRandom(arr, n) {
        var result = new Array(n),
          len = arr.length,
          taken = new Array(len);
        if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
      }
    },
    computed: {
      redWords() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'R'
        })
      },
      blueWords() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'B'
        })
      }
    },
    filters: {
      uppercase: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.toUpperCase()
      }
    }
  }
</script>

<style scoped>

</style>