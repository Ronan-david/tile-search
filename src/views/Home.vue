<template>
  <div class="main-container">
    <h1 class="title">TILE SEARCH</h1>
    <search />
    <filters />
    <tile-container :engines="getEngines"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import Filters from '@/components/Filters.vue'
import TileContainer from '@/components/tiles/TileContainer.vue'
import engines from '@/json/engines'

export default {
  name: 'Home',
  components: {
    Search,
    Filters,
    TileContainer
  },
  data () {
    return {
      engines
    }
  },
  computed: {
    getEngines () {
      return [...this.engines]
    }
  }
}
</script>
<style lang="scss">
.main-container {
  position: relative;
}
.circle {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 60px;
  right: 0;
}

.circle::before {
  content: "+";
  font-size: 50px;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  font-weight:bold;
  font-family:courier;
  color:white;
}
</style>
