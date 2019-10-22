// var someFunction = (callback) => {
//   return new Promise(function (resolve, reject) {
//     a = reject
//     resolve(callback)
//     // /*stuff using username, password*/
//     // if ( /* everything turned out fine */ ) {
//     // } else {
//     //   reject(Error("It broke"));
//     // }
//   })
// }

// // execute(function (resolve, reject) {
// //   /*stuff using username, password*/
// //   if ( /* everything turned out fine */ ) {
// //     resolve("Stuff worked!");
// //   } else {
// //     reject(Error("It broke"));
// //   }
// // })

// // const returnH = () => {
// //   return 'hello'
// // }

// const helloWorld = (req, res) => {
//   return someFunction()
// }

// module.exports = {
//   helloWorld
// }



// // my task
// const mySelect = (table) => {
//   if (!table)
//     return false

//   return 'select * from ' + table + 'where 1 = 1';
// }

// // my promisse
// const myService = new Promise((resolve, reject) => {
//   const s = mySelect('usuario')

//   if (s === false) {
//     var reason = new Error('Por favor, informe a tabela')
//     reject(reason)
//   } else {
//     resolve(s)
//   }
// })

// // call to my promisse
// const call = () => {
//   myService.then((response) => {
//     console.log(response)
//   }).catch((error) => {
//     console.log(error)
//   })
// }

// call()
