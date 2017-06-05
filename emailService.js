require('dotenv').config();
const fetch = require('node-fetch');
const userTemplate = require('./templates/newUser');

const replaceAll = (text, find, replace) => (text.split(find).join(replace));

class Email {

    constructor(type, user) {
        this.type = type;
        this.toEmail = user.email;
        this.firstname = user.firstname;
        this.surname = user.surname;
        this.fromEmail = process.env.FROM_EMAIL;
        this.fromName = process.env.FROM_NAME;
        this.url = process.env.SENDGRID_URL;
    }

    getTemplate() {
        if (this.type === 'newUser') { return userTemplate; }
        // More types here...
        return null;
    }

    mergeContent() {
        const template = this.getTemplate();
        if (!template) { return null; }
        let t = replaceAll(template, '{fromEmail}', this.fromEmail);
        t = replaceAll(t, '{fromName}', this.fromName);
        t = replaceAll(t, '{toEmail}', this.toEmail);
        t = replaceAll(t, '{toName}', `${this.firstname} ${this.surname}`);
        t = replaceAll(t, '{firstname}', this.firstname);
        return t;
    }

    options() {
        return {
            headers: {
                'Authorization': 'Bearer ' + process.env.SENDGRID_API_KEY,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: this.mergeContent()
        };
    }

    missingUserInfo() {
        return (this.toEmail === undefined) || (this.firstname === undefined);
    }

    send() {
        return new Promise((resolve, reject) => {
            if (this.missingUserInfo()) { reject({ error: 'Missing user details' }); }
            fetch(this.url, this.options())
                .then(res => {
                    if (res.status === 202) { resolve('OK'); }
                    reject(res);
                })
                .catch(err => reject(err));
        });
    }

}

module.exports = Email;


const e = new Email('newUser', { 
    email: 'mark.fairhurst@outlook.com',
    firstname: 'Mark',
    surname: 'Fairhurst'
});

e.send()
    .then(result => console.log(result))
    .catch(err => console.log(err))