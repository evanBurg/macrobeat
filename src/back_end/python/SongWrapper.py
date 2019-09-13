class SongWrapper(object):
    """
    Abstract class for a SongWrapper object
    Declares the interface for a streaming service wrapper
    """
    def __init__(self):
        pass

    def start(self, link: str, start_time = 0):
        raise NotImplementedError

    def play(self):
        """Unpauses the wrapped video"""
        raise NotImplementedError

    def pause(self):
        """Pauses the wrapped video"""
        raise NotImplementedError

    def goto(self, timestamp):
        """Set the song to specified time"""
        raise NotImplementedError

    def jump(self, direction: str, timeamount):
        """Jump forward or back the specified number of seconds"""
        raise NotImplementedError

    def skip(self):
        """Skips to the end of the wrapped song"""
        raise NotImplementedError

    def speed(self, speed_value: float = 1.0):
        """Set playback speed to specified ratio"""
        raise NotImplementedError

class YoutubeSongWrapper(SongWrapper):
    """Songwrapper implementation for Youtube"""
    def __init__(self, )
