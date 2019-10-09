

class MusicDriver(object):
    pass

class Dlrep:
    def __init__(self):
        self.isdone = False
        self.eta = 999.99
        self.ratio = 0
    def __call__(self, total, recvd, ratio, rate, eta):
        if (total == recvd):
            self.isdone = True
        self.eta = eta
        self.ratio = ratio
    def __str__(self):
        return "isdone: {}\neta: {}\npercent complete: {}".format(self.isdone, self.eta, self.ratio *100)

def detachedDownloader(ytlink=""):
    if ytlink == "":
        return None
    
    import pafy
    video = pafy.new(ytlink)
    if len(video.m4astreams) == 0:
        return None

    stream = video.m4astreams[0]

    dlrep = Dlrep()
    
    dispatchedActivity = lambda: stream.download(quiet=True, callback=dlrep)
    from threading import Thread
    tt = Thread(target=(dispatchedActivity))
    tt.start()
    print("Thread dispatched")
    return dlrep