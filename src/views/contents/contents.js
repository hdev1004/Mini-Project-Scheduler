
import { Input, Button, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import moment from 'moment';
import Calendar_ from "../contents/calendar";
import 'moment/locale/ko';
import styles from "../../css/contents/contents.module.css";
import "../../css/contents/contetns.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { valueState, testState } from "../../recoil/state";

function Contetns() {
    const [list, setList] = useState({}); //전체
    const [todoList, setTodoList] = useState([]); //오늘 할 일
    const today = new Date();
    const inputRef = useRef();
    const [moves, setMoves] = useState([1, 2, 3]);
    const [triggerName, setTriggerName] = useState("triggerDefault"); 

    const [midDate, setMidDate] = useState(new Date(today));
    const [leftDate, setLeftDate] = useState(new Date(today.setMonth(today.getMonth() - 1)));
    const [rightDate, setRightDate] = useState(new Date(today.setMonth(today.getMonth() + 2)));

    const calendarLeft = () => {
      let tempMoves = [...moves];
      setTriggerName("leftToRight");

      if(triggerName == "triggerDefault") {
      }
      else if(triggerName == "rightToLeft") { //반대쪽 눌렀을 때 처리
        let n = tempMoves.pop();
        tempMoves.unshift(n);
        setMoves(tempMoves);
      } else { //연속적으로 눌렀을 때 처리
        let n = tempMoves.shift()
        tempMoves.push(n);
        setMoves(tempMoves);
      }

      if(tempMoves[0] == 1) { //right
        let date = new Date(leftDate);
        date = new Date(date.setMonth(date.getMonth() - 1));
        setRightDate(date);
      } 
      else if(tempMoves[0] == 2) {
        let date = new Date(rightDate);
        date = new Date(date.setMonth(date.getMonth() - 1));
        setMidDate(date);

      } else if(tempMoves[0] == 3) {
        let date = new Date(midDate);
        date = new Date(date.setMonth(date.getMonth() - 1));
        setLeftDate(date);
      }
    }

    const calendarRight = () => {
      setTriggerName("rightToLeft");
      let tempMoves = [...moves];

      if(triggerName == "triggerDefault") { //한번은 실행 안되도록 방지
      }
      else if(triggerName == "leftToRight") { //반대쪽 눌렀을 때 처리
        let n = tempMoves.shift()
        tempMoves.push(n);
        setMoves(tempMoves);
      } else { //연속적으로 눌렀을 때 처리
        let n = tempMoves.pop();
        tempMoves.unshift(n);
        setMoves(tempMoves)
      }


      if(tempMoves[2] == 1) { //right
        let date = new Date(midDate);
        date = new Date(date.setMonth(date.getMonth() + 1));
        setRightDate(date);
      } 
      else if(tempMoves[2] == 2) {
        let date = new Date(leftDate);
        date = new Date(date.setMonth(date.getMonth() + 1));
        setMidDate(date);

      } else if(tempMoves[2] == 3) {
        let date = new Date(rightDate);
        date = new Date(date.setMonth(date.getMonth() + 1));
        setLeftDate(date);
      }
    }


    useEffect(() => {
      //console.log(moves, triggerName);
    }, [moves])


    return (
      <div className={styles.app}>

        <div className={styles.calendar_manage}>
          <div className={triggerName + moves[0]}>
            <Calendar_ pickDate={leftDate}></Calendar_>
          </div>

          <div className={triggerName + moves[1]}>
            <Calendar_ pickDate={midDate}></Calendar_>
          </div>
          
          <div className={triggerName + moves[2]}>
            <Calendar_ pickDate={rightDate}></Calendar_>
          </div>

          <div className="leftClick" onClick={calendarLeft}>

          </div>

          <div className="rightClick" onClick={calendarRight}>

          </div>
        </div>
        {
          /*
        <h3>{today}</h3>
        {
          list[today] ? list[today].map((item, idx) => {
            return (
              <div>
                {item}
              </div>
            )
          }) : (
            <div>
            </div>
          )
        }

        <Input ref={inputRef} style={{width:"200px", marginRight: "20px"}}/>
        <Button type="primary" onClick={addList} style={{marginRight: "20px"}}>추가</Button>
        <Button type="primary" onClick={printList}>확인</Button>
          */
        }
        
      </div>
    );
  }
  
  export default Contetns;
  