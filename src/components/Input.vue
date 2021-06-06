<template>
  <input
    :type='type'
    :placeholder='placeholder'
    :value='modelValue'
    @input='$emit(`update:modelValue`, $event.target.value)'
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Input',
  props: {
    type: String,
    placeholder: String,
    modelValue: String,
  },
  emits: ['update:modelValue'],
});
</script>

<style scoped>
  input {
    width: 100%;
    height: 50px;
    margin-bottom: 10px;
    font-size: 1rem;
    border-radius: 6px;
    padding-left: 10px;
  }
</style>
