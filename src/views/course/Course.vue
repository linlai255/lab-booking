<template>
  <div class="md-lr-auto" style="width: 96%">
    <div class="md-tb-20">
      <el-row>
        <el-col :span="16">
          <el-input placeholder="请输入课程名称" v-model="searchData.name" clearable style="width: 200px"></el-input>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-button icon="el-icon-search" circle></el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="success" plain round @click="saveCourseDialogVisible = true">创建课程</el-button>
        </el-col>
        <el-dialog title="创建课程" v-model="saveCourseDialogVisible" width="30%" center>
          <el-form :model="saveCourseData" label-position="right" status-icon :rules="rules" ref="saveCourseForm" label-width="80px">
            <el-form-item label="课程名" prop="name">
              <el-input v-model="saveCourseData.name" clearable style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="课时数" prop="classHours">
              <el-input v-model.number="saveCourseData.classHours" clearable style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="学生数" prop="studentAmount">
              <el-input v-model.number="saveCourseData.studentAmount" clearable style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="memo">
              <el-input type="textarea" v-model="saveCourseData.memo" clearable style="width: 350px"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="saveCourseDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveCourse('saveCourseForm')">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </el-row>
    </div>
    <div class="md-tb-20" v-loading="tableLoaded" element-loading-text="">
      <el-table height="700" :data="searchData.list" stripe>
        <template #empty>
          <el-empty :image-size="300"></el-empty>
        </template>
        <el-table-column type="index" label="序号" width="60"> </el-table-column>
        <el-table-column prop="id" label="编号" width="60"> </el-table-column>
        <el-table-column prop="name" label="名称" width="200"> </el-table-column>
        <el-table-column prop="studentAmount" label="学生数量" width="80"> </el-table-column>
        <!-- <el-table-column prop="updateUsername" label="更新人" width="200"> </el-table-column> -->
        <el-table-column prop="updateTime" label="最近更新时间" width="250"> </el-table-column>
        <el-table-column prop="memo" label="备注">
          <template #default="scope">
            <el-popover effect="dark" trigger="hover" placement="top">
              <template #default>
                <p>{{ scope.row.memo }}</p>
              </template>
              <template #reference>
                <div class="memo-wrapper">
                  <p>{{ scope.row.memo.substring(0, 10) === '' ? '' : scope.row.memo.substring(0, 10) + '...' }}</p>
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template #default="scope">
            <el-button @click="detailCourseDialogVisible = true" type="text" size="small"> 详情 </el-button>
            <el-button @click="deleteCourse(scope.row.id)" type="text" size="small"> 移除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="课程详情" v-model="detailCourseDialogVisible" width="30%" center>
        <span>todo</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="detailCourseDialogVisible = false">关 闭</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div class="md-tb-20 md-lr-auto text-align">
      <el-pagination
        :current-page="searchData.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchData.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import * as courseApi from '@/http/course'
import { ElMessage } from 'element-plus'
export default {
  name: 'Course',
  setup() {
    let searchData = reactive({
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      name: '',
    })
    let saveCourseData = reactive({
      name: '',
      studentAmount: '',
      classHours: '',
      memo: '',
    })
    let tableLoaded = ref(true)
    let saveCourseDialogVisible = ref(false)
    let detailCourseDialogVisible = ref(false)

    let rules = {
      name: [
        { required: true, message: 'please enter course name', trigger: 'blur' },
        { max: 20, message: 'length less than 20', trigger: 'blur' },
      ],
      classHours: [
        { required: true, message: 'please enter course hours', trigger: 'blur' },
        { type: 'number', message: 'must be number' },
      ],
      studentAmount: [
        { required: true, message: 'please enter student amount', trigger: 'blur' },
        { type: 'number', message: 'must be number' },
      ],
      memo: [
        { required: false, message: 'please enter memo', trigger: 'blur' },
        { max: 2000, message: 'length between 6 and 20', trigger: 'blur' },
      ],
    }
    let search = async (obj) => {
      let data = await courseApi
        .search(obj)
        .then(
          (res) => {
            console.log(res)
            return res.data.data
          },
          (err) => {
            ElMessage.error(err.data.message)
          }
        )
        .catch((err) => {
          console.log(err)
        })

      searchData.list = data.list
      searchData.page = data.page
      searchData.pageSize = data.pageSize
      searchData.total = data.total
      tableLoaded.value = false
    }
    search(searchData)
    console.log(searchData)
    // console.log(response)
    return {
      tableLoaded,
      saveCourseDialogVisible,
      detailCourseDialogVisible,
      rules,
      searchData,
      saveCourseData,
    }
  },
  methods: {
    saveCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveCourseDialogVisible = false
          courseApi
            .save(this.saveCourseData)
            .then(
              (res) => {
                console.log(res)
                this.$router.replace('/course/course')
              },
              (err) => {
                console.log(err.data.message)
              }
            )
            .catch((err) => console.log(err))
          this.$refs[formName].resetFields()
        } else {
          return false
        }
      })
    },
    deleteCourse(id) {
      console.log(id)
      alert('todo')
    },
  },
}
</script>

<style scoped></style>
