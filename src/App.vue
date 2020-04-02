<template>
  <div id="app" class="w-screen h-screen p-4">
    <game/>
  </div>
</template>

<script>
import Game from './components/Game'
export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
