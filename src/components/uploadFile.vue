<template>
  <div class="file-upload">
    <label for="prompt" class="form-label">上传需要打印的文件</label>
    <input id="prompt" class="form-control form-control-lg" type="file" @change="onFileChange">
    <button @click="onUploadFile" class="btn btn-primary"
            :disabled="!this.selectedFile || this.done">上传文件
    </button>
    <progress-bar class="My-progress" v-if="progress" :progress="progress"/>

<!--    <button class="btn btn-primary" @click="redirect">完成本次订单</button>-->
    <div class="alert  alert-dismissible fade " role="alert">
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProgressBar from "./progressBar";

export default {
  name: "uploadFile",
  components: {ProgressBar},
  data() {
    return {
      selectedFile: "",
      progress: 0,
      done:false
    };
  },
  watch:{
    progress(progressNow){
      if(progressNow==='100%'){
        this.done=true
      }
    }
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      alert('确定打印')
      this.jobId++
      // the req.file object
      const formData = new FormData();
      // key-values pairs, the name is file
      formData.append("file", this.selectedFile);  // appending file
      console.log(this.$store.state.jobId)
      formData.append("job-id", this.$store.state.jobId)
      // sending file to the backend
      axios
          .post(this.$store.state.printer+'/upload', formData, {
            onUploadProgress: ProgressEvent => {
              let progress =
                  Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                  + "%";
              this.progress = progress;
            }
          })
          .then(res => {
            console.log(res)
            var content = document.querySelector('.alert')
            if(res.data.msg!=undefined) {
              content.classList.add('show', 'alert-danger')
              content.innerHTML = `<strong>服务端解析错误</strong> ${res.data.msg}`
              // for user to retry!
              this.done=false
            }
            else if(res.data.statusCode==="client-error-not-found"){
              content.classList.add('show', 'alert-danger')
              content.innerHTML = `<strong>任务已过期或未创建,请重复前面操作!!</strong>`
              this.done=true
            }
            else{
              // for the retry
              content.classList.remove('alert-danger')
              content.classList.add('show','alert-success')
              content.innerHTML = `<strong>成功上传任务</strong>请自行取件,感谢您的使用`
            }
          })
    },
    // redirect() {
    //   this.$router.push('/')
    // }
  }
};
</script>
<style>
button {
  margin: 20px;
}
.My-progress{
  position: absolute;
  top:-100%;
}

</style>