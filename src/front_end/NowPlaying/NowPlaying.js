import React, { Component } from "react";
import IosArrowLeft from "react-ionicons/lib/IosArrowBack";
import MdList from "react-ionicons/lib/MdList";
import { Heading, Mask, Image } from "gestalt";
import { AppContext } from "../app";

let styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center"
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  scrubbingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    alignItems: "center"
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    textAlign: "center",
    alignItems: "center"
  }
};

class NowPlaying extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(styles);
    return (
      <AppContext.Consumer>
        {context => (
          <div style={styles.container}>
            <div style={styles.headerContainer}>
              <IosArrowLeft
                fontSize="3em"
                color="black"
                onClick={this.props.toggleNowPlaying}
              />
              <Heading size="md">Now Playing</Heading>
              <MdList fontSize="3em" color="black" />
            </div>
            <div style={styles.container}>
              <div style={styles.infoContainer}>
                <Mask shape="circle">
                  <img
                    alt="weakendclub.com"
                    src={context.Queue && context.Queue.Playing ? context.Queue.Playing.Image.url : ""}
                    style={{ maxWidth: "100%", display: "block" }}
                  />
                </Mask>
                <Heading size="sm">{context.Queue && context.Queue.Playing ? context.Queue.Playing.Name : ''}</Heading>
                <h5
                  className="lH1 dyH iFc SMy kON pBj IZT"
                  style={{ fontSize: "3em", fontWeight: "100" }}
                >
                  {context.Queue && context.Queue.Playing ? context.Queue.Playing.Artist : ''}
                </h5>
              </div>

              <div style={styles.controlsContainer} />
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default NowPlaying;
