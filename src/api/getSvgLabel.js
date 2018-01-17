const svgStr = `
    <svg :x="x" :y="y" :width="width" :height="height">
      <g>
        <rect
           rx="4"
           ry="4"
           :fill="fill"
           id="rect74"
           width="100%"
           height="100%"
           />
        <text x="50%" y="75%" 
        style="font-size:18px; font-weight: bold; fill:#FFF; text-anchor: middle;"
        >{{value}}</text>
      </g>
    </svg>
`
export default svgStr

// transform="translate(0,-150) scale(1,1.5) translate(0,-50)"
