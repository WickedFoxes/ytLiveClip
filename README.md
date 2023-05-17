# ytLiveClip
유튜브 실시간 방송의 실시간 시청자 수를 수집한 뒤, 시청자 수가 가장 높았던 클립을 보여주는 사이트 입니다.

## 환경
OS : Window

DB : Mariadb

Crawler : Python

Web : nodeJS(express)


## ytLive 데이터베이스
SQL/create_ytlive_db.sql 이용하여 DB 생성

    mariadb -uroot -p
    source create_ytlive_db.sql

## Crawler 엔진
### pip 설치
Crawler/requirements.txt 이용하여 pip 설치

    pip install -r requirements.txt

### MariaDB 연동
Crawler/DB.py의 def getConn()를 수정하여 ytLive 데이터베이스와 연동

    user="root",
    password="password",
    host="localhost",
    port=3306,
    database="ytlive"

### Chrome 계정 연동
selenium을 통한 chrome-driver는 기본적으로 구글 로그인이 되지 않음
![image](https://github.com/WickedFoxes/ytLiveClip/assets/48846088/e222fafa-f791-46b0-bdda-24bfa8b7e62d)

구글 계정 연동을 위하여 undetected-chromedriver를 사용하였고,

selenium에 chrome 프로필 설정을 추가하여, chrome driver가 실행될 때 자동으로 로그인이 되도록 함


<chrome://version/> 에서 프로필 경로를 확인한 후

Crawler/main.py 17번째 줄을 수정하면 됨

    profile = "C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Profile 1"

### Crawler 엔진 실행
Crawler/main.py 실행 후, DB에 정상적으로 데이터가 쌓이는 지 확인
![image](https://github.com/WickedFoxes/ytLiveClip/assets/48846088/c03938a5-e7f7-46f5-9535-e85c4d465a83)

## Web 서버 실행
### npm init 실행
Web 폴더에서 npm init 실행 후 모두 y 입력

    npm init

### dependencies 설치
Web/package.json의 dependencies 설치

    npm install

### 서버 실행
app.js 실행한 후 <http://localhost> 접속하여 서버 정상 실행 확인

    npm app.js

![image](https://github.com/WickedFoxes/ytLiveClip/assets/48846088/993c2ffa-bccc-4501-b25b-cb53f9e3e090)
