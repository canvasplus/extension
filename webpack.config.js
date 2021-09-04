const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        historyApiFallback: true
    },
    entry: {
        popup: path.resolve(__dirname, "./src/popup/App.js"),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                {
                                    'plugins': ['@babel/plugin-proposal-class-properties']
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'src/popup/popup.html',
            template: 'src/popup/popup.html',
            chunks: ['popup']
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/util.js', to: 'src/util.js'},
                { from: 'src/canvas.js', to: 'src/canvas.js'},
                { from: 'src/background.js', to: 'src/background.js'},
                { from: 'src/canvas.css', to: 'src/canvas.css'},
                { from: 'manifest.json', to: 'manifest.json'},
                { from: 'assets', to: 'assets'},
                { from: 'src/imported', to: 'src/imported'},
                { from: 'src/inject', to: 'src/inject'},
            ]
        }),
        new CleanWebpackPlugin()
    ]
}