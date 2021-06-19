<template>
  <span>menu</span>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Menu',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
