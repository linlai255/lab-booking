<template>
  <span />
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Course',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
