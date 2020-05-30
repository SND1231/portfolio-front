<template>
  <div>
    <div class="fullview">
      <div id="loading">
        <v-progress-circular
          class=""
          :size="100"
          color="blue-grey"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.component('Loading', {
  name: 'Loading',
})
</script>

<style>
.fullview {
  width: 100%;
  height: 100%;
  background: #fefefe;
  position: fixed;
  top: 0;
  left: 0;
}

#loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    z-index:9999;
    position: fixed;
    background-color: rgba(#000, 0.5);
  }

</style>