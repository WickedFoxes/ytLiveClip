from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import undetected_chromedriver as uc
import time
import DB
import sys
import os

def open_login():
    options = uc.ChromeOptions()
    #options.add_argument('--window-size=1400,1600')
    #options.add_argument('--headless')
    options.add_argument('--start-maximized')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument("--disable-gpu")
    options.add_argument('--user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"')
    profile = "C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/Profile 1"
    options.add_argument(f"user-data-dir={profile}")
    driver = uc.Chrome(options=options, use_subprocess=True)
    return driver


subscriptURL = "https://www.youtube.com/feed/subscriptions"

driver = open_login()
driver.get('https://google.com')
time.sleep(10)
driver.get(subscriptURL)
time.sleep(3)

while(True):
    time.sleep(3)
    #WebDriverWait(driver, timeout=10).until(lambda d: d.find_element(By.CSS_SELECTOR,"#thumbnail > yt-image > img"))
    DB.setLiveOn('mainEngine', 1, '', '', '')
    driver.execute_script("todayList = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.gridRenderer.items")
    size = driver.execute_script("return todayList.length")
    for i in range(0, size):
        videoid = driver.execute_script("return todayList["+ str(i) +"].gridVideoRenderer.videoId")
        url = "https://www.youtube.com/watch?v=" + videoid

        video_name = driver.execute_script("return todayList["+ str(i) +"].gridVideoRenderer.title.runs[0].text")
        video_img = driver.execute_script("return todayList["+ str(i) +"].gridVideoRenderer.thumbnail.thumbnails[2].url")
                                                
        channel_name = driver.execute_script("return todayList["+ str(i) +"].gridVideoRenderer.shortBylineText.runs[0].text")
        channel_img = driver.execute_script("return todayList["+ str(i) +"].gridVideoRenderer.channelThumbnail.thumbnails[0].url")
        # 생방송인 경우
        if driver.execute_script("return todayList[" + str(i) + "].gridVideoRenderer.badges ? true : false"):
            count = driver.execute_script("return todayList[" + str(i) + "].gridVideoRenderer.viewCountText.runs[0].text")
            print(url + " : " + count)
            count = int(count.replace(',', ''))
            
            # 시청자 수 입력
            DB.setviewerscount(url, count)
            # 라이브 정보 입력
            DB.setLiveOn(url,1, video_name, video_img, channel_name)
            # 채널 정보 입력
            DB.setChannelInfo(channel_name, channel_img)

        # 생방송이 아닌경우
        else:
            print("생방송이 아닌 영상입니다.")
            # liveon이 1인 videoid인 경우
            
            
            
    time.sleep(30)
    driver.refresh()

print('#### 프로그램을 종료합니다 ####')
os.system("taskkill /F /IM python.exe /IM chrome.exe /IM undetected_chromedriver.exe")
driver.quit()
sys.exit(0)
