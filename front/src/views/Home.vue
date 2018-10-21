<template>
  <div class="home">
    <h2>Comical!</h2>
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
