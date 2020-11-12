<template>
    <div class="search">
      <div class="search-box">
        <input
            @keyup.enter="onRequest()"
            v-model="search"
            class="search-input"
            placeholder="Recherche"
            :class="alertEnginesEmpty || alertEmptySearch ? 'alert' : ''"
        >
        <span
          v-show="alertEnginesEmpty || alertEmptySearch"
          class="alert-text"
          v-html="alertEnginesEmpty ? 'Veuillez choisir un ou plusieurs moteurs de recherche'
          : alertEmptySearch ? 'Veuillez taper une recherche'
          : ''"
        />
        <span
          class="search-info"
          title="Cliquez sur un ou plusieurs sites puis tapez votre recherche et pressez la touche Entrée"
        >?
        </span>
      </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      search: '',
      alertEnginesEmpty: false,
      alertEmptySearch: false
    }
  },
  computed: {
    ...mapGetters([
      'getChosenEngines',
      'getChosenCriteria'
    ]),
    concatChosenEngines () {
      const chosenEngines = []
      return chosenEngines.concat(this.getChosenEngines, this.getChosenCriteria)
    }
  },
  methods: {
    onRequest () {
      if (this.search === '') {
        this.alertEmptySearch = true
      } else if (this.concatChosenEngines.length === 0) {
        this.alertEnginesEmpty = true
      } else {
        this.alertEnginesEmpty = false
        this.alertEmptySearch = false
        for (let i = 0; i < this.concatChosenEngines.length; i++) {
          window.open('https://' + this.concatChosenEngines[i] + this.search, '_blank')
        }
      }
    }
  },
  watch: {
    getChosenEngines: {
      handler () {
        if (this.concatChosenEngines.length > 0) {
          this.alertEnginesEmpty = false
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
  .search {
    width:75%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    &-box {
      position: relative;
      width: 50%;
    }

    &-info {
      position: absolute;
      top: 10px;
      right: -15px;
      cursor: default;
      color: #fff;
      background-color: grey;
      width: 15px;
      height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius:100%;
      font-size:10px;
      text-align:center;
      text-decoration:none;
      -webkit-box-shadow: inset -1px -1px 1px 0px rgba(0,0,0,0.25);
      -moz-box-shadow: inset -1px -1px 1px 0px rgba(0,0,0,0.25);
      box-shadow: inset -1px -1px 1px 0px rgba(0,0,0,0.25);
    }

    &-input {
      background: 0 0;
      font-size: 1.75em;
      text-align: center;
      padding-left: .2em;
      padding-top: .28em;
      padding-bottom: 0;
      display: block;
      width: 100%;
      margin: 2rem auto 0;
      transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: Tahoma,Geneva,sans-serif;
      font-weight: 300;
      min-height: 40px;
      padding: 0 10px;
      border-radius: 20px;
      background-color: #fff;
      border: 1px solid #b2b2b2;
      color: #323232;

      &:focus {
        outline: none;
      }
    }

    .alert {
      border: 1px solid red;

      &-text {
        color: red;
      }
    }
  }
</style>
