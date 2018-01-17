<template>
  <div class="demo-container">
    <h4>svg</h4>
    <div class="svg-container">
      <!--<MySvg id="svg" :options="opt"/>-->
      <component :is="type" id="svg" :options="opt"/>
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
  import svgStr from '@/api/getSvg3'
  import svgBar from '@/api/getSvgBar'
  import svgGuage from '@/api/getSvgGuage'
  import svglabel from '@/api/getSvgLabel'

  let timer = null

  export default {
    name: 'SvgDemo',
    data() {
      return {
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
//    mounted() {
//
//    },
    mounted() {
//      Vue.component('MyProgressbar', {
//        template: svgBar,
//        props: {
//          value: {
//            type: Number,
//            default: 30
//          },
//          x: {
//            default: 0
//          },
//          y: {
//            default: 0
//          },
//          width: {
//            default: 60
//          },
//          height: {
//            default: 150
//          },
//          fill: {
//            default: '#43b5ff'
//          }
//        },
//        data() {
//          return {}
//        }
//      })
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
            rects: [],
            guages: [],
            pbars: [],
            labels: []
          }
        },
        methods: {
          doClick(event) {
//            console.log(event.target.id + ' is clicked!')
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
          for (let j = 0; j <= 15; j++) {
            for (let i = 0; i <= 82; i++) {
              this.rects.push({
                key: j * 15 + i,
                x: i * 12,
                y: j * 12,
                val: (Math.random() > 0.5) ? 1 : 0
              })
            }
          }

          for (let j = 0; j <= 2; j++) {
            for (let i = 0; i <= 15; i++) {
              this.guages.push({
                key: j * 2 + i,
                x: i * 62,
                y: j * 42 + 200,
                val: (Math.random() * 100)
              })
            }
          }

          for (let j = 0; j <= 2; j++) {
            for (let i = 0; i <= 18; i++) {
              this.pbars.push({
                key: j * 2 + i,
                x: i * 52,
                y: j * 52 + 325,
                val: Math.round((Math.random() * 100))
              })
            }
          }

          for (let j = 0; j <= 2; j++) {
            for (let i = 0; i <= 13; i++) {
              this.labels.push({
                key: j * 2 + i,
                x: i * 72,
                y: j * 32 + 490,
                val: (Math.round((Math.random() * 100) * 100) / 100)
              })
            }
          }

          setInterval(() => {
            for (let i = 0; i < 83 * 16; i++) {
              this.rects[i].val = (Math.random() > 0.5) ? 1 : 0
            }
            for (let i = 0; i < 16 * 3; i++) {
              this.guages[i].val = (Math.random() * 100)
            }
            for (let i = 0; i < 19 * 3; i++) {
              this.pbars[i].val = Math.round((Math.random() * 100))
            }
            for (let i = 0; i < 14 * 3; i++) {
              this.labels[i].val = (Math.round((Math.random() * 100) * 100) / 100)
            }
          }, 1000)
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
</style>
