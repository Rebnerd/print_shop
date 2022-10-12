<template>
  <div>
    <section class="title">13-412自助打印店</section>
    <img :src="require('../assets/printer.gif')" style="margin:0px;background-clip:border-box, content-box, border-box, border-box;">
<!--    <button class="btn btn-primary" :disabled="!this.status" @click="redirect">下一步</button>-->
    <button class="btn btn-primary"  @click="redirect">下一步</button>

    <ol class="description"> 使用须知：
      <li>打印标准:本打印机仅支持单面打印(如需双面打印请联系群管理)</li>
      <li>兼容打印格式：pdf，office全家桶，jpeg(灰黑)</li>
      <li>收费标准:0.4元/张</li>


<!--      打印机状态若显示正常，请点击下一步-->
    </ol>
    <section class="status">
      打印机当前状态:{{this.status ? '空闲':'繁忙,请稍后再试'}}<br/>
      正在排队人数:{{this.wait}}
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "printerStatus",
  data() {
    return {
      status: '',
      wait: 0,
      err:''
    }
  },
  mounted() {
    axios.post(this.$store.state.printer+'/query', {})
        .then((response) => {
          // console.log(response)
          this.status = response.data["status"]
          console.log(this.status)
          this.wait = response.data["wait"]
        })
        .catch((err)=>{
          alert('网络请求错误，请加载重试',err)
        })
  },
  methods:{
    redirect(){
      this.$router.push('/create-job')
    }
  }
}
</script>

<style scoped>
.description{
  margin: 20px;
  font-family: "Corsiva Hebrew";
}
.status{
  color:red;
  margin:20px
}
.title{
  font-size:xx-large;
  margin: 0px;
  z-index:1000;
}
</style>