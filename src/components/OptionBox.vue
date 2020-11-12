<template>
    <div class="overlay">
        <div class="criteria-box">
            <h2>Critères du site</h2>
            <a
                class="close"
                @click="close"
            >
            &times;
            </a>
            <div class="content">
                <div
                    v-for="(option, index) in criteria"
                    :key="`${index}`"
                    class="criteria-item"
                >
                    <input
                        type="checkbox"
                        id="one"
                        :value="option.value"
                        v-model="picked"
                        class="criteria-checkbox"
                    >
                    <label
                        class="criteria-name"
                        for="item"
                    >
                    {{option.name}}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'OptionsBox',
  data () {
    return {
      picked: []
    }
  },
  props: {
    criteria: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  watch: {
    picked: {
      handler: function () {
        this.setChosenCriteria(this.picked)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions({
      setChosenCriteria: 'setChosenCriteria'
    }),
    close () {
      this.$emit('close', false)
    }
  }
}
</script>
<style lang="scss">

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: visible;
  opacity: 1;

    .criteria-box {
        margin: 70px auto;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        width: 30%;
        position: relative;
        transition: all 5s ease-in-out;

        .content {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            padding-top: 1rem;

            .criteria-item {
                width: 33%;
                display: flex;
                font-size: 1.25rem;

                .criteria-checkbox {
                    margin-right: 1rem;
                }
            }
        }

        .close {
            position: absolute;
            top: 0px;
            right: 10px;
            transition: all 200ms;
            font-size: 30px;
            font-weight: bold;
            text-decoration: none;
            color: #333;

            &:hover {
                color: red;
            }
        }
    }
}
</style>
