<template>
    <div
      class="overtile"
      v-if="tile"
    >
      <div
        @click="chooseEngine()"
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
        <button
          v-if="tile.criteria"
          class="button-criteria"
          @click="expandCriterias()"
        >
        Critères
        </button>
      </div>
      <OptionBox
        v-if="expanded"
        :criteria="tile.criteria"
        @close="onClose"
      />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import OptionBox from '../OptionBox'

export default {
  data () {
    return {
      chosen: false,
      expanded: false
    }
  },
  components: {
    OptionBox
  },
  props: {
    tile: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    ...mapActions({
      setChosenEngine: 'setChosenEngine'
    }),
    chooseEngine () {
      this.chosen = !this.chosen
      this.setChosenEngine(this.tile.url[0].value)
    },
    getFirstLetter () {
      const chars = this.tile.name.split('')
      return chars[0]
    },
    expandCriterias () {
      this.expanded = !this.expanded
    },
    onClose (value) {
      this.expanded = value
    }
  }
}
</script>
<style lang="scss">

.overtile {
    margin-right: 1rem;
    margin-bottom: 1rem;
    border: 3px solid #ffffff;

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
    }

    .button-criteria {
      font-size: 1.25rem;
      padding: 5px;
      color: black;
      text-decoration: none;
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid #b2b2b2;
      cursor: pointer;
      transition: all 0.3s ease-out;

      &:hover {
        background: #41b883;
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
