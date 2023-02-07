<template>
  <q-page>
    <ProfileData />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileData from 'src/components/ProfileData.vue';

export default defineComponent({
  name: 'ProfilePage',

  components: {
    ProfileData,
  },
});
</script>
