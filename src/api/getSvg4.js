const svgStr = `
<svg
   xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 1000 600"
   version="1.1"
   id="svg21810">
<MyRect
    v-for="rect in rects"
   :key="rect.key" 
   :value="rect.val"
   :x="rect.x"
   :y="rect.y"
   width="10"
   height="10" />  
<MyProgressbar
   v-for="pbar in pbars"
   :value="pbar.val"
   :key="pbar.key" 
   :x="pbar.x"
   :y="pbar.y"
   width="50"
   height="50"
   fill="url(#Gradient1)" />
<MyGuage
   v-for="guage in guages"
   :value="guage.val"
   :key="guage.key" 
   :x="guage.x"
   :y="guage.y"
   width="60"
   height="45"
   viewBox="0 0 100 75" />   
 
<MyLabel
   v-for="label in labels"
   :value="label.val"
   :key="label.key" 
   :x="label.x"
   :y="label.y"
   width="70"
   height="30" /> 
</svg>
`
export default svgStr
