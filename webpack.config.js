const path = require('path');
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const apiMocker = require("connect-api-mocker")

module.exports = {
    name: "really_last_try",
    mode: 'development', //실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['*', '.js', '.jsx'], //entry에 하나하나 넣기 힘드니까 확장자명으로 찾아서
        modules: [path.resolve(__dirname, "src"), "node_modules"]

    },

    /* 입력  여러개 합쳐서(a.js + b.js .... )*/
    entry: [
        // 'react-hot-loader/patch',
        './src/index.js',
        './src/main.css',
        './src/index.html',
        // app: ['./client'], //,'WordRelay.jsx는 이미 client에서 require 해서 쓰고잇으므로 생략해도 됨.
    ],
    //entry에 잇는것들은 모듈을 적용해서 아웃풋으로 내보낸다
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {//babel의 옵션
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                browsers: ['> 5% in KR', 'last 2 chrome versions'],//browsers list
                            },
                        }],
                        '@babel/preset-react',
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties',
                        'react-hot-loader/babel',
                    ],//state문법 쓰려면 필요함 error메세지에 나옴
                },
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {minimize: true}
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
    output: {
        path: __dirname + '/dist', //path.join을 하면 현재폴더에 dist를 찾아줌
        filename: "bundle.js",
        publicPath: "/", //hot loader때메 추가
        //path는 실제경로, publicpath는 가상경로임.
    },
    devServer: {
        contentBase: './dist',
        filename: 'bundle.js',
        publicPath: '/',
        inline: true,
        historyApiFallback: false,
        compress: true,
        hot: true,
        host: 'localhost',
        port: 4000,

        proxy: {
            context: '**',
            target: 'http://localhost:3000/'
        },
    },
};