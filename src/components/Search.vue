<template>
    <div class="search">
        <input
            @keyup.enter="onRequest()"
            v-model="search"
            class="search-input"
            placeholder="Recherche"
        >
        <!-- <img :src="require('@/assets/loupe.jpg')" alt=""> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState({
      getChosenEngines: state => state.Engines.chosen
    })
  },
  methods: {
    onRequest () {
      for (let i = 0; i < this.getChosenEngines.length; i++) {
        window.open('https://' + this.getChosenEngines[i] + this.search, '_blank')
      }
    }
  }
}
</script>
<style lang="scss">
  .search {
    width:75%;

    .search-input {
        background: 0 0;
        font-size: 1.75em;
        text-align: center;
        color: #7291a1;
        padding-left: .2em;
        padding-top: .28em;
        padding-bottom: .28em;
        display: block;
        width: 40%;
        border: 0;
        margin: 2rem auto;
        transition: .2s cubic-bezier(.4,0,.2,1);
        font-family: Tahoma,Geneva,sans-serif;
        font-weight: 300;
  }
}
</style>
