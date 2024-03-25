const path = require('path');

module.exports = {
    entry: 'main.js',  // Replace with your entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(glsl|vs|fs)$/,
                use: 'glslify-loader',
            },
            {
                test: /\.(vert|frag)$/,
                use: 'raw-loader',
            },
        ],
    },
};
