<template>
    <div class="tile-container" v-if="getEngines">
      <div class="column" v-for="(engine, index) in getFilteredEngines" :key="`group_${index}`">
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
import { mapGetters } from 'vuex'

export default {
  name: 'TileContainer',
  data () {
    return {
    }
  },
  components: {
    Tile
  },
  props: {
    getEngines: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'getFilterTheme',
      'getFilterName'
    ]),
    getFilteredEngines () {
      const enginesCopy = [...this.getEngines]
      const enginesCategories = enginesCopy.filter(engi => engi.categoryName.toLowerCase().includes(this.getFilterTheme))
      let result = null
      const test = []
      if (enginesCategories && this.getFilterName && this.getFilterName.length > 0) {
        result = enginesCategories.filter(element => {
          return element.data.findIndex((el, index) => {
            if (el.name.toLowerCase().includes(this.getFilterName.toLowerCase())) {
              test.push(element.data[index])
              return el
            }
          }) > -1
        })
        console.log('test', test)
        return result
      } else {
        return enginesCategories
      }
    }
  },
  mounted () {
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
