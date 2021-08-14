<template>
  <el-container>
    <el-main>
      <soroban-form />
    </el-main>
    <el-footer>
      <span>© 2021 by Cuong.nq</span>
    </el-footer>
  </el-container>
</template>

<script>
import SorobanForm from "./components/SorobanForm";
export default {
  name: "App",
  components: {
    SorobanForm,
  },
};
</script>

<style>
</style>
