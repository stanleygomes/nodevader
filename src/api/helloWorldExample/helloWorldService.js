const i18n = require('../../utils/i18n')
const message = i18n.translate('Hello')

const helloWorld = () => {
  return new Promise((resolve, reject) => {
    resolve({
      message: message
    })
  })
}

module.exports = {
  helloWorld
}
