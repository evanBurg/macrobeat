import React, { Component } from "react";
import IosArrowLeft from "react-ionicons/lib/IosArrowBack";
import MdList from "react-ionicons/lib/MdList";
import MdSkipForward from "react-ionicons/lib/MdSkipForward";
import MdSkipBackward from "react-ionicons/lib/MdSkipBackward";
import MdPlay from "react-ionicons/lib/MdPlay";
import { Text } from "gestalt";
import { AppContext } from "../app";
import ColorThief from "colorthief";
import Loader from "react-loaders";

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
    marginBottom: 15
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
    marginBottom: 15
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    justifyContent: "space-around",
    textAlign: "center",
    alignItems: "center"
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

class Record extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      colour: "#efefef",
      thief: new ColorThief()
    };
  }

  getColour = async url => {
    this.setState({ loading: true });

    //Actual fetch

    this.setState({ loading: false });
    return "rgb(44, 65, 167)";
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
      <div style={{ position: "relative" }}>
        <div
          className="Pj7 sLG XiG pJI INd m1e"
          style={{
            width: 40,
            height: 40,
            left: "5.6em",
            top: "5.6em",
            position: "absolute"
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
        <div
          style={{
            background: `url(${this.props.image})`,
            backgroundSize: "cover",
            boxShadow: `0px 0px 27px -10px ${this.state.color}`,
            backgroundPosition: "center",
            height: 225,
            width: 225,
            borderRadius: 225 / 2
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

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div style={styles.container}>
            <div style={styles.headerContainer}>
              <IosArrowLeft
                fontSize="1.75em"
                color="black"
                onClick={this.props.toggleNowPlaying}
              />
              <h5
                className="lH1 dyH iFc SMy kON pBj IZT"
                style={{ fontSize: "1.9em", fontWeight: "400" }}
              >
                Now Playing
              </h5>
              <MdList fontSize="1.75em" color="black" />
            </div>
            <div style={styles.container}>
              <div style={styles.infoContainer}>
                <Record image={this.getImage(context)} />
                <h4
                  className="lH1 dyH iFc SMy kON pBj IZT"
                  style={{ fontSize: "1.7em", textAlign: "center" }}
                >
                  {this.getTitle(context)}
                </h4>
                <h5
                  className="lH1 dyH iFc SMy kON pBj IZT"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "100",
                    textAlign: "center"
                  }}
                >
                  {this.getArtist(context)}
                </h5>

                <div style={styles.scrubbingContainer}>
                  <Text>0:00</Text>
                  <img
                    style={{ width: "50%" }}
                    src="https://i.imgur.com/gTEOGFo.png"
                  />
                  <Text>4:52</Text>
                </div>
              </div>

              <div style={styles.controlsContainer}>
                <MdSkipBackward
                  fontSize="1.75em"
                  color="black"
                  onClick={this.props.toggleNowPlaying}
                />
                <MdPlay
                  fontSize="1.75em"
                  color="black"
                  onClick={this.props.toggleNowPlaying}
                />
                <MdSkipForward
                  fontSize="1.75em"
                  color="black"
                  onClick={this.props.toggleNowPlaying}
                />
              </div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default NowPlaying;
