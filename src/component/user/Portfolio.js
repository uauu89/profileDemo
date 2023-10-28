import React, { Component } from "react";

import PortfolioItem from "./PortfolioItem";
import PortfolioForm from "./PortfolioForm";

import styles from '../../css/user/Portfolio.module.css';

export default class Portfolio extends Component{

    state = {
        tag : this.props.data.tag.list,
        pofol : this.props.data.pofol,
        empty : false,
        searchMethod : "And",
        formOpen : -1,
        viewTable : true
    }



    formClose = e=>{
        e.preventDefault();
        let val = this.state.formOpen;
        this.setState({
            formOpen : val * -1
        })
    }

    checkSearchMethod = (e)=>{
        // 리스트 초기화
        this.setState({
            pofol : this.props.data.pofol,
            empty : false
        })
        let checkValue = e.currentTarget.getAttribute("id").replace("search", "");
        this.setState({searchMethod : checkValue});
    }

    searchOption = ()=>{
        let checkedDom = document.querySelectorAll("input[name=searchOption]:checked"),
            checkedSkill = [];

            checkedDom.forEach(i=>checkedSkill.push(i.getAttribute("id").replace("search_", "")));
            
        let result = [];
        if(this.state.searchMethod === "And"){
            this.props.data.pofol.forEach(i=>{
                let check = true;
                for(let word of checkedSkill){
                    if(i.skill.indexOf(word) === -1){
                        check = false;
                        break;
                    }
                }
                if(check){
                    result.push(i);
                }
            })
    
            if(checkedSkill.length){
                this.setState({
                    pofol: result,
                    empty : result.length ? false: true
                })
            }else{
                this.setState({
                    pofol : this.props.data.pofol,
                    empty : false
                })
            }
        }else{
            this.props.data.pofol.forEach(i=>{
                for(let word of checkedSkill){
                    if(i.skill.indexOf(word) > -1){
                        result.push(i);
                        break;
                    }
                }
            })
    
            if(checkedSkill.length){
                this.setState({
                    pofol:result,
                    empty : result.length ? false: true
                })
            }else{
                this.setState({
                    pofol : this.props.data.pofol,
                    empty : false
                })
            }
        }
    };

    render(){
        return(
            <section id="portfolio" className={styles.wrap}>
                <header className={styles.header}>
                    <h2 className="hidden">포트폴리오 페이지</h2>
                    <div className={styles.btnSearchWrap}>
                        <a
                            href="#modal_searchOption"
                            className={`${styles.btn_search} ${this.state.formOpen > -1 ? styles.active : ""}`}
                            onClick={e=>this.formClose(e)}
                        >
                            검색옵션
                        </a>
                        <PortfolioForm 
                            formOpen = {this.state.formOpen}
                            formClose = {this.formClose}
                            data = {this.state}
                            searchOption = {this.searchOption}
                            checkSearchMethod = {this.checkSearchMethod}
                        />
                    </div>
                    <ul className={styles.viewOptionWrap}>
                        <li className={`${styles.posRel} ${this.state.viewTable? "": styles.check}`}>
                            <input type="radio" id="view_list" name="viewOption" 
                                className={styles.input}
                                onChange={()=>{
                                    this.setState({
                                        viewTable : false
                                    })
                                }}
                            />
                            <label htmlFor="view_list" className={`${styles.label} ${styles.iconList} `}>
                                <i className="fa-solid fa-list"></i>
                                <span className="hidden">목록형으로 보기</span>
                            </label>
                        </li>
                        <li className={`${styles.posRel} ${this.state.viewTable? styles.check: ""}`}>
                            <input type="radio" id="view_table" name="viewOption" 
                                className={styles.input}
                                defaultChecked
                                onChange={()=>{
                                    this.setState({
                                        viewTable : true
                                    })
                                }} 
                            />
                            <label htmlFor="view_table" className={`${styles.label} ${styles.iconTable}`}>
                                <i className="fa-solid fa-table-cells"></i>
                                <span className="hidden">바둑판형으로 보기</span>
                            </label>
                        </li>
                    </ul>
                </header>
                <ul className={`${styles.portfolioList} ${this.state.viewTable ? styles.table: styles.list}`}>
                    {this.state.empty ? 
                        (<p className="noResult">조건에 맞는 결과가 없습니다.</p>) : 
                        (this.state.pofol.map((i, idx)=><PortfolioItem key={idx} data={i} tagInfo={this.state.tag}/>))
                    }
                </ul>
                   
            </section>
        )
    }
}