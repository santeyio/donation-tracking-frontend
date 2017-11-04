<template>
  <div class="container" id="app">
		<div class="col-md-3 text-center my-3">
			<img src="/static/img/logo.png" style="max-width:50%;">
		</div>
    <router-view></router-view>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome',
    };
  },
  components: {
    UserInfo,
  },
};
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/
}
</style>
