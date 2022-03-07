<template>
  <header class="header">
    <logo-component/>
  </header>
</template>

<script>
import LogoComponent from '@/components/LogoComponent.vue';

export default {
  name: 'TheHeader',
  components: {
    LogoComponent,
  },
};
</script>

<style lang="stylus" scoped>
.header {
  display flex
  align-items: center
  justify-content: center
  padding: 40px 0 24px;
}
</style>
