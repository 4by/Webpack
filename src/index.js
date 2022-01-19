import Post from './Post.js'
import './styles/styles.css'
// json в webpack-e интегрируется без лоадеров
import json from './assets/json'
 import './styles/less.less'
 import './styles/scss.scss'
import xml from "./assets/data.xml"
import csv from "./assets/data.csv"


const post = new Post("Webpack Post Title");


console.log(post)

console.log("JSON", json)
console.log("CSV:", csv)
console.log("XML:", xml)