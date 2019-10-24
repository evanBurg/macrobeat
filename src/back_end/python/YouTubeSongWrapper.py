import os
import sys
import subprocess
from pyautogui import press
import threading
import string
import signal
from SongWrapper import SongWrapper

os.chdir(os.path.dirname(os.path.abspath(__file__)))
MPV_LOCATION = "../../dist/YouTube Player/mpv.exe"

class YouTubeSongWrapper(SongWrapper):
    def __init__(self, SongURL):
        self.URL = SongURL
        self.playing = False
        self.timestamp = None
        self.pid = None
        self.lastLine = ""

    def timestamp_reader(self, proc):
        for line in iter(self.pid.stdout.readline, b''):
            string = line.decode('utf-8')
            firstIndex = string.find("0")
            if firstIndex > -1:
                self.timestamp = string[3:11]
                print(self.timestamp)
    
    def play(self):
        if self.timestamp is not None:
            self.pid = subprocess.Popen([MPV_LOCATION, self.URL, "--no-video", "--start={0}".format(self.timestamp)], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        else:
            self.pid = subprocess.Popen([MPV_LOCATION, self.URL, "--no-video"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

        self.thread = threading.Thread(target=self.timestamp_reader, args=(self.pid,))
        self.thread.start()
        self.playing = True

    def getPid(self): 
        return self.pid

    def pause(self):
        self.playing = False
        self.pid.terminate()
        self.thread.join()

    def goto(self, timestamp):
        self.timestamp = timestamp
        self.play()

    """ Time amount in seconds? """
    def jump(self, direction: str, timeamount: int):
        hours = int(self.timestamp[0:1])
        minutes = int(self.timestamp[2:3])
        seconds = int(self.timestamp[4:6])

        if direction == "backwards":
            seconds -= timeamount
            while(seconds < 0):
                seconds += 60
                minutes -= 1

            while(minutes < 0):
                minutes += 60
                hours -= 1
        else:
            seconds += timeamount
            while(seconds > 60):
                seconds -= 60
                minutes += 1

            while(minutes > 60):
                minutes -= 60
                hours += 1

        self.timestamp = "{0}:{1}:{2}".format
        self.play()

    def skip(self):
        self.pid.terminate()
        self.thread.join()

    def start(self, link: str, start_time = "00:00:00"):
        self.URL = link
        self.timestamp = start_time
        self.play()

    def speed(self, speed_value: float = 1.0):
        raise NotImplementedError

    def __del__(self):
        self.pid.terminate()
        self.thread.join()

#This is if the file is ran as a script
driver = None

def signal_handler(sig, frame):
    print('Closing...')
    driver.pid.terminate()
    sys.exit(0)
    os.kill()

if __name__ == "__main__":
    driver = YouTubeSongWrapper(sys.argv[1])
    driver.play()
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)