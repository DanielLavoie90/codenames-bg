<template>
    <div>
        <words-grid :words="gameWords" :check="check" :master="true"/>
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
        starter: null
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
    }
  }
</script>

<style scoped>

</style>