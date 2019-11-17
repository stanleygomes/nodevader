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

// const initStorage = () => {
//   return new Promise((resolve, reject) => {
//     init().then((firebaseAdmin) => {
//       const storage = firebaseAdmin.storage()

//       const ref = storage.ref()

//       if (!firestore.settings) {
//         firestore.settings(settings)
//       }

//       resolve(firestore)
//     }).catch(error => reject(error))
//   })
// }

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

const getDocument = (collectionKey, document) => {
  return new Promise((resolve, reject) => {
    initFirestore().then((firestore) => {
      firestore.collection(collectionKey).doc(document).get().then(function (doc) {
        if (doc.exists) {
          const res = {
            status: 200,
            doc: doc.data()
          }

          resolve(res)
        } else {
          const res = {
            status: 404,
            doc: null
          }

          resolve(res)
        }
      }).catch(function (error) {
        const err = {
          status: 500,
          error: error
        }

        reject(err)
      })
    }).catch(error => reject(error))
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

// const uploadFile = () => {
//   return new Promise((resolve, reject) => {
//     initStorage().then(storage => {
//       var uploadTask = storage.child('images/rivers.jpg').put(file);

//       // Register three observers:
//       // 1. 'state_changed' observer, called any time the state changes
//       // 2. Error observer, called on failure
//       // 3. Completion observer, called on successful completion
//       uploadTask.on('state_changed', function (snapshot) {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//           case firebase.storage.TaskState.PAUSED: // or 'paused'
//             console.log('Upload is paused');
//             break;
//           case firebase.storage.TaskState.RUNNING: // or 'running'
//             console.log('Upload is running');
//             break;
//         }
//       }, function (error) {
//         // Handle unsuccessful uploads
//       }, function () {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//           console.log('File available at', downloadURL)
//         })
//       })
//     })
//   })
// }

module.exports = {
  createOrUpdateDocument,
  getDocument,
  deleteDocument
}
