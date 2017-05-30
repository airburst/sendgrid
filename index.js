// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
require('dotenv').config();
const helper = require('sendgrid').mail;
const fromEmail = new helper.Email('mfa@fairhursts.net');
const toEmail = new helper.Email('mark.fairhurst@outlook.com');
const subject = 'Sending with SendGrid is Fun';
const content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
const mail = new helper.Mail(fromEmail, subject, toEmail, content);

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
});

sg.API(request)
    .then(function (response) {
        console.log(response.statusCode);
        console.log(response.body);
        // console.log(response.headers);
    })
    .catch(function (error) { console.log(error.response.statusCode); });


//   "to": [
//     "mark"
//   ],
//   "sub": {
//     ":firstname": ["Alice"]
//   },
//   "category": [
//     "Promotions"
//   ],
//   "filters": {
//     "templates": {
//       "settings": {
//         "enable": 1,
//         "template_id": "69d0a31e-8792-47af-8277-9a66e1bac83f"
//       }
//     }
//   }
// }

