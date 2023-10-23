import { Component } from "react";

import styles from "../../css/user/Introduction.module.css"


class Introduce extends Component{

    render(){
        return(
            <>
                <section id="main">
                    <h2 className="hidden">메인 페이지</h2>
                    <div className={styles.wrap}>
                        <h3 className={styles.title}>
                            현재 페이지는 시연을 위한 데모 페이지 입니다.
                        </h3>

                        <p className={styles.contents}>
                            페이지 접속 시 처음 한 번만 <br />
                            실제 저장된 포트폴리오 정보를 불러오며,<br />
                            이후 수정한 데이터는 서버에 저장되지 않습니다.
                        </p>
                    </div>
                </section>
            </>
        )
    }
}
export default Introduce;