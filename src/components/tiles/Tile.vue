<template>
    <div
      class="overtile"
      @click="chooseEngine()"
      v-if="tile"
    >
      <div
        :class="chosen ? 'highlighted tile' : 'tile'"
      >
          <img
            v-if="tile.logo"
            class="tile-img"
            :src="require('@/assets/engines/' + tile.logo + '.png')" alt=""
          >
          <span v-else class="first-letter">
            {{getFirstLetter()}}
          </span>
      </div>
      <div class="under-tile">
        <span class="subtitle">{{tile.name}}</span>
        <!-- <span>----------</span>
        <span v-if="criteria" class="subtitle subtitle-criteria" @click="expandCriterias()">Critères</span> -->
      </div>
      <!-- <div v-if="expanded">
        <div
          v-for="(item, index) in tile.criteria"
          :key="`${index}`"
          class="criteria-vox"
        >
          <input
            type="checkbox"
            id="one"
            :value="item"
            v-model="picked"
          >
          <label class="criteria-name" for="item">{{index}}</label>
        </div>
      </div> -->
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      chosen: false,
      expanded: false,
      picked: [],
      newCriteria: []
    }
  },
  props: {
    tile: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  watch: {
    // pour les critères futurs
    // picked: function () {
    //   this.setChosenEngine(this.tile.url[0].main + this.picked[0])
    // }
  },
  methods: {
    ...mapActions({
      setChosenEngine: 'setChosenEngine'
    }),
    chooseEngine () {
      this.chosen = !this.chosen
      // préparer pour les critères : tourner dans l'array et concaténer les urls
      this.setChosenEngine(this.tile.url[0].value)
    },
    getFirstLetter () {
      const chars = this.tile.name.split('')
      return chars[0]
    },
    expandCriterias () {
      this.expanded = !this.expanded
    }
  }
}
</script>
<style lang="scss">

.overtile {
    margin-right: 1rem;
    margin-bottom: 1rem;
    border: 3px solid #ffffff;

    &:hover {
      cursor: pointer;
    }

  .tile {
      width: 10rem;
      height: 10rem;
      font-size: 5rem;
      border: 3px solid white;
      display: flex;
      justify-content: center;
      align-content: center;
      vertical-align: middle;
      background-color: #ffffff;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 2px #7291a1;
        border: 3px solid #7291a1;
      }

      &.highlighted {
        box-shadow: 0 0 2px #7291a1;
        border: 3px solid #7291a1;
      }

      .first-letter {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }

      .tile-img {
        width: 100%;
        height: 100%;
      }
  }

  .under-tile {
    display: flex;
    flex-flow: column;

    .subtitle {
      font-size: 1.5rem;

      &-criteria {
        cursor: pointer;
      }
    }
  }

  .criteria-vox {
    .criteria-name {
      font-size: 1.5rem;
    }
  }
}
</style>
