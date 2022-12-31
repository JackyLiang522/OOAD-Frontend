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
      ￥{{ balance.toFixed(2) }}
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
    <span style="float: right" v-show="records.length > 5">
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
import {computed, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex";

export default {
  name: "Balance",
  setup() {
    let records = reactive([
      {
        date: '2022-10-02',
        change: 10,
        remain: '40.00'
      }, {
        date: '2022-10-02',
        change: 10,
        remain: '40.00'
      }, {
        date: '2022-10-02',
        change: 10,
        remain: '40.00'
      },  {
        date: '2022-10-02',
        change: 10,
        remain: '40.00'
      }, {
        date: '2022-10-02',
        change: 10,
        remain: '40.00'
      }, {
        date: '2022-22-22',
        change: -10,
        remain: '30.00',
        course_name: 'Java'
      }
    ])


    function one_info(record: any) {
      let content
      if (record.change < 0) {
        content = `-￥${Math.abs(record.change)}：购买${record.course_name}，余额￥${record.remain}`
      } else {
        content = `+￥${Math.abs(record.change)}，充值，余额￥${record.remain}`
      }
      return {
        content: content,
        timestamp: record.date
      }
    }

    const is_show_all = ref(false)

    let show_info = computed(() => {
      let all_info: any = []
      if (is_show_all.value) {
        records.forEach((value: any) => {
          all_info.push(one_info(value))
        })
      } else {
        for (let i = 0; i < 3; i++) {
          all_info.push(one_info(records[i]))
        }
      }
      return all_info
    })


    const store = useStore()
    const balance = computed(() => store.state.userInfo.balance)
    const charge_in = ref(0)

    function addBalance() {
      if(charge_in.value === 0)
        return
      
      const added = charge_in.value
      charge_in.value = 0
      store.commit('ADD_BALANCE', added)
      const date = new Date();
      const mon = date.getMonth() + 1;
      const day = date.getDate();
      const curDate = date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
      const new_record = {
        change: added,
        remain: balance.value.toFixed(2),
        date: curDate
      }
      records.push(new_record)

      // 这里发消息给后端，说充钱了

    }

    return {
      show_info,
      records,
      balance,
      addBalance,
      charge_in,
      is_show_all
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