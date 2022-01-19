const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


//process это обьект Node.js
const isDev = process.argv[3] === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    //установили эти лоадеры отдельно для css
    //работают справа-налево
    //css-loader расшифровывает css
    //MiniCssExtractPlugin (содержащий лоадер) создает отдельные css файлы
    //(вместо него могли бы использовать style-loader, который просто загружает css в html)

    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {},
    }, 'css-loader']
    if (extra) loaders.push(extra)
    return loaders
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    //файлы, импортирующиеся в сборочный index.html
    entry: {
        main: './index.js',
        analytics: "./analytics.js"
    },
    //как преобразуется входящий файл
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },



    plugins: [
        //создает в сборке файл index.html
        new htmlWebpackPlugin({

            //отправляет информацию в тег <title>
            // title: "Webpack Eugene",

            //документ на основе которого происходит сборка
            template: './index.html',
        }),
        //очищает прошлые файлы сборки
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: filename('css'),
        })

    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },

            {
                test: /\.(sass|scss)$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },

            {
                test: /\.(xml)$/,
                use: ['xml-loader']
              },
              {
                test: /\.(csv)$/,
                use: ['csv-loader']
              },


        ]
    }



}