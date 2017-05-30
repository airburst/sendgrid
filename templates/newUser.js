const base = require('./base');

const body = `
    <html>
        <p>Welcome to Mobile Finance Assessments. We have created a new online account for you, which you can access at the link below.</p>
        <p><a href="#">Devon Council MFA App</a></p>
        <p>http://text-version-of-link</p>
    </html>
`;

// Overwrite any substitutions and template id
const newUser = Object.assign({}, base, {
    content: [
        {
            type: 'text/html',
            value: body
        }
    ],
    template_id: '69d0a31e-8792-47af-8277-9a66e1bac83f'
});

module.exports = JSON.stringify(newUser);
