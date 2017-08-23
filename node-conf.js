/**
 * Created by zhujiaye on 2017/7/13.
 */
export const nodesConfig = {
  device: {
    module: {
      DEBUG_REVERSE: {
        DEBUG: true,
        id: 'DEBUG_REVERSE',
        title: '调试用反转器',
        titleInput: null,
        titleOutput: null,
        props: [{
          idSuffix: 'input',
          name: '输入量',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasInput: true,
          hasOutput: true
        },
        {
          idSuffix: 'input2',
          name: '输入量2',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasInput: true,
          hasOutput: true
        }],
        simulateFun: function (idSuffix) {
          console.log(this)
          switch (idSuffix) {
            case 'input':
              return !this['input']
            case 'input2':
              return !this['input2']
          }
          // return !input
        }
      },
      NFC_communication: {
        id: 'NFC_communication',
        title: 'NFC近场通讯模块',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'ID',
          type: 'Array'}],
        props: [{
          idSuffix: 'id',
          name: 'ID',
          type: 'Array',
          visual: 'array',
          defValue: [73643002, 293],
          hasOutput: true,
          hasInput: false
        }],
        funs: []
      },
      rotational_potentiometer: {
        id: 'rotational_potentiometer',
        title: '旋转电位器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'resistance',
          type: 'int'}],
        props: [{
          idSuffix: 'resistance',
          name: '电阻值',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      linear_potentiometer: {
        id: 'linear_potentiometer',
        title: '直线电位器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'resistance',
          type: 'int'}],
        props: [{
          idSuffix: 'resistance',
          name: '电阻值',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      rocker: {
        id: 'rocker',
        title: '摇杆',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'position',
          type: 'Array'}],
        props: [{
          idSuffix: 'position',
          name: 'X,Y',
          type: 'Array',
          visual: 'number',
          defValue: [50, 50],
          hasOutput: true,
          hasInput: false
        }]
      },
      sound_analysis: {
        id: 'sound_analysis',
        title: '声音分析',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'frequency',
          type: 'int'},
        {
          name: 'amplitude',
          type: 'int'
        }
        ],
        props: [{
          idSuffix: 'frequency',
          name: '频率',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        },
        {
          idSuffix: 'amplitude',
          name: '幅值',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }],
        funs: []
      },
      voice_recognition: {
        id: 'voice_recognition',
        title: '语音识别',
        titleInput: true,
        titleOutput: true,
        inputs: [],
        outputs: [{
          name: 'match',
          type: 'string'}],
        props: [{
          idSuffix: 'match',
          name: '匹配对象',
          type: 'string',
          visual: 'string',
          defValue: 'zuozhuan',
          hasOutput: false,
          hasInput: true
        }]
      },
      sequencer: {
        id: 'sequencer',
        title: '音序器',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'times',
          type: 'int'},
        {
          name: 'values',
          type: 'Array'
        }],
        props: [{
          idSuffix: 'times',
          name: '间隔时间（ms）',
          type: 'int',
          visual: 'number',
          defValue: 1000,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'values',
          name: '音序值',
          type: 'Array',
          visual: 'number',
          defValue: [1023, 10],
          hasOutput: true,
          hasInput: false
        }]
      },
      makey_makey: {
        id: 'makey_makey',
        title: 'makey-makey',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'resistance',
          type: 'Array'}],
        props: [{
          idSuffix: 'resistance',
          name: '电阻值',
          type: 'Array',
          visual: 'el-switch',
          defValue: [50, 23],
          hasOutput: true,
          hasInput: false
        }]
      },
      oscillator: {
        id: 'oscillator',
        title: '震荡器',
        titleInput: null,
        titleOutput: true,
        inputs: [],
        outputs: [
          {
            name: 'frequency',
            type: 'int'},
          {
            name: 'wave',
            type: 'string'
          }],
        props: [{
          idSuffix: 'frequency',
          name: '频率',
          type: 'int',
          visual: 'nuumber',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'wave',
          name: '波形',
          type: 'string',
          visual: 'shape',
          defValue: false,
          hasOutput: false,
          hasInput: true
        }]
      },
      steering_engine: {
        id: 'steering_engine',
        title: '3.7g舵机',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'angle',
          type: 'int'}],
        props: [{
          idSuffix: 'angle',
          name: '转动角度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      rgb_led: {
        id: 'rgb_led',
        title: 'RGB_LED',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'color',
          type: 'color'},
        {
          name: 'light',
          type: 'int'
        }],
        props: [{
          idSuffix: 'color',
          name: '颜色',
          type: 'color',
          visual: 'rgb',
          defValue: false,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'light',
          name: '亮度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      led: {
        id: 'led',
        title: 'LED',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'color',
          type: 'color'},
        {
          name: 'light',
          type: 'int'
        }],
        props: [{
          idSuffix: 'color',
          name: '颜色',
          type: 'color',
          visual: 'rgb',
          defValue: [255, 255, 255],
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'light',
          name: '亮度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }],
        funs: [],
        simulateFun: function (activated, color, light) {
          this.active = !!(activated)
          if (color) this.color = color
          if (light) this.light = light
        }
      },
      vibration_module: {
        id: 'vibration_module',
        title: '震动',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'frequency',
          type: 'int'}],
        props: [{
          idSuffix: 'frequency',
          name: '频率',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }]
      },
      DC_motor: {
        id: 'DC_motor',
        title: 'DC减速电机',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'speed',
          type: 'int'},
        {
          name: 'direction',
          type: 'int'
        }],
        props: [{
          idSuffix: 'speed',
          name: '旋转速度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'direction',
          name: '旋转方向',
          type: 'int',
          visual: 'number',
          defValue: 1,
          hasOutput: false,
          hasInput: true
        }]
      },
      step_motor: {
        id: 'step_motor',
        title: '步进电机',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'angle',
          type: 'int'},
        {
          name: 'times',
          type: 'int'
        }],
        props: [{
          idSuffix: 'angle',
          name: '步进角',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'times',
          name: '间隔时间（ms）',
          type: 'int',
          visual: 'number',
          defValue: 10,
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      mp3: {
        id: 'mp3',
        title: 'MP3',
        titleInput: true,
        titleOutput: true,
        inputs: [],
        outputs: [{
          name: 'keyDown',
          type: 'Boolean'}],
        props: [{
          idSuffix: 'play',
          name: '播放',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: false,
          hasInput: false
        },
        {
          idSuffix: 'type',
          name: '模式',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: 50,
          hasOutput: false,
          hasInput: false
        }]
      },
      audio_playback: {
        id: 'audio_playback',
        title: '录放音',
        titleInput: true,
        titleOutput: true,
        inputs: [],
        outputs: [{
          name: 'times',
          type: 'int'}],
        props: [{
          idSuffix: 'times',
          name: '录制时长',
          type: 'int',
          visual: 'number',
          defValue: 8,
          hasOutput: false,
          hasInput: true
        }]
      },
      loud_speaker: {
        id: 'loud_speaker',
        title: '扬声器',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'volume',
          type: 'int'},
        {
          name: 'echo',
          type: 'int'
        },
        {
          name: 'cut_off',
          type: 'int'
        },
        {
          name: 'peak',
          type: 'int'
        },
        {
          name: 'attack',
          type: 'int'
        },
        {
          name: 'decay',
          type: 'int'
        }],
        props: [{
          idSuffix: 'volume',
          name: '音量',
          type: 'int',
          visual: 'number',
          defValue: 8,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'echo',
          name: '回声（ms）',
          type: 'int',
          visual: 'number',
          defValue: 1000,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'cut_off',
          name: 'cut off',
          type: 'int',
          visual: 'number',
          defValue: 8,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'peak',
          name: 'peak',
          type: 'int',
          visual: 'number',
          defValue: 8,
          hasOutput: false,
          hasInput: true

        },
        {
          idSuffix: 'attack',
          name: 'attack',
          type: 'int',
          visual: 'number',
          defValue: 8,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'decay',
          name: 'decay',
          type: 'int',
          visual: 'number',
          defValue: 8,
          hasOutput: false,
          hasInput: true
        }]
      },
      buzzer: {
        id: 'buzzer',
        title: '蜂鸣器',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'frequency',
          type: 'int'}],
        props: [{
          idSuffix: 'frequency',
          name: '频率(k)',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }]
      },
      motor: {
        id: 'motor',
        title: '10kg舵机',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'angle',
          type: 'int'}],
        props: [{
          idSuffix: 'angle',
          name: '转动角度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      source: {
        id: 'source',
        title: '素材',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'text',
          type: 'string'},
        {
          name: 'color',
          type: 'color'
        },
        {
          name: 'length',
          type: 'int'
        },
        {
          name: 'point',
          type: 'int'
        },
        {
          name: 'position',
          type: 'int'
        }],
        props: [{
          idSuffix: 'text',
          name: '文字',
          type: 'string',
          visual: 'string',
          defValue: 'zuozhuan',
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'color',
          name: '颜色',
          type: 'color',
          visual: 'rgb',
          defValue: false,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'length',
          name: '长度',
          type: 'int',
          visual: 'number',
          defValue: 24,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'point',
          name: '中心点',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'position',
          name: '坐标',
          type: 'Array',
          visual: 'Array',
          defValue: ['X118', 'Y118'],
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      led2: {
        id: 'led2',
        title: '外接LED',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'color',
          type: 'color'},
        {
          name: 'light',
          type: 'int'
        }],
        props: [{
          idSuffix: 'color',
          name: '颜色',
          type: 'color',
          visual: 'rgb',
          defValue: false,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'light',
          name: '亮度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      led3: {
        id: 'led3',
        title: '紫外线LED',
        titleInput: true,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'light',
          type: 'int'}],
        props: [{
          idSuffix: 'light',
          name: '亮度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: false,
          hasInput: true
        }],
        funs: []
      },
      speech_synthesis: {
        id: 'speech_synthesis',
        title: '语音合成',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'text',
          type: 'string'}],
        props: [{
          idSuffix: 'text',
          name: '输入文本',
          type: 'string',
          visual: 'string',
          defValue: 'zuozhuan',
          hasOutput: true,
          hasInput: true
        }],
        funs: []
      }
    },
    sensor: {
      // human_infrared: {
      //   // 整体节点配置中的节点标识符
      //   id: 'human_infrared',
      //   // 节点名称
      //   title: '人体红外传感器',
      //   // title栏左边输入
      //   titleInput: null,
      //   // title栏右边输出
      //   titleOutput: {
      //     type: 'switch'
      //   },
      //   // 整体的输入数据字段数组
      //   inputs: [],
      //   // 整体的输出数据字段数组
      //   outputs: [
      //     {
      //       // 输出的字段名称
      //       name: 'humanDetected',
      //       // 输出的字段类型
      //       type: 'Boolean'
      //     }
      //   ],
      //   // 节点自有属性数组
      //   props: [{
      //     idSuffix: 'humanDetected',
      //     name: '开关状态',
      //     type: 'Boolean',
      //     visual: 'el-switch',
      //     defValue: false,
      //     hasOutput: true,
      //     hasInput: true
      //   }],
      //   // 节点自有函数数组
      //   funs: []
      // },
      human_infrared: {
        id: 'human_infrared',
        title: '人体红外传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'keyDown',
          type: 'Boolean'}],
        props: [{
          idSuffix: 'keyDown',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: true,
          hasInput: false
        }]
      },
      volume_sensor: {
        id: 'volume_sensor',
        title: '音量传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'volume',
          type: 'Boolean'}],
        props: [{
          idSuffix: 'volume',
          name: '音量',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      light_sensor: {
        id: 'light_sensor',
        title: '光敏电阻',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'light',
          type: 'int'}],
        props: [{
          idSuffix: 'light',
          name: '光敏度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      shock_sensor: {
        id: 'light_sensor',
        title: '震动传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'shock',
          type: 'int'}],
        props: [{
          idSuffix: 'shock',
          name: '震动',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      temperature_sensor: {
        id: 'temperature_sensor',
        title: '温度传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'temperature',
          type: 'int'}],
        props: [{
          idSuffix: 'temperature',
          name: '温度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      soil_sensor: {
        id: 'soil_sensor',
        title: '土壤湿度传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'soilsensor',
          type: 'int'}],
        props: [{
          idSuffix: 'soilsensor',
          name: '土壤湿度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      humidity_sensor: {
        id: 'humidity_sensor',
        title: '湿度传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'humidity',
          type: 'int'}],
        props: [{
          idSuffix: 'humidity',
          name: '湿度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      pressure_pickup: {
        id: 'pressure_pickup',
        title: '压力传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'pressure',
          type: 'int'}],
        props: [{
          idSuffix: 'pressure',
          name: '压力',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      bending_sensor: {
        id: 'bending_sensor',
        title: '弯曲传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'bending',
          type: 'int'}],
        props: [{
          idSuffix: 'bending',
          name: '弯曲度',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      acceleration_transducer: {
        id: 'acceleration_transducer',
        title: '加速度传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'accelerate',
          type: 'Array'}],
        props: [{
          idSuffix: 'accelerate',
          name: '加速度',
          type: 'Array',
          visual: 'number',
          defValue: ['X50', 'Y50', 'Z0'],
          hasOutput: true,
          hasInput: false
        }],
        funs: [
          {
            title: '平移距离',
            id: 'move_distance',
            type: 'number',
            defaultVal: '-',
            titleInput: null,
            titleOutput: true
          // props: [{
          //   idSuffix: 'accelerate',
          //   name: '加速度',
          //   type: 'Array',
          //   visual: 'number',
          //   defValue: ['X50', 'Y50', 'Z0'],
          //   hasOutput: true,
          //   hasInput: false
          // }]
          },
          {
            title: '角度',
            id: 'rotate_angel',
            type: 'number',
            defaultVal: '-',
            titleInput: null,
            titleOutput: true
          }]
      },
      color_sensor: {
        id: 'light_sensor',
        title: '色彩识别传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'color',
          type: 'color'}],
        props: [{
          idSuffix: 'color',
          name: '颜色',
          type: 'color',
          visual: 'rgb',
          defValue: false,
          hasOutput: true,
          hasInput: false
        }]
      },
      heartrate_sensor: {
        id: 'heartrate_sensor',
        title: '心率传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'heartrate',
          type: 'int'}],
        props: [{
          idSuffix: 'heartrate',
          name: '心率（bmp）',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      },
      ultrasonic_sensor: {
        id: 'ultrasonic_sensor',
        title: '超声波传感器',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'ultrasonic',
          type: 'int'}],
        props: [{
          idSuffix: 'ultrasonic',
          name: '超声波',
          type: 'int',
          visual: 'number',
          defValue: 50,
          hasOutput: true,
          hasInput: false
        }]
      }
    },
    switch: {
      backlight_key: {
        id: 'backlight_key',
        title: '背光按键',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [
          {
            name: 'keyDown',
            type: 'Boolean'
          }
        ],
        props: [{
          idSuffix: 'keyDown',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: true,
          hasInput: true
        }],
        simulateFun: function (idSuffix) {
          console.log(this)
          return this['keyDown']
        }
      },
      digital_switch: {
        id: 'digital_switch',
        title: '数字触摸开关',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'keyDown',
          type: 'Boolean'
        }],
        props: [{
          idSuffix: 'keyDown',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: true,
          hasInput: false
        }],
        simulateFun: function (idSuffix) {
          console.log(this)
          return this['keyDown']
        }
      },
      infrared_tansceiver1: {
        id: 'infrared_tansceiver',
        title: '红外收发／避障',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'sensitivity',
          type: 'int'
        },
        {
          name: 'keyDown',
          type: 'Boolean'
        }],
        props: [{
          idSuffix: 'sensitivity',
          name: '灵敏度',
          type: 'int',
          visual: 'number',
          defValue: 16,
          hasOutput: false,
          hasInput: true
        },
        {
          idSuffix: 'keyDown',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: true,
          hasInput: false
        }]
      },
      reed_switch: {
        id: 'reed_switch',
        title: '磁簧开关',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'keyDown',
          type: 'Boolean'}],
        props: [{
          idSuffix: 'keyDown',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: true,
          hasInput: false
        }]
      },
      roller_switch: {
        id: 'roller_switch',
        title: 'roller开关',
        titleInput: null,
        titleOutput: null,
        inputs: [],
        outputs: [{
          name: 'keyDown',
          type: 'Boolean'}],
        props: [{
          idSuffix: 'keyDown',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: true,
          hasOutput: true,
          hasInput: false
        }]
      }
    }
  },
  virtual: {
    logic: {
      logic_and: {
        id: 'logic_and',
        title: '&&',
        titleInput: null,
        titleOutput: null,
        inputs: [{
          idSuffix: 'input_0',
          name: '条件0',
          type: 'Bollean'
        }, {
          idSuffix: 'input_1',
          name: '条件1',
          type: 'Bollean'
        }, {
          idSuffix: 'input_2',
          name: '条件2',
          type: 'Bollean'
        }],
        outputs: [{
          idSuffix: 'result',
          name: '结果',
          type: 'Boolean'}],
        simulateFun: function () {
          let result = true
          this.inputs.forEach(e => { result = e && result })
          return result
        }
      }
    },
    math: []
  }
}
