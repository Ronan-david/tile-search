<template>
    <div class="tile-container">
      <template v-if="filteredEngines">
        <div class="column" v-for="(engine, index) in filteredEngines" :key="`group-${index}`">
          <h2 class="column-title" v-html="engine.categoryName" />
          <div class="row-tile">
            <Tile
              v-for="(tile, key) in engine.data"
              :tile="tile"
              :key="`tile-${key}`"
            />
          </div>
        </div>
      </template>
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
      filteredEngines: null
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
      'getFilters',
      'getEnginesData'
    ])
  },
  watch: {
    getFilters: {
      handler: function () {
        this.filterEngines()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      'setFilteredEngines'
    ]),
    filterEngines () {
      if (this.engines && this.getFilters && this.getFilters !== '') {
        console.log('filters', this.getFilters)
        const categories = []
        this.engines.forEach(element => {
          if (!element.data) return
          const elementCopy = { ...element }
          const filteredEnginesResult = elementCopy.data.filter(engine => {
            return engine.name.toLowerCase().includes(this.getFilters)
          })

          if (filteredEnginesResult && filteredEnginesResult.length > 0) {
            elementCopy.data = filteredEnginesResult
            categories.push(elementCopy)
          }
        })
        this.filteredEngines = categories
      } else {
        console.log('no filters', this.engines)
        this.filteredEngines = this.engines
      }
    }
  },
  mounted () {
    this.filterEngines()
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
  pre {
    font-size: 1.5rem;
    background-color: black;
    color: white;
    text-align: left;
  }
}
</style>
