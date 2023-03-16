from flask import Flask, jsonify, request
from flask_jwt_extended import *
import db as db
import modules as modules
from flask_cors import CORS

app = Flask(__name__)

app.config['JSON_AS_ASCII'] = False
app.config.update(
    DEBUG = True,
    JWT_SECRET_KEY = "HDEV1004"
)
# JWT 확장 모듈을 flask 어플리케이션에 등록
jwt = JWTManager(app)

CORS(app)


@app.route('/select')
def select():
    result = db.selectUsers()
    return result

@app.route('/')
def hello_world():
    #result = db.selectUsers()
    #userToken = db.checkLogin("hdev1004", "P@ssw0rd")
    #return userToken
    return 'Not Found'

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        input_data = request.get_json()
        print("Input Data : " , input_data)
        userId = input_data['id']
        userPw = input_data['pw']

        userToken = db.checkLogin(userId, userPw)
        return userToken
    else:
        return jsonify(
            result = "faild",
            msg = "plase request POST"
        )

@app.route('/check_user', methods=["GET"])
@jwt_required()
def check_user():
	cur_user = get_jwt_identity()
	if cur_user is None:
		return jsonify(
            result = "faild",
            msg = "Invalid Token"
        )
	else:
		return jsonify(
            result = "success",
            msg = cur_user
        )

# selectSchdule

@app.route('/schedule', methods=["GET", "POST"])
def get_user_info():
    if request.method == "POST":
        input_data = request.get_json()

        username = input_data["username"]
        startDate = input_data['startDate']
        endDate = input_data['endDate']

        result = db.selectSchdule(username, startDate, endDate)
        result = modules.json_to_date_array(result)
        return result
    else:
        return jsonify({"method" : "GET"})
    

@app.route('/schedule/add', methods=["GET", "POST"])
def insertItem():
    if request.method == "POST":
        input_data = request.get_json()
        print("input_data : ", input_data)
        
        username = input_data["username"]
        date = input_data['date']
        des = input_data['des']
        num = input_data['num']
        important = input_data['important']

        result = db.insertItem(username, date, des, important, num)
        return result
    else:
        return jsonify({"method" : "GET"})
    
@app.route('/schedule/delete_add', methods=["GET", "POST"])
def deleteInsertItem():
    if request.method == "POST":
        input_data = request.get_json()
        print("input_data : ", input_data)
        
        username = input_data["username"]
        date = input_data['date']
        data = input_data['data']

        db.deleteItem_from_date(username, date)
        
        for index, value in enumerate(data):
             db.insertItem(username, date, value["des"], value["important"], index + 1)

        result = jsonify(
             msg = "success"
        )
        return result
    else:
        return jsonify({"method" : "GET"})

@app.route('/schedule/delete', methods=["GET", "POST"])
def deleteItem_from_date():
    if request.method == "POST":
        input_data = request.get_json()
        print("input_data : ", input_data)
        
        username = input_data["username"]
        date = input_data['date']

        result = db.deleteItem_from_date(username, date)
        return result
    else:
        return jsonify({"method" : "GET"})

if __name__ == '__main__':
    # database에 접근
    app.run()

