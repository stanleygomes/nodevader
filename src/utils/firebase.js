const firebaseAdmin = require('firebase-admin')
const config = require('../config.json')
// how to get your config: https://firebase.google.com/docs/admin/setup
const serviceAccount = config.firebase.serviceAccount

const init = () => {
  return new Promise((resolve, reject) => {
    if (!firebaseAdmin.apps.length) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
        databaseURL: config.firebase.databaseURL
      })
    }

    resolve(firebaseAdmin)
  })
}

const initFirestore = () => {
  return new Promise((resolve, reject) => {
    init().then((firebaseAdmin) => {
      const firestore = firebaseAdmin.firestore()
      const settings = config.firebase.firestore

      if (!firestore.settings) {
        firestore.settings(settings)
      }

      resolve(firestore)
    }).catch(error => reject(error))
  })
}

const createOrUpdateDocument = (collectionKey, data, document) => {
  return new Promise((resolve, reject) => {
    initFirestore().then((firestore) => {
      firestore.collection(collectionKey).doc(document).set(data).then((res) => {
        const info = {
          response: res,
          collectionKey: collectionKey,
          document: document,
          data: data
        }

        resolve(info)
      }).catch(error => reject(error))
    })
  })
}

const deleteDocument = (collectionKey, document) => {
  return new Promise((resolve, reject) => {
    initFirestore().then((firestore) => {
      firestore.collection(collectionKey).doc(document).delete().then((res) => {
        const info = {
          response: res,
          collectionKey: collectionKey,
          document: document
        }

        resolve(info)
      }).catch(error => reject(error))
    })
  })
}

module.exports = {
  init,
  createOrUpdateDocument,
  deleteDocument
}
