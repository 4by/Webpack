import * as $ from 'jquery'
import Post from "@models/Post"
import './styles/styles.css'
// json в webpack-e интегрируется без лоадеров
import json from './assets/json'
import './styles/less.less'
import './styles/scss.scss'
import xml from "./assets/data.xml"
import csv from "./assets/data.csv"
import WebpackLogo from "./assets/webpack-logo.png"
import './babel.js'
import { render } from 'react-dom'
import React from 'react'


const post = new Post("Webpack Post Title", WebpackLogo);

//вставили текст в тег pre jquery
$('pre').addClass('code').html(post.toString())

console.log("JSON", json)
console.log("CSV:", csv)
console.log("XML:", xml)


const App = () => (
    <div className="container">
        <h1>Webpack course</h1>
        <hr/>
         <div className="logo"/>
        <hr/>
        <pre></pre>
        <hr/>

        <div className="box">
            <h2>Less</h2>
        </div>


        <div className="card">
            <h2>Scss</h2>
        </div>

    </div>
)

render(<App/>, document.getElementById('app'))




