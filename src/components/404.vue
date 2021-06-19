<template>
  <span>404</span>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: '404',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
