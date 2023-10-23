import {Component} from 'react';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Introduction from "./component/user/Introduction";
import Portfolio from "./component/user/Portfolio";
import ModPortfolioPage from "./component/admin/ModPortfolioPage";
import ModTagPage from "./component/admin/ModTagPage";

import './css/Common.css';
import styles from  "./css/App.module.css"

export default class App extends Component{

  state = {
    tag : {
      list : [],
      new : [],
      del : [],
      delSkill : [],
    },
    pofol : [],
    load : false,
    menu : "home",
  }

  getList = ()=>{
    fetch("http://101.101.211.45:8000/portfolio")
    .then(res=>res.json())
    .then(res=>{
        this.setState({
            tag : {
              ...this.state.tag,
              list : res[0],
            },
            pofol : res[1],
            load : true,
        });
    })
  }

  tagUpdate = e=>{
    this.setState({
      tag : {
        ...this.state.tag,
        list : e
      }
    })
  }
  pofolUpdate = e=>{
    this.setState({
      pofol : e
    })
  }

  componentDidMount(){
    if(!this.state.load){
      this.getList();
    }
  }

  render(){
    return(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <header>
            <h1 className="hidden">데모 페이지</h1>
            <nav>
                <ul className={styles.gnb}>
                    <li>
                      <NavLink to="/" 
                        className={this.state.menu === "home" ? styles.active : ""}
                        onClick={()=>this.setState({menu : "home"})}
                      >
                          안녕하세요
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/portfolio"
                        className={this.state.menu === "pofol" ? styles.active : ""}
                        onClick={e=>this.setState({menu : "pofol"})}
                      >
                        포트폴리오
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/modPortfolio"
                        className={this.state.menu === "modPortfolio" ? styles.active : ""}
                        onClick={e=>{this.setState({menu : "modPortfolio"})}}
                      >
                        포폴 수정
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/modTag"
                        className={this.state.menu === "modTag" ? styles.active : ""}
                        onClick={e=>{this.setState({menu : "modTag"})}}
                      >
                        태그 수정
                      </NavLink>
                    </li>

                </ul>
            </nav>
        </header>

        <Routes>
          <Route path="/" element={<Introduction />}></Route>
          <Route path="/portfolio" element={<Portfolio data={this.state}/>}></Route>
          <Route path="/modPortfolio" element={
            <ModPortfolioPage
              data={this.state}
              pofolUpdate={this.pofolUpdate}
            />}>
          </Route>
          <Route path="/modTag" element={
            <ModTagPage 
              data={this.state}
              tagUpdate={this.tagUpdate}
              pofolUpdate={this.pofolUpdate}
            />
          }/>
        </Routes>
      </BrowserRouter>

    )
  }
}