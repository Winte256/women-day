<template>
  <div class="home">
    <div class="titleWrap">
      <!-- <base-icon-svg :width="84" :height="84" viewBox="0 0 84 84">
        <heart-icon/>
      </base-icon-svg> -->
      <the-title class="home__title">
          Искренне поздравляем
        <template v-slot:yellow >
          с Международным женским днём
        </template>
      </the-title>
    </div>
    <p class="home__text text">
      Специально к этому празднику мы выпустили коллекцию NFT “Цветы мира”<br/>Мы дарим их Вам.
    </p>
    <p class="home__text text">
      Нажмите на кнопку Получить NFT <br> и Вам выпадет один из уникальных <br> цветков коллекции
    </p>
    <div class="home__buttonsBox buttonsBox">
      <common-button :hasBackground="true">Получить NFT </common-button>
      <common-button :isBordered="true">Описание кошелька NFT</common-button>
    </div>
    <p class="home__policies policies">
      Нажмимая на кнопку, вы даете согласие <br> на обработку персональных данных и <br> соглашаетесь <a class="policiesLink" href="https://oton.org/media/PRIVACY_NOTICE.pdf?b6f7ac2c" target="_blank" rel="noopener noreferrer">с политикой конфиденциальности
    </a>
    </p>
    <contacts-box/>
  </div>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import CommonButton from '@/components/CommonButton.vue';
// import BaseIconSvg from '@/components/BaseIconSvg.vue';
// import HeartIcon from '@/components/SvgIcons/HeartIcon.vue';
import ContactsBox from '@/components/ContactsBox.vue';

export default {
  name: 'HomeView',
  components: {
    TheTitle,
    CommonButton,
    // BaseIconSvg,
    // HeartIcon,
    ContactsBox,
  },
};
</script>

<style lang="stylus">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-bottom 16px
  }

  &__text {
    margin-bottom 24px
    &:nth-of-type(2) {
      margin-bottom 32px
    }
  }

  &__buttonsBox {
    margin-bottom 8px
  }
}

.text {
  max-width: $width.phoneXs.buttonText;
  getFontText()
  text-align center

  +mediaPhone() {
  min-width: $width.phoneS.buttonText;
  }
}

.policies {
  text-align center
  getFontPolicies();
}

.policiesLink {
  color: $colorAccent;
  &:hover {
    color: $colorAccent;
    opacity 0.6
  }
}

.buttonsBox {
  display grid
  grid-row-gap: 16px
}
</style>
