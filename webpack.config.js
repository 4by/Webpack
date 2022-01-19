const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')


//process это обьект Node.js
const isDev = process.argv[3] === 'development'

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`







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
    ],
}