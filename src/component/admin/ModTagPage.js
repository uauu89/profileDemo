import React, { Component } from "react";
import styles from "../../css/admin/ModTagPage.module.css"
import ModTagItem from "./ModTagItem";
import NewTagItem from "./NewTagItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default class ModTagPage extends Component{

    state={
        list : this.props.data.tag.list,
        new : [],
        del : [],
        delSkill : [],
    }

    addNewTag = ()=>{
        let lastIdx = this.state.new.length ?
            this.state.new.map(i=>i.idx).at(-1):
            this.state.list.map(i=>i.idx).sort().at(-1);

        let template = {
            idx : lastIdx+1,
            name : "",
            color : "",
            colOrder : ""
        }
        this.setState({
            new : [...this.state.new, template]
            
        })
    }

    updateTag = (data)=>{
        let arr = this.state.list.map(i=>i.idx),
            idx = arr.indexOf(data.idx);

        let modItem = [...this.state.list];
        modItem[idx] = data;

        this.setState({
            list : modItem
        })
    }

    delTag = (e, name)=>{
        let modArray = this.state.list.filter(i=>i.idx !== e);
        let delArray = [...this.state.del, e];
        let delSkill = [...this.state.delSkill, name];
        

        this.setState({
            list : modArray,
            del : delArray,
            delSkill : delSkill,
        })
        

    }

    insertNewTag = (data)=>{
        let arr = this.state.new.map(i=>i.idx),
            idx = arr.indexOf(data.idx);

        let modItem = [...this.state.new];
        modItem[idx] = data;

        this.setState({
            new : modItem,
        })
        
    }
    delNewTag = (e) =>{
        let modArray = this.state.new.filter(i=>i.idx !== e);
        this.setState({
            new : modArray
        })
    }


    tagSubmit = (e)=>{
        e.preventDefault();

        
        // 수정한 태그 이름을 포트폴리오 태그 이름에 업데이트 하기 위한 변수
        let originProps = [...this.props.data.tag.list];
        // 현재 삭제 수정된 state와 짝을 맞추기 위한 forEach문
        this.state.del.forEach(num=>{
            originProps = [...originProps].filter(i=>i.idx !== num);
        })
        // state와 props가 일치하지 않을 경우 수정된 값으로 간주하여 modArray에 추가
        // (벡앤드에서 modArray.length === 0일 경우 UPDATE 쿼리문을 생략하기 위해서 추가)
        let modArray = this.state.list.filter((i, idx)=>JSON.stringify(i) !== JSON.stringify(originProps[idx]));
        // 수정한 태그 이름의 원본 이름을 구하기 위한 filter
        let original = originProps.filter((i, idx)=>JSON.stringify(i) !== JSON.stringify(this.state.list[idx]));

        let updateTagList = [...this.props.data.pofol];

        updateTagList.forEach((i)=>{
            // 삭제한 태그 이름을 replace로 제거
            this.state.delSkill.forEach(delSkill=>{
                i.skill = i.skill.replace(delSkill+",", "");
            })
            // 수정한 태그 이름을 replace로 변경
            original.forEach((skill, idx)=>{
                i.skill = i.skill.replace(skill.name+",", modArray[idx].name+",")
            })
        });

        // INSERT 쿼리문을 colOrder 기준으로 정렬한 데이터로 업데이트 하는 것으로 대체
        let modTagArray = [...this.state.new, ...this.state.list].sort((a,b)=>{return a.colOrder - b.colOrder});

        this.props.tagUpdate(modTagArray);
        this.props.pofolUpdate(updateTagList);

        alert("수정되었습니다")
    }
    
    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(this.props.data.tag) !== JSON.stringify(prevProps.data.tag)){
            this.setState({
                ...this.props.data.tag
            })
        }
    }

    render(){
        return(
            <section className={styles.wrap}>
                <h2 className="hidden">태그 리스트 수정페이지</h2>
                <form method="POST" className={styles.form} onSubmit={this.tagSubmit}>

                    <div className={styles.listWrap}>
                        <div id="tagList" className={styles.list} >
                            {this.state.list.map(i=>
                                <ModTagItem key={i.idx} data={i} updateTag={this.updateTag} delTag={this.delTag}/>
                                )
                            }
                            {this.state.new.map(i=>
                                <NewTagItem key={i.idx} data={i} insertNewTag={this.insertNewTag} delNewTag={this.delNewTag} />
                                )
                            }

                        
                        </div>
                        <button type="button"
                            className={styles.btnInputAdd}
                            onClick={()=>this.addNewTag()}
                        >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </button>
                    </div>

                    <div className={styles.btnWrap}>
                        <button
                            type="button"
                            className={`${styles.btnStyle} ${styles.btnUndo}`}
                            disabled = {JSON.stringify(this.state) === JSON.stringify(this.props.data.tag)}
                            onClick={()=>{
                                this.setState({
                                    list : this.props.data.tag.list,
                                    new : [],
                                    del : [],
                                    delSkill : [],
                                })
                                }
                            }
                        >
                            되돌리기
                        </button>

                        <button
                            type="submit"
                            className={`${styles.btnStyle} ${styles.btnSubmit}`}
                            disabled = {JSON.stringify(this.state) === JSON.stringify(this.props.data.tag)}
                        >
                            수정
                        </button>
                    </div>


                </form>
            </section>
        )
    }
}

