import React from "react";
import { Header, Text, Button } from "../Components/WrapperComponents";
import { motion } from "framer-motion";
import { AppContext } from "../app";

const style = {
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "fixed",
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.25)"
  },
  modalContainer: {
    width: "65vw",
    height: "50vh",
    background: "#FFF",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    overflowY: "auto"
  },
  modalTitle: {
    width: "65vw",
    height: "10vh",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderBottom: "2px solid #EFEFEF",
    fontSize: "1.4rem",
    background: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    justifyContent: "space-between"
  },
  user: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: "0.8rem"
  },
  image: {
    height: "3rem",
    width: "3rem",
    borderRadius: "1.5rem"
  },
  buttons: {
    width: "6rem"
  }
};

const variants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1
  }
};

const ShortenName = Name => {
  if (Name.length > 12) {
    return Name.substr(0, 9) + "...";
  }

  return Name;
};

const kickUser = (ctx, userKicked, Kicker) => {
  ctx.socket.emit("kickuser", { userKicked, Kicker });
};

const KickUser = props => {
  return (
    <div style={style.container} onClick={props.close}>
      <motion.div
        style={style.modalTitle}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <Header>Kick Users</Header>
      </motion.div>
      <motion.div
        style={style.modalContainer}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <AppContext.Consumer>
          {ctx =>
            ctx.users.map(({ user, img, id }) => (
              <div style={style.row} key={id}>
                <div style={style.user}>
                  <img style={style.image} src={img} alt={user} />
                  <Text style={style.text}>{ShortenName(user)}</Text>
                </div>
                <Button style={style.buttons} onClick={() => kickUser(ctx, id, ctx.User.id)}>
                  Kick User
                </Button>
              </div>
            ))
          }
        </AppContext.Consumer>
      </motion.div>
    </div>
  );
};

const KickedBy = (ctx, kickedBy) => {
  let user = ctx.users.find(usr => usr.id == kickedBy);
  return user.user;
}

const YouveBeenKicked = props => {
  return (
    <div style={{ ...style.container, zIndex: 9999999 }}>
      <motion.div
        style={style.modalTitle}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <Header>You've Been Kicked</Header>
      </motion.div>
      <motion.div
        style={style.modalContainer}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="initial"
      >
        <AppContext.Consumer>
          {ctx =>
            ctx.users.map(({ user, img, id }) => {
              if(id !== ctx.userID){
                return <React.Fragment key={id}/>
              }

              return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: 'center'
                }}
              >
                <Text style={{ fontSize: "1.5rem", fontWeight: '500', textAlign: 'center', margin: "1rem" }}>
                  {ShortenName(user)}
                </Text>
                <Text>You were kicked by {KickedBy(ctx, props.kickedBy)}</Text>
                <Text style={{ fontSize: "1.2rem", textAlign: 'center', margin: "1rem" }}>
                  Refresh to continue...
                </Text>
                <Button style={{...style.buttons, margin: '1rem'}} onClick={() => window.location.reload()}>
                  Refresh
                </Button>
              </div>
            )})
          }
        </AppContext.Consumer>
      </motion.div>
    </div>
  );
};

export default KickUser;
export { KickUser, YouveBeenKicked };
