<template>
  <Container></Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container } from '@/components';

interface Data {}

export default defineComponent({
  components: {
    Container,
  },
  data(): Data {
    return {};
  },
});
</script>

<style scoped>

</style>
