<template>
    <div class="tile-container">
      <div class="column" v-for="(engine, index) in filteredEngines" :key="`group_${index}`">
        <h2 class="column-title" v-html="engine.categoryName" />
        <div class="row-tile">
          <Tile
            v-for="(tile, key) in engine.data"
            :tile="tile"
            :key="`tile_${key}`"
          />
        </div>
      </div>
    </div>
</template>
<script>
import Tile from './Tile'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TileContainer',
  components: {
    Tile
  },
  data () {
    return {
      filteredEngines: []
    }
  },
  props: {
    engines: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'getFilters'
    ])
  },
  watch: {
    getFilters: {
      handler: function () {
        this.filterEngines()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions([
      'setFilteredEngines'
    ]),
    filterEngines () {
      if (this.engines && this.getFilters && this.getFilters.length > 0) {
        const result = []
        this.engines.forEach(element => {
          if (!element.data) return
          const checkValue = element.data.findIndex(engine => {
            return engine.name.toLowerCase().includes(this.getFilters[0].value.toLowerCase())
          }) > -1

          if (checkValue) {
            result.push(element)
          }
        })
        console.log('result', result)
        this.filteredEngines = result
      }
      this.filteredEngines = this.engines
    }
  }
}
</script>

<style lang="scss">
.tile-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 75%;

  .column {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 2rem;
    width: 100%;

    .column-title {
      font-size: 1.75rem;
      margin-bottom: 2rem;
      text-align: left;
      min-width: 200px;
    }

    .row-tile {
      display: flex;
      flex-flow: row wrap;
      border-left: 3px solid #7291a1;
      padding-left: 10px;
    }
  }
}
</style>
