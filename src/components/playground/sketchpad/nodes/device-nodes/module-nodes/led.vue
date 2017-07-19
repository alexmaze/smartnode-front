<template>
  <div class="node node-device node-device-module node-device-module-led" :id="data.id" >
    <img src="static/img/node.png" class="preview-img" @contextmenu="openMenu">
    <div class="body">
      <div class="input-group rgb">
        <div class="title" @click="toggleRgb" :id="data.id + '-rgb-group'">{{data.label}} <img src="/static/img/icons/triangle.png" class="dropdown-icon" :class="{ 'down': rgb_group.open }"></div>
        <div class="inputs" v-if="rgb_group.open">
          <div class="input"><span class="text">红</span> <input class="value" value="255"></input></div>
          <div class="input"><span class="text">绿</span> <input class="value" value="255"></input></div>
          <div class="input"><span class="text">蓝</span> <input class="value" value="255"></input></div>
        </div>
      </div>

      <div class="input-group blink">
        <div class="title" @click="toggleBlink" :id="data.id + '-title'">blink <img src="/static/img/icons/triangle.png" class="dropdown-icon" :class="{ 'down': blink_group.open }"></div>
        <div class="inputs" v-if="blink_group.open">
          <div class="input"><span class="text">频率</span> <input class="value" value="0.49"></input></div>
        </div>
      </div>

    </div>
    <ul class="menu" :id="data.id + '-right-click-menu'" tabindex="-1" v-if="viewMenu" v-on:blur="closeMenu"  :style="{ position:'absolute', top: menuTop + 'px', left:menuLeft + 'px'}">
      <li>Toggle Blink</li>
    </ul>
  </div>
</template>

<script>
import Node from '../../abstract-node'

export default {
  mixins: [Node],
  name: 'device-module-led-node',
  components: {
  },
  data () {
    return {
      endPoints: [],
      viewMenu: false,
      menuTop: 0,
      menuLeft: 0,
      rgb_group: {
        open: true
      },
      blink_group: {
        open: true
      }
    }
  },
  methods: {
    init () {
      this.instance.draggable(this.data.id)

      // rgb inputs
      this.endPoints.push(this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-0',
        anchor: [0.18, 0.59, 0, 0],
        cssClass: 'node-port-in-yellow',
        hoverClass: 'node-port-hover-in-yellow',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      }))
      this.endPoints.push(this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-1',
        anchor: [0.18, 0.667, 0, 0],
        cssClass: 'node-port-in-yellow',
        hoverClass: 'node-port-hover-in-yellow',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      }))
      this.endPoints.push(this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-2',
        anchor: [0.18, 0.726, 0, 0],
        cssClass: 'node-port-in-yellow',
        hoverClass: 'node-port-hover-in-yellow',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      }))
      this.endPoints.push(this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-3',
        anchor: [0.18, 0.786, 0, 0],
        cssClass: 'node-port-in-yellow',
        hoverClass: 'node-port-hover-in-yellow',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      }))

      // blink inputs
      this.endPoints.push(this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-4',
        anchor: [0.18, 0.885, 0, 0],
        cssClass: 'node-port-in-yellow',
        hoverClass: 'node-port-hover-in-yellow',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      }))
      this.endPoints.push(this.instance.addEndpoint(this.data.id, {
        uuid: this.data.id + '-input-5',
        anchor: [0.18, 0.96, 0, 0],
        cssClass: 'node-port-in-yellow',
        hoverClass: 'node-port-hover-in-yellow',
        endpoint: 'Rectangle',
        maxConnections: -1,
        isSource: false,
        isTarget: true
      }))
    },
    toggleRgb () {
      this.rgb_group.open = !this.rgb_group.open
      if (this.rgb_group.open) {
        this.endPoints[1].setAnchor([0.18, 0.667, 0, 0], true)
        this.endPoints[2].setAnchor([0.18, 0.667 + 0.059, 0, 0], true)
        this.endPoints[3].setAnchor([0.18, 0.667 + 0.059 + 0.059, 0, 0], true)
        if (this.blink_group.open) {
          this.endPoints[4].setAnchor([0.18, 0.885, 0, 0], true)
          this.endPoints[5].setAnchor([0.18, 0.885 + 0.075, 0, 0], false)
        } else {
          this.endPoints[4].setAnchor([0.18, 0.885, 0, 0], true)
          this.endPoints[5].setAnchor([0.18, 0.885, 0, 0], false)
        }
      } else {
        console.log(this.endPoints[1], this.endPoints[2], this.endPoints[3])
        this.endPoints[1].setAnchor([0.18, 0.59, 0, 0], true)
        this.endPoints[2].setAnchor([0.18, 0.59, 0, 0], true)
        this.endPoints[3].setAnchor([0.18, 0.59, 0, 0], true)

        if (this.blink_group.open) {
          this.endPoints[4].setAnchor([0.18, 0.69, 0, 0], true)
          this.endPoints[5].setAnchor([0.18, 0.69 + 0.075, 0, 0], false)
        } else {
          this.endPoints[4].setAnchor([0.18, 0.69, 0, 0], true)
          this.endPoints[5].setAnchor([0.18, 0.69, 0, 0], false)
        }
      }
    },
    toggleBlink () {
      this.blink_group.open = !this.blink_group.open
      if (this.blink_group.open) {
        this.endPoints[5].anchor.y = this.endPoints[4].anchor.y + 0.075
        this.endPoints[5].repaint()
      } else {
        this.endPoints[5].anchor.y = this.endPoints[4].anchor.y
        this.endPoints[5].repaint()
      }
    },
    openMenu ($event) {
//      console.log('open', $event)
      this.menuTop = $event.offsetY
      this.menuLeft = $event.offsetX
      this.viewMenu = true
      $event.preventDefault()
    },
    closeMenu () {
//      console.log('close')
      this.viewMenu = false
    }
  },
  created () {
    setTimeout(() => {
      this.init()
    }, 100)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.node-device-module-led {
  position: absolute;
  .preview-img {
    width: 200px;
  }
  .body {
    margin-top: -14px;
    margin-left: 45px;
    .input-group {
      width: 124px;
      line-height: 28px;
      background: #DADADA;
      font-size: 14px;
      color: #4A4A4A;
      font-weight: 500;
      border-radius: 6px;
      padding: 0 8px;
      box-sizing: border-box;
      margin-bottom: 6px;
      // padding-bottom: 5px;
      overflow: hidden;
      position: relative;
      .inputs {
        font-size: 12px;
        position: relative;
        .input {
          display: flex;
          justify-content: space-between;
          line-height: 18px;
          height: 18px;
          margin: 3px 0;
          .value {
            border-radius: 9px;
            background: #AFEE72;
            line-height: 18px;
            width: 35px;
            border: none;
            text-align: center;
            outline: none;
          }
        }
      }
      &.blink {
        .title {
          color: #F69D00;
        }
        background: #ffffff;
      }
    }
  }

  .dropdown-icon {
    width: 8px;
    float: right;
    margin: 10px 0 0 0;
    &.down {
      transform: rotate(-90deg);
    }
  }

  .menu {
    position: absolute;
    width: 100px;
    background: #fff;
    list-style: none;
    border: 1px solid #DADADA;
    padding: 5px 10px;
    margin: 0;
    font-size: 12px;
    li {
      cursor: pointer;
      line-height: 18px;
      padding: 0 5px;
      &:hover {
        background: #9B9B9B;
        color: #FFF;
      }
    }
  }
}
</style>
