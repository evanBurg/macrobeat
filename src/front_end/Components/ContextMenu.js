import React, { Component } from 'react';

const styles = {
    container: {

    },
    item: {

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