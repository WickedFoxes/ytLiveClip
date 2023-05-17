import mariadb
import sys

# Connect to MariaDB Platform
def getConn():
    try:
        conn = mariadb.connect(
            user="root",
            password="password",
            host="localhost",
            port=3306,
            database="ytlive"

        )
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        sys.exit(1)
    return conn

def setChannelInfo(channel_name, channel_img):
    conn = getConn()
    cur = conn.cursor()
    try:
        cur.execute(
        "INSERT INTO channels (channel_name, channel_img) VALUES (?, ?) ON DUPLICATE KEY UPDATE channel_name=?, channel_img=?",
        (channel_name, channel_img, channel_name, channel_img))
        conn.commit()
    except mariadb.Error as e: 
        print(f"Error: {e}")
    conn.close()

def setLiveOn(videoid, liveon, video_name, video_img, channel_name):
    conn = getConn()
    cur = conn.cursor()
    try:
        cur.execute(
        "INSERT INTO liveon (videoid, liveon, time, video_name, video_img, channel_name) VALUES (?, ?, now(), ?, ?, ?) ON DUPLICATE KEY UPDATE videoid=?, liveon=?, time=now(), video_name=?, video_img=?, channel_name=?", 
        (videoid, liveon, video_name, video_img, channel_name, videoid, liveon, video_name, video_img, channel_name))
        conn.commit()
    except mariadb.Error as e: 
        print(f"Error: {e}")
    conn.close()

def setviewerscount(videoid, viewers):
    conn = getConn()
    cur = conn.cursor()
    try:
        cur.execute(
        "INSERT INTO viewerscount (videoid, viewers, time) VALUES (?, ?, now())", 
        (videoid, viewers))
        conn.commit()
    except mariadb.Error as e: 
        print(f"Error: {e}")
    conn.close()


def getLiveList(livetype):
    conn = getConn()
    cur = conn.cursor()
    livelist = []
    try:
        cur.execute(
        "SELECT videoid, liveon, time FROM liveon WHERE liveon=?", (livetype,)
        )
        for videoid, liveon, time in cur:
            print(videoid + " : " + str(videoid))
            livelist.append(videoid)
    except mariadb.Error as e: 
        print(f"Error: {e}")
    conn.close()
    return livelist
