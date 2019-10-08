import React, { Component } from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import "loaders.css//loaders.css";
import { SegmentedControl, Text } from "gestalt";
import IconButton from "./Components/IconButton";

import Home from "./Home/Home";
import NowPlaying from "./NowPlaying/NowPlaying";

import Library from "./View Models/Library";
import Queue from "./View Models/Queue";
import Artists from "./Artists/Artists";
import Albums from "./Albums/Albums";
import Songs from "./Songs/Songs";
import Search from "./Search/Search";

import MdHome from "react-ionicons/lib/MdHome";
import MdMicrophone from "react-ionicons/lib/MdMicrophone";
import MdDisc from "react-ionicons/lib/MdDisc";
import MdMusicalNote from "react-ionicons/lib/MdMusicalNote";
import IosList from "react-ionicons/lib/IosList";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline";
import MdShareAlt from "react-ionicons/lib/MdShareAlt";
import MdSearch from "react-ionicons/lib/MdSearch";
import IosArrowUp from "react-ionicons/lib/IosArrowUp";
import { AnimatePresence, motion } from "framer-motion";
import ContextMenu from "./Components/ContextMenu";
import CollectionView from "./Components/CollectionView";
import { Header } from "./Components/WrapperComponents";
import PlayingQueue from "./NowPlaying/PlayingQueue";

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

const AppContext = React.createContext({
  Library: null,
  User: {
    name: undefined,
    User: undefined,
    img: undefined
  }
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

    this.state = {
      tab: 0,
      User: {
        name: undefined,
        user: undefined,
        img: undefined
      },
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
      queueOpen: false
    };
  }

  getData = async () => {
    this.setState({ loading: true });

    //Replace with actual fetch
    setTimeout(() => {
      const library = new Library([], []);
      this.setState({
        Library: library,
        User: {
          name: "Evan Burgess",
          user: "Burgy",
          img: "https://i.imgur.com/nKuE1ep.jpg"
        },
        Queue: new Queue(library.Songs, 0)
      });

      this.setState({ loading: false });
    }, 2000);
  };

  componentDidUpdate(prevProps, prevState) {
    Library;
    if (prevState.contextOpen !== this.state.contextOpen) {
      if (this.state.contextOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
  }

  componentDidMount() {
    this.getData();
  }

  setTab = tab => this.setState({ tab });

  setAnimating = () => {
    document.body.style.overflow = "hidden";

    setTimeout(() => (document.body.style.overflow = "unset"), 500);
  };

  toggleNowPlaying = () =>
    this.setState(s => ({ nowPlayingOpen: !s.nowPlayingOpen }));

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
            <Search/>
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

  contextItems = {
    song: [
      {
        key: "next",
        title: "Play next",
        onClick: () => console.log("Next"),
        icon: MdMusicalNote
      },
      {
        key: "queue",
        title: "Add to queue",
        onClick: () => console.log("Queue"),
        icon: IosList
      },
      {
        key: "library",
        title: "Add song to library",
        onClick: () => console.log("Library"),
        icon: IosAddCircleOutline
      },
      {
        key: "artist",
        title: "Go to artist",
        onClick: item =>
          this.openCollection(
            this.state.Library.getArtist(item.Artist),
            "artist"
          ),
        icon: MdMicrophone
      },
      {
        key: "album",
        title: "Go to album",
        onClick: item =>
          this.openCollection(this.state.Library.getAlbum(item.Album), "album"),
        icon: MdDisc
      },
      {
        key: "share",
        title: "Share",
        onClick: () => console.log("Share"),
        icon: MdShareAlt
      }
    ],
    album: [
      {
        key: "next",
        title: "Play album next",
        onClick: () => console.log("Next"),
        icon: MdMusicalNote
      },
      {
        key: "queue",
        title: "Add all songs to queue",
        onClick: () => console.log("Queue"),
        icon: IosList
      },
      {
        key: "artist",
        title: "Go to artist",
        onClick: item =>
          this.openCollection(
            this.state.Library.getArtist(item.Artist),
            "artist"
          ),
        icon: MdMicrophone
      },
      {
        key: "share",
        title: "Share",
        onClick: () => console.log("Share"),
        icon: MdShareAlt
      }
    ],
    artist: [
      {
        key: "next",
        title: "Play all artist's songs next",
        onClick: () => console.log("Next"),
        icon: MdMusicalNote
      },
      {
        key: "queue",
        title: "Add all artist's songs to queue",
        onClick: () => console.log("Queue"),
        icon: IosList
      },
      {
        key: "share",
        title: "Share",
        onClick: () => console.log("Share"),
        icon: MdShareAlt
      }
    ]
  };

  openContextMenu = (item, type) => {
    //attach item to command

    let items = [];

    if (this.contextItems.hasOwnProperty(type)) items = this.contextItems[type];

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

  render() {
    let {
      tab,
      User,
      Library,
      loading,
      Queue,
      nowPlayingOpen,
      contextOpen,
      contextItems,
      contextSelection,
      contextType,
      collectionOpen,
      collectionItem,
      collectionType,
      queueOpen
    } = this.state;

    const context = {
      User,
      Library,
      Queue,
      loading,
      contextOpen,
      openContextMenu: this.openContextMenu,
      openCollection: this.openCollection,
      openQueue: this.openQueue
    };

    return (
      <AppContext.Provider value={context}>
        {!nowPlayingOpen && !collectionOpen && (
          <AnimatePresence exitBeforeEnter>{this.getTab()}</AnimatePresence>
        )}

        {collectionOpen && (
          <AnimatePresence>
            <CollectionView
              key={JSON.stringify(collectionItem)}
              open={collectionOpen}
              item={collectionItem}
              close={this.closeCollection}
              type={collectionType}
            />
          </AnimatePresence>
        )}

        <ContextMenu
          open={contextOpen}
          items={contextItems}
          close={this.closeContextMenu}
          selected={contextSelection}
          type={contextType}
        />

        <AnimatePresence>
          {queueOpen && <PlayingQueue key="queue" close={this.closeQueue} />}
        </AnimatePresence>

        {!collectionOpen && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
export { AppContext };
