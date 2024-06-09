<template>
  <div class="links">
    <div v-for="appItem in apps" :key="appItem.id" class="item">
      <img :src="appItem.img" width="32" height="32" class="app-logo" alt="app-logo" />
      <div class="text">
        <p class="title">{{ appItem.title }}</p>
        <div class="description">{{ appItem.description }}</div>
      </div>
      <a :href="appItem.link" target="_blank" class="link" aria-label="go to site">
        <arrow-right />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import ArrowRight from '~/components/icons/ArrowRight.vue'

  const apps = [
    {
      id: 1,
      img: 'app/y-taxi.png',
      title: 'Яндекс такси',
      description: 'Поехать в любую точку без труда',
      link: 'https://taxi.yandex.ru/'
    },
    {
      id: 2,
      img: 'app/y-metro.png',
      title: 'Яндекс метро',
      description: 'Передвигайтесь легко по Москве',
      link: 'https://yandex.ru/metro/moscow?scheme_id=sc34974011'
    },
    {
      id: 3,
      img: 'app/izi-travel.svg',
      title: 'Izi Travel',
      description: 'Аудиогид по городу',
      link: 'https://izi.travel/ru'
    },
    {
      id: 4,
      img: 'app/edim-doma.png',
      title: 'Едим дома',
      description: 'Сервис бесплатной выдачи еды по заявкам в Москве',
      link: 'https://www.edimdoma.ru/'
    }
  ]
</script>

<style lang="scss" scoped>
  .links {
    display: flex;
    gap: 16px;
    flex-direction: column;
    height: 200px;
    overflow-y: auto;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 0 8px;

    .app-logo {
      border-radius: 8px;
      box-shadow: 1px 2px 8px 0px rgb(18 18 18 / 25%);
      object-fit: contain;
    }

    .text {
      padding: 0 12px;

      .title {
        font-weight: 500;
        font-size: 16px;
      }

      .description {
        font-size: 14px;
        opacity: 0.8;
      }
    }
    .link {
      margin-left: auto;
    }
  }
</style>
