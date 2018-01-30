export default {
  tools: [
    {
      id: 0,
      name: 'tube-l',
      config: {
        label: '管接头',
        compType: 'svg',
        compSource: '/static/img/scada/svg/tube-l.svg',
        width: 27,
        height: 27,
        keepRatio: true,
        rotatable: true,
        colorMask: true
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/ex-comp-1.svg',
      params: []
    },
    {
      id: 1,
      name: 'tube-h',
      config: {
        label: '管横',
        compType: 'svg',
        compSource: '/static/img/scada/svg/tube-h.svg',
        width: 50,
        height: 10,
        keepRatio: false,
        rotatable: false,
        colorMask: true
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/tube_h_pre.svg',
      params: []
    },
    {
      id: 2,
      name: 'tube-v',
      config: {
        label: '管竖',
        compType: 'svg',
        compSource: '/static/img/scada/svg/tube-v.svg',
        width: 10,
        height: 50,
        keepRatio: false,
        rotatable: false,
        colorMask: true
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/tube_v_pre.svg',
      params: []
    },
    // {
    //   id: 100,
    //   name: 'ex-comp-2',
    //   config: {
    //     label: '元件A',
    //     compType: 'svg',
    //     compSource: '/static/img/scada/svg/ex-comp-2.svg',
    //     width: 56,
    //     height: 56,
    //     keepRatio: true,
    //     rotatable: true,
    //     colorMask: false
    //   },
    //   imgUrl: 'http://10.0.0.126/static/img/scada/svg/ex-comp-2_pre.svg',
    //   params: []
    // },
    // {
    //   id: 101,
    //   name: 'ex-comp-3',
    //   config: {
    //     label: '元件B',
    //     compType: 'svg',
    //     compSource: '/static/img/scada/svg/ex-comp-3.svg',
    //     width: 49,
    //     height: 49,
    //     keepRatio: true,
    //     rotatable: true,
    //     colorMask: false
    //   },
    //   imgUrl: 'http://10.0.0.126/static/img/scada/svg/ex-comp-3_pre.svg',
    //   params: []
    // },
    {
      id: 200,
      name: 'ex1-ac0',
      config: {
        label: '空调挂机',
        compType: 'svg',
        compSource: '/static/img/scada/svg/ex1-ac0.svg',
        width: 138,
        height: 32,
        keepRatio: true,
        rotatable: false,
        colorMask: false
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/ex1-ac0_pre.svg',
      params: []
    },
    {
      id: 202,
      name: 'ex1-ac2',
      config: {
        label: '空调柜机',
        compType: 'svg',
        compSource: '/static/img/scada/svg/ex1-ac2.svg',
        width: 70,
        height: 104,
        keepRatio: true,
        rotatable: false,
        colorMask: false
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/ex1-ac2_pre.svg',
      params: []
    },
    {
      id: 201,
      name: 'ex1-ac1',
      config: {
        label: '空调冷却塔',
        compType: 'svg',
        compSource: '/static/img/scada/svg/ex1-ac1.svg',
        width: 70,
        height: 70,
        keepRatio: true,
        rotatable: false,
        colorMask: false
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/ex1-ac1_pre.svg',
      params: []
    },
    {
      id: 203,
      name: 'compressorA',
      config: {
        label: '压缩机',
        compType: 'svg',
        compSource: '/static/img/scada/svg/compressorA.svg',
        width: 155,
        height: 77,
        keepRatio: true,
        rotatable: false,
        colorMask: false
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/compressorA_pre.svg',
      params: []
    },
    {
      id: 204,
      name: 'pumpA',
      config: {
        label: '压缩机',
        compType: 'svg',
        compSource: '/static/img/scada/svg/pumpA.svg',
        width: 80,
        height: 48,
        keepRatio: true,
        rotatable: false,
        colorMask: false
      },
      imgUrl: 'http://10.0.0.126/static/img/scada/svg/pumpA_pre.svg',
      params: []
    }
  ]
}
