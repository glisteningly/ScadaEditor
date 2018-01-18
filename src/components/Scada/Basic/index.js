export default {
  tools: [
    {
      id: 0,
      name: 'scada-label',
      defaultSize: {
        width: 60,
        height: 20
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: 'Text', type: 'String', value: 'label' }],
      params: []
    },
    {
      id: 1,
      name: 'scada-guage',
      defaultSize: {
        width: 100,
        height: 75
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '指示值', type: 'Number', value: 42 }],
      params: []
    },
    {
      id: 2,
      name: 'scada-levelbar',
      defaultSize: {
        width: 60,
        height: 100
      },
      imgUrl: '',
      attrs: [{ name: 'val1', label: '显示值', type: 'Number', value: 33 }],
      params: [{ name: 'fill', label: '填充色', type: 'Color', value: '#43b5ff' },
        { name: 'background', label: '背景色', type: 'Color', value: '#CCC' }]
    }
  ]
}
