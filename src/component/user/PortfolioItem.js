import React, { Component } from "react";
import styles from "../../css/user/portfolioItem.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default class PortfolioItem extends Component{

    render(){
        let arraySkill = this.props.data.skill.split(",");
        arraySkill.pop();
        return(
            <li className={styles.wrap}>
                {/* <img src={this.props.data.imgSrc} alt="" style={{borderColor: this.props.data.themeColor}} /> */}

                <div className={styles.imgFrameWrap}>
                    <div
                        className={styles.imgFrame}
                        style={{backgroundColor : this.props.data.themeColor, opacity : this.props.data.opacity+"%"}}
                    />
                    <img alt=""
                        className={styles.img}
                        src={this.props.data.imgSrc? 
                            this.props.data.imgSrc: "http://101.101.211.45:8000/img/defaultThumb.jpg"
                        }
                    />
                </div>

                <div className={styles.itemWrap}>
                    <h3 className={styles.itemTitle}>{this.props.data.title}</h3>
                    <ul className={styles.tagList}>
                        {arraySkill.map((i, idx) => {
                            let color = this.props.tagInfo.filter(c=>c.name === i)[0].color;
                            return <li key={idx} className={styles.tagStyle} style={{backgroundColor : color}}>{i}</li>
                        })}
                    </ul>
                    <ul className={styles.linkList}>
                        <li>
                            <a href={this.props.data.linkSite} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLink} />
                                사이트 바로가기
                            </a>
                        </li>
                        <li>
                            <a href={this.props.data.linkGithub} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLink} />
                                깃허브 바로가기
                            </a>
                        </li>
                        <li>
                            <a href={this.props.data.linkFigma} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLink} />
                                피그마 바로가기
                            </a>
                        </li>
                    </ul>
                    <p>기간 : <span>{this.props.data.dateStart} ~ {this.props.data.dateEnd}</span></p>
                    <p>{this.props.data.contents}</p>
                </div>
            </li>
        )
    }
}
