<template>
    <div>
        <input
          v-for="(input, index) in allInputs"
          v-model="input['search' + input.id]"
          type="text"
          :placeholder="input.placeholder"
          :key="index"
        >
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'filters',
  data: () => {
    return {
      // searchThemeTerm: '',
      // searchNameTerm: '',
      allInputs: [
        {
          emitName: 'filter-topic',
          placeholder: 'Thème',
          id: 'Theme',
          searchTheme: ''
        }
        // {
        //   emitName: 'filter-name',
        //   placeholder: 'Nom',
        //   id: 'Name',
        //   searchName: ''
        // }
      ]
    }
  },
  methods: {
    ...mapActions({
      setFilterTheme: 'setFilterTheme',
      setFilterName: 'setFilterName'
    })
  },
  computed: {
    // pour watcher une data dans un array
    // permet de watcher les v-model dynamiques
    searchThemeToWatch () {
      return this.allInputs[0].searchTheme
    },
    searchNameToWatch () {
      return this.allInputs[1].searchName
    }
  },
  watch: {
    searchThemeToWatch: {
      handler () {
        this.setFilterTheme(this.allInputs[0].searchTheme.toLowerCase())
      },
      deep: true
    },
    searchNameToWatch: {
      handler () {
        this.setFilterName(this.allInputs[1].searchName.toLowerCase())
      },
      deep: true
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">

</style>
