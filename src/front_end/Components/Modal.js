import React from "react";
import { Header, Text, Button } from "../Components/WrapperComponents";
import { motion, AnimatePresence } from "framer-motion";
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

const Modal = props => {
  let { open, toggleOpen, title, lg, children } = props;

  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <motion.div
          style={style.container}
          onClick={toggleOpen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="initial"
          >
            <div style={{...style.modalTitle, width: lg ? '85vw' : style.modalTitle.width }}>
              <Header>{title}</Header>
            </div>
            <div style={{...style.modalContainer, width: lg ? '85vw' : style.modalContainer.width }}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
