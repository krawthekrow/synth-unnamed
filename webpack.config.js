const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: path.join(APP_DIR, 'SynthAppEntry.jsx'),
    output: {
        library: 'SynthApp',
        path: path.join(__dirname, 'bin'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                include: APP_DIR,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        root: [
            APP_DIR
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};
