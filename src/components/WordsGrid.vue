<template>
    <div class="flex flex-row flex-wrap justify-between h-auto w-2/3">
        <div v-for="(word, index) in words" :key="index"
              class="w-1/5">
            <word @word-checked="wordClicked" :value="word" :index="index" :checked="checked[index]" :owner="check[index]" :master="master"/>
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
        this.checked = new Array(25).fill(false);
      },
      wordClicked(index) {
        console.log(index)
        if(this.checked[index]) return
        this.checked[index] = true
        console.log('Index ' + index + ' clicked')
      },
    },
    components: {
      Word
    }
  }
</script>

<style scoped>
    .word-card {
        background-color: #D0C7B8;
    }

    .red-card {
        background-color: #EB5D49;
    }

    .blue-card {
        background-color: #1589D4;
    }

    .assassin-card {
        background-color: #58595E;
    }

    .neutral-card {
        background-color: #E2D9B0;
    }

    .m-red-card {
        border-color: #EB5D49;
    }

    .m-blue-card {
        border-color: #1589D4;
    }

    .m-assassin-card {
        border-color: #58595E;
    }

    .m-neutral-card {
        border-color: #E2D9B0;
    }

</style>