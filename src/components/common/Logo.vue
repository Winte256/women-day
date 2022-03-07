<template>
  <route-link to="/" class="logoLink">
    <img src="@/assets/logo.png" alt="logo" class="logo" />
  </route-link>
</template>

<script>

export default {
  name: 'LogoIcon',
};
</script>

<style lang="stylus" scoped>
.logo {
  display: block;
  width: 78px;
  height: 32px;
}
</style>
