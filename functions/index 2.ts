import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const setClaims = functions.https.onCall((data, context) => {
    // Ensure that only authenticated users can modify claims
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'Only authenticated users can modify claims'
      );
    }
  
    // Get the user ID and claims from the request data
    const userId = data.userId;
    const claims = data.claims;
    // claims is an object containing key value pairs e.g. { team: 'moderator' }
  
    // Set the custom claims on the user
    return admin.auth().setCustomUserClaims(userId, claims)
      .then(() => {
        return { message: `Successfully set claims for user ${userId}` };
      })
      .catch((error) => {
        throw new functions.https.HttpsError(
          'internal',
          `Error setting claims for user ${userId}: ${error}`
        );
      });
  });