import React, { Component } from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import "loaders.css//loaders.css";
import { SegmentedControl, Text } from "gestalt";
import IconButton from "./Components/IconButton";
import io from "socket.io-client";

import Home from "./Home/Home";
import NowPlaying from "./NowPlaying/NowPlaying";

import Library from "./View Models/Library";
import Queue from "./View Models/Queue";
import Artists from "./Artists/Artists";
import Albums from "./Albums/Albums";
import Songs from "./Songs/Songs";
import Search from "./Search/Search";
import NewUser from "./NewUser/NewUser";

import MdHome from "react-ionicons/lib/MdHome";
import MdMicrophone from "react-ionicons/lib/MdMicrophone";
import MdDisc from "react-ionicons/lib/MdDisc";
import MdMusicalNote from "react-ionicons/lib/MdMusicalNote";
import IosList from "react-ionicons/lib/IosList";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline";
import IosRemoveCircleOutline from "react-ionicons/lib/IosRemoveCircleOutline";
import MdShareAlt from "react-ionicons/lib/MdShareAlt";
import MdSearch from "react-ionicons/lib/MdSearch";
import IosArrowUp from "react-ionicons/lib/IosArrowUp";
import { AnimatePresence, motion } from "framer-motion";
import ContextMenu from "./Components/ContextMenu";
import CollectionView from "./Components/CollectionView";
import { Header } from "./Components/WrapperComponents";
import { YouveBeenKicked } from "./Settings/KickUser";
import PlayingQueue from "./NowPlaying/PlayingQueueDragnDrop";
import ScrollToTop from "./Components/ScrollToTop";
import Settings from "./Settings/Settings";

//"./View Models/YouTubeSearch.json"

//const Results = require("./View Models/YouTubeSearch.json");

const styles = {
  tabbar: {
    position: "fixed",
    background: "#efefef",
    zIndex: 21,
    paddingBottom: 2.5,
    bottom: 0,
    left: 0,
    right: 0
  },
  nowPlaying: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    background: "#FFF",
    WebkitBoxShadow: "rgba(0, 0, 0, 0.3) 0px -11px 20px 0px",
    MozBoxShadow: "rgba(0, 0, 0, 0.3) 0px -11px 20px 0px",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px -11px 20px 0px"
  },
  nowPlayingClosed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    padding: "10px 10px 62px 10px"
  },
  nowPlayingText: { fontSize: "1em", fontWeight: "100" }
};

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const AppContext = React.createContext({
  Library: null,
  User: {
    name: undefined,
    User: undefined,
    img: undefined
  },
  spotifyAccess: false,
  soundcloudAccess: false
});

const variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

const AnimateTabChange = props => (
  <motion.div
    onAnimationStart={props.animating}
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="exit"
    transition={{
      duration: 0.2
    }}
  >
    {props.children}
  </motion.div>
);

class App extends Component {
  constructor(props) {
    super(props);

    window.db = new Dexie("macrobeat");
    window.db.version(1).stores({
      user: "ID"
    });

    this.state = {
      tab: 0,
      User: {
        user: undefined,
        img: undefined
      },
      spotifyAccess: false,
      Queue: null,
      Library: null,
      loading: false,
      animating: false,
      nowPlayingOpen: false,
      contextOpen: false,
      contextItems: [],
      collectionOpen: false,
      collectionItem: null,
      collectionType: "",
      queueOpen: false,
      showScrollToTop: false,
      playing: false,
      socket: io(),
      firstLoginOpen: false,
      settingsOpen: false,
      users: [],
      userID: null,
      kicked: false,
      currentTimestamp: 0,
      currentDuration: 0,
      repeatState: false,
      volume: 100
    };
  }

  getData = async () => {
    this.setState({ loading: true });

    //Replace with actual fetch
    // setTimeout(() => {
    //   const library = new Library([], []);
    //   this.setState({
    //     Library: library,
    //     User: {
    //       user: "Burgy",
    //       img: "https://i.imgur.com/nKuE1ep.jpg"
    //     },
    //     Queue: new Queue(library.Songs, 0, this.state.socket)
    //   });

    //   this.setState({ loading: false });
    // }, 2000);
  };

  componentDidUpdate(prevProps, prevState) {
    Library;
    if (prevState.contextOpen !== this.state.contextOpen || prevState.nowPlayingOpen !== this.state.nowPlayingOpen) {
      if (this.state.contextOpen || this.state.nowPlayingOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }

  htmlNode = null;

  componentDidMount = async () => {
    this.getData();
    this.htmlNode = document.querySelectorAll("html")[0];
    this.htmlNode.addEventListener("wheel", this.scrollEvent, {
      capture: false,
      passive: true
    });

    let userID = await window.db.user.toArray();

    if (!userID || userID.length < 1) {
      userID = uuidv4();
      window.db.user.put({ ID: userID });
    } else {
      userID = userID.reduce((acc, row) => row).ID;
    }

    //Attempt login
    this.setState({ userID });
    this.state.socket.emit("init", { id: userID });

    //Set up event listeners
    this.state.socket.on("update", this.update);
    this.state.socket.on("init", this.handleLogIn);
    this.state.socket.on("reloadLibrary", this.reloadLibrary);
    this.state.socket.on("kicked", this.attemptKick);
  };

  attemptKick = ({ userKicked, Kicker }) => {
    if (userKicked === this.state.userID) {
      this.setState({
        kicked: true,
        kickedBy: Kicker
      });
    }
  };

  reloadLibrary = songs => {
    const library = new Library(songs, []);
    this.setState({ Library: library });
  };

  handleLogIn = data => {
    if (!data.loggedIn) {
      this.setState({ firstLoginOpen: true });
    } else {
      this.setState({
        User: data.User,
        firstLoginOpen: false,
        Library: data.hasOwnProperty("library")
          ? new Library(data.library, [])
          : this.state.Library,
        loading: false,
        spotifyAccess: data.hasOwnProperty("spotify")
          ? data.spotify
          : this.state.spotifyAccess
      });
    }
  };

  scrollEvent = e => {
    if (this.htmlNode.scrollTop > 50) {
      this.setState({ showScrollToTop: true });
    } else {
      this.setState({ showScrollToTop: false });
    }
  };

  scrollToTop = () => {
    this.setState({ showScrollToTop: false });
    this.htmlNode.scrollTo(0, 0);
  };

  setTab = tab => this.setState({ tab });

  setAnimating = () => {
    document.body.style.overflow = "hidden";

    setTimeout(() => (document.body.style.overflow = "unset"), 500);
  };

  update = ({ queue, currentSong, playing, users, timestamp, duration, repeat, volume }) => {

    this.setState({
      Queue: new Queue(queue, currentSong, this.state.socket),
      playing,
      users,
      volume,
      currentTimestamp: timestamp,
      currentDuration: duration,
      repeatState: repeat,
      volume
    }, this.richMediaNotification);
  };

  audioTag = null;
  setUpNotification = () => {
    if (!this.audioTag && navigator.mediaSession) {
      this.audioTag = document.createElement('audio');
      document.body.appendChild(this.audioTag);
      this.audioTag.src = "https://raw.githubusercontent.com/anars/blank-audio/master/10-seconds-of-silence.mp3";
      this.audioTag.loop = true;
      this.audioTag.play();
    }
  }

  richMediaNotification = () => {
    if (this.audioTag && navigator.mediaSession) {

      let { playing } = this.state;
      playing ? this.audioTag.play() : this.audioTag.pause()
      let song = this.state.Queue.CurrentSong;
      
      if (song && (!navigator.mediaSession.metadata || song.Name !== navigator.mediaSession.metadata.title)) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: song.Name,
          artist: song.Artist,
          album: song.Album,
          artwork: [{ src: song.Image }]
        });

        navigator.mediaSession.playbackState = playing ? "playing" : "paused"

        navigator.mediaSession.setActionHandler('previoustrack', () => this.state.socket.emit("prevTrack"));
        navigator.mediaSession.setActionHandler('nexttrack', () => this.state.socket.emit("nextTrack"));
        navigator.mediaSession.setActionHandler('play', () => { this.audioTag.play(); this.state.socket.emit("playpause") });
        navigator.mediaSession.setActionHandler('pause', () => { this.audioTag.pause(); this.state.socket.emit("playpause") });
      }
    }
  }

  reorderQueue = queue => {
    this.setState(
      {
        Queue: new Queue(
          queue,
          this.state.Queue.CurrentSongIndex,
          this.state.socket
        )
      },
      () => this.state.socket.emit("reorder", queue)
    );
  };

  toggleNowPlaying = () => {
    this.setState(s => ({ nowPlayingOpen: !s.nowPlayingOpen }));
    this.state.socket.emit("getupdate");
  };

  getTab = () => {
    switch (this.state.tab) {
      case 0:
        return (
          <AnimateTabChange animating={this.setAnimating} key="home">
            <Home toggleNowPlaying={this.toggleNowPlaying} />
          </AnimateTabChange>
        );
      case 1:
        return (
          <AnimateTabChange animating={this.setAnimating} key="artists">
            <Artists />
          </AnimateTabChange>
        );
      case 2:
        return (
          <AnimateTabChange animating={this.setAnimating} key="albums">
            <Albums />
          </AnimateTabChange>
        );
      case 3:
        return (
          <AnimateTabChange animating={this.setAnimating} key="songs">
            <Songs />
          </AnimateTabChange>
        );
      case 4:
        return (
          <AnimateTabChange animating={this.setAnimating} key="search">
            <Search />
          </AnimateTabChange>
        );
    }
  };

  navbarItems = () => [
    <IconButton
      label="Home"
      id="home"
      icon={MdHome}
      color={this.state.tab === 0 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(0)}
    />,
    <IconButton
      label="Artists"
      id="artists"
      icon={MdMicrophone}
      color={this.state.tab === 1 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(1)}
    />,
    <IconButton
      label="Albums"
      id="albums"
      icon={MdDisc}
      color={this.state.tab === 2 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(2)}
    />,
    <IconButton
      label="Songs"
      id="songs"
      icon={MdMusicalNote}
      color={this.state.tab === 3 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(3)}
    />,
    <IconButton
      label="Search"
      id="search"
      icon={MdSearch}
      color={this.state.tab === 4 ? "black" : "#7d7d7d"}
      onClick={() => this.setTab(4)}
    />
  ];

  contextItems = type => {
    type = type.toLowerCase();
    switch (type) {
      case "song":
        return [
          {
            key: "next",
            title: "Play next",
            onClick: () => {
              this.state.Queue.PlayNext(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: MdMusicalNote
          },
          {
            key: "queue",
            title: "Add to queue",
            onClick: () => {
              this.state.Queue.AddToQueue(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: IosList
          },
          {
            key: "library",
            title: "Remove song library",
            onClick: () => {
              this.state.Queue.RemoveFromLibrary(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: IosRemoveCircleOutline
          },
          {
            key: "artist",
            title: "Go to artist",
            onClick: item => {
              this.openCollection(
                this.state.Library.getArtist(item.Artist),
                "artist"
              );
              this.closeContextMenu();
            },
            icon: MdMicrophone
          },
          {
            key: "album",
            title: "Go to album",
            onClick: item => {
              this.openCollection(
                this.state.Library.getAlbum(item.Album),
                "album"
              );
              this.closeContextMenu();
            },
            icon: MdDisc
          },
          {
            key: "share",
            title: "Share",
            onClick: () => {
              console.log("Share");
              this.closeContextMenu();
            },
            icon: MdShareAlt
          }
        ];
      case "queue":
        return [
          {
            key: "next",
            title: "Play next",
            onClick: () => {
              this.state.Queue.PlayNext(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: MdMusicalNote
          },
          {
            key: "queue",
            title: "Remove from queue",
            onClick: () => {
              this.state.Queue.RemoveFromQueue(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: IosRemoveCircleOutline
          },
          {
            key: "artist",
            title: "Go to artist",
            onClick: item => {
              this.openCollection(
                this.state.Library.getArtist(item.Artist),
                "artist"
              );
              this.closeContextMenu();
            },
            icon: MdMicrophone
          },
          {
            key: "album",
            title: "Go to album",
            onClick: item => {
              this.openCollection(
                this.state.Library.getAlbum(item.Album),
                "album"
              );
              this.closeContextMenu();
            },
            icon: MdDisc
          },
          {
            key: "share",
            title: "Share",
            onClick: () => {
              console.log("Share");
              this.closeContextMenu();
            },
            icon: MdShareAlt
          }
        ];
      case "searchsong":
        return [
          {
            key: "next",
            title: "Play next",
            onClick: () => {
              this.state.Queue.PlayNext(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: MdMusicalNote
          },
          {
            key: "queue",
            title: "Add to queue",
            onClick: () => {
              this.state.Queue.AddToQueue(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: IosList
          },
          {
            key: "library",
            title: "Add song to library",
            onClick: () => {
              this.state.Queue.AddToLibrary(this.state.contextSelection);
              this.closeContextMenu();
            },
            icon: IosAddCircleOutline
          },
          {
            key: "share",
            title: "Share",
            onClick: () => {
              console.log("Share");
              this.closeContextMenu();
            },
            icon: MdShareAlt
          }
        ];
      case "album":
        return [
          {
            key: "next",
            title: "Play album next",
            onClick: () => {
              this.state.Queue.PlaySongsNext(this.state.contextSelection.Songs);
              this.closeContextMenu();
            },
            icon: MdMusicalNote
          },
          {
            key: "queue",
            title: "Add all songs to queue",
            onClick: () => {
              this.state.Queue.AddSongsToQueue(
                this.state.contextSelection.Songs
              );
              this.closeContextMenu();
            },
            icon: IosList
          },
          {
            key: "artist",
            title: "Go to artist",
            onClick: item => {
              this.openCollection(
                this.state.Library.getArtist(item.Artist),
                "artist"
              );
              this.closeContextMenu();
            },
            icon: MdMicrophone
          },
          {
            key: "library",
            title: "Remove album from library",
            onClick: () => {
              this.state.Queue.RemoveFromAlbumLibrary(
                this.state.contextSelection
              );
              this.closeContextMenu();
            },
            icon: IosRemoveCircleOutline
          }
          // {
          //   key: "share",
          //   title: "Share",
          //   onClick: () => { console.log("Share"); this.closeContextMenu(); },
          //   icon: MdShareAlt
          // }
        ];
      case "artist":
        return [
          {
            key: "next",
            title: "Play all artist's songs next",
            onClick: () => {
              this.state.Queue.PlaySongsNext(this.state.contextSelection.Songs);
              this.closeContextMenu();
            },
            icon: MdMusicalNote
          },
          {
            key: "queue",
            title: "Add all artist's songs to queue",
            onClick: () => {
              this.state.Queue.AddSongsToQueue(
                this.state.contextSelection.Songs
              );
              this.closeContextMenu();
            },
            icon: IosList
          },
          {
            key: "library",
            title: "Remove artist from library",
            onClick: () => {
              this.state.Queue.RemoveFromArtistLibrary(
                this.state.contextSelection
              );
              this.closeContextMenu();
            },
            icon: IosRemoveCircleOutline
          }
          // {
          //   key: "share",
          //   title: "Share",
          //   onClick: () => { console.log("Share"); this.closeContextMenu(); },
          //   icon: MdShareAlt
          // }
        ];
      default:
        return [];
    }
  };

  openContextMenu = (item, type) => {
    //attach item to command

    let items = [];

    items = this.contextItems(type);

    items.map(item => { });

    this.setState({
      contextOpen: true,
      contextItems: items,
      contextSelection: item,
      contextType: type
    });
  };

  closeContextMenu = () =>
    this.setState({ contextOpen: false, contextItems: [] });

  openCollection = (item, type) => {
    this.setState({
      contextOpen: false,
      collectionOpen: true,
      collectionItem: item,
      collectionType: type
    });
  };

  closeCollection = () =>
    this.setState({ collectionOpen: false, collectionItem: null });

  openQueue = () => {
    this.setState({ queueOpen: true });
  };

  closeQueue = () => {
    this.setState({ queueOpen: false });
  };

  openWelcomePage = () => {
    this.setState({ firstLoginOpen: true });
  };

  setSettingsState = state => {
    this.setState({ settingsOpen: state });
  };

  setCollectionImage = (type, name, image) => {
    const { socket } = this.state;

    switch (type) {
      case "album":
        socket.emit("setAlbumImage", { name, image });
        break;
      case "artist":
        socket.emit("setArtistImage", { name, image });
        break;
    }
  };

  render() {
    let {
      tab,
      User,
      Library,
      loading,
      Queue,
      playing,
      nowPlayingOpen,
      contextOpen,
      contextItems,
      contextSelection,
      contextType,
      collectionOpen,
      collectionItem,
      collectionType,
      queueOpen,
      spotifyAccess,
      userID,
      users,
      currentTimestamp,
      currentDuration,
      repeatState,
      volume
    } = this.state;

    const context = {
      User,
      Library,
      Queue,
      loading,
      contextOpen,
      openContextMenu: this.openContextMenu,
      openCollection: this.openCollection,
      openQueue: this.openQueue,
      identify: this.openWelcomePage,
      socket: this.state.socket,
      settingsOpen: this.setSettingsState,
      spotifyAccess,
      userID,
      users,
      currentTimestamp,
      currentDuration,
      repeatState,
      volume
    };

    return (
      <div onClick={this.setUpNotification}>
        <AppContext.Provider value={context}>
          {this.state.kicked && (
            <YouveBeenKicked kickedBy={this.state.kickedBy} />
          )}

          <AnimatePresence exitBeforeEnter>{this.getTab()}</AnimatePresence>

          <AnimatePresence>
            <CollectionView
              key={JSON.stringify(collectionItem)}
              open={collectionOpen}
              item={collectionItem}
              close={this.closeCollection}
              type={collectionType}
              setImage={this.setCollectionImage}
            />
          </AnimatePresence>

          <ContextMenu
            open={contextOpen}
            items={contextItems}
            close={this.closeContextMenu}
            selected={contextSelection}
            type={contextType}
          />

          <AnimatePresence>
            {queueOpen && (
              <PlayingQueue
                key="queue"
                close={this.closeQueue}
                reorderQueue={this.reorderQueue}
                queue={this.state.Queue}
              />
            )}
          </AnimatePresence>

          {!collectionOpen && (
            <React.Fragment>
              {Queue && Queue.Array.length > 0 && (
                <motion.div
                  style={{
                    ...styles.tabbar,
                    ...styles.nowPlaying
                  }}
                  key="nowPlayingContainer"
                  initial={{
                    zIndex: 20
                  }}
                  animate={{
                    top: nowPlayingOpen ? 0 : "unset",
                    zIndex: nowPlayingOpen ? 22 : 20
                  }}
                >
                  {nowPlayingOpen ? (
                    <NowPlaying
                      volume={volume}
                      playing={playing}
                      timestamp={currentTimestamp}
                      duration={currentDuration}
                      toggleNowPlaying={this.toggleNowPlaying}
                      key="open"
                    />
                  ) : (
                      <div
                        onClick={this.toggleNowPlaying}
                        key="closed"
                        style={styles.nowPlayingClosed}
                      >
                        <Header style={styles.nowPlayingText}>Now Playing</Header>
                        <IosArrowUp fontSize={"1em"} color={"black"} />
                      </div>
                    )}
                </motion.div>
              )}
              <div style={styles.tabbar}>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{
                    scaleY: nowPlayingOpen ? 0 : 1,
                    opacity: nowPlayingOpen ? 0 : 1
                  }}
                >
                  <SegmentedControl
                    items={this.navbarItems()}
                    selectedItemIndex={tab}
                    onChange={({ activeIndex }) => this.setTab(activeIndex)}
                  />
                </motion.div>
              </div>
              <AnimatePresence>
                {this.state.showScrollToTop && (
                  <ScrollToTop key={"scroller"} onClick={this.scrollToTop} />
                )}
              </AnimatePresence>
            </React.Fragment>
          )}

          <AnimatePresence>
            {this.state.settingsOpen && <Settings key="settings" />}
            {this.state.firstLoginOpen && <NewUser key="welcom" />}
          </AnimatePresence>
        </AppContext.Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
export { AppContext };
