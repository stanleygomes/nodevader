## How to send an e-mail

Before we send our first email, let's go to config file witch is located in `src/config.json`.

Replace with your SMTP config

```json
{
  ...
  "smtp": {
    "host": "smtp.your-server.com",
    "port": 587,
    "secure": false,
    "auth": {
      "user": "your-email@your-server.com.br",
      "pass": "YourPassword"
    },
    "send": {
      "from": "Your name 👻 <your-email@your-server.com.br>"
    }
  }
}
```

Now add, smtp utils to your file

```javascript
const smtp = require('./utils/smtp')
```

Then, finally call send email funtion with your parameters

```javascript
const emailData = {
    to: ['recipient1@server.com', 'recipient2@server.com'],
    subject: 'Hello ✔✔✔',
    html: '<b>Hello world ✔✔✔</b>'
  }

  smtp.sendMail(emailData).then((resolved) => {
    console.log(resolved)
  }).catch((error) => {
    console.log(error)
  })
```

If you want to send an attachment, just add `attachments` property to your `emailData` above, like this. There's 2 ways to send an attachment, as it's shown bellow (From buffer or file stream)

```javascript
{
  ...
  subject: "bla bla",
  attachments: [{
     filename: 'image.png',
     content: Buffer.from(
       'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
       '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
       'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
       'base64'
     ),
     cid: 'your-email@your-server.com'
   },
   {
     filename: 'filename.gif',
     path: __dirname + '/assets/nyan.gif',
     cid: 'your-email@your-server.com'
   }
 ]
```

That's it!!

Now go to practice.
