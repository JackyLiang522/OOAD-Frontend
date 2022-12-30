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
          :precision="2"
          :step="0.1"
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
    <span style="float: right" v-show="records.value.length > 5">
      <el-button type="primary" link style="height: 30px;margin-right: 10px">显示所有历史</el-button>
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
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Balance",
  setup() {
    let records = reactive([
      {
        date: '2022-10-02',
        behavior: 'recharge',
        change: 10,
        remain: 40
      }, {
        date: '2022-10-02',
        behavior: 'recharge',
        change: 10,
        remain: 40
      }, {
        date: '2022-10-02',
        behavior: 'recharge',
        change: 10,
        remain: 40
      }, {
        date: '2022-10-02',
        behavior: 'recharge',
        change: 10,
        remain: 40
      }, {
        date: '2022-10-02',
        behavior: 'recharge',
        change: 10,
        remain: 40
      }, {
        date: '2022-10-02',
        behavior: 'recharge',
        change: 10,
        remain: 40
      }
    ])


    function one_info(record: { value: { change: number; }; change: number; course?: string; remain: number; date: string; }) {
      let content
      if (record.change < 0) {
        content = `-￥${Math.abs(record.change)}：购买${record.course}，余额￥${record.remain}`
      } else {
        content = `+￥${Math.abs(record.change)}，充值，余额￥${record.remain}`
      }
      return {
        content: content,
        timestamp: record.date
      }
    }

    let show_info = computed(() => {
      let all_info: any = []
      records.forEach((value: any) => {
        all_info.push(one_info(value))
      })
      return all_info
    })


    const store = useStore()
    const balance = computed(() => store.state.userInfo.balance)
    const charge_in = ref(0)

    function addBalance() {
      const added = charge_in.value
      charge_in.value = 0
      // 这里发消息给后端，说充钱了

      store.commit('ADD_BALANCE', added)
    }

    return {
      show_info,
      records,
      balance,
      addBalance,
      charge_in
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