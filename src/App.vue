<template>
  <div id="app">

<keep-alive>
    <router-view v-if='$route.meta.keepAlive'/>
</keep-alive>

<router-view v-if='!$route.meta.keepAlive'/>

  </div>
</template>

<style lang="scss">
html,body{
  width:100%;
  height:100%;
  margin:0;
  padding:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 1000px;
  margin:0 auto;
  height:100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
