<template>
  <div class="q-pa-lg q-gutter-lg">
    <p>Basic info</p>
    <q-form class="">
      <div class="q-gutter-md row items-center">
        <p>Name:</p>
        <q-input
          class="col-3"
          :dense="true"
          v-model="name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="q-gutter-md row items-center">
        <p>Email:</p>
        <q-input
          class="col-3"
          :dense="true"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>

      <q-btn class="q-mt-lg" label="Save" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { updateEmail, updateProfile } from '@firebase/auth';
import { auth } from 'src/boot/firebase';
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'ProfileData',

  setup() {
    const email = ref('');
    const password = ref('');
    const name = ref('');

    onMounted(() => {
      const user = auth.currentUser;
      if (user) {
        name.value = user.displayName || '';
        email.value = user.email || '';
      }
    });

    return {
      email,
      password,
      name,

      onSubmit() {
        const user = auth.currentUser;
        !!name.value &&
          !!user &&
          updateProfile(user, { displayName: name.value });
        !!email.value &&
          !!user &&
          email.value !== user.email &&
          updateEmail(user, email.value);
      },
    };
  },
});
</script>
