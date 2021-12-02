<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb my-2">
      <li class="breadcrumb-item active"><a href="/">确认打印机情况</a></li>
      <li class="breadcrumb-item active"><a>创建打印任务</a></li>
      <li class="breadcrumb-item"><a>付款</a></li>
      <li class="breadcrumb-item"><a>上传打印文件</a></li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "breadScrum",
  data() {
    return {
      order: ['/', '/create-job', '/pay', '/upload']
    }
  },
  props: ['at'],

  watch: {
    at(newAt) {
      console.log(newAt)
      let index = this.order.indexOf(newAt)+1
      console.log(index)
      for(let i =1;i<=index;i++){
        let el = document.querySelector(`li:nth-child(${i})`)
        el.classList.add('active')
      }
      for(let i =index+1;i<=this.order.length;i++){
        let el = document.querySelector(`li:nth-child(${i})`)
        el.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped>
nav .breadcrumb {
  padding: 0;
  background: transparent;
}

.breadcrumb .breadcrumb-item a {
  position: absolute;
  left: 0;
  right: 0;
  top: 18px;
  font-size: 13px;
  color: #999 !important;
  z-index: 1;
  text-decoration: none;
}

.breadcrumb .breadcrumb-item {
  position: relative;
  margin: 0 15px 0 0;
  background: #575763;
  min-width: 100px;
  height: 16px;
}

.breadcrumb-item:before {
  content: "" !important;
  position: absolute;
  width: 0;
  border-top: 16px solid #575763;
  border-left: 10px solid transparent;
  left: -10px;
  top: 0;
  height: 16px;
}

.breadcrumb-item:after {
  content: "" !important;
  position: absolute;
  width: 0;
  border-top: 16px solid transparent;
  border-left: 10px solid #575763;
  right: -10px;
  top: 0;
  height: 16px;
}

.breadcrumb .breadcrumb-item:first-child {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.breadcrumb .breadcrumb-item:last-child {
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}

.breadcrumb .breadcrumb-item:last-child:after {
  border-left: 15px solid transparent;
}

.breadcrumb .breadcrumb-item.active:first-child:before {
  border-top: 16px solid transparent;
}

.breadcrumb .breadcrumb-item.active {
  background: #61c988;
}

.breadcrumb-item.active:before {
  border-top: 16px solid #61c988;
}

.breadcrumb-item.active:after {
  border-left: 10px solid #61c988;
}
</style>