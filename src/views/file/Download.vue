<template>
  <span />
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'Download',
  setup() {
    let data = reactive({})
    return {
      data,
    }
  },
}
</script>

<style scoped></style>
