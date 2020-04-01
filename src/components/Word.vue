<template>
    <div @click="wordClicked(index)"
         class="text-3xl font-bold border-2 border-black py-8 m-2 rounded-lg word-card"
         :class="checkedWordClass">
        {{value | uppercase}}
    </div>
</template>

<script>
  export default {
    props:{
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
    methods:{
      wordClicked(index) {
        if(this.checked) return
        this.$emit('word-checked', index)
      },
    },
    computed: {
      checkedWordClass(){
        let classes = ''
        if(this.checked) {
          switch (this.owner) {
            case 'R':
              classes = this.master ? 'm-red-card' : ''
              classes = classes + ' red-card'
              break
            case 'B':
              classes = this.master ? 'm-blue-card' : ''
              classes = classes + ' blue-card'
              break
            case 'A':
              classes = this.master ? 'm-assassin-card' : ''
              classes = classes + ' assassin-card'
              break
            default:
              classes = this.master ? 'm-neutral-card' : ''
              classes = classes + ' neutral-card'
              break
          }
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

</style>