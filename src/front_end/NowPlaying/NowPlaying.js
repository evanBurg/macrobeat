import React, { Component } from "react";
import IosArrowLeft from "react-ionicons/lib/IosArrowBack";
import MdList from "react-ionicons/lib/MdList";
import MdSkipForward from "react-ionicons/lib/MdSkipForward";
import MdSkipBackward from "react-ionicons/lib/MdSkipBackward";
import MdPlay from "react-ionicons/lib/MdPlay";
import { AppContext } from "../app";
import Loader from "react-loaders";
import { motion } from "framer-motion";

let styles = {
  container: {
    marginBottom: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100vw",
    textAlign: "center",
    alignItems: "center",
    marginBottom: "0.5em",
    marginTop: "0.5em"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },
  scrubbingContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center",
    marginTop: "3.5em",
    marginBottom: "2.5em"
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "space-around",
    textAlign: "center",
    alignItems: "center",
    marginTop: "1.5em",
    marginBottom: "1.5em"
  },
  loaderContainer: {
    width: "100%",
    margin: 25,
    height: "10em",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    verticalAlign: "middle",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  }
};

const WaveForm = props => {
  let points = [];

  for (let i = 0; i < props.columns; i++) {
    points.push(
      <div
        key={i}
        style={{
          width: "0.4em",
          height: `${Math.floor(Math.random() * 50) + 10}px`,
          borderRadius: 100,
          backgroundColor: "#7b8494",
          margin: "0.15em",
          padding: "0.04em"
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
      }}
    >
      {points}
    </div>
  );
};

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      colour: "#efefef"
    };
  }

  getColour = async url => {
    this.setState({ loading: true });

    //Actual fetch

    this.setState({ loading: false });
    return "rgba(183, 93, 41, 0.64)";
  };

  componentDidMount = async () => {
    this.setState({
      color: await this.getColour(this.props.image)
    });
  };

  componentDidUpdate = async (pProps, pState) => {
    if (pProps.image !== this.props.image) {
      this.setState({
        color: await this.getColour(this.props.image)
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div style={styles.loaderContainer}>
          <Loader type="ball-scale" color="black" />
        </div>
      );
    }

    return (
      <div style={{ position: "relative", padding: "1.4em" }}>
        <div
          className="Pj7 sLG XiG pJI INd m1e"
          style={{
            width: 40,
            height: 40,
            left: "7.15em",
            top: "7.15em",
            position: "absolute",
            zIndex: 23
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              width: 40,
              height: 40
            }}
          />
        </div>
        <motion.div
          style={{
            background: `url(${this.props.image}) center center no-repeat`,
            boxShadow: `0px 0px 100px 10px ${this.state.color}`,
            height: 225,
            width: 225,
            borderRadius: 225 / 2
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: this.props.playing ? 360 : 0 }}
          transition={{
            type: "tween",
            loop: Infinity,
            repeatDelay: 0,
            duration: 4,
            ease: "linear"
          }}
        />
      </div>
    );
  }
}

class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  getImage = context => {
    if (
      !context ||
      !context.Queue ||
      context.Queue.Empty ||
      !context.Queue.CurrentSong
    ) {
      return "";
    }

    return context.Queue.CurrentSong.Image.url;
  };

  getTitle = context => {
    if (
      !context ||
      !context.Queue ||
      context.Queue.Empty ||
      !context.Queue.CurrentSong
    ) {
      return "";
    }

    if (context.Queue.CurrentSong.Name.length > 40) {
      return context.Queue.CurrentSong.Name.substr(0, 37) + "...";
    }

    return context.Queue.CurrentSong.Name;
  };

  getArtist = context => {
    if (
      !context ||
      !context.Queue ||
      context.Queue.Empty ||
      !context.Queue.CurrentSong
    ) {
      return "";
    }

    if (context.Queue.CurrentSong.Artist.length > 20) {
      return context.Queue.CurrentSong.Artist.substr(0, 17) + "...";
    }

    return context.Queue.CurrentSong.Artist;
  };

  getNext = context => {
    if (
      !context ||
      !context.Queue ||
      context.Queue.Empty ||
      !context.Queue.NextSong
    ) {
      return "";
    }

    if (context.Queue.NextSong.Name.length > 20) {
      return context.Queue.NextSong.Name.substr(0, 17) + "...";
    }

    return context.Queue.CurrentSong.Name;
  };

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div style={styles.container}>
            <div style={styles.headerContainer}>
              <div style={{ padding: "0.5em" }}>
                <IosArrowLeft
                  fontSize="1.75em"
                  color="#083072"
                  onClick={this.props.toggleNowPlaying}
                />
              </div>
              <h5
                className="lH1 dyH iFc SMy kON pBj IZT"
                style={{
                  fontSize: "1.9em",
                  fontWeight: "400",
                  color: "#083072"
                }}
              >
                Now Playing
              </h5>
              <div style={{ padding: "0.5em" }}>
                <MdList fontSize="1.75em" color="#083072" />
              </div>
            </div>
            <div style={styles.container}>
              <div style={styles.infoContainer}>
                <Record image={this.getImage(context)} playing />
                <h4
                  className="lH1 dyH iFc SMy kON pBj IZT"
                  style={{
                    fontSize: "1.7em",
                    textAlign: "center",
                    fontWeight: "500",
                    padding: "0 0.8em 0.1em 0.8em",
                    color: "#000F45"
                  }}
                >
                  {this.getTitle(context)}
                </h4>
                <h5
                  className="lH1 dyH iFc SMy kON pBj IZT"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "100",
                    color: "#8397C5",
                    textAlign: "center",
                    padding: "0.3em"
                  }}
                >
                  {this.getArtist(context)}
                </h5>

                <div style={styles.scrubbingContainer}>
                  <div style={{ padding: "0.8em" }}>
                    <div
                      className="tBJ dyH iFc SMy yTZ DrD IZT swG"
                      style={{ color: "#c6cad4", fontWeight: "500" }}
                    >
                      0:00
                    </div>
                  </div>
                  <WaveForm columns={22} />
                  <div style={{ padding: "0.8em" }}>
                    <div
                      className="tBJ dyH iFc SMy yTZ DrD IZT swG"
                      style={{ color: "#c6cad4", fontWeight: "500" }}
                    >
                      4:52
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.controlsContainer}>
                <MdSkipBackward
                  fontSize="2.2em"
                  color="#B9C1D1"
                  onClick={this.props.toggleNowPlaying}
                />
                <MdPlay
                  fontSize="4.75em"
                  color="#929CAF"
                  onClick={this.props.toggleNowPlaying}
                />
                <MdSkipForward
                  fontSize="2.2em"
                  color="#B9C1D1"
                  onClick={this.props.toggleNowPlaying}
                />
              </div>
            </div>
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#efefef",
                height: "4em",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div
                className="tBJ dyH iFc SMy yTZ DrD IZT swG"
                style={{ color: "#3f4e75", fontWeight: "500", margin: "1em" }}
              >
                Next Track
              </div>

              <div
                className="tBJ dyH iFc SMy yTZ DrD IZT swG"
                style={{ color: "#3f4e75", fontWeight: "500", margin: "1em" }}
              >
                {this.getNext(context)}
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default NowPlaying;
