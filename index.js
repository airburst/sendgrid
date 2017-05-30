require('dotenv').config();
const fetch = require('node-fetch');

const sendEmail = (message) => {
    return new Promise((resolve, reject) => {
        fetch('https://api.sendgrid.com/v3/mail/send', {
            headers: {
                'Authorization': 'Bearer ' + process.env.SENDGRID_API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(message)
        })
            .then(res => {
                if (res.status === 202) { resolve('OK'); }
                resolve(res);
            })
            .catch(err => reject(err));
    });
}

const msg = {
    personalizations: [
        {
            to: [
                {
                    email: 'mark.fairhurst@outlook.com',
                    name: 'Mark Fairhurst'
                }
            ],
            subject: 'Hello, World!'
        }
    ],
    from: {
        email: 'mfa@email.fairhursts.net',
        name: 'MFA'
    },
    'reply_to': {
        email: 'mfa@email.fairhursts.net',
        name: 'MFA'
    },
    subject: 'Hello, World!',
    content: [
        {
            type: 'text/html',
            value: '<html><p>Test email</p></html>'
        }
    ],
    // sub: {
    //     ':firstname': ['Mark']
    // },
    // filters: {
    //     templates: {
    //         settings: {
    //             enable: 1,
    //             template_id: '69d0a31e-8792-47af-8277-9a66e1bac83f'
    //         }
    //     }
    // }
};

sendEmail(msg)
    .then(result => console.log(result))
    .catch(err => console.log(err))