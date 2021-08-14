<template>
  <el-form :model="formState" :rules="rules" ref="formRef" label-width="200px" class="demo-ruleForm">
    <el-form-item
      label="Số phép tính"
      prop="rows"
    >
      <el-input-number v-model="formState.rows" :min="1" :max="50"></el-input-number>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleFinish">Tạo phép tính</el-button>
      <el-button @click="resetForm()">Đặt lại</el-button>
    </el-form-item>
  </el-form>
  <div>
    <soroban-table :data="formState" v-if="showTable" />
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue'
import SorobanTable from './SorobanTable'

export default defineComponent({
  components: { SorobanTable },
  setup() {
    const showTable = ref(false)
    const formRef = ref()
    const formState = reactive({
      rows: 5,
      columns: 5,
    })

    const rules = {
      rows: [
        {
          required: true,
          message: "Vui lòng nhập số phép tính",
        },
      ],
      columns: [
        {
          required: true,
          message: "Vui lòng nhập số cột",
        },
      ],
    }
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }

    const handleFinish = (values) => {
      showTable.value = false
      setTimeout(() => {
        showTable.value = true
      }, 1)
      console.log(values, formState)
    }

    const handleFinishFailed = (errors) => {
      console.log(errors)
    }

    const resetForm = () => {
      formRef.value.resetFields()
    }

    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      showTable,
    }
  },
})
</script>