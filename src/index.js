import React from "react";
import reactDom from "react-dom"
import App from './components/App'
import {createRoot} from 'react-dom/client'

const root = reactDom.createRoot(document.getElementById('root'))
root.render(
    <App/>
)