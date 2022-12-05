<template>
  <div>
    <span style="font-size: 20px;margin:0 100px 0 0">章节1：HelloWorld</span>
    <span style="float: right">
      <span style="font-size: 15px;">by 张三</span>
      <el-button
          size="default"
          type="primary"
          style="margin:0 0 0 20px;width: 130px;vertical-align: middle;"
      >
        订阅
      </el-button>
    </span>
    <br>
    <div style="height: 20px;margin-top:0;color: gray">
      <el-icon size="14px" style="margin: 0 0 0 20px;vertical-align: middle">
        <Warning/>
      </el-icon>
      <span style="font-size: 13px"> 未经作者授权禁止转载</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'VideoQuizHeader'
}
</script>