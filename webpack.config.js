const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')



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
    resolve: {
        //среди каких расширений будет искать тип файла, если мы не указали его при испорте
        //по умолчанию ищет js, json
        extensions: [".js", ".json", ".png"],
        alias: {
            //можно так заменять значения при импорте
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
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
        }),

        //отправляет файлы напрямую в сборку
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),



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
                //файлы (здесь форматы картинок, шрифтов) загрузили не через лоадер, а способом с вебпак5
                test: /\.(png|jpg|svg|gif|ttf|woff|woff2|eot)$/,
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