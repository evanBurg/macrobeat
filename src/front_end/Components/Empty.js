import React from 'react';
import {Header} from "../Components/WrapperComponents"
import "./Empty.css"
import Loader from "react-loaders";

const styles = {
    container: {
        width: '12rem',
        height: '12rem',
        margin: '2rem',
        borderRadius: 20,
        backgroundColor: '#efefef',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}

export default (props) => {
    if(props.loading){
        return <Loader type="ball-scale" color="black" />
    }

    return (
        <div style={styles.container} className="empty-container">
            <i style={{fontSize: '3rem'}} className={`fa fa-${props.icon || "compact-disc"}`}/>
            <Header>Empty</Header>
        </div>
    )
}