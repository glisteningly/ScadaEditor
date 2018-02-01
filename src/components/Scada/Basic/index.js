export default {
  tools: [
    {
      id: 0,
      name: 'scada-label',
      config: {
        label: '文本',
        width: 60,
        height: 28,
        keepRatio: false
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '数据文字', type: 'String', value: '9999' }],
      params: [
        { name: 'text', label: '静态文字', type: 'String', value: '', hint: '将覆盖绑定' },
        { name: 'fill', label: '字体色', type: 'Color', value: '#333' },
        { name: 'background', label: '背景色', type: 'Color', value: '' },
        { name: 'fontSize', label: '文字尺寸', type: 'Int', value: '24' },
        {
          name: 'fontFamily',
          label: '字体',
          type: 'Enum',
          value: 'default',
          opts: [{ label: '默认', value: 'default' }, { label: 'LCD字体', value: 'lcdmono' }]
        }]
    },
    {
      id: 1,
      name: 'scada-guage',
      config: {
        label: '计量表',
        width: 100,
        height: 75,
        keepRatio: true
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '指示值', type: 'Number', value: 50 }],
      params: [{ name: 'minVal', label: '最小值', type: 'Number', value: '0' },
        { name: 'maxVal', label: '最大值', type: 'Number', value: '100' }]
    },
    {
      id: 2,
      name: 'scada-levelbar',
      config: {
        label: '液位计',
        width: 60,
        height: 100,
        keepRatio: false
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '显示值', type: 'Number', value: 33 }],
      params: [{ name: 'fill', label: '填充色', type: 'Color', value: '#43b5ff' },
        { name: 'background', label: '背景色', type: 'Color', value: '#CCC' }]
    },
    {
      id: 3,
      name: 'scada-panel',
      config: {
        label: '面板',
        width: 80,
        height: 40,
        keepRatio: false
      },
      imgUrl: '',
      params: [
        { name: 'background', label: '背景色', type: 'Color', value: '#CCC' },
        { name: 'stroke', label: '边框色', type: 'Color', value: '' },
        { name: 'strokeWidth', label: '边框宽度', type: 'Int', value: '0' },
        { name: 'cornerRadius', label: '圆角大小', type: 'Int', value: '0' }
      ]
    }
  ]
}
