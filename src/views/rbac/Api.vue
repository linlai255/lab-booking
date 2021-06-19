<template>
  <el-table :data="data.list" style="width: 96%; margin: auto" empty-text="" stripe border>
    <el-table-column prop="idx" label="序号" width="60px"> </el-table-column>
    <el-table-column prop="id" label="编号" width="60px"> </el-table-column>
    <el-table-column prop="name" label="名称" width="120px"> </el-table-column>
    <el-table-column prop="path" label="uri"> </el-table-column>
    <el-table-column prop="method" label="方法"> </el-table-column>
    <el-table-column prop="containPathVar.name" label="路径变量"> </el-table-column>
    <el-table-column prop="memo" label="备注"> </el-table-column>
  </el-table>
</template>

<script>
import { reactive } from '@vue/reactivity'
import * as http from '@/http/rbac.js'
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
} from '@vue/runtime-core'
export default {
  name: 'Api',
  setup() {
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
    onActivated(() => {
      console.log('onActivated')
    })
    onDeactivated(() => {
      console.log('onDeactivated')
    })
    onErrorCaptured(() => {
      console.log('onErrorCaptured')
    })
    let data = reactive({
      list: [],
      page: 2,
      pageSize: 10,
    })
    let fun = async (obj) => {
      data.list = await http.apiSearch(obj).then((res) => {
        return res.data.data.list
      })
    }
    fun()
    console.log(data)

    // console.log(response)
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
