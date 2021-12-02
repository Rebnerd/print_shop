<template>
  <div>

    <img :src="require('../assets/printer.gif')" alt="">
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
    axios.post('http://192.168.31.58:4500/query', {})
        .then((response) => {
          console.log(response)
          this.status = response.data["status"] ? 'idle' : 'busy'
          this.wait = response.data["wait"]
        })
        .catch((err)=>{alert('网络请求错误，请加载重试')})
  }
}
</script>

<style scoped>

</style>