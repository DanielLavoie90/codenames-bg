<template>
    <div @click="wordClicked(index)"
         class="text-sm lg:text-base xl:text-2xl h-24
         p-2 pt-8 xl:pt-6
         m-2 font-bold border-4 border-black rounded-lg word-card"
         :class="checkedWordClass">
        {{value | uppercase}}
    </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String
      },
      index: {
        type: Number
      },
      owner: {
        type: String
      },
      checked: {
        type: Boolean
      },
      master: {
        type: Boolean
      }
    },
    name: 'Word',
    methods: {
      wordClicked(index) {
        if (this.checked) return
        this.$emit('word-checked', index)
      },
    },
    computed: {
      checkedWordClass() {
        let classes = this.checked ? 'checked-word' : ''
        switch (this.owner) {
          case 'R':
            classes += this.master ? 'm-red-card' : ''
            classes += this.checked ? ' red-card' : ''
            break
          case 'B':
            classes += this.master ? 'm-blue-card' : ''
            classes += this.checked ? ' blue-card' : ''
            break
          case 'A':
            classes += this.master ? 'm-assassin-card' : ''
            classes += this.checked ? ' assassin-card' : ''
            break
          default:
            classes += this.master ? 'm-neutral-card' : ''
            classes += this.checked ? ' neutral-card' : ''
            break
        }
        return classes
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
    .word-card {
        background-color: #f7f3e9;
        text-shadow: 1px 1px #58595E;
        text-align: center;
    }

    .checked-word {
        color: black;
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
        color: #EB5D49;
    }

    .m-blue-card {
        border-color: #1589D4;
        color: #1589D4;
    }

    .m-assassin-card {
        border-color: #58595E;
        color: #58595E;
    }

    .m-neutral-card {
        border-color: #E2D9B0;
        color: #E2D9B0;
    }
</style>