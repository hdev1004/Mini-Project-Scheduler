def json_to_date_array(json): #json을 달력에 맞게 조정
    dateObj = {}
    
    #초기화
    for i in json:
        dateObj[i["date"]] = []

    for i in json:
        dateObj[i["date"]].append({
            "num": i["num"],
            "des": i["des"],
            "important": i["important"]
        })

    return dateObj