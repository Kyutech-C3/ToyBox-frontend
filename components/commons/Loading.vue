<template>
  <div
    class="
      absolute
      top-1/2
      left-1/2
      -translate-x-1/2 -translate-y-1/2
      flex
      justify-center
      items-center
      [--loading-h:120px]
      h-[var(--loading-h)]
      w-[var(--loading-h)]
    "
  >
    <div class="loader">Loading...</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Loading extends Vue {}
</script>

<style scoped>
.loader,
.loader:after {
  border-radius: 50%;
  width: 50%;
  height: 50%;
}
.loader {
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 229, 158, 0.2);
  border-right: 1.1em solid rgba(255, 229, 158, 0.2);
  border-bottom: 1.1em solid rgba(255, 229, 158, 0.2);
  border-left: 1.1em solid #ffe59e;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
