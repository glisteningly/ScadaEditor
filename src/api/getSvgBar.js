const svgStr = `
    <svg :x="x" :y="y" :width="width" :height="height">
    <defs>
      <linearGradient id="Gradient1" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#1e9cd7"/>
        <stop offset="50%" stop-color="#cce0f4"/>
        <stop offset="100%" stop-color="#1e9cd7"/>
      </linearGradient>
    </defs>
      <g>
        <rect
           style="fill:#EEE;"
           id="rect76"
           width="100%"
           height="100%"
           x="0"
           y="0"/>
        <rect
           :fill="fill"
           id="rect74"
           width="100%"
           height="60%"
           :height="value + '%'"
           x="0"
           y="40%"
           :y="(100-value) + '%'"
           />
        <rect
           style="fill:none;stroke:#005b97;stroke-width:3"
           id="rect76"
           width="100%"
           height="100%"
           x="0"
           y="0"
           />
        <text x="50%" y="55%" 
        style="font-size:14px; font-weight: bold; fill:#005b97; text-anchor: middle;"
        >{{value}}%</text>
      </g>
    </svg>
`
export default svgStr

// transform="translate(0,-150) scale(1,1.5) translate(0,-50)"
