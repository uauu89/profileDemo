import { Component } from "react";
import PortfolioTag from "./PortfolioTag";

import styles from '../../css/user/PortfolioForm.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default class PortfolioForm extends Component{

    render(){
        return(
            <form id="modal_searchOption" method="POST" 
                className={`${styles.formSearchOption} ${this.props.formOpen > 0? styles.active: ""}`}
            >
                <button 
                    type="button"
                    aria-label="검색모달 닫기 버튼"
                    className={styles.btnClose}
                    onClick={e=>this.props.formClose(e)}
                >
                    <FontAwesomeIcon icon={faX} />
                </button>
                <ul className={styles.tagList}>
                    {this.props.data.tag.map(i => 
                        <PortfolioTag 
                            key={i.idx} data={i} 
                            searchOption={this.props.searchOption} 
                        />
                    )}
                </ul>
                <div className={styles.searchMethodWrap}>
                    <p>검색 방식</p>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                name="searchMethod"
                                id="searchAnd"
                                onChange={e=>this.props.checkSearchMethod(e)}
                                defaultChecked
                            >
                            </input>
                            <label htmlFor="searchAnd">AND</label>
                        </li>
                        <li>
                            <input 
                                type="radio"
                                name="searchMethod"
                                id="searchOr"
                                onChange={e=>this.props.checkSearchMethod(e)}
                            >
                            </input>
                            <label htmlFor="searchOr">OR</label>
                        </li>
                    </ul>
                </div>
            </form>
        )
    }
}