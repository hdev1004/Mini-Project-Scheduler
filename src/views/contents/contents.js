
import { Input, Button, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import moment from 'moment';
import Calendar_ from "../contents/calendar";
import 'moment/locale/ko';
import styles from "../../css/contents/contents.module.css";
import "../../css/contents/contetns.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { checkUserState, loginState, calendarState, currentUser } from "../../recoil/state";
import * as Moduel from "../../modules/module";
import { Card, Alert } from "antd";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../header/header";

function Contetns() {
    const [cookies, setCookie, removeCookie] = useCookies(); // 쿠키 훅 
    let today = new Date();
    const [importantType, setimportantType] = useState(["", "error", "warning", "info"]);
    
    const [moves, setMoves] = useState([1, 2, 3]);
    const [triggerName, setTriggerName] = useState("triggerDefault"); 
    const checkUser = useRecoilValue(checkUserState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);
    const [currentUserValue, currentUserSet] = useRecoilState(currentUser);
    const [calendarStateValue, calendarStateSet] = useRecoilState(calendarState);

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

      let startDate = null;
      let endDate = null;

      if(tempMoves[0] == 1) { //right
        let date = new Date(leftDate);
        date = new Date(date.setMonth(date.getMonth() - 1));
        setRightDate(date);
        //(3, 1, 2) Right, Mid
        startDate = date;
        endDate = midDate;
      } 
      else if(tempMoves[0] == 2) {
        let date = new Date(rightDate);
        date = new Date(date.setMonth(date.getMonth() - 1));
        setMidDate(date);
        //(2, 3, 1) Mid, Left
        startDate = date;
        endDate = leftDate;

      } else if(tempMoves[0] == 3) {
        let date = new Date(midDate);
        date = new Date(date.setMonth(date.getMonth() - 1));
        setLeftDate(date);
        //(1, 2, 3) Left, Right
        startDate = date;
        endDate = rightDate;
      }

      let param = {
        username: currentUserValue,
        startDate: Moduel.dateFormat(startDate, true),
        endDate: Moduel.dateFormat(endDate, false)
      }
      
      makeCalendar(param)
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

      let startDate = null;
      let endDate = null;

      if(tempMoves[2] == 1) { //right
        let date = new Date(midDate);
        date = new Date(date.setMonth(date.getMonth() + 1));
        setRightDate(date);
        //(3, 1, 2) Right Mid
        startDate = leftDate;
        endDate = date;
      } 
      else if(tempMoves[2] == 2) {
        let date = new Date(leftDate);
        date = new Date(date.setMonth(date.getMonth() + 1));
        setMidDate(date);
        //(2, 3, 1)Mid Left
        startDate = rightDate;
        endDate = date;

      } else if(tempMoves[2] == 3) {
        let date = new Date(rightDate);
        date = new Date(date.setMonth(date.getMonth() + 1));
        setLeftDate(date);
        //(1, 2, 3) Left Right
        startDate = midDate;
        endDate = date;      
      }

      let param = {
        username: currentUserValue,
        startDate: Moduel.dateFormat(startDate, true),
        endDate: Moduel.dateFormat(endDate, false)
      }

      makeCalendar(param)
    }

    const makeCalendar = (param) => {
      axios.post("http://localhost:5000/schedule", param).then((res) => {
        calendarStateSet(res.data);
      }).catch((Error) => {
        console.log(Error);
      })
    }

    useEffect(() => {
    }, [calendarStateValue])

    useEffect(() => {
      //쿠키 로딩 부분
      let token = cookies["token"];
      console.log("Token : " + token);
      axios.get(checkUser, {
        headers: {
          Authorization: "Bearer " + token
        }
      }).then((res) => {
        console.log("Reuslt : ", res);
        if(res.data.result == "success") {
          setIsLogin(true)
          currentUserSet(res.data.msg);

          let param = {
            username: res.data.msg,
            startDate: Moduel.dateFormat(leftDate, true),
            endDate: Moduel.dateFormat(rightDate, false)
          }
          makeCalendar(param)
        }
        else {
          setIsLogin(false)
          currentUserSet("");
        }
      })
    }, [])

    useEffect(() => {
      if(!isLogin)  return;
      
    }, [isLogin])

    
    if(isLogin ) {
      return (
        <div className={styles.app}>
          <Header/>

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

          <div style={{width: "50%"}}>
            <Card title="📢 오늘 일정" style={{ width: 400, boxShadow: "0px 0px 2px lightgray", marginLeft: "auto", marginRight:"auto", marginTop : "20px"}}>
              {
                calendarStateValue[Moduel.dateFullFormat(new Date(), 1)] ? (
                  calendarStateValue[Moduel.dateFullFormat(new Date(), 1)].map((item, idx) => (
                    <Alert message={item.des} type={importantType[item.important]} style={{height: "40px", marginBottom: "10px", fontWeight: "bold"}}></Alert>
                  ))
                ) : (
                  <div>일정이 없습니다.</div>
                )
              }
            </Card>
          </div>
          
        </div>
      );
    } else {
      return (
        <>
          토큰이 없어요!
        </>
      )
    }
    
  }
  
  export default Contetns;
  