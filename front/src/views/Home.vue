<template>
  <div class="home">
    <img src="../assets/logo2.png" alt="">
    <Comic msg="Welcome to Your Vue.js App" id="comic" />
  </div>
</template>

<script>
// @ is an alias to /src
import Comic from '@/components/Comic.vue';

export default {
    name: 'home',
    components: {
        Comic,
    },
};
</script>

<style scoped>
img.resize {
    width: 300px; /* you can use % */
    height: auto;
}

#comic {
    padding-top: 0;
}
</style>
