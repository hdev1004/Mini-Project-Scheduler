# Docker 빌드 사용법

docker build -t dockerimages:latest .

docker run -d -p 0.0.0.0:5000:5000/tcp --name mydocker dockerimages:latest

<br><br>

# Local 사용법

pip install flask

pip install pymysql

pip install mysql-connector-python

pip install flask_jwt_extended

pip install flask_cors

<br>

python ./app.py
