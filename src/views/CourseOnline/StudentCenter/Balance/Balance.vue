<template>
  <el-container>
    <el-header style="height: 70px">
      <h3 style="margin-right: 5px;">
        <span style="vertical-align: 22%">钱包余额</span>
        <el-icon size="30px" style="margin-left: 5px">
          <CreditCard/>
        </el-icon>
      </h3>
    </el-header>
    <hr class="style-three" style="margin-bottom: 40px">
  </el-container>

  <div class="clearfix">
    <span style="float: left;line-height: 30px;font-size: 25px;color: #cb0000;font-weight: bold;margin-left: 20px;">
      ￥{{ balance }}
    </span>
    <span style="float:right;">
      <el-input-number
          :precision="0"
          :step="1"
          :min="0"
          v-model="charge_in"
          style="height: 30px"/>
      <el-button
          type="primary"
          style="height: 30px;margin: 0 20px 0 20px;"
          @click="addBalance"
      >充值</el-button>
    </span>
  </div>

  <!--  <el-divider style="border-top: solid 3px black;width: auto;margin: 40px 0 10px 0"/>-->

  <div class="clearfix" style="margin:40px 0 20px 30px">
    <span style="float: left">
      <span style="vertical-align: 40%">交易历史</span><el-icon size="30px" style="margin-left: 5px"><Clock/></el-icon>
    </span>
    <span style="float: right" v-show="records !== undefined && records.length > 3">
      <el-button
          type="primary"
          link style="height: 30px;margin-right: 10px"
          @click="is_show_all=!is_show_all"
      >
        {{ is_show_all ? '收起历史记录' : '展开历史记录' }}
      </el-button>
    </span>
  </div>

  <el-timeline>
    <el-timeline-item
        v-for="(activity, index) in show_info"
        :key="index"
        :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>

</template>

<script lang="ts">
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import store from "@/store";
import {ElMessage} from "element-plus";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Balance",

  setup() {

    let records = ref([]);
    onBeforeMount(async () => {

      // TODO: 这里从后端获取余额和交易记录
      /*
      balance.value = 10
      records.value = [
        {
          date: '2022-22-22',
          change: -10,
          remain: 30,
          course_name: 'Java'
        },
        {
          date: '2022-22-22',
          change: -10,
          remain: 30,
          course_name: 'Java'
        }
      ]
       */

      await axios.get(`http://${store.state.host}/api/transactionRecord/list?clientId=${userId}`)
          .then(
              response => {
                if (response.data) {
                  records.value = response.data;
                  console.log("onB")
                }
              },
              err => {
                console.log(err)
              })

      await axios.get(`http://${store.state.host}/api/transactionRecord/remain?clientId=${userId}`)
          .then(
              response => {
                if (response.data) {
                  balance.value = response.data;
                }
              },
              err => {
                console.log(err)
              })

    })


    function one_info(record: any) {
      let content
      if (record.change < 0) {
        content = `-￥${Math.abs(record.change)}：购买${record.courseName}，余额￥${record.remain}`
      } else {
        content = `+￥${Math.abs(record.change)}，充值，余额￥${record.remain}`
      }
      // alert(content)
      return {
        content: content,
        timestamp: record.date
      }
    }

    const is_show_all = ref(false)
    let show_info = computed(() => {
      console.log('compute')
      let all_info: any = []
      if (is_show_all.value) {
        records.value.forEach((value: any) => {
          all_info.push(one_info(value))
        })
      } else {
        console.log("length")
        console.log(records.value.length)
        for (let i = 0; i < Math.min(records.value.length, 3); i++) {
          all_info.push(one_info(records.value[i]))
        }
      }
      return all_info
    })

    const store = useStore()
    const balance = ref()
    const charge_in = ref(0)
    const userId = store.state.userInfo.id

    async function addBalance() {
      if (charge_in.value === 0)
        return

      const added = charge_in.value
      charge_in.value = 0

      // TODO: 这里发消息给后端，说充钱了 added 元
      await axios.post(`http://${store.state.host}/api/transactionRecord/recharge?clientId=${userId}&&change=${added}`)
          .then(
              response => {
                if (response.data) {
                  balance.value = response.data;
                }
              },
              err => {
                console.log(err)
              })

      // TODO: 这里更新新的账户余额
      await axios.get(`http://${store.state.host}/api/transactionRecord/list?clientId=${userId}`)
          .then(
              response => {
                if (response.data) {
                  records.value = response.data;
                  console.log("onB")
                }
              },
              err => {
                console.log(err)
              })

    }



    return {
      show_info,
      records,
      balance,
      addBalance,
      charge_in,
      is_show_all,
    }
  }
}
</script>

<style scoped>
hr.style-three {
  width: 100%;
  margin: 0 auto;
  border: 0;
  height: 5px;
  background: #333 linear-gradient(to right, #ccc, #333, #ccc);
}

.clearfix:after {
  content: "";
  display: block; /*将设置为行内元素，内容多高且多高*/
  clear: both;
}
</style>