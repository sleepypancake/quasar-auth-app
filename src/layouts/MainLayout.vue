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

        <q-toolbar-title> Home </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- <q-item-label header> Menu </q-item-label> -->

        <NavLink v-for="link in navLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavLink from 'src/components/NavLink.vue';

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
  {
    title: 'Login',
    // icon: 'LoginRounded',
    link: '/login',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      navLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
