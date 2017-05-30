module.exports = {
    personalizations: [
        {
            to: [
                {
                    email: '{toEmail}',
                    name: '{toName}'
                }
            ],
            // subject: '{subject}',
            substitutions: {
                ':firstname': '{firstname}'
            }
        }
    ],
    from: {
        email: '{fromEmail}',
        name: '{fromName}'
    },
    'reply_to': {
        email: '{fromEmail}',
        name: '{fromName}'
    },
    categories: [
        'mfa',
        'new-user'
    ],
    subject: 'Welcome to Mobile Finance Assessments',
    content: [
        {
            type: 'text/html',
            value: ''
        }
    ]
};
