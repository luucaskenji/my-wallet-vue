<template>
  <input :type="type" :placeholder="placeholder" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    type: String,
    placeholder: String,
  },
});
</script>

<style scoped>
  input {
    width: 100%;
    height: 60px;
    margin-bottom: 12px;
    font-size: 1rem;
    border-radius: 6px;
    padding-left: 10px;
  }
</style>
