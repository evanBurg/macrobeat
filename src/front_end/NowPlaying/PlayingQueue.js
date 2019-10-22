import React, { Component } from "react";
import { Song } from "../Components/CollectionView";
import Text from "../Components/WrapperComponents";
import MdRepeat from "react-ionicons/lib/MdRepeat";
import MdShuffle from "react-ionicons/lib/MdShuffle";
import IosArrowDown from "react-ionicons/lib/IosArrowDown";
import { AppContext } from "../app";
import { motion } from "framer-motion";

const styles = {
  container: {
    zIndex: 29,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  innerContainer: {
    zIndex: 29,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60vh",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    background: "#efefef",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 4,
    paddingBottom: 4
  },
  headerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  headerText: {
    fontSize: "1.6em",
    fontWeight: "500",
    padding: "1.3rem"
  },
  headerIcon: {
    padding: "1.3rem"
  },
  songsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    maxHeight: "80vh",
    overflowY: "auto",
    overflowX: "hidden"
  },
  songWrapper: {
    width: "100%",
    padding: 4
  }
};

class PlayingQueue extends Component {
  constructor(props) {
    super(props);
  }

  container = {
    hidden: {
      opacity: 0,
      transition: {
          when: "afterChildren"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren"
    }
    }
  };

  inner = {
    hidden: {
      y: 500
    },
    visible: {
      y: 0
    }
  };

  render() {
    return (
      <motion.div
        onClick={this.props.close}
        style={styles.container}
        variants={this.container}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          style={styles.innerContainer}
          variants={this.inner}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            damping: 20
          }}
        >
          <div style={styles.headerContainer} onClick={this.props.close}>
            <Text style={styles.headerText}>Up Next</Text>
            <div style={styles.headerIcons}>
              <div style={styles.headerIcon}>
                <MdRepeat fontSize="1.7em" color="black" />
              </div>
              <div style={styles.headerIcon}>
                <MdShuffle fontSize="1.7em" color="black" />
              </div>
              <div style={styles.headerIcon}>
                <IosArrowDown fontSize="1.7em" color="black" />
              </div>
            </div>
          </div>
          <div style={styles.songsContainer}>
            <AppContext.Consumer>
              {ctx =>
                ctx.Queue.Array.map((song, idx) => (
                  <div style={styles.songWrapper}>
                    <Song key={idx} song={song} />
                  </div>
                ))
              }
            </AppContext.Consumer>
          </div>
        </motion.div>
      </motion.div>
    );
  }
}

export default PlayingQueue;
