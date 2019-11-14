import React, { Component } from "react";
import IosArrowLeft from "react-ionicons/lib/IosArrowBack";
import IosMore from "react-ionicons/lib/IosMore";
import { AppContext } from "../app";
import Loader from "react-loaders";
import { motion } from "framer-motion";
import { Header, Text, Mask } from "../Components/WrapperComponents";

const styles = {
  container: {
    zIndex: 29,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  headingText: {
    fontSize: "1.9em",
    fontWeight: "400",
    color: "#083072"
  },
  previewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "0.5em",
    marginTop: "0.5em"
  },
  previewImage: {
    minHeight: 150,
    minWidth: 150,
    borderRadius: 15,
    padding: 3,
    backgroundSize: "cover"
  },
  previewTextContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0.5em",
    marginTop: "0.5em"
  },
  previewTextHeader: {
    fontSize: "2.3em",
    padding: 3,
    fontWeight: "500"
  },
  previewTextSub: {
    fontSize: "1.3em",
    padding: 3,
    fontWeight: "100"
  },
  songsContainer: {
    marginBottom: "0.5em",
    marginTop: "0.5em"
  },
  song: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "0.2em",
    marginTop: "0.2em",
    padding: 5,
  },
  songImage: {
    minHeight: 40,
    minWidth: 40,
    borderRadius: 15,
    padding: 3,
    backgroundSize: "cover"
  },
  songInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    wordBreak: 'break-all',
    padding: 10,
    width: "100%"
  },
  songTitle: {
    fontSize: "1em",
    wordWrap: 'break-word',
    padding: 1,
    fontWeight: "500"
  },
  songArtist: {
    fontSize: "0.75em",
    wordWrap: 'break-word',
    padding: 1,
    fontWeight: "500",
    fontColour: "#EEE"
  },
  more: {
    width: "4em",
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 8,
    textAlign: "center"
  }
};

const Song = props => {
  let style = JSON.parse(JSON.stringify(styles.song));
  if(props.playing === true) {style.background = "#EFEFEF";}
  else {style.background = "#FFF";}

  return (
    <AppContext.Consumer>
      {context => (
        <motion.div
          style={{...props.style, ...style}}
          className={props.isDragging ? "dragging" : ""}
          onClick={(e) => {e.stopPropagation(); context.openContextMenu(props.song, props.type || "song")}}
        >
          <div
            style={{
              background: `url(${props.song.Image}) center no-repeat`,
              ...styles.songImage
            }}
          />
          <div style={styles.songInfo}>
            <Header style={styles.songTitle}>{props.song.Name}</Header>
            <Text style={styles.songArtist}>{props.song.Artist}</Text>
          </div>
        </motion.div>
      )}
    </AppContext.Consumer>
  );
};

class CollectionView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  variants = {
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
        delay: 0.4
      }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    }
  };

  render() {
    let { item, type, open, close } = this.props;

    if (!open) {
      return <React.Fragment />;
    }

    let sub = item.Artist;

    if (type === "artist") sub = "";

    return (
      <AppContext.Consumer>
        {context =>
          context.loading ? (
            <div style={styles.loaderContainer}>
              <Loader type="ball-scale" color="black" />
            </div>
          ) : (
            <motion.div style={styles.container} variants={this.variants} initial="hidden" animate="visible" exit="hidden">
              <div style={styles.previewContainer}>
                <div style={{ padding: "0.5em" }}>
                  <IosArrowLeft
                    fontSize="1.75em"
                    color="black"
                    onClick={close}
                  />
                </div>
                <div style={styles.song}>
                  <div
                    style={{
                      ...styles.previewImage,
                      background: `url(${item.Image}) center no-repeat`
                    }}
                  />
                  <div style={styles.songInfo}>
                    <Header style={styles.previewTextHeader}>
                      {item.Name}
                    </Header>
                    <Header style={styles.previewTextSub}>{sub}</Header>
                    <div style={styles.more} onClick={() => context.openContextMenu(item, type)}>
                      <IosMore
                        fontSize="1em"
                        color="black"
                        onClick={() => context.openContextMenu(item, type)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={styles.songsContainer}>
                {item.Songs.map((song, index) => (
                  <Song key={index} song={song} />
                ))}
              </div>
            </motion.div>
          )
        }
      </AppContext.Consumer>
    );
  }
}

export {CollectionView, Song}
export default CollectionView;
