module.exports = ({ marked }) => {
    marked.use({
        renderer: {
            link: (href, title, text) => {
                if (!href.startsWith('http')) return false;
                return `<a href="https://eon-a.herokuapp.com/offpage?src=${encodeURIComponent('https://eon.js.org')}}&target=${encodeURIComponent(href)}" title="${title}">${text}</a>`;
            }
        }
    });
}