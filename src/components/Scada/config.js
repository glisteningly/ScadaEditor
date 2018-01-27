export default {
  rotateParam: {
    name: 'rotate',
    label: '旋转角度',
    type: 'Enum',
    value: '0',
    opts: [{ label: '0°', value: 0 }, { label: '90°', value: 90 }, { label: '180°', value: 180 },
      { label: '270°', value: 270 }]
  },
  colorMaskParam: {
    name: 'colorMask',
    label: '色彩覆盖',
    type: 'Enum',
    value: '',
    opts: [{ label: '无', value: '' }, { label: '绿色', value: 'colorGreen' }, { label: '蓝色', value: 'colorBlue' }]
  }
}
