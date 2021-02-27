<style>
html,
body {
  height: 100%;

  /* 主背景色 */
  background-color: rgb(62, 62, 62);
  /* background-color: #585153; */
}

body {
  position: relative;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/css/initUtil.css";

export default {
  name: "app",
};
</script>
