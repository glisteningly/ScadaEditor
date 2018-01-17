const svgStr = `
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   viewBox="0 0 1000 600"
   version="1.1"
   id="svg8"
   inkscape:version="0.92.2 (5c3e80d, 2017-08-06)"
   sodipodi:docname="绘图b.svg"
   style="shape-rendering:crispEdges">
  <defs
     id="defs2" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="0.7"
     inkscape:cx="396.57006"
     inkscape:cy="341.18619"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="false"
     inkscape:window-width="1707"
     inkscape:window-height="897"
     inkscape:window-x="-4"
     inkscape:window-y="-4"
     inkscape:window-maximized="1"
     inkscape:snap-text-baseline="true"
     units="px"
     showborder="true"
     inkscape:pagecheckerboard="false"
     borderlayer="false"
     inkscape:showpageshadow="false" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
    <rect
       style="stroke-width:2.60190272"
       y="25.300468"
       x="246.04686"
       width="120.51266"
       height="118.86804"
       class="def"
       :class="this.options.val11 ? { on: true } : { off: true }"
       id="rect10" />
    <ellipse
       ry="167.1351"
       rx="169.91534"
       cx="510.43518"
       cy="231.19691"
       style="fill:#ff7bac;stroke-width:5.71252584"
       id="circle12" 
       @click.stop="doClick($event)"
       />
    <flowRoot
       transform="matrix(0.26458333,0,0,0.26458333,-9.480398e-8,87)"
       style="font-style:normal;font-weight:normal;font-size:40px;line-height:1.25;font-family:sans-serif;letter-spacing:0px;word-spacing:0px;fill:#000000;fill-opacity:1;stroke:none"
       id="flowRoot50"
       xml:space="preserve"><flowRegion
         id="flowRegion52"><rect
           y="258.31995"
           x="254.55844"
           height="45.456863"
           width="263.64981"
           id="rect54" /></flowRegion><flowPara
         id="flowPara56" /></flowRoot>    <text
       id="text72"
       y="248.44182"
       x="508.69431"
       style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:32px;line-height:1.25;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:1.25963378"
       xml:space="preserve"><tspan
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:32px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center;writing-mode:lr-tb;text-anchor:middle;fill:#ffffff;stroke-width:1.25963378"
         y="248.44182"
         x="508.69431"
         id="tspan70"
         sodipodi:role="line">{{options.val2}}</tspan></text>
    <svg x="700" y="300" width="80" height="150">
      <g>
        <rect
           style="fill:#0080c9;"
           id="rect74"
           width="100%"
           height="60%"
           :height="options.h1 + '%'"
           x="0"
           y="40%"
           :y="(100-options.h1) + '%'" />
        <rect
           style="fill:none;stroke:#000000;stroke-width:3"
           id="rect76"
           width="100%"
           height="100%"
           x="0"
           y="0" />
      </g>
    </svg>
  </g>
</svg>
`
export default svgStr

// transform="translate(0,-150) scale(1,1.5) translate(0,-50)"
