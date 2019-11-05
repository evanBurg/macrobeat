import React, { Component } from "react";
import { TextField, Box, Label } from "gestalt";
import { Text, Header } from "./WrapperComponents";
import {motion} from 'framer-motion'

const styles = {
  container: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40
  },
  emptyImageContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5
  },
  emptyImage: {
    height: "6rem",
    width: "6rem",
    borderRadius: "3rem",
    background: "gainsboro"
  },
  emptyImagePlus: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: "50%",
    border: "white solid 10px",
    zIndex: 3
  },
  emptyImageBackground: {
    position: "absolute",
    fontSize: "4rem",
    zIndex: 2,
    color: "#b9b9b9"
  },
  personImg: {
    position: "absolute",
    height: "30rem",
    bottom: 10,
    right: 10,
    zIndex: -1
  },
  welcomeText: {
    position: "absolute",
    top: 15,
    left: 0,
    right: 0,
    fontFamily: "'Raleway', sans-serif",
    textAlign: 'center',
    padding: 20,
    fontSize: '3rem',
    textShadow: "-8px 0 white, 0 8px white, 8px 0 white, 0 -8px white"
  },
  abstract: {
      position: 'absolute',
      zIndex: -2,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
  }
};

class NewUser extends Component {
  constructor(props) {
    super(props);

    const personUrl = `/img/person${Math.floor(Math.random() * 4 + 1)}.png`;

    this.state = {
      name: "",
      image: null,
      personUrl
    };
  }

  renderImage = () => {
    if (!this.state.image) {
      return (
        <div style={styles.emptyImageContainer}>
          <div style={styles.emptyImage} />
          <i style={styles.emptyImagePlus} className="fas fa-plus-circle" />
          <i
            style={styles.emptyImageBackground}
            className="far fa-file-image"
          />
        </div>
      );
    }
  };

  handleName = event => {
    this.setState({
      name: event.value
    });
  };

  render() {
    return (
      <motion.div 
        initial={{y: -100, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        style={styles.container}
      >
        <Header style={styles.welcomeText}>Welcome to Macrobeat!</Header>

        {this.renderImage()}

        <Box>
          <Box marginBottom={2}>
            <Label htmlFor="name">
              <Text>Name</Text>
            </Label>
          </Box>
          <TextField
            id="name"
            onChange={this.handleName}
            placeholder="Enter a display name..."
            value={this.state.name}
          />
        </Box>

        <img style={styles.abstract} src="/img/welcomebackground.svg"/>
        <img style={styles.personImg} src={this.state.personUrl} />
      </motion.div>
    );
  }
}

export default NewUser;
