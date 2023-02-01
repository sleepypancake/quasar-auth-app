<template>
  <q-page class="row items-center justify-evenly">
    <h1 class="text-h3 centered">
      Hello, {{ name }}, how are you doing today?
    </h1>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
// import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { auth } from 'src/boot/firebase';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const name = ref('');

    onMounted(() => {
      const user = auth.currentUser;
      if (user) {
        name.value = user.email?.split('@').length
          ? user.email?.split('@')[0]
          : '';
      }
      user?.getIdTokenResult().then((idTokenResult) => {
        console.log({ idTokenResult });
      });
    });

    return {
      name,
    };
  },
  // mounted() {
  //   this.addItemsToStore().then(() => this.getItemsFromStore());
  // },
  // methods: {
  //   async addItemsToStore() {
  //     const citiesRef = collection(db, 'cities');

  //     await setDoc(doc(citiesRef, 'SF'), {
  //       name: 'San Francisco',
  //       state: 'CA',
  //       country: 'USA',
  //       capital: false,
  //       population: 860000,
  //       regions: ['west_coast', 'norcal'],
  //     });
  //     await setDoc(doc(citiesRef, 'LA'), {
  //       name: 'Los Angeles',
  //       state: 'CA',
  //       country: 'USA',
  //       capital: false,
  //       population: 3900000,
  //       regions: ['west_coast', 'socal'],
  //     });
  //     await setDoc(doc(citiesRef, 'DC'), {
  //       name: 'Washington, D.C.',
  //       state: null,
  //       country: 'USA',
  //       capital: true,
  //       population: 680000,
  //       regions: ['east_coast'],
  //     });
  //     await setDoc(doc(citiesRef, 'TOK'), {
  //       name: 'Tokyo',
  //       state: null,
  //       country: 'Japan',
  //       capital: true,
  //       population: 9000000,
  //       regions: ['kanto', 'honshu'],
  //     });
  //     await setDoc(doc(citiesRef, 'BJ'), {
  //       name: 'Beijing',
  //       state: null,
  //       country: 'China',
  //       capital: true,
  //       population: 21500000,
  //       regions: ['jingjinji', 'hebei'],
  //     });
  //   },

  //   async getItemsFromStore() {
  //     const docRef = doc(db, 'cities', 'SF');
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       console.log('Document data:', docSnap.data());
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log('No such document!');
  //     }
  //   },
  // },
});
</script>
