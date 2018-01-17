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
   id="svg21810"
   sodipodi:docname="6666.svg"
   inkscape:version="0.92.2 (5c3e80d, 2017-08-06)"><metadata
   id="metadata21816">
  <rdf:RDF>
    <cc:Work
       rdf:about="">
      <dc:format>image/svg+xml</dc:format>
      <dc:type
         rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
    </cc:Work>
  </rdf:RDF>
</metadata>
<defs
   id="defs21814" />
<sodipodi:namedview
   pagecolor="#ffffff"
   bordercolor="#666666"
   borderopacity="1"
   objecttolerance="10"
   gridtolerance="10"
   guidetolerance="10"
   inkscape:pageopacity="0"
   inkscape:pageshadow="2"
   inkscape:window-width="1707"
   inkscape:window-height="897"
   id="namedview21812"
   showgrid="false"
   inkscape:zoom="0.384"
   inkscape:cx="500"
   inkscape:cy="300"
   inkscape:window-x="-4"
   inkscape:window-y="-4"
   inkscape:window-maximized="1"
   inkscape:current-layer="svg21810" />
<rect
   style=""
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
   style="fill:#c87137"
   id="circle12" 
   @click.stop="doClick($event)"/>
    <text
   id="text72"
   y="248.44182"
   x="508.69431"
   style="font-size:32px;text-align:center;fill:#ffffff;"
   xml:space="preserve"><tspan
     style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:32px;font-family:sans-serif;-inkscape-font-specification:'sans-serif, Normal';font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-feature-settings:normal;text-align:center;writing-mode:lr-tb;text-anchor:middle;fill:#ffffff;stroke-width:1.25963378"
     y="248.44182"
     x="508.69431"
     id="tspan70">
         {{options.val2}}
       </tspan></text>
<MyProgressbar
   :value="options.h1"
   x="700"
   y="300"
   width="50"
   fill="url(#Gradient1)" />
<MyProgressbar
   :value="options.h1"
   x="700"
   y="300"
   width="50"
   fill="url(#Gradient1)" />
 <MyGuage
   :value="options.val6"
   x="100"
   y="300"
   width="100"
   height="150"
   viewBox="0 0 100 75"
   fill="url(#Gradient1)" />  
</svg>
`
export default svgStr
