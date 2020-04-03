<template>
    <div class="flex flex-row w-full">
        <div class="flex flex-col w-1/6 text-xl p-4">
            <div v-for="user in users"
                 :key="user.username"
                 :class="user.master ? 'font-bold' : ''">
                {{user.username}} {{user.master ? '(master)' : ''}}
            </div>
        </div>
        <words-grid ref="grid"
                    :words="gameWords"
                    :check="check"
                    :checked="checked"
                    :master="master"/>
        <div class="flex flex-col w-1/6 pl-4">
            <button @click="newGame"
                    class="text-xl btn btn-default btn-primary my-2">
                New Game
            </button>
            <button @click="toggleMaster"
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
  import wordsList from '../words-fr'
  import WordsGrid from './WordsGrid'

  export default {
    name: 'Game',
    data(){
      return {
        gameWords: [],
        check: [],
        checked: [],
        starter: null,
        master: false,
        users: [],
        userRef: null
      }
    },
    components: {
      WordsGrid
    },
    created(){
      this.getDBGame()
      this.signUser()
      window.addEventListener('unload', this.signoutUser)
    },
    beforeDestroy() {
      this.signoutUser()
    },
    methods:{
      getDBGame() {
        this.$fb.ref('games/' + this.$route.params.gameId).on('value', snap => {
          this.gameWords = snap.val().words
          this.starter = snap.val().starter
          this.check = snap.val().solution
          this.checked = snap.val().checked
          this.users = snap.val().users
          if(!this.gameWords){
            this.newGame()
          }
        })
      },
      signUser(){
        this.userRef = this.$fb.ref('games/' + this.$route.params.gameId + '/users').push({
          username: localStorage.getItem('username'),
          master: this.master
        })
      },
      signoutUser() {
        this.userRef.remove()
      },
      newGame(){
        this.master = false
        this.$fb.ref('games/' + this.$route.params.gameId).update(this.generateNewGame())
      },
      toggleMaster(){
        this.master = !this.master
        this.userRef.update({master: this.master})
      },
      generateNewGame() {
        const words = this.getRandom(wordsList, 25)
        const redStart = Math.floor(Math.random() * 2) === 0
        const starter = redStart ? 'R' : 'B'
        const assignedCards = this.getRandom([...Array(25).keys()], 18);
        const starterCards = this.getRandom(assignedCards, 9)
        const otherCards = assignedCards.filter((c) => !starterCards.includes(c))
        const assassinCard = this.getRandom(otherCards, 1)
        const secondCards = otherCards.filter(c => !assassinCard.includes(c))
        const check = Array(25)
        for (let i = 0; i < 25; i++) {
          if(starterCards.includes(i)){
            check[i] = redStart ? 'R' : 'B'
          } else if (secondCards.includes(i)){
            check[i] = !redStart ? 'R' : 'B'
          } else if (assassinCard.includes(i)){
            check[i] = 'A'
          } else {
            check[i] = 'N'
          }
        }
        return {
          words,
          solution: check,
          checked: Array(25).fill(false),
          starter
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
        }).sort()
      },
      blueWords() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'B'
        }).sort()
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