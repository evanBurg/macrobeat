import React, { Component } from "react";
import { TextField } from "gestalt";
import { Header, Text, Button } from "../Components/WrapperComponents";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../app";
import KickUser from './KickUser'

const styles = {
  container: {
    position: "fixed",
    background: "white",
    bottom: 0,
    top: 0,
    left: 1,
    right: 1,
    zIndex: 40
  },
  bottomRow: {
    borderTop: "2px solid #EFEFEF",
    borderBottom: "2px solid #EFEFEF",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  row: {
    borderTop: "2px solid #EFEFEF",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  header: {
    fontSize: "3rem",
    margin: "2rem",
    textAlign: "center"
  },
  text: {
    marginRight: "1rem"
  },
  buttons: {
    width: "8rem"
  },
  close: {
    position: "absolute",
    top: 15,
    right: 15
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kickUserOpen: false
    };
  }

  kickUser = () => this.setState({kickUserOpen: true})
  closeKickUser = () => this.setState({kickUserOpen: false})
  
  render() {
    let {kickUserOpen} = this.state;
    return (
      <AppContext.Consumer>
        {ctx => (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            style={styles.container}
          >
            <i
              className="fas fa-times"
              style={styles.close}
              onClick={() => ctx.settingsOpen(false)}
            />
            <Header style={styles.header}>Settings</Header>
            <div style={styles.row}>
              <Text style={styles.text}>Update User Info</Text>
              <Button style={styles.buttons} onClick={() => ctx.identify()}>
                Update
              </Button>
            </div>
            {ctx.spotifyAccess ? (
              <div style={styles.row}>
                <Text style={styles.text}>Remove Spotify Credentials</Text>
                <a style={{ textDecoration: "none" }} href="/api/spotify/logout">
                  <Button style={styles.buttons}>Remove</Button>
                </a>
              </div>
            ) : (
              <div style={styles.row}>
                <Text style={styles.text}>Add Spotify Credentials</Text>
                <a style={{ textDecoration: "none" }} href="/api/spotify/login">
                  <Button style={styles.buttons}>Add</Button>
                </a>
              </div>
            )}
            {ctx.soundcloudAccess ? (
              <div style={styles.row}>
              <Text style={styles.text}>Remove SoundCloud Credentials</Text>
              <Button style={styles.buttons}>Remove</Button>
            </div>
            ) : (
              <div style={styles.row}>
              <Text style={styles.text}>Add SoundCloud Credentials</Text>
              <Button style={styles.buttons}>Add</Button>
            </div>
            )}
            <div style={styles.bottomRow}>
              <Text style={styles.text}>Kick User</Text>
              <Button style={styles.buttons} onClick={this.kickUser}>Choose User</Button>
            </div>
            <KickUser key="kick" toggleOpen={this.closeKickUser} open={kickUserOpen}/>
          </motion.div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Settings;
