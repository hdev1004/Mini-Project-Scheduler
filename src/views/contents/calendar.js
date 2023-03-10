
// 상위 App

import { useEffect, useState } from "react";
import styles from "../../css/contents/calendar.module.css";
import { Drawer, Input, Button, Radio } from "antd";

function Calendar({pickDate, text}) {
    const [weeks, setWeeks] = useState([]);
    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [open, setOpen] = useState(false);
    const [value3, setValue3] = useState('Apple');

    const options = [
        { label: '중요', value: 'important' },
        { label: '보통', value: 'normal' },
        { label: '기본', value: 'default' },
      ];

    const showDrawer = (subItem) => {
        if(subItem[0] == -1) return;
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };

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
    }, [pickDate])

    return (
      <div className={styles.calendar}>
        <h1>{pickDate.getFullYear() + " - " + (pickDate.getMonth() + 1)}</h1>
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
                                                    {subItem[0] == -1 ? "" : subItem[0]}
                                                </div>

                                                {
                                                    subItem[0] == -1 ? (<></>) : (
                                                    <>
                                                        <div className={styles.list}>
                                                            <div className={styles.listItem}></div>
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

            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
                <div>
                    1. 오늘 할 일
                </div>
                <div>
                    1. 오늘 할 일
                </div>
                <div>
                    1. 오늘 할 일
                </div>
                <div>
                    1. 오늘 할 일
                </div>
                <div>
                    1. 오늘 할 일
                </div>
                <div>
                    1. 오늘 할 일
                </div>

                <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
                <Input placeholder="할 일 추가"></Input>

                <Button type="primary">추가</Button>
            </Drawer>
        </div>
       
      </div>
    );
  }
  
  export default Calendar;
  