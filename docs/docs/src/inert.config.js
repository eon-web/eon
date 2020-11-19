const config = {
    build: {
        input: "./posts",
        output: "..",
        sassEntry: './scss/index.scss',
        sassFolder: './scss',
        sassOutput: '../index.css',
        templates: {
            home: './templates/home.ejs',
            post: './templates/post.ejs'
        }
    },
    blogName: `Eon.js Docs`,
    ownerName: `Eon.js Project`,
    description: `A simple web server framework`,
    navLinks: [{
            href: '/',
            text: 'Home'
        },
        {
            href: '/docs',
            text: 'Docs'
        },
        {
            href: 'https://github.com/eon-web/eon',
            text: 'GitHub'
        },
        {
            hreg: '/contact',
            text: 'Contact'
        }
    ],
    plugins: ['plugin.js'],
    assets: './assets',
    sidebar: [{
        type: 'heading',
        text: 'Getting Started'
    }, {
        type: 'link',
        href: '/docs/introduction',
        text: 'Introduction'
    }, {
        type: 'link',
        href: '/docs/getting_started',
        text: 'Your first eon.js server'
    }, {
        type: 'heading',
        text: 'Advanced'
    }, {
        type: 'link',
        href: '/docs/advanced',
        text: 'Advanced Examples'
    }, {
        type: 'link',
        href: '/docs/debugging',
        text: 'Debugging'
    }, {
        type: 'heading',
        text: 'API'
    }, {
        type: 'link',
        href: '/docs/api',
        text: 'Core API'
    }, {
        type: 'link',
        href: '/docs/plugins',
        text: 'Plugins API'
    }]
}

module.exports = config;