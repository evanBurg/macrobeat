import React, { Component } from "react";
import "./ScrollToTop.css";
import {motion} from "framer-motion";

const styles = {
    container: {
        width: 50,
        height: 50,
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        position: "fixed",
        bottom: "8rem",
        right: 15
    }
}

export default props => {
    return (
        <motion.div
         initial={{scaleX: 0, scaleY: 0}}
         animate={{scaleX: 1, scaleY: 1}}
         exit={{scaleX: 0, scaleY: 0}}
         className="scroll-shadow" 
         style={styles.container} 
         onClick={props.onClick}>
            <i className="fa fa-arrow-up"/>
        </motion.div>
    )
}