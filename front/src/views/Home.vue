<template>
  <div class="home">
    <Comic msg="Welcome to Your Vue.js App" />
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
