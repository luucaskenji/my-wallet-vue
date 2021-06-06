<template>
  <Container justifyContent='flex-start' alignItems='stretch'>
    <div class='container'>
      <Input type='text' />
    </div>
  </Container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Container, Input } from '@/components';

interface Data {}

export default defineComponent({
  components: {
    Container,
    Input,
  },
  data(): Data {
    return {};
  },
});
</script>

<style scoped>
.container {
  padding: 0 20px;
}
</style>
