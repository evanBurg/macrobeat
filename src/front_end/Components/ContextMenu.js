import React, { Component } from 'react';

const styles = {
    container: {
        backgroundColor: '#fff',
        width: '100vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'right'
    },
    item: {
        padding: 10,

    }
}

const ContextItem = props => {
    return (
        <div/>
    )
}

class ContextMenu extends Component {

    render(){
        const {items} = this.props;
        return <div>
            {items}
        </div>
    }
}

export default ContextMenu;