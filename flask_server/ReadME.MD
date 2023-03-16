# Flask를 이용한 백앤드 구축

### 🌹 Flask

Python의 Flask를 이용하여 백앤드를 구축한 시스템 입니다.

<br>

### ✨ Docker(O) Local(X) 사용법

개발 환경을 맞추기 어려울 때를 대비해 도커를 사용했습니다.

도커의 사용방법은 다음과 같습니다.

도커에 올려서 설치할 파일은 Dockerfile을 참고하여 추가하면 됩니다. 

```shelll
docker build -t dockerimages:latest .

docker run -d -p 0.0.0.0:5000:5000/tcp --name mydocker dockerimages:latest
```

<br>

### ✨ Docker(X) Local(O) 사용법

```shell
pip install flask

pip install pymysql

pip install mysql-connector-python

pip install flask_jwt_extended

pip install flask_cors

python ./app.py
```


