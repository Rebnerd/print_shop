<template>
<!--  pass the current location to breadscrum-->
  <bread-scrum class="bread" :at="getPath"/>
  <div class="view container-md d-flex">
  <router-view/>
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
    // this is deprecated !! no use
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
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index:100;
  min-width:500px;
}
.view{
  position: absolute;
  top:60%;
  left: 50%;
  font-size: x-large;
  transform: translate(-50%,-50%);
  justify-content: center;
}


</style>
