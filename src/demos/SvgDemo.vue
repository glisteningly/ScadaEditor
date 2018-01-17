<template>
  <div class="demo-container">
    <h4>svg</h4>
    <div class="svg-container">
      <dragger v-for="component in components"
               :key="component.id"
               :w="100"
               :h="75"
               :x="20 + component.x"
               :y="20 + component.y"
               class="drag-box"
               :parent="true"
               @activated=""
               @deactivated=""
               @resizing=""
               @dragging="">
        <MyGuage
          :value="val6"
          x="0"
          y="0"
          width="100%"
          height="100%"
          viewBox="0 0 100 75"/>
      </dragger>
    </div>
    <el-switch v-model="val7"/>
    <el-switch v-model="val11"/>
    <el-input size="mini" v-model="val2" placeholder="请输入value2"
              style="display: inline-block; width: 100px;"></el-input>
    <el-slider v-model="val6" style="width: 150px;"></el-slider>
    <el-slider v-model="val3" style="width: 150px;"></el-slider>
    <el-button type="primary" size="mini" @click="handleGo">go!</el-button>
    <el-button type="danger" size="mini" @click="handleStop">stop</el-button>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Dragger from '../components/Dragger/dragger.vue'
  import svgStr from '@/api/getSvg2'
  import svgBar from '@/api/getSvgBar'
  import svgGuage from '@/api/getSvgGuage'
  import svglabel from '@/api/getSvgLabel'

  let timer = null

  export default {
    components: { Dragger },
    data() {
      return {
        components: [],
        val1: true,
        val11: false,
        val2: '66.67',
        val3: 50,
        val4: 50,
        val5: 50,
        val6: 33.3,
        val7: false,
        type: 'div'
      }
    },
    methods: {
      handleGo() {
        timer = setInterval(() => {
          this.val1 = (Math.random() > 0.5)
          this.val11 = (Math.random() > 0.5)
          this.val2 = (Math.round((Math.random() * 100) * 100) / 100)
          this.val3 = (Math.random() * 100)
          this.val4 = (Math.round((Math.random() * 100) * 100) / 100)
          this.val5 = (Math.round((Math.random() * 100) * 100) / 100)
          this.val6 = (Math.round((Math.random() * 100) * 100) / 100)
          this.val7 = (Math.random() > 0.5)
        }, 1000)
      },
      handleStop() {
        clearTimeout(timer)
      }
    },
    computed: {
      opt() {
        return {
          val1: this.val1,
          val11: this.val11,
          val2: this.val2,
          h1: this.val3,
          val4: this.val4,
          val5: this.val5,
          val6: this.val6,
          val7: this.val7 ? 1 : 0
        }
      }
    },
    mounted() {
      for (let j = 0; j <= 6; j++) {
        for (let i = 0; i <= 7; i++) {
          this.components.push({
            id: j * 8 + i,
            x: i * 120,
            y: j * 80
          })
        }
      }
    },
    beforeMount() {
      const MyProgressbar = {
        template: svgBar,
        props: {
          value: {
            type: Number,
            default: 30
          },
          x: {
            default: 0
          },
          y: {
            default: 0
          },
          width: {
            default: 60
          },
          height: {
            default: 150
          },
          fill: {
            default: '#43b5ff'
          }
        },
        data() {
          return {}
        }
      }
      const MyGuage = {
        name: 'MyGuage',
        template: svgGuage,
        props: {
          value: {
            type: Number,
            default: 30
          },
          x: {
            default: 0
          },
          y: {
            default: 0
          },
          width: {
            default: 60
          },
          height: {
            default: 150
          },
          fill: {
            default: '#43b5ff'
          }
        },
        data() {
          return {}
        },
        computed: {
          valRotate() {
            const d = -90 + 180 * (this.value / 100)
            return `rotate(${d} 50 50)`
          }
        }
      }
      Vue.component('MyGuage', MyGuage)
      const MyRect = {
        template: `<rect
           style=""
           :y="y"
           :x="x"
           :width="width"
           :height="height"
           class="def"
           :class="value ? { on: true } : { off: true }"
           id="rect10" />`,
        props: {
          value: {
            default: 0
          },
          x: {
            default: 0
          },
          y: {
            default: 0
          },
          width: {
            default: 60
          },
          height: {
            default: 150
          }
        },
        data() {
          return {}
        }
      }
      const MyLabel = {
        template: svglabel,
        props: {
          value: {
            default: 'label'
          },
          x: {
            default: 0
          },
          y: {
            default: 0
          },
          width: {
            default: 100
          },
          height: {
            default: 50
          },
          fill: {
            default: '#43b5ff'
          }
        },
        data() {
          return {}
        }
      }

      Vue.component('MySvg', {
        template: svgStr,
        components: {
          // <my-component> 将只在父组件模板中可用
          MyProgressbar, MyGuage, MyRect, MyLabel
        },
        props: {
          options: {}
        },
        data() {
          return {
          }
        },
        methods: {
          doClick(event) {
            const x = event.screenX
            const y = event.screenY
            this.$alert(`${event.target.id} is clicked! 坐标=[${x},${y}]`, '提示', {
              confirmButtonText: 'OK'
            })
          }
        },
        computed: {
//          class1() {
//            return this.options.val1 ? { on: true } : { off: true }
//          }
        },
        mounted() {
        }
      })
      this.type = 'MySvg'
    }
  }
</script>

<style>

  #svg {
    width: 1000px;
    min-height: 600px;
    border: 1px solid #AAA;
  }

  .svg-container {
    width: 1000px;
    height: 600px;
    position: relative;
    border: 1px solid #AAA;
  }

  .def {
    fill: #dddddd
  }

  .on {
    fill: #00FF00;
  }

  .off {
    fill: #ff0000
  }

  /*-----------*/
  .progress-container {
    stroke: #2b2326;
    /*stroke-width: 2px;*/
    fill: #DDD
  }

  .progress-content {
    /*stroke: #badf4c;*/
    /*stroke-width: 2px;*/
    fill: #C2E362;
  }

  .drag-box {
    border: 1px solid transparent;
  }

  .active {
    /*box-sizing: content-box;*/
    border: 1px dashed #43b5ff;
  }
</style>
