<template>
    <div>
        <input
          v-for="(input, index) in allInputs"
          v-model="input.value"
          type="text"
          :placeholder="input.placeholder"
          :key="`input-${input.id}}-${index}`"
        >
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'filters',
  data: () => {
    return {
      allInputs: [
        {
          emitName: 'filter-topic',
          placeholder: 'Thème',
          id: 'Theme',
          value: null
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      setFilter: 'setFilter'
    })
  },
  watch: {
    allInputs: {
      handler () {
        this.setFilter(this.allInputs[0].value.toLowerCase())
      },
      deep: true
    }
  }
}
</script>
