<template>
  <ul class="appList utliClearFloat">
    <li class="appItem">
      <appButton
        :imgParams="{ backgroundPosition: '-283px 4px' }"
        appName="Todo"
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