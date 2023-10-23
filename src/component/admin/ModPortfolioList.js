import { Component } from "react";
import ModPortfolioItem from "./ModPortfolioItem";
import styles from '../../css/admin/ModPortfolioList.module.css';

export default class ModPortfolioList extends Component{

    state = {
        tag : this.props.data.tag,
        pofol : this.props.data.pofol,
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.data.pofol) !== JSON.stringify(this.props.data.pofol)){
            this.setState({
                tag : this.props.data.tag,
                pofol : this.props.data.pofol,
            })
        }
    }


    render(){
        return(
            <>
                <div className={styles.listWrap}>
                    <div className={styles.list} >
                        {this.state.pofol.map(i=>
                            <ModPortfolioItem 
                                key={i.idx}
                                pofol={i}
                                tag={this.state.tag}
                                setStatePofol={this.props.setStatePofol}
                                array={this.state.pofol}
                                pofolUpdate={this.props.pofolUpdate}
                            />
                        )}
                    </div>
                    <div className={styles.btnWrap}>
                        <button
                            type="button"
                            className={`${styles.btnStyle} ${styles.btnSubmit}`}
                            onClick={()=>this.props.setStatePofol({menu : "new"})}
                        >
                            새로등록
                        </button>
                    </div>
                </div>
            </>
        )
    }
}