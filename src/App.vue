<template>
  <div id="app" class="cross">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    crossScreen();
  }
}
</script>

<style>
html,
body{
  font-size: 16px;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
}
input {
  outline:none;
  border:  0;
}

#app {
  font-size: 16px;
  height: 100%;
  width: 100%;
}
/*横屏*/
.cross {
  position: absolute;
}
/*竖屏*/
.vertical {
  position: absolute;
}
</style>
