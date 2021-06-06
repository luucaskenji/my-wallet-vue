<template>
  <div :style='cssProps'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Container',
  props: {
    justifyContent: {
      type: String,
      default: 'center',
    },
    alignItems: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    cssProps(): { [key: string]: string } {
      return {
        '--justify-content': this.justifyContent,
        '--align-items': this.alignItems,
      };
    },
  },
});
</script>

<style scoped>
  div {
    width: 100%;
    min-height: 100vh;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: var(--justify-content);
    align-items: var(--align-items);
  }
</style>
