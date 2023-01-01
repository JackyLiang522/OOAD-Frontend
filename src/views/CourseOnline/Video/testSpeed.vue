<template>
  <div class="speed-test">
<!--    <el-dialog title="测试网络环境" :visible.sync="speedOpen" width="30%" :close-on-click-modal="false">-->
      <p class="test-speed1">请点击下方按钮开始测试!</p>
      <p class="test-speed2"></p>
      <p class="test-speed3"></p>
      <span slot="footer" class="dialog-footer">
         <el-button @click="speedOpen=false">取 消</el-button>
        <el-button type="primary" @click="handStart">开始测试</el-button>
      </span>
<!--    </el-dialog>-->
  </div>
</template>


<script>

export default {
  data() {
    return {
      speedOpen: true,
      nowTime: null,
      strURL:'https://i2.hdslb.com/bfs/face/2aa2978da31cc5e8d026224e049b13bd20379ab6.jpg@240w_240h_1c_1s.webp',
      // strURL:'https://developers.facebook.com/favicon.ico',
      bolIsRunning:false,
      arrDelays:[],
      intSent: 0,
      intLost:0,
      intTimerID:null,
      bolIsTimeout:false,
      objIMG:{},
      title:''
    }
  },
  watch: {
    speedOpen: {
      immediate: true,
      handler: function(newVal) {
        if (newVal) {
          this.setStart()
          this.title = '请点击下方按钮开始测试!'
        }
      }
    }
  },
  methods: {
    changeVisible(visible = false) {
      this.speedOpen = visible
    },
    handEnd(){
      this.intRecv = this.arrDelays.length;
      this.intLost = this.intSent - this.intRecv;
      var sum = 0;
      for (var i = 0; i < this.intRecv; i++)
        sum += this.arrDelays[i];
      this.bolIsRunning = false;

      /*  * 统计结果  */
      console.log("Ping的统计信息 for " + this.strURL + ":");
      window.console.log("包:发送="+this.intSent+",接收="+this.intRecv+",丢包="+this.intLost+"("+Math.floor(this.intLost/this.intSent*100)+"% 丢包率),");
      console.log("最小速度="+Math.min.apply(this, this.arrDelays)+"ms, 最大速度 = "+Math.max.apply(this, this.arrDelays)+"ms, 平均速度 = " +Math.floor(sum / this.intRecv)+"ms");
      document.querySelector('.test-speed1').innerText = `发送:${this.intSent},接收:${this.intRecv},丢包:${this.intLost},丢包率:${Math.floor(this.intLost/this.intSent*100)} %`
      document.querySelector('.test-speed2').innerText = `最小速度:${Math.min.apply(this, this.arrDelays)}ms,最大速度:${Math.max.apply(this, this.arrDelays)}ms,平均速度:${Math.floor(sum / this.intRecv)}ms`
      let avg = Math.floor(sum / this.intRecv)
      if(this.intLost>0){
        this.title = "网络环境不稳定"
      }else if(avg>0 && avg<=30){
        this.title = "网络环境非常好"
      }else if(avg>30 && avg<=50) {
        this.title = "网络环境良好"
      }else if(avg>50 && avg<=100) {
        this.title = "网络环境普通"
      }else if(avg>100) {
        this.title = "网络环境差"
      }
      document.querySelector('.test-speed3').innerText = this.title
      if (this.intRecv == 0) return;
      console.log(this.title)
    },
    handStart(){
      this.title = '测试过程大概需要30秒,请耐心等待!'
      console.log(this.title)
      console.log(this.strURL)
      // this.strURL = window.location.href
      if (this.strURL.length == 0)
        return;
      // if (this.strURL.substring(0, 7).toLowerCase() != "http://")
      //   this.strURL = "http://" + this.strURL;
      this.intTimeout = 1000;
      this.bolIsRunning = true;
      this.arrDelays = [];
      this.intSent = 0;
      this.ping();
      setTimeout(()=>{this.handEnd()},30000)
    },
    setStart() {
      this.objIMG = new Image()
      this.objIMG.onload = this.objIMG.onerror = () => {
        /* * 有回应,取消超时计时 */
        clearTimeout(this.intTimerID)
        if (!this.bolIsRunning || this.bolIsTimeout) return
        var delay = new Date() - this.intStartTime
        window.console.log('连接成功 ' + this.strURL + ' time' + (delay < 1 ? '<1' : '=' + delay) + 'ms')
        this.arrDelays.push(delay)
        /* * 每次请求间隔限制在1秒以上 */
        setTimeout(()=>{this.ping()}, delay < 1000 ? (1000 - delay) : 1000)
      }
    },
    ping() {
      this.intStartTime = +new Date()
      this.intSent++
      this.objIMG.src = this.strURL
      // this.objIMG.src = 'https://i2.hdslb.com/bfs/face/2aa2978da31cc5e8d026224e049b13bd20379ab6.jpg@240w_240h_1c_1s.webp'
      // this.objIMG.src = 'https://developers.facebook.com/favicon.ico'
      /* * 超时计时 */
      this.intTimerID = setTimeout(()=>{this.timeout}, this.intTimeout)
    },
    timeout() {
      if (!this.bolIsRunning) return
      this.bolIsTimeout = true
      this.objIMG.src = 'X:\\'
      window.console.log('请求超时.')
      this.ping()
    }
  }
}
</script>


<style scoped>

</style>