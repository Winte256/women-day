<template>
  <div class="contactsBox">
    <contact-item class="contactsBox__item" v-for="contact in contacts" :key="contact.title" :links="contact.links">{{contact.title}}</contact-item>
  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem.vue';

export default {
  name: 'ContactsBox',
  components: {
    ContactItem,
  },
  data() {
    return {
      contacts: [
        {
          title: 'Анатолий Илле',
          links: [
            {
              href: 'https://instagram.com/anatolille',
              social: 'instagram',
            },
            {
              href: 'https://t.me/OTON20000NODE',
              social: 'telegram',
            },
          ],
        },
        {
          title: 'Антон Эльстон',
          links: [
            {
              href: 'https://instagram.com/elston.anton',
              social: 'instagram',
            },
            {
              href: 'https://t.me/antonelston',
              social: 'telegram',
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.contactsBox {
  width 100%
  max-width: $width.phoneXs.buttonText;

  +mediaPhone() {
  min-width: $width.phoneS.buttonText;
  }

  &__item {
      margin-top 32px
      margin-bottom 16px
    &:nth-of-type(2) {
      margin-top 16px
      margin-bottom 37px
    }
  }
}
</style>
