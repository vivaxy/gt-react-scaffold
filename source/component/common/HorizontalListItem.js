/**
 * @since 2016-09-02 14:43
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

export default class HorizontalListItem extends Component {

    static propTypes = {
        flex: PropTypes.number,
        height: PropTypes.number,
    };

    render () {

        const {
            flex,
            height,
            children,
            style,
            ...otherProps
        } = this.props;

        let childStyle = {};

        if (flex !== undefined) {
            childStyle = {
                WebkitBoxFlex: flex,
                WebkitFlex: flex,
                flex: flex,
                ...style
            };
        } else {
            childStyle = {
                height,
                ...style
            };
        }

        return <div style={childStyle} {...otherProps}>
            {children}
        </div>
    }
}
