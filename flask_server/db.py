import pymysql
from flask import Flask, jsonify, request
from flask_jwt_extended import *
from datetime import timedelta

# 로컬의 database에 접근
# host를 변경 : host.docker.internal


def xssFilter(data):
    result = data
    result = result.replace("&", "&amp;")
    result = result.replace("<", "&lt;")
    result = result.replace(">", "&gt;")
    result = result.replace("\'", "&#x27;")
    result = result.replace("\"", "&quot;")
    result = result.replace("(", "&#40;")
    result = result.replace(")", "&#41;")
    result = result.replace("/", "&#x2F;")
    return result

def xssDecoding(data):
    result = data
    result = result.replace("&amp;", "&")
    result = result.replace("&lt;", "<")
    result = result.replace("&gt;", ">")
    result = result.replace("&#x27;", "\'")
    result = result.replace("&quot;", "\"")
    result = result.replace("&#40;", "(")
    result = result.replace("&#41;", ")")
    result = result.replace("&#x2F;", "/")
    return result

def dbConnect():
    db = pymysql.connect(host='localhost',
            port=3306,
            user='root',
            passwd='P@ssw0rd',
            db='schedule',
            charset='utf8')
    
    print("DB Loading")
    print(db)

    return db

def selectUsers():
    db = dbConnect()
    cur = db.cursor(pymysql.cursors.DictCursor) #json으로 변경해줌
    
    sql = "SELECT * from users"
    cur.execute(sql)

    result = cur.fetchall()

    # Database 닫기
    db.close()
    return result

def selectSchdule(user, startDate, endDate):
    db = dbConnect()
    cur = db.cursor(pymysql.cursors.DictCursor) #json으로 변경해줌

    sql = "select * from schduler where `user`='%s' and `date` >= '%s' and `date` <= '%s' order by `date` asc, num asc" % (user, startDate, endDate)
    cur.execute(sql)

    result = cur.fetchall()

    # Database 닫기
    db.close()
    return result

def checkLogin(userId, userPw):
    db = dbConnect()
    cur = db.cursor(pymysql.cursors.DictCursor) #json으로 변경해줌

    userId = xssFilter(userId)
    userPw = xssFilter(userPw)

    sql = "SELECT * from users where id='%s' and pw='%s'" % (userId, userPw)
    cur.execute(sql)
    print("SQL :", sql)    

    result = cur.fetchone()
    print("Result : ", result);
    db.close()
    
    if result != None and result["id"] == userId and result["pw"] == userPw:
        return jsonify(
            result = "success",
            # 검증된 경우, access토큰 반환
            access_token = create_access_token(identity= userId,
                                               expires_delta=timedelta(days=1))
        )
    else:
        return jsonify(
            result = "faild"
        )

def insertItem(username, date, des, important, num):
    db = dbConnect()
    cur = db.cursor(pymysql.cursors.DictCursor) #json으로 변경해줌

    sql = "INSERT INTO schduler(num, user, date, des, important, create_time, update_time) values(%d, '%s', '%s', '%s', '%s', now(), now())" % (num, username, date, des, important)
    cur.execute(sql)

    db.commit()
    db.close()
    return jsonify(
        result = "success"
    )

def deleteItem_from_date(username, date):
    db = dbConnect()
    cur = db.cursor(pymysql.cursors.DictCursor) #json으로 변경해줌

    sql = "DELETE FROM schduler WHERE user='%s' and date='%s'" % (username, date)
    cur.execute(sql)

    db.commit()
    db.close()
    return jsonify(
        result = "success"
    )