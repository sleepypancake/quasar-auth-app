<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md" style="max-width: 600px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          v-model="email"
          label="Your email *"
          hint="Email"
          type="email"
        />

        <q-input
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          label="Password *"
          lazy-rules
          :rules="[
            (val) =>
              !!val.match(
                new RegExp(
                  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$'
                )
              ) ||
              'Password must have at least 8 characters and contain at least one capital letter, one small letter, number and special character',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Log in / Sign up" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { auth } from 'src/boot/firebase';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AuthPage',

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const isPwd = ref(true);
    const accept = ref(false);

    return {
      email,
      password,
      isPwd,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
          });
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
          console.log(email.value, password.value);
          createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
              // Signed up
              router.push('/');
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log({ error, errorMessage });
              if (errorCode === 'auth/email-already-in-use') {
                signInWithEmailAndPassword(auth, email.value, password.value)
                  .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    //TODO: remove logs
                    console.log({ user });

                    router.push('/');
                  })
                  .catch((error) => {
                    $q.notify({
                      color: 'red-5',
                      textColor: 'white',
                      icon: 'warning',
                      message: error.message,
                    });
                  });
              } else {
                $q.notify({
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'warning',
                  message: errorMessage,
                });
              }
            });
        }
      },

      onReset() {
        email.value = '';
        password.value = '';
        accept.value = false;
      },
    };
  },
});
</script>
