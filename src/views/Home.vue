<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'Home',
  components: {
    HelloWorld: (): any => import('@/components/HelloWorld.vue'),
  },
};
</script>
