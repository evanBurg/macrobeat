import React, { Component } from "react";
import ReactDOM from "react-dom";
import "gestalt/dist/gestalt.css";
import "loaders.css//loaders.css";
import { SegmentedControl, Text } from "gestalt";
import IconButton from "./Components/IconButton";

import Home from "./Home/Home";
import NowPlaying from "./NowPlaying/NowPlaying";
import Page from "./Components/Page";

import Library from "./View Models/Library";
import Queue from "./View Models/Queue";
import Artists from "./Artists/Artists";
import Albums from "./Albums/Albums";
import Songs from "./Songs/Songs";

import MdHome from "react-ionicons/lib/MdHome";
import MdMicrophone from "react-ionicons/lib/MdMicrophone";
import MdDisc from "react-ionicons/lib/MdDisc";
import MdMusicalNote from "react-ionicons/lib/MdMusicalNote";
import MdSearch from "react-ionicons/lib/MdSearch";
import IosArrowUp from "react-ionicons/lib/IosArrowUp";
import { AnimatePresence, motion } from "framer-motion";

//"./View Models/YouTubeSearch.json"

const Search = require("./View Models/YouTubeSearch.json");

const headingClass = "lH1 dyH iFc SMy kON pBj IZT";

const styles = {
  tabbar: {
    position: "fixed",
    background: "#efefef",
    zIndex: 21,
    paddingBottom: 2.5,
    bottom: 0,
    left: 0,
    right: 0,
    WebkitBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    MozBoxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)",
    boxShadow: "9px 10px 18px -14px rgba(0,0,0,0.75)"
  },
  nowPlaying: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "4.55em"
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
      nowPlayingOpen: false
    };
  }

  getData = async () => {
    this.setState({ loading: true });

    //Replace with actual fetch
    setTimeout(() => {
      const library = new Library(Search);
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
            <Page heading="Search" />
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

  render() {
    let { tab, User, Library, loading, Queue, nowPlayingOpen } = this.state;

    return (
      <AppContext.Provider value={{ User, Library, Queue, loading }}>
        {!nowPlayingOpen && (
          <AnimatePresence exitBeforeEnter>{this.getTab()}</AnimatePresence>
        )}
        <motion.div
          style={{
            ...styles.tabbar,
            ...styles.nowPlaying,
            padding: nowPlayingOpen ? 0 : 10,
            zIndex: nowPlayingOpen ? 22 : 20
          }}
          animate={{
            height: nowPlayingOpen ? "100%" : "75px",
            backgroundColor: nowPlayingOpen ? "#fff" : "#efefef"
          }}
        >
          {nowPlayingOpen ? (
            <NowPlaying toggleNowPlaying={this.toggleNowPlaying} />
          ) : (
            <React.Fragment>
              <h5 className={headingClass} style={styles.nowPlayingText}>
                Now Playing
              </h5>
              <IosArrowUp
                fontSize={"1em"}
                color={"black"}
                onClick={this.toggleNowPlaying}
              />
            </React.Fragment>
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
      </AppContext.Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react-root"));
export { AppContext };
