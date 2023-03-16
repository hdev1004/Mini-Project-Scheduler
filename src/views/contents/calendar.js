
// 상위 App

import { useEffect, useRef, useState } from "react";
import styles from "../../css/contents/calendar.module.css";
import { Drawer, Input, Button, Radio } from "antd";
import { calendarState,  currentUser } from "../../recoil/state";
import { useRecoilState } from "recoil";
import Cards from "./cards";
import * as Module from "../../modules/module";
import { Alert } from "antd";
import axios from "axios";

function Calendar({pickDate, text}) {
    const [weeks, setWeeks] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [open, setOpen] = useState(false);
    const [radioValue, setRadioValue] = useState(3);
    const [calendarStateValue, calendarStateSet] = useRecoilState(calendarState);
    const [monthData, setMonthData] = useState('');
    const [clickDay, setClickDay] = useState(0);
    const [importantType, setimportantType] = useState(["", "error", "warning", "info"]);
    const [currentUserValue, currentUserSet] = useRecoilState(currentUser);
    const inputRef = useRef();
    const [today, setToday] = useState(new Date());

    const options = [
        { label: '매우중요', value: 1 },
        { label: '중요', value: 2 },
        { label: '보통', value: 3 },
      ];

    const showDrawer = (subItem) => {
        if(subItem[0] == -1) return;
        setClickDay(subItem[0] < 10 ? "0" + subItem[0] : subItem[0]);
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
        let date = monthData + clickDay;
        let data = calendarStateValue[date];
        
        let item = {
            username: currentUserValue,
            date: date,
            data: data
        }
        axios.post("http://localhost:5000/schedule/delete_add", item).then((res) => {

        })
    }


    const onChange = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setRadioValue(value);
    };

    const listAdd = () => {
        let value = inputRef.current.input.value;
        let today = monthData + clickDay;
        let getData = {...calendarStateValue};

        if(value.trim() == '') {
            return;
        }

        if(getData[today] == undefined) {
            let item = {
                date: today,
                des: value,
                important: radioValue,
                username: currentUserValue,
                num: 1
            }
            getData[today] = [item];
            axios.post("http://localhost:5000/schedule/add", item).then((res) => {
                console.log("Add New..");
            })
        } else {
            console.log("Data : ", getData[today]);
            let item = {
                date: today,
                des: value,
                important: radioValue,
                username: currentUserValue,
                num: getData[today].length + 1
            }
            let array = [...getData[today]];
            array.push(item);
            getData[today] = array;

            axios.post("http://localhost:5000/schedule/add", item).then((res) => {
                console.log("Add Continue..");
            })
        }
        calendarStateSet(getData);
        inputRef.current.value = ''
    }

    const makeCalendar = () => {
        let date = pickDate
        let rows = [];

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let week = new Date(year, month - 1, 1).getDay();
        let lastDay = new Date(year, month, 0).getDate();

        for(let i = 0; i < week; i ++) {
            rows.push([-1, -1]);
        }

        for(let i = 1; i <= lastDay; i ++) {
            rows.push([i, week]);
            week += 1;
            week %= 7;
        }

        let result = [];
        for(let i = 0; i < rows.length; i += 7) {
            result.push(rows.slice(i, i + 7));
        }
        
        setWeeks(result);
    }

    useEffect(() => {
        makeCalendar();
        let date = pickDate;
        let year = date.getFullYear();
        let month = date.getMonth() + 1

        if(month < 10) month = "0" + month;
        
        setMonthData(year + month);
    }, [pickDate])

    return (
      <div className={styles.calendar}>
        <h3>{pickDate.getFullYear() + "년 " + (pickDate.getMonth() + 1) + "월"}</h3>
        <div className={styles.frame}>
            <div className={styles.weeks}>
                <div className={styles.week} style={{color:"#FF9494"}}>
                    일
                </div>
                <div className={styles.week}>
                    월
                </div>
                <div className={styles.week}>
                    화
                </div>
                <div className={styles.week}>
                    수
                </div>
                <div className={styles.week}>
                    목
                </div>
                <div className={styles.week}>
                    금
                </div>
                <div className={styles.week} style={{color: "#7895B2"}}>
                    토
                </div>
            </div>

            <div className={styles.days}>
                {
                    [0, 1, 2, 3, 4, 5].map((item, idx) => {
                        return(
                            <div className={styles.rows}>
                                {
                                    weeks[idx] && weeks[idx].map((subItem, subIdx) => {
                                        return (
                                            <div className={styles.day} onClick={() => {showDrawer(subItem)}}>
                                                <div className={styles.date} style={subItem[1] == 0 ? {color:"#FF9494"} : subItem[1] == 6 ? {color: "#7895B2"} : {}}>
                                                    {monthData + (subItem[0] < 10 ? "0" + subItem[0] : subItem[0]) == Module.dateFullFormat(today) ? (
                                                        <>{subItem[0]} - today</>
                                                    ) : (
                                                        <>{subItem[0] == -1 ? "" : subItem[0]}</>
                                                    )}
                                                    
                                                </div>

                                                {
                                                    subItem[0] == -1 ? (<></>) : (
                                                    <>
                                                        <div className={styles.list}> 
                                                        {
                                                            calendarStateValue[monthData + (subItem[0] < 10 ? "0" + subItem[0] : subItem[0])] ? (
                                                               
                                                                calendarStateValue[monthData + (subItem[0] < 10 ? "0" + subItem[0] : subItem[0])].map((todo, todoIdx) => (
                                                                    <div className={styles.listItem}> 
                                                                       <Alert message={todo.des} type={importantType[parseInt(todo.important)]} >
                                
                                                                        </Alert>
                                                                    </div>
                                                                ))

                                                            ) : (
                                                                <>
                                                                </>
                                                            )
                                                            
                                                        }
                                                            
                                                        </div>
                                                    </>
                                                    )
                                                }
                                                
                                            </div>
                                        )
                                    })
                                }
                                
                            </div>
                        )
                    })
                }
            </div>

            <Drawer title={pickDate.getFullYear() + "-" + (pickDate.getMonth() + 1 < 10 ? "0" + (pickDate.getMonth() + 1) : pickDate.getMonth() + 1) + "-" + clickDay} placement="right" onClose={onClose} open={open}>
                <div style={{height: "500px", overflow: "auto"}}>
                {
                    calendarStateValue[monthData + clickDay] ? (
                        <Cards today={monthData + clickDay}>

                        </Cards>
                    ) : (
                        <></>
                    )
                }
                </div>

                <Radio.Group style={{"marginBottom":"20px"}} options={options} onChange={onChange} value={radioValue}/>
                <Input style={{"marginBottom":"20px"}} placeholder="할 일 추가" ref={inputRef}></Input>

                <Button type="primary" onClick={listAdd} style={{"marginRight":"20px"}}>추가</Button>
            </Drawer>
        </div>
       
      </div>
    );
  }
  
  export default Calendar;
  