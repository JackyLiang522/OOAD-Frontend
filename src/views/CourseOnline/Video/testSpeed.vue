<template>
  <!--  <div class="speed-test">-->
  <!--&lt;!&ndash;    <el-dialog title="测试网络环境" :visible.sync="speedOpen" width="30%" :close-on-click-modal="false">&ndash;&gt;-->
  <!--      <p class="test-speed1">请点击下方按钮开始测试!</p>-->
  <!--      <p class="test-speed2"></p>-->
  <!--      <p class="test-speed3"></p>-->
  <!--      <span slot="footer" class="dialog-footer">-->
  <!--         <el-button @click="speedOpen=false">取 消</el-button>-->
  <!--        <el-button type="primary" @click="handStart">开始测试</el-button>-->
  <!--      </span>-->
  <!--&lt;!&ndash;    </el-dialog>&ndash;&gt;-->
  <!--  </div>-->
</template>


<script>

export default {
  data() {
    return {
      speedOpen: true,
      nowTime: null,
      // strURL: 'http://localhost:8081/api/upload/image/1.png',
      // strURL:'https://developers.facebook.com/favicon.ico',
      strURL:'https://i2.hdslb.com/bfs/face/2aa2978da31cc5e8d026224e049b13bd20379ab6.jpg@240w_240h_1c_1s.webp',
      bolIsRunning: false,
      arrDelays: [],
      intSent: 0,
      intLost: 0,
      intTimerID: null,
      bolIsTimeout: false,
      objIMG: {},
      title: '',
      timer: {}
    }
  },
  // watch: {
  //   speedOpen: {
  //     immediate: true,
  //     handler: function(newVal) {
  //       if (newVal) {
  //         this.setStart()
  //         this.title = '请点击下方按钮开始测试!'
  //       }
  //     }
  //   }
  // },
  methods: {

    // changeVisible(visible = false) {
    //   this.speedOpen = visible
    // },
    handEnd() {
      this.intRecv = this.arrDelays.length;
      this.intLost = this.intSent - this.intRecv;
      var sum = 0;
      for (var i = 0; i < this.intRecv; i++)
        sum += this.arrDelays[i];
      this.bolIsRunning = false;

      /*  * 统计结果  */
      console.log("Ping的统计信息 for " + this.strURL + ":");
      console.log("包:发送=" + this.intSent + ",接收=" + this.intRecv + ",丢包=" + this.intLost + "(" + Math.floor(this.intLost / this.intSent * 100) + "% 丢包率),");
      console.log("最小速度=" + Math.min.apply(this, this.arrDelays) + "ms, 最大速度 = " + Math.max.apply(this, this.arrDelays) + "ms, 平均速度 = " + Math.floor(sum / this.intRecv) + "ms");
      this.$emit('sendDelay', Math.floor(sum / this.intRecv))

      // document.querySelector('.test-speed1').innerText = `发送:${this.intSent},接收:${this.intRecv},丢包:${this.intLost},丢包率:${Math.floor(this.intLost/this.intSent*100)} %`
      // document.querySelector('.test-speed2').innerText = `最小速度:${Math.min.apply(this, this.arrDelays)}ms,最大速度:${Math.max.apply(this, this.arrDelays)}ms,平均速度:${Math.floor(sum / this.intRecv)}ms`
      let title = "Test Speed"
      let avg = Math.floor(sum / this.intRecv)
      if (this.intLost > 0) {
        title = "网络环境不稳定"
      } else if (avg > 0 && avg <= 30) {
        title = "网络环境非常好"
      } else if (avg > 30 && avg <= 50) {
        title = "网络环境良好"
      } else if (avg > 50 && avg <= 100) {
        title = "网络环境普通"
      } else if (avg > 100) {
        title = "网络环境差"
      }
      // document.querySelector('.test-speed3').innerText = this.title
      if (this.intRecv == 0) return;
      console.log(title)
    },
    handStart() {
      this.title = '测速过程大概需要10秒,请耐心等待!'
      console.log(this.title)
      console.log(this.strURL)
      // this.strURL = window.location.href
      if (this.strURL.length === 0)
        return;
      // if (this.strURL.substring(0, 7).toLowerCase() != "http://")
      //   this.strURL = "http://" + this.strURL;
      this.intTimeout = 1000;
      this.bolIsRunning = true;
      this.arrDelays = [];
      this.intSent = 0;
      this.ping();
      this.setStart();
      setTimeout(() => {
        this.handEnd()
      }, 9000)
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
        setTimeout(() => {
          this.ping()
        }, delay < 1000 ? (1000 - delay) : 1000)
      }
    },
    ping() {
      this.intStartTime = +new Date()
      this.intSent++
      this.objIMG.src = this.strURL
      // this.objIMG.src = 'https://i2.hdslb.com/bfs/face/2aa2978da31cc5e8d026224e049b13bd20379ab6.jpg@240w_240h_1c_1s.webp'
      // this.objIMG.src = 'https://developers.facebook.com/favicon.ico'
      /* * 超时计时 */
      this.intTimerID = setTimeout(() => {
        this.timeout
      }, this.intTimeout)
    },
    timeout() {
      if (!this.bolIsRunning) return
      this.bolIsTimeout = true
      this.objIMG.src = 'X:\\'
      window.console.log('请求超时.')
      this.ping()
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.handStart()
      console.log("New test")
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>


<style scoped>

</style>