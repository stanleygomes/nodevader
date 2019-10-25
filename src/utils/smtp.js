const nodemailer = require('nodemailer')

const mountObjectTestAccount = (testAccount) => {
  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  }
}

const sendMail = () => {
  // Generate test SMTP service account from ethereal.email (for testing porpose)
  nodemailer.createTestAccount().then((testAccount) => {
    const transporterData = mountObjectTestAccount(testAccount)
    let transporter = nodemailer.createTransport(transporterData).then(() => {
      let info = transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: 'bar@example.com, baz@example.com',
        subject: 'Hello ✔',
        // text: 'Hello world?',
        html: '<b>Hello world?</b>',
        // attachments: [
        //   // String attachment
        //   {
        //     filename: 'notes.txt',
        //     content: 'Some notes about this e-mail',
        //     contentType: 'text/plain' // optional, would be detected from the filename
        //   },

        //   // Binary Buffer attachment
        //   {
        //     filename: 'image.png',
        //     content: Buffer.from(
        //       'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
        //       '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
        //       'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        //       'base64'
        //     ),

        //     cid: 'note@example.com' // should be as unique as possible
        //   },

        //   // File Stream attachment
        //   {
        //     filename: 'nyan cat ✔.gif',
        //     path: __dirname + '/assets/nyan.gif',
        //     cid: 'nyan@example.com' // should be as unique as possible
        //   }
        // ]
      })

        console.log('Message sent: %s', info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    })
  }).catch(() => {
  })
}

module.exports = {
  sendMail
}
