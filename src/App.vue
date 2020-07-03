<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
const deafult_layout = 'default'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || deafult_layout) + '-layout'
    }
  }
}
</script>

<style lang="scss">
@import "assets/styles/app";
#app {
  height: 100%;
}
.main {
  height: 100%;
  background-color: #FAFAFA;
  max-width: 1480px;
  margin: 0 auto;
}
.content {
  padding: 16px;
}
</style>