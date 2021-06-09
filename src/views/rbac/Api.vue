<template>
  <span />
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Api',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
