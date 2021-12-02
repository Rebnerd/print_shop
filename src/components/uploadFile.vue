<template>
  <div class="file-upload">
    <label for="prompt" class="form-label">上传需要打印的文件</label>
    <input id="prompt" class="form-control form-control-lg" type="file" @change="onFileChange">
    <button @click="onUploadFile" class="upload-button"
            :disabled="!this.selectedFile">Upload file
    </button>
    <progress-bar v-if="progress" :progress="progress" :job-id="jobId"/>
  </div>
</template>

<script>
import axios from "axios";
import ProgressBar from "./progressBar";
export default {
  name:"uploadFile",
  components: {ProgressBar},
  data() {
    return {
      selectedFile: "",
      progress:0,
      jobId:0
    };
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
      console.log(localStorage.jobId)
      formData.append("job-id",localStorage.jobId)
      // sending file to the backend
      axios
          .post("http://192.168.31.58:4500/upload", formData, {
            onUploadProgress: ProgressEvent => {
              let progress =
                  Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
                  + "%";
              this.progress = progress;
            }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
    }
  }
};
</script>
<style>

</style>