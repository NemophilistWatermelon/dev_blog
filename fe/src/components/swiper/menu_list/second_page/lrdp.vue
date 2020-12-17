<template>
  <ul class="appList utliClearFloat">
    <li class="appItem">
      <appButton
        :imgParams="{ backgroundPosition: '-283px 4px' }"
        appName="文章"
        aHref="blog"
        >1
      </appButton>
    </li>
  </ul>
</template>

<script>
import appButton from "@/components/swiper/appBlock";
export default {
  components: {
    appButton,
  },
};
</script>

<style>
</style>