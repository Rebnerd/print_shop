<template>
  <div>
    <form @submit.prevent="submit" class="row g-3 needs-validation" novalidate>
      <div class="col-md-4">
        <label for="page-number" class="form-label">所需打印页数</label>
        <input  v-model="form.number" type="text" class="form-control" id="page-number"  required>
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
      <div class="col-12">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value='box' id="invalidCheck" required>
          <label class="form-check-label" for="invalidCheck">
            comfirm the info above
          </label>
          <div class="invalid-feedback">
            You must comfirm before submitting.
          </div>
        </div>
      </div>
      <div class="col-12">
        <button class="btn btn-primary" type="submit">提交表单</button>
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
      var inputs = document.querySelectorAll('form input')
      //we need a monkey-patch here
      HTMLInputElement.prototype.checkValidity=function(){
        const regex = new RegExp('^\\+?([1-9]\\d*)$')
        // console.log(this.nodeValue)
        return regex.test(this.value) || this.type==='checkbox' &&this.checked === true
      }
      // Loop over them and prevent submission

      Array.prototype.slice.call(inputs)
          .forEach(function (input) {
            input.addEventListener('focusout', function () {
              if (!input.checkValidity()) {
                // form.classList.remove('was-validated')
                // input.classList.remove('is-valid')
                input.classList.add('is-invalid')
              }else{
                input.classList.remove('is-invalid')
                input.classList.add('is-valid')
              }
            }, false)
          })
    })()
  },
  data(){
    return {
      form:{
        number:'',
        copies:'',
        dorm:'',
      },
    }
  },
  watch:{
    form:{
      handler(newVal){
      console.log(newVal)
      },
      deep:true
    }
  },
  methods:{
    submit(){
      // console.log(this.form)
      var inputs = document.querySelectorAll('form input')
      for(let i =0;i<inputs.length;i++){
        if(inputs[i].classList.contains('is-invalid') || inputs[i].type==='checkbox' && inputs[i].checked === false){
          return
        }
      }
      // check if is null
      for (const attr in this.form) {
        if(this.form[attr]==='') return
      }
      axios.post(this.$store.state.printer+'/create-job',this.form)
      .then((res)=>{
        this.$store.commit('setJobId',res.data['job-id'])
        this.$store.commit('setMoney',this.form.number*this.form.copies*0.4)
        // console.log(this.$store.state.money)
        this.$router.push('/pay')
      })
    },
  },
}

</script>

<style scoped>
  button{
    margin: 20px;
  }

</style>