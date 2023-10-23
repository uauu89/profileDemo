import React, { Component } from "react";
import styles from "../../css/user/PortfolioTag.module.css"

export default class PortfolioTag extends Component{

    render(){

        return(
            <li className={styles.tagWrap}>
                <input 
                    type="checkbox" name="searchOption"
                    id={"search_"+this.props.data.name} 
                    className={styles.inputCheck}
                    onChange={()=>this.props.searchOption()} 
                />
                <label 
                    htmlFor={"search_"+this.props.data.name}
                    className={styles.customCheck}
                >
                </label>
                <label
                    htmlFor={"search_"+this.props.data.name}
                    className={styles.tagStyle}
                    style={{backgroundColor : this.props.data.color}}
                >
                    {this.props.data.name}
                </label>
            </li>
        )
    }
}
