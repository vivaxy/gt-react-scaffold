/**
 * @since 2016-09-02 14:43
 * @author vivaxy
 */

import React, { Component, cloneElement, PropTypes } from 'react';

export default class HorizontalList extends Component {

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.shape({
            props: PropTypes.shape({
                flex: PropTypes.number,
                width: PropTypes.number,
            }).isRequired,
        }.isRequired).isRequired).isRequired,
    };

    render () {

        const boxStyle = {
            display: '-webkit-box',
            display: '-webkit-flex',
            display: 'flex',
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
            {children.map((child, index) => {

                const {
                    flex,
                    width,
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
                        width,
                        ...style
                    };
                }

                return cloneElement(child, {
                    style: childStyle,
                    key: `horizontal-list-${index}`,
                    ...otherProps,
                });
            })}
        </div>
    }
}
