import React, { Component } from "react";
import { TextField } from "gestalt";
import { Header, Button } from "../Components/WrapperComponents";
import { motion } from 'framer-motion'
import {AppContext} from '../app'

const styles = {
  container: {
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "url(/img/welcomebackground.svg) white",
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
    background: 'white',
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
  },
  abstract: {
    position: 'absolute',
    zIndex: -2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  button: {
    width: '35%'
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

  fileInput = null;

  base64encode(file) {
    return new Promise((res, rej) => {
      var reader = new FileReader();
      reader.onloadend = function() {
        res(reader.result);
      }
      reader.readAsDataURL(file);
    })
  }

  componentDidMount() {
    this.fileInput = document.getElementById("image-input")
    const reactThis = this;
    this.fileInput.addEventListener('change', async function() {
      if (this.files && this.files[0]) {
          const base64 = await reactThis.base64encode(this.files[0])
          reactThis.setState({
            image: base64
          });
      }
  });
  }

  renderImage = () => {
    if (!this.state.image) {
      return (
        <div style={styles.emptyImageContainer} onClick={this.fileInput ? () => this.fileInput.click() : undefined}>
          <div style={styles.emptyImage} />
          <i style={styles.emptyImagePlus} className="fas fa-plus-circle" />
          <i
            style={styles.emptyImageBackground}
            className="far fa-file-image"
          />
        </div>
      );
    }

    let style = {...styles.emptyImage,
      background: `url(${this.state.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      boxShadow: '0px 0px 26px -9px rgba(0,0,0,0.75)'
    };
    return (
      <div key={`container-${JSON.stringify(this.state.image)}`} style={styles.emptyImageContainer} onClick={this.fileInput ? () => this.fileInput.click() : undefined}>
        <div key={`image-${JSON.stringify(this.state.image)}`} style={style} />
        <i style={styles.emptyImagePlus} className="fas fa-plus-circle" />
      </div>
    );
  };

  handleName = event => {
    this.setState({
      name: event.value
    });
  };

  identify = (ctx) => {
    ctx.socket.emit('identify', {
      username: this.state.name,
      icon: this.state.image,
      id: ctx.userID
    });
  }

  render() {
    return (
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        style={styles.container}
      >
        <Header style={styles.welcomeText}>Welcome to Macrobeat!</Header>

        {this.renderImage()}

        <input id="image-input" type="file" style={{visibility:"hidden"}} />
        <div style={{margin: '1rem'}}>
          <TextField
            id="name"
            onChange={this.handleName}
            placeholder="Enter a display name..."
            value={this.state.name}
          />
        </div>

        <AppContext.Consumer>
          {ctx => (
              <Button style={styles.button} onClick={() => this.identify(ctx)}>Submit</Button>
          )}
        </AppContext.Consumer>

        <img style={styles.personImg} src={this.state.personUrl} />
      </motion.div>
    );
  }
}

export default NewUser;
