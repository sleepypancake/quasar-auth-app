<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from 'src/boot/firebase';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      auth.onAuthStateChanged((user) => {
        console.log(user);
        if (!user) {
          router.replace('/login');
        } else if (route.path === '/login') {
          router.replace('/');
        }
      });
    });
  },
});
</script>
