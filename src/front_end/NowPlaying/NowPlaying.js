import React, { Component } from "react";
import IosArrowLeft from "react-ionicons/lib/IosArrowBack";
import MdList from "react-ionicons/lib/MdList";
import MdSkipForward from "react-ionicons/lib/MdSkipForward";
import MdSkipBackward from "react-ionicons/lib/MdSkipBackward";
import MdPlay from "react-ionicons/lib/MdPlay";
import { AppContext } from "../app";
import Loader from "react-loaders";
import { motion } from "framer-motion";
import { Header, Text, Mask } from "../Components/WrapperComponents";

const styles = {
  container: {
    marginBottom: "0.6em",
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
  headingText: {
    fontSize: "1.9em",
    fontWeight: "400",
    color: "#083072"
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
    marginTop: "1.5em",
    marginBottom: "1.5em"
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "space-around",
    textAlign: "center",
    alignItems: "center",
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
  },
  waveFormContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  waveFormPoint: {
    width: "0.4em",
    borderRadius: 100,
    backgroundColor: "#7b8494",
    margin: "0.15em",
    padding: "0.04em",
    transition: "all 0.6s"
  },
  recordCenterContainer: {
    width: 25,
    height: 25,
    left: "5.8rem",
    top: "5.8rem",
    position: "absolute",
    zIndex: 23
  },
  recordCenter: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 25,
    height: 25
  },
  trackName: {
    fontSize: "1.3em",
    textAlign: "center",
    fontWeight: "500",
    padding: "0 0.8em 0.1em 0.8em",
    color: "#000F45"
  },
  artistName: {
    fontSize: "1.2em",
    fontWeight: "100",
    color: "#8397C5",
    textAlign: "center",
    padding: "0.3em"
  },
  timeText: {
    color: "#c6cad4",
    fontWeight: "500",
    fontSize: "1em"
  },
  nextContainer: {
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
  },
  nextText: { color: "#3f4e75", fontWeight: "500", margin: "1em" }
};

class WaveForm extends Component {
  state = {
    points: [],
    animating: false
  };

  getRandomHeight = () => Math.floor(Math.random() * 50) + 10;

  generatePoints = () => {
    let points = [];

    for (let i = 0; i < this.props.columns; i++) {
      points.push(
        <div
          key={i}
          style={{
            height: `${this.getRandomHeight()}px`,
            ...styles.waveFormPoint
          }}
        />
      );
    }

    //Always make sure there is one of the full height so that the container doesnt change size
    points[Math.round(points.length / 2)] = (
      <div
        key={"tall"}
        style={{
          height: `65px`,
          ...styles.waveFormPoint
        }}
      />
    );

    this.setState({ points });
  };

  interval = null;

  startLoop = () => {
    this.interval = setInterval(this.generatePoints, 600);
  };

  endLoop = () => {
    clearInterval(this.interval);
    this.generatePoints();
  };

  componentDidMount() {
    this.generatePoints();
    if (this.props.playing) {
      this.startLoop();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.columns !== this.props.columns) {
      this.generatePoints();
    }

    if (prevProps.playing !== this.props.playing) {
      if (this.props.playing) {
        this.startLoop();
      } else {
        this.endLoop();
      }
    }
  }

  render = () => (
    <div style={styles.waveFormContainer}>{this.state.points}</div>
  );
}

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
      <div style={{ position: "relative", padding: "1em" }}>
        <Mask style={styles.recordCenterContainer}>
          <div style={styles.recordCenter} />
        </Mask>
        <motion.div
          style={{
            background: `url(${this.props.image}) center center no-repeat`,
            boxShadow: `0px 0px 100px 10px ${this.state.color}`,
            height: 175,
            width: 175,
            borderRadius: 175 / 2
          }}
          initial={{ rotate: 0 }}
          animate={{ rotate: this.props.playing ? 360 : 0 }}
          transition={{
            type: "tween",
            loop: Infinity,
            repeatDelay: 0,
            duration: 15,
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

    if (context.Queue.CurrentSong.Name.length > 30) {
      return context.Queue.CurrentSong.Name.substr(0, 27) + "...";
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

  getViewport = () => {
    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight;

    return { width: x, height: y };
  };

  render() {
    const { width, height } = this.getViewport();

    return (
      <AppContext.Consumer>
        {context =>
          context.loading ? (
            <div style={styles.loaderContainer}>
              <Loader type="ball-scale" color="black" />
            </div>
          ) : (
            <div style={styles.container}>
              <div style={styles.headerContainer}>
                <div style={{ padding: "0.5em" }}>
                  <IosArrowLeft
                    fontSize="1.75em"
                    color="#083072"
                    onClick={this.props.toggleNowPlaying}
                  />
                </div>
                <Header style={styles.headingText}>Now Playing</Header>
                <div style={{ padding: "0.5em" }}>
                  <MdList fontSize="1.75em" color="#083072" onClick={context.openQueue} />
                </div>
              </div>
              <div style={styles.container}>
                <div style={styles.infoContainer}>
                  <Record image={this.getImage(context)} playing />
                  <Header style={styles.trackName}>
                    {this.getTitle(context)}
                  </Header>
                  <Header style={styles.artistName}>
                    {this.getArtist(context)}
                  </Header>

                  <div style={styles.scrubbingContainer}>
                    <div style={{ padding: "0.8em" }}>
                      <Text style={styles.timeText}>0:00</Text>
                    </div>
                    <WaveForm columns={Math.floor(width / 22)} playing />
                    <div style={{ padding: "0.8em" }}>
                      <Text style={styles.timeText}>4:52</Text>
                    </div>
                  </div>
                </div>
                <div>
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
              </div>
              {height > 607 && (
                <div style={styles.nextContainer} onClick={context.openQueue}>
                  <Text style={styles.nextText}>Next Track</Text>

                  <Text style={styles.nextText}>{this.getNext(context)}</Text>
                </div>
              )}
            </div>
          )
        }
      </AppContext.Consumer>
    );
  }
}

export default NowPlaying;
