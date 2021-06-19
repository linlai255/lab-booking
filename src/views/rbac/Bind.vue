<template>
  <span>Bind</span>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Bind',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
