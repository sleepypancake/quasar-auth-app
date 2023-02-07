/* eslint-disable */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
  if (authUser.email) {
    const customClaims = {
      user: true,
    };
    try {
      // @ts-expect-error I think it's nessessary way to write claim on auth
      var _ = await admin
        .auth()
        .setCustomUserClaims(authUser.uid, customClaims);

      return db.collection('users').doc(authUser.uid).set({
        email: authUser.email,
        role: customClaims,
        name: '',
        phoneNumber: '',
        password: authUser.passwordHash,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return;
});

exports.setUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token.admin) return;

  try {
    // @ts-expect-error I think it's nessessary way to write claim on auth
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role);

    return db.collection('users').doc(data.uid).update({
      email: data.email,
      role: data.role,
      name: data.name,
      phoneNumber: data.phoneNumber,
      password: data.passwordHash,
    });
  } catch (error) {
    console.log(error);
    return;
  }
});
