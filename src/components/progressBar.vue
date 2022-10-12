<template>
  <div class="canvas-wrap">
    <canvas id="canvas" width="300" height="300"></canvas>
    <span id="procent"></span>
  </div>
</template>

<script>
export default {
  name: "progressBar",
  data() {
    return {}
  },
  props: ['progress'],
  // watch:{
  //   jobId(newId,oldId){
  //     if (newId!==oldId){
  //       console.log(this.jobId)
  //       this.reDraw()
  //     }
  //   }
  // },
  mounted() {
    // here we have no data control yet!!
    this.reDraw()
  },
  methods: {
    reDraw(){
      var can = document.getElementById('canvas'),
          spanProcent = document.getElementById('procent'),
          c = can.getContext('2d');

      var posX = can.width / 2,
          posY = can.height / 2,
          fps = 1000 / 200,
          procent = 0,
          oneProcent = 360 / 100,
          result = oneProcent * this.progress;

      c.lineCap = 'round';
      arcMove();

      function arcMove() {
        var deegres = 0;
        var acrInterval = setInterval(function () {
          deegres += 1;
          c.clearRect(0, 0, can.width, can.height);
          procent = deegres / oneProcent;

          spanProcent.innerHTML = procent.toFixed();

          c.beginPath();
          c.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360));
          c.strokeStyle = '#b1b1b1';
          c.lineWidth = '10';
          c.stroke();

          c.beginPath();
          c.strokeStyle = '#3949AB';
          c.lineWidth = '10';
          c.arc(posX, posY, 70, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres));
          c.stroke();
          if (deegres >= result || deegres >= 360) clearInterval(acrInterval);
        }, fps);

      }
    }
  }
}


</script>

<style scoped>
:root {
  background: #fff;
}

span#procent {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 50px;
  transform: translate(-50%, -50%);
  color: #3949AB;
}

span#procent::after {
  content: '%';
}

/*.canvas-wrap {*/
/*  position: absolute;*/
/*  top:%;*/
/*  left:10%;*/
/*}*/

</style>