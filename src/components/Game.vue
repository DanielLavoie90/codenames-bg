<template>
    <div class="flex flex-col h-full w-full">

        <div class="flex flex-row text-center justify-around text-xl">
            <div v-if="!isGameOver">
                Restant:
                <span class="text-red-600 mx-4">
                    Rouge: {{redRemaining.length}}
                </span>
                <span class="text-blue-600 mx-4">
                    Bleu: {{blueRemaining.length}}
                </span>
            </div>
            <div v-else>
                Partie terminée
            </div>
        </div>

        <div class="flex flex-row w-full h-full">
            <div class="flex flex-col w-1/6 text-base">
                <button @click="$router.push({name: 'home'})"
                        class="text-xl btn btn-default btn-primary m-2">
                    Retour
                </button>
                <button @click="newGame"
                        class="text-xl btn btn-default btn-primary m-2">
                    New Game
                </button>
                <div class="border-2 border-black rounded p-2 m-2">
                    <div class="text-xl">
                        Utilisateurs
                    </div>
                    <hr class="mb-2">
                    <div v-for="(user, key) in users"
                         :key="key"
                         class="ml-2 mb-1"
                         :class="user.master ? 'font-bold' : ''">
                        {{user.username}} {{user.master ? '(master)' : ''}}
                    </div>
                </div>
            </div>

            <words-grid ref="grid"
                        :game-over="isGameOver"
                        :words="gameWords"
                        :check="check"
                        :checked="checked"
                        :master="master"/>

            <div class="flex flex-col w-1/6 pl-4">
                <button @click="toggleMaster(false)"
                        class="text-xl btn btn-default btn-primary my-2"
                        :class="master ? 'bg-primary-dark' : ''">
                    Maître Espion
                </button>

                <div v-if="master" class="text-base lg:text-xl font-bold text-center">
                    <div class="pt-4">
                        <div v-for="redWord in redWords"
                             class="text-red-600"
                             :class="isChecked(redWord) ? 'line-through' : ''">
                            {{redWord | uppercase}}
                        </div>
                    </div>
                    <div class="pt-4">
                        <div v-for="blueWord in blueWords"
                             class=" text-blue-600"
                             :class="isChecked(blueWord) ? 'line-through' : ''">
                            {{blueWord | uppercase}}
                        </div>
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
    data() {
      return {
        gameWords: [],
        check: [],
        checked: [],
        starter: null,
        master: false,
        users: [],
        userRef: null,
        window: {
          width: 0,
          height: 0
        }
      }
    },
    components: {
      WordsGrid
    },
    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
      this.getDBGame()
      this.signUser()
      window.addEventListener('unload', this.signoutUser)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
      this.signoutUser()
    },
    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      },
      getDBGame() {
        this.$fb.ref('games/' + this.$route.params.gameId).on('value', snap => {
          if(!snap.val().name){
            console.log('not existing')
            this.$router.push({name: 'home'})
            return
          }
          this.gameWords = snap.val().words
          this.starter = snap.val().starter
          this.check = snap.val().solution
          this.checked = snap.val().checked
          this.users = snap.val().users
          if (!this.gameWords) {
            this.newGame()
          }
        })
      },
      signUser() {
        let username = localStorage.getItem('username')
        while(!username || username.length < 5){
          username = prompt("Veuillez entrer un nom d'utilisateur (5 caractère min)", "");
        }
        this.userRef = this.$fb.ref('games/' + this.$route.params.gameId + '/users').push({
          username,
          master: this.master
        })
      },
      signoutUser() {
        console.log('signout')
        this.userRef.remove()
        this.$fb.ref('games/' + this.$route.params.gameId).off('value')
      },
      newGame() {
        this.toggleMaster(true)
        this.$fb.ref('games/' + this.$route.params.gameId).update(this.generateNewGame())
      },
      toggleMaster(forceFalse = false) {
        this.master = forceFalse ? false : !this.master
        this.userRef.update({master: this.master})
      },
      isChecked(word) {
        const index = this.gameWords.indexOf(word)
        return this.checked[index]
      },
      generateNewGame() {
        const words = this.getRandom(wordsList, 25)
        const redStart = Math.floor(Math.random() * 2) === 0
        const starter = redStart ? 'R' : 'B'
        const assignedCards = this.getRandom([...Array(25).keys()], 18)
        const starterCards = this.getRandom(assignedCards, 9)
        const otherCards = assignedCards.filter((c) => !starterCards.includes(c))
        const assassinCard = this.getRandom(otherCards, 1)
        const secondCards = otherCards.filter(c => !assassinCard.includes(c))
        const check = Array(25)
        for (let i = 0; i < 25; i++) {
          if (starterCards.includes(i)) {
            check[i] = redStart ? 'R' : 'B'
          } else if (secondCards.includes(i)) {
            check[i] = !redStart ? 'R' : 'B'
          } else if (assassinCard.includes(i)) {
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
          taken = new Array(len)
        if (n > len)
          throw new RangeError('getRandom: more elements taken than available')
        while (n--) {
          var x = Math.floor(Math.random() * len)
          result[n] = arr[x in taken ? taken[x] : x]
          taken[x] = --len in taken ? taken[len] : len
        }
        return result
      }
    },
    computed: {
      isVertical(){
        return this.window.height >= this.window.width
      },
      redWords() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'R'
        }).sort()
      },
      blueWords() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'B'
        }).sort()
      },
      assassinIndex() {
        return this.check.indexOf('A')
      },
      redRemaining() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'R' && this.checked[ind] === false
        })
      },
      blueRemaining() {
        return this.gameWords.filter((val, ind) => {
          return this.check[ind] === 'B' && this.checked[ind] === false
        })
      },
      isGameOver() {
        return this.checked[this.assassinIndex] || this.blueRemaining.length === 0 || this.redRemaining.length === 0
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