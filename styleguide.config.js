const loaders = require('loaders');


module.exports = {
    components: 'src/index.js',
    webpackConfig: {
        module: {
            loaders: loaders.all,
        },
    },
    showSidebar: false,
    showCode: true,
    styleguideDir: 'docs',
    highlightTheme: 'monokai',
    theme: {
        color: {
            base: '#333',
            light: '#999',
            lightest: '#ccc',
            link: '#1978c8',
            linkHover: '#f28a25',
            border: '#e8e8e8',
            name: '#4052b3',
            type: '#c3451c',
            error: '#fff',
            baseBackground: '#fff',
            errorBackground: '#c00',
            codeBackground: '#f5f5f5',
            sidebarBackground: '#f5f5f5',
        },
        fontFamily: {
            base: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                '"Roboto"',
                '"Oxygen"',
                '"Ubuntu"',
                '"Cantarell"',
                '"Fira Sans"',
                '"Droid Sans"',
                '"Helvetica Neue"',
                'sans-serif',
            ],
            monospace: ['Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
        },
        fontSize: {
            base: 15,
            text: 16,
            small: 13,
            h1: 48,
            h2: 36,
            h3: 24,
            h4: 18,
            h5: 16,
            h6: 16,
        },
    },
    styles: {
        Playground: {
            preview: {
                borderRadius: 2,
                border: '1px solid rgba(0,0,0,0.3)',
                padding: '1em',
                width: '100%',
                // overflow: 'auto',
            },
        },
        Markdown: {
            pre: {
                // border: 0,
            },
            code: {
                fontSize: 14,
            },
        },
    },
};
