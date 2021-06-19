<template>
  <span>home index</span>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Index',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
