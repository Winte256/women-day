<template>
  <div class="title">
    <div class="titleText titleText_yellow">
      <slot name="white"/>
    </div>
    <div class="titleText titleText_yellow">
    <slot name="yellow"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
};
</script>

<style lang="stylus" scoped>
.title {
  getFontH1()
  line-height 32px
}
</style>
