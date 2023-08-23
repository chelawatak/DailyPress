import './App.css';

import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


export default class App extends Component {
  state={
    progress:10
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <BrowserRouter>
       <LoadingBar
        color='white'
        // color='rgb(153, 0, 77)'
        height={3}
        progress={this.state.progress}
      />

      <div>
        <Navbar/>
      </div>
      
      <Routes>
        <Route  path="/" element={<News setProgress={this.setProgress} key="general" pageSize={18} country={"in"} category={"general"}/>}></Route>
        <Route  path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={18} country={"in"} category={"general"}/>}></Route>
        <Route  path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={18} country={"in"} category={"entertainment"}/>}></Route>
        <Route  path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={18} country={"in"} category={"business"}/>}></Route>
        <Route  path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={18} country={"in"} category={"sports"}/>}></Route>
        <Route  path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={18} country={"in"} category={"health"}/>}></Route>
        <Route  path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={18} country={"in"} category={"science"}/>}></Route>
        <Route  path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={18} country={"in"} category={"technology"}/>}></Route>
      </Routes>
      
      
      </BrowserRouter>
      
    )
  }
}
