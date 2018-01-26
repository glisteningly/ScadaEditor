export default {
  tools: [
    {
      id: 0,
      name: 'scada-label',
      config: {
        width: 60,
        height: 28,
        keepRatio: false
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: 'Text', type: 'String', value: '9999' }],
      params: [{ name: 'fill', label: '字体色', type: 'Color', value: '#333' },
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
        width: 100,
        height: 75,
        keepRatio: true
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '指示值', type: 'Number', value: 42 }],
      params: [{ name: 'minVal', label: '最小值', type: 'Number', value: '0' },
        { name: 'maxVal', label: '最大值', type: 'Number', value: '100' }]
    },
    {
      id: 2,
      name: 'scada-levelbar',
      config: {
        width: 60,
        height: 100,
        keepRatio: false
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '显示值', type: 'Number', value: 33 }],
      params: [{ name: 'fill', label: '填充色', type: 'Color', value: '#43b5ff' },
        { name: 'background', label: '背景色', type: 'Color', value: '#CCC' }]
    }
  ]
}
