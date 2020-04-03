<template>
    <div>
        <div v-if="username">
            <div class="text-2xl mb-4">
                Bonjour, {{username}}
            </div>
            <br>

            <div v-if="Object.keys(games).length">
                <div v-for="(game, key) in games"
                     :key="key">
                    <div class="flex flex-row mb-4">
                        <router-link :to="key" class="w-1/5 text-xl pl-4">
                            {{game.name}} ({{game.users ? Object.keys(game.users).length : 0}} joueurs)
                        </router-link>

                        <button @click="deleteGame(key)"
                                class="btn btn-default btn-primary ml-2">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
            <div v-else
                 class="text-xl">
                Aucune partie existante
            </div>

            <button @click="newGame"
                    class="btn btn-default btn-primary mt-4">
                Créer une partie
            </button>
        </div>
        <div v-else>
            <div v-if="error" class="text-red-600">
                {{error}}
            </div>
            <label class="py-2">
                Entrer un nom d'utilisateur
                <input type="text"
                       class="rounded-md border border-solid border-gray-dark m-2 p-1 pl-2 text-sm focus:border-accent"
                       v-model="tempUsername">
            </label>
            <button @click="registerName"
                    class="btn btn-default btn-primary">
                Save
            </button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        tempUsername: null,
        username: null,
        error: null,
        games: {}
      }
    },
    created() {
      this.getLocalUsername()
    },
    mounted() {
      this.getGames()
    },
    methods: {
      registerName() {
        if (!this.tempUsername || this.tempUsername.length < 5) {
          this.error = 'Doit contenir un minimum de 5 caractère.'
          return
        }
        this.error = null
        localStorage.setItem('username', this.tempUsername)
        this.username = this.tempUsername
        this.tempUsername = null
      },
      getLocalUsername() {
        this.username = localStorage.getItem('username')
      },
      getGames() {
        this.$fb.ref('games').on('child_added', snap => {
            this.$set(this.games, snap.key, snap.val())
          }
        )
        this.$fb.ref('games').on('child_changed', snap => {
            this.$set(this.games, snap.key, snap.val())
          }
        )
        this.$fb.ref('games').on('child_removed', snap => {
            this.$delete(this.games, snap.key)
          }
        )
      },
      newGame() {
        this.$fb.ref('games').push({
          name: 'New Game',
          players: [],
          words: [],
          solution: [],
          checked: []
        })
      },
      deleteGame(key) {
        console.log(key)
        this.$fb.ref('games/' + key).remove()
      }
    }
  }
</script>

<style scoped>

</style>