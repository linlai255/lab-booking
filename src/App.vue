<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body {
  margin: 0;
}
div {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.md-tb-5 {
  margin-top: 5px;
  margin-bottom: 5px !important;
}
.md-tb-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.md-tb-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.md-lr-auto {
  margin-left: auto;
  margin-right: auto;
}
.text-align {
  text-align: center;
}
</style>
