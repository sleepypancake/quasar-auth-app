<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ toolbarTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="column justify-between"
    >
      <q-list>
        <!-- <q-item-label header> Menu </q-item-label> -->

        <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />
      </q-list>

      <q-btn align="left" flat color="primary" label="Logout" @click="logout" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import NavLink from 'src/components/NavLink.vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { auth } from 'src/boot/firebase';

const linksList = [
  {
    title: 'Profile',
    // icon: 'PersonRoundedIcon',
    link: '/profile',
  },
  {
    title: 'Home',
    // icon: 'HomeRounded',
    link: '/',
  },
  {
    title: 'User management',
    // icon: 'ManageAccountsRoundedIcon',
    link: '/management',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavLink,
  },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const leftDrawerOpen = ref(false);
    const toolbarTitle = ref('');

    const logout = () => {
      auth
        .signOut()
        .then(() => {
          router.replace('/login');
        })
        .catch((error) => {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error.message,
          });
        });
    };

    onBeforeMount(() => {
      toolbarTitle.value =
        route.name && typeof route.name === 'string' ? route.name : '';
    });

    return {
      navLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
      toolbarTitle,
    };
  },
});
</script>
