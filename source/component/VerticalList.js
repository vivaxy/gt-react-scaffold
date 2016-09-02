/**
 * @since 2016-09-02 13:30
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

export default class VerticalList extends Component {

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.shape({
            props: PropTypes.shape({
                flex: PropTypes.number,
                height: PropTypes.number,
            }).isRequired,
        }.isRequired).isRequired).isRequired,
    };

    render () {

        const boxStyle = {
            display: '-webkit-box',
            display: '-webkit-flex',
            display: 'flex',
            WebkitBoxOrient: 'vertical',
            WebkitBoxDirection: 'normal',
            WebkitFlexDirection: 'column',
            flexDirection: 'column',
        };

        const {
            children,
            style,
            ...otherProps
        } = this.props;

        return <div {...otherProps} style={{
            ...boxStyle,
            ...style,
        }}>
            {children.map((child) => {

                const {
                    flex,
                    height,
                    style,
                    ...otherProps
                } = child.props;

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

                return <div style={childStyle} {...otherProps}>{child}</div>
            })}
        </div>
    }

}
