/**
 * Created by zhujiaye on 2017/7/13.
 */
export const nodesConfig = {
  device: {
    module: {},
    sensor: {
      human_infrared: {
        // 整体节点配置中的节点标识符
        id: 'human_infrared',
        // 节点名称
        title: '人体红外传感器',
        // title栏左边输入
        titleInput: null,
        // title栏右边输出
        titleOutput: {
          type: 'switch'
        },
        // 整体的输入数据字段数组
        inputs: [],
        // 整体的输出数据字段数组
        outputs: [
          {
            // 输出的字段名称
            name: 'humanDetected',
            // 输出的字段类型
            type: 'Boolean'
          }
        ],
        // 节点自有属性数组
        props: [{
          idSuffix: 'humanDetected',
          name: '开关状态',
          type: 'Boolean',
          visual: 'el-switch',
          defValue: false,
          hasOutput: true,
          hasInput: true
        }],
        // 节点自有函数数组
        funs: []
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
        }]
      }
    }
  },
  virtual: {
    logic: [],
    math: []
  }
}
// export const nodesConfig = [
//   {
//     // 节点分类
//     type: 'device/sensor',
//     // 节点名称
//     title: '人体红外传感器',
//     // title栏左边输入
//     titleInput: null,
//     // title栏右边输出
//     titleOutput: {
//       // 展现形式，switch为开关形式
//       type: 'switch'
//     },
//     // 整体的输入数据字段数组
//     inputs: [],
//     // 整体的输出数据字段数组
//     outputs: [
//       {
//         // 输出的字段名称
//         name: 'humanDetected',
//         // 输出的字段类型
//         type: 'Boolean'
//       }
//     ],
//     // 节点自有属性数组
//     props: [],
//     // 节点自有函数数组
//     funs: []
//   }
// ]
