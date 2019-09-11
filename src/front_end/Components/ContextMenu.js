import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Text } from "./WrapperComponents";

const styles = {
  container: {
    position: "fixed",
    zIndex: 30,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  menuContainer: {
    position: "fixed",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    zIndex: 30,
    backgroundColor: "#fff",
    minHeight: "20vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#EFEFEF"
  },
  dividerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    marginLeft: 3,
    padding: 10,
    height: "100%"
  },
  text: {
    padding: 10,
    fontSize: "1em",
    fontWeight: "300",
    height: "100%"
  },
  previewContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  previewInfoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  titleText: {
    padding: 2,
    fontSize: "0.86em",
    fontWeight: "500"
  },
  artistText: {
    padding: 2,
    fontSize: "0.86em",
    fontWeight: "100"
  }
};

const ItemVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    background: "#fff",
    transition: {
      y: { stiffness: 1000 },
      delay: 0.4
    }
  },
  visible: {
    y: 0,
    opacity: 1,
    background: "#fff",
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  click: {
    background: "#efefef",
    transition: {
      background: { duration: 0.2, ease: "easeInOut" }
    }
  }
};

const ContextItem = props => {
  const Icon = props.icon;
  return (
    <React.Fragment>
      <motion.div
        variants={ItemVariants}
        initial={"hidden"}
        animate={"visible"}
        exit={"hidden"}
        whileTap="click"
        whileHover="click"
        style={styles.item}
        onTap={props.onClick}
      >
        <div style={styles.icon}>
          <Icon fontSize="1.3em" />
        </div>
        <Text style={styles.text}>{props.title}</Text>
      </motion.div>
    </React.Fragment>
  );
};

const Preview = props => {
  let img;
  let titleKey = "Name";
  let subTitleKey = "Artist";

  if (props.type === "song") {
    img = props.item.Image.url;
  } else {
    img = props.item.Image;
  }

  if (props.type === "artist") {
    subTitleKey = "";
  }

  return (
    <div style={styles.previewContainer}>
      <div
        style={{
          minWidth: 70,
          minHeight: 70,
          background: `url(${img}) center no-repeat`,
          backgroundSize: "cover",
          margin: 10,
          borderRadius: 15
        }}
      />
      <div style={styles.previewInfoContainer}>
        <Text style={styles.titleText}>{props.item[titleKey]}</Text>
        {subTitleKey && (
          <Text style={styles.artistText}>{props.item[subTitleKey]}</Text>
        )}
      </div>
    </div>
  );
};

class ContextMenu extends Component {
  state = {
    actuallyOpen: false //Toggles after animation in is finished / animation out is finished
  };

  toggleActuallyOpen = actuallyOpen => this.setState({ actuallyOpen });

  menu = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.6,
        duration: 0.2
      }
    },
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2
      }
    }
  };

  container = {
    visible: {
      opacity: 1
    },
    hidden: {
      opacity: 0
    }
  };

  render() {
    const { items, open, close, selected, type } = this.props;

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={close}
            key="container"
            style={styles.container}
            variants={this.container}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
          >
            <motion.div
              key="menu"
              onClick={e => e.stopPropagation()}
              style={styles.menuContainer}
              variants={this.menu}
              initial={"hidden"}
              animate={"visible"}
              exit={"hidden"}
            >
              {selected && <Preview item={selected} type={type} />}
              {items.map(item => (
                <ContextItem
                  key={item.key}
                  title={item.title}
                  icon={item.icon}
                  onClick={item.onClick}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
}

export default ContextMenu;
