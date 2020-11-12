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
import { mapGetters } from 'vuex'

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
      'getEnginesFilters',
      'getCategoriesFilters',
      'getEnginesData'
    ])
  },
  watch: {
    getEnginesFilters: {
      handler: function () {
        this.filterEngines()
      },
      deep: true
    },
    getCategoriesFilters: {
      handler: function () {
        this.filterCategories()
      },
      deep: true
    }
  },
  methods: {
    filterCategories () {
      if (this.engines && this.getCategoriesFilters && this.getCategoriesFilters.length !== 0) {
        const filteredCategoriesResult = this.engines.filter(e =>
          this.getCategoriesFilters.includes(e.categoryName)
        )
        this.filteredEngines = filteredCategoriesResult
      } else {
        this.filteredEngines = this.engines
      }
    },
    filterEngines () {
      if (this.filteredEngines && this.getEnginesFilters && this.getEnginesFilters !== '') {
        const engineNames = []
        this.filteredEngines.forEach(element => {
          if (!element.data) return
          const elementCopy = { ...element }
          const filteredEnginesResult = elementCopy.data.filter(engine => {
            return engine.name.toLowerCase().includes(this.getEnginesFilters)
          })

          if (filteredEnginesResult && filteredEnginesResult.length > 0) {
            elementCopy.data = filteredEnginesResult
            engineNames.push(elementCopy)
          }
        })
        this.filteredEngines = engineNames
      } else {
        // cas où la recherche sur les noms est annulée
        // affiche tous les éléments des catégories selectionnées
        const filteredNamesResult = this.engines.filter(f =>
          this.getCategoriesFilters.some(e => {
            return e === f.categoryName
          })
        )
        this.filteredEngines = filteredNamesResult
      }
    }
  },
  mounted () {
    this.filterCategories()
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
      min-width: 175px;
      width: 175px;
      word-wrap: break-word;
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
