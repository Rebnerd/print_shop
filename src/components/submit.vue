<template>
  <div>
    <form @submit.prevent="submit" class="row g-3 needs-validation" novalidate>
      <div class="col-md-4">
        <label for="page-number" class="form-label">所需打印页数</label>
        <input  v-model="form.pageNumber" type="text" class="form-control" id="page-number"  required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
      <div class="col-md-4">
        <label for="copies" class="form-label">所需打印份数</label>
        <input  v-model="form.copies" type="text" class="form-control" id="copies"  required>
        <div class="valid-feedback">
          Looks good!
        </div>
      </div>
<!--      <div class="col-md-3">-->
<!--        <label for="page-range" class="form-label">页数范围(选填)</label>-->
<!--        <input v-model="form.pageRange" type="text" class="form-control" id="page-range" placeholder="eg:0-5" required>-->
<!--        <div class="valid-feedback">-->
<!--          Looks good!-->
<!--        </div>-->
<!--      </div>-->
      <div class="col-md-4">
        <label for="dorm" class="form-label">你所在宿舍号</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input v-model="form.dorm" type="text" class="form-control" id="dorm" aria-describedby="inputGroupPrepend"
                 required>
          <div class="invalid-feedback">
            invalid dorm number!
          </div>
        </div>
      </div>
<!--      <div class="col-md-6">-->
<!--        <label for="validationCustom03" class="form-label">City</label>-->
<!--        <input type="text" class="form-control" id="validationCustom03" required>-->
<!--        <div class="invalid-feedback">-->
<!--          Please provide a valid city.-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-md-3">-->
<!--        <label for="validationCustom04" class="form-label">State</label>-->
<!--        <select class="form-select" id="validationCustom04" required>-->
<!--          <option selected disabled value="">Choose...</option>-->
<!--          <option>...</option>-->
<!--        </select>-->
<!--        <div class="invalid-feedback">-->
<!--          Please select a valid state.-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-md-3">-->
<!--        <label for="validationCustom05" class="form-label">Zip</label>-->
<!--        <input type="text" class="form-control" id="validationCustom05" required>-->
<!--        <div class="invalid-feedback">-->
<!--          Please provide a valid zip.-->
<!--        </div>-->
<!--      </div>-->
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
          <label class="form-check-label" for="invalidCheck">
            Agree to terms and conditions
          </label>
          <div class="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">Submit form</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "submit",
  mounted(){
    (function () {

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              }

              form.classList.add('was-validated')
            }, false)
          })
    })()
  },
  data(){
    return {
      form:{
        pageNumber:'',
        copies:'',
        dorm:'',
      },
      jobId:''
    }
  },
  methods:{
    submit(){
      console.log(this.form)
      axios.post('http://192.168.31.58:4500/create-job',this.form)
      .then((res)=>{
        console.log(res)
        this.jobId=res.data['job-id']
      })
    }
  },
  // store the jobId in localstorage
  watch:{
    jobId(newJodId){
      localStorage.jobId=newJodId
    }
  }
}

</script>

<style scoped>

</style>