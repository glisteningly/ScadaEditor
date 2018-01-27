<template>
  <div style="width: 0;height: 0;">
    <svg>
      <filter id="colorGreen">
        <feColorMatrix
          type="matrix"
          values="-1 0 0 0 0 0 1 0 0 0 0 0 0.3 0 0 0 0 0 1 0 "/>
      </filter>
      <filter id="colorBlue">
        <feColorMatrix
          type="matrix"
          values="-3 0 0 0 0 0 0.6 0 0 0 0 0 1 0 0 0 0 0 1 0 "/>
      </filter>
    </svg>
  </div>
</template>
