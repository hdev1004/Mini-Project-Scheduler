
/**
 * Date 타입을 문자열 형태로 변환
 * @param {*} date //new Date() 형식의 구조
 * @param {boolean} startFlag //StartDate 여부 (True : startDate, False : endDate)
 * 반환형식 :  20221225
 */
export const dateFormat = (date, startFlag) => {
    let year = String(date.getFullYear());
    let month = date.getMonth() + 1;
    let day = "01";

    month = month < 10 ? "0" + month : String(month);
    if(startFlag)
        day = "01";
    else
        day = "32"
    
    return year + month + day;
}


/**
 * Date 타입을 문자열 형태로 변환
 * @param {*} date //new Date() 형식의 구조
 * 반환형식 :  20221225
 */
export const dateFullFormat = (date, add = 1) => {
    let year = String(date.getFullYear());
    let month = date.getMonth() + add;
    let day = date.getDate();

    month = month < 10 ? "0" + month : String(month);
    day = day < 10 ? "0" + day : String(day);
    
    return year + month + day;
}

