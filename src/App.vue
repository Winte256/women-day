<template>
  <div class="base-wrapper">
    <div class="base-container">
      <route-link to="/" class="logoLink">
        <img src="@/assets/logo.png" alt="logo" class="logo" />
      </route-link>
      <router-view />
    </div>
  </div>
</template>

<style lang="stylus">
@import '@/assets/styles/normalize.css';
@import '@/assets/styles/main.css';

#app {
}

.logo {
  display: block;
  width: 78px;
  height: 32px;
}

.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-image: $colorBg;
}

.base-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  margin: auto;
  width: 100%;
  max-width: 480px;
  min-height: 100vh;

  +mediaTablet() {
    max-width: 750px;
    padding: 0 15px;
  }

  +mediaDesktop() {
    max-width: 1440px;
    padding: 0 64px;
  }
}
</style>
