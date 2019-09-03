import React from 'react';
import {Label} from 'gestalt'

export default props => {
    return (
        <div
        onClick={props.onClick}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        }}>
            <i className={props.icon}
                style={{
                    fontSize: props.size || 20,
                    color: props.color || 'black'
                }}
            />
            {props.label && (
                <Label>
                    {props.label}
                </Label>
            )}
        </div>
    );
}