<template>
  <button :type="type">
    {{ innerText }}
  </button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    type: String,
    innerText: String,
  },
});
</script>

<style scoped>
  button {
    color: white;
    height: 60px;
    background: var(--lightPurple);
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 15px;
  }
</style>
