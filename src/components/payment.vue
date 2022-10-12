<template>
<div>
  <section class="money">一共需要支付{{this.$store.state.money.toFixed(1)}}元<br>(请仔细核对文件页数和份数)</section>
  <img :src="require('../assets/qrcode.jpg')" alt="">
  <router-link to="/upload"><button class="btn btn-primary">我已完成支付</button></router-link>
</div>
</template>

<script>
export default {
  name: "payment"
}
</script>

<style scoped>
.money{
  color:red;
  margin-bottom: 20px;
}
</style>