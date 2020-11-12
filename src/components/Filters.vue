<template>
  <div class="filters">
    <h2 class="filters-title">Recherchez une catégorie ou un site</h2>
    <div class="filters-box">
      <multiselect
        class="filters-select"
        v-model="categorySelected"
        :options="this.engines"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Choisissez une catégorie ou plus"
        label="categoryName"
        track-by="categoryName"
        :preselect-first="false"
      >
        <template slot="selection" slot-scope="{ values, isOpen }">
          <span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
            v-html="values.length > 1 ? values.length + ' catégories sélectionnées'
            : '1 catégorie sélectionnée'"
          />
        </template>
      </multiselect>
      <input
        v-for="(input, index) in allInputs"
        v-model="input.value"
        type="text"
        class="filters-input"
        :placeholder="input.placeholder"
        :key="`input-${input.id}}-${index}`"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  name: 'filters',
  components: {
    Multiselect
  },
  data: () => {
    return {
      allInputs: [
        {
          emitName: 'filter-topic',
          placeholder: 'Filtrer par nom de site',
          id: 'Theme',
          value: null
        }
      ],
      categorySelected: ''
    }
  },
  props: {
    engines: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    ...mapActions({
      setEnginesFilter: 'setEnginesFilter',
      setCategoriesFilter: 'setCategoriesFilter'
    })
  },
  watch: {
    allInputs: {
      handler () {
        this.setEnginesFilter(this.allInputs[0].value.toLowerCase())
      },
      deep: true
    },
    categorySelected: {
      handler () {
        const arr = []
        this.categorySelected.filter(e => arr.push(e.categoryName))
        this.setCategoriesFilter(arr)
      },
      deep: true
    }
  }
  // computed: {
  //   categoriesCopy () {
  //     const categoriesWithPlaceholder = JSON.parse(JSON.stringify(this.engines))
  //     categoriesWithPlaceholder.unshift({
  //       categoryName: 'Choisissez une catégorie',
  //       data: null
  //     })
  //     return categoriesWithPlaceholder
  //   }
  // }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.filters {
  width: 70%;
  min-height: 75px;
  padding: 1.25rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  &-box {
    width: 100%;
    display: flex;
    flex-flow: row;
  }

  &-input,
  &-select {
    width: 50%;
    min-height: 40px;
    max-height: 40px;
    padding: 0 10px;
    border-radius: 20px;
    background-color: #fff;
    border: 1px solid #b2b2b2;
    color: #323232;
    margin: 15px 15px;
    font-size: 14px;

    &:focus {
      outline: none;
    }
  }
}

// overide le css du multiselect
.multiselect{
  &__tags{
    min-height:20px;
    border: none;
  }
  &__placeholder {
    color: #323232;
  }
  &__input {
    font-size: 14px;
    padding: 0;
  }
}
</style>
