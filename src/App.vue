<template>
<!--  pass the current location to breadscrum-->
  <div>13-412自助打印店</div>
  <bread-scrum class="bread" :at="getPath"/>
  <div class="view">
  <router-view/>
    <router-link :to="getNextLoc()"><button type="button" class="btn btn-primary link">下一步</button></router-link>
  </div>
</template>

<script>
import breadScrum from "./components/breadScrum";
export default {
  components: { breadScrum },
  data(){
    return {
      order: ['/', '/create-job', '/pay', '/upload','/']
    }
  },
  methods:{
    getNextLoc(){
      return this.order[this.order.indexOf(this.getPath)+1]
    }
  },
  computed:{
    getPath(){
      return this.$route.path
    }
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bread{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top:40px;
}
.view{
  position: absolute;
  top:50%;
  left: 50%;
  font-size: x-large;
  transform: translate(-50%,-50%);
}
.link{
  margin-top: 50px;
}
</style>
