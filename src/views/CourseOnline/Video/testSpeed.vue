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

import {onBeforeUnmount, onMounted} from "vue";

export default {
  emits: ['sendDelay'],
  setup(props, context) {
    let timer

    onMounted(function () {
      timer = setInterval(() => {
        handStart()
        console.log("New test")
      }, 10000)
    })

    onBeforeUnmount(() => {
      clearInterval(timer)
      timer = null
    })
    
    let strURL = 'https://i2.hdslb.com/bfs/face/2aa2978da31cc5e8d026224e049b13bd20379ab6.jpg@240w_240h_1c_1s.webp'
    let bolIsRunning = false
    let arrDelays = []
    let intSent = 0
    let intLost = 0
    let intTimerID = null
    let bolIsTimeout = false
    let objIMG = {}
    let title = ''
    let intRecv = 0
    let intTimeout = 0
    let intStartTime

    function handEnd() {
      intRecv = arrDelays.length;
      intLost = intSent - intRecv;
      let sum = 0;
      for (let i = 0; i < intRecv; i++)
        sum += arrDelays[i];
      bolIsRunning = false;

      /*  * 统计结果  */
      console.log("Ping的统计信息 for " + strURL + ":");
      console.log("包:发送=" + intSent + ",接收=" + intRecv + ",丢包=" + intLost + "(" + Math.floor(intLost / intSent * 100) + "% 丢包率),");
      console.log("最小速度=" + Math.min.apply(this, arrDelays) + "ms, 最大速度 = " + Math.max.apply(this, arrDelays) + "ms, 平均速度 = " + Math.floor(sum / intRecv) + "ms");
      context.emit('sendDelay', Math.floor(sum / intRecv))

      let title = "Test Speed"
      let avg = Math.floor(sum / intRecv)
      if (intLost > 0) {
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
      // document.querySelector('.test-speed3').innerText = title
      if (intRecv === 0) return;
      console.log(title)
    }

    function handStart() {
      title = '测速过程大概需要10秒,请耐心等待!'
      console.log(title)
      console.log(strURL)
      // strURL = window.location.href
      if (strURL.length === 0)
        return;
      intTimeout = 1000;
      bolIsRunning = true;
      arrDelays = [];
      intSent = 0;
      ping();
      setStart();
      setTimeout(() => {
        handEnd()
      }, 9000)
    }

    function setStart() {
      objIMG = new Image()
      objIMG.onload = objIMG.onerror = () => {
        /* * 有回应,取消超时计时 */
        clearTimeout(intTimerID)
        if (!bolIsRunning || bolIsTimeout) return
        const delay = new Date() - intStartTime;
        window.console.log('连接成功 ' + strURL + ' time' + (delay < 1 ? '<1' : '=' + delay) + 'ms')
        arrDelays.push(delay)
        /* * 每次请求间隔限制在1秒以上 */
        setTimeout(() => {
          ping()
        }, delay < 1000 ? (1000 - delay) : 1000)
      }
    }

    function ping() {
      intStartTime = +new Date()
      intSent++
      objIMG.src = strURL
      // objIMG.src = 'https://i2.hdslb.com/bfs/face/2aa2978da31cc5e8d026224e049b13bd20379ab6.jpg@240w_240h_1c_1s.webp'
      // objIMG.src = 'https://developers.facebook.com/favicon.ico'
      /* * 超时计时 */
      intTimerID = setTimeout(() => {
        timeout()
      }, intTimeout)
    }

    function timeout() {
      if (!bolIsRunning) return
      bolIsTimeout = true
      objIMG.src = 'X:\\'
      window.console.log('请求超时.')
      ping()
    }

  },
}
</script>


<style scoped>

</style>