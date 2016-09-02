/**
 * @since 2016-09-02 16:22
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

const TOP = 'top';
const LEFT = 'left';
const RIGHT = 'right';
const BOTTOM = 'bottom';

export default class BorderLine extends Component {

    static propTypes = {
        position: PropTypes.oneOf([TOP, LEFT, RIGHT, BOTTOM]).isRequired,
        color: PropTypes.string.isRequired,
    };

    render () {

        const {
            position,
            color,
        } = this.props;

        const defaultStyle = {
            position: 'absolute',
            backgroundColor: color,
        };

        let style = {};

        switch (position) {
            case LEFT:
                style = {
                    ...defaultStyle,
                    top: '0',
                    left: '0',
                    width: '1px',
                    height: '100%',
                    WebkitTransform: 'scaleX(0.5)',
                    transform: 'scaleX(0.5)',
                    WebkitTransformOrigin: 'left',
                    transformOrigin: 'left',
                };
                break;
            case RIGHT:
                style = {
                    ...defaultStyle,
                    right: '0',
                    top: '0',
                    width: '1px',
                    height: '100%',
                    WebkitTransform: 'scaleX(0.5)',
                    transform: 'scaleX(0.5)',
                    WebkitTransformOrigin: 'right',
                    transformOrigin: 'right',
                };
                break;
            case TOP:
                style = {
                    ...defaultStyle,
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '1px',
                    WebkitTransform: 'scaleY(0.5)',
                    transform: 'scaleY(0.5)',
                    WebkitTransformOrigin: 'top',
                    transformOrigin: 'top',
                };
                break;
            case BOTTOM:
                style = {
                    ...defaultStyle,
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '1px',
                    WebkitTransform: 'scaleY(0.5)',
                    transform: 'scaleY(0.5)',
                    WebkitTransformOrigin: 'bottom',
                    transformOrigin: 'bottom',
                };
                break;
            default:
                break;
        }

        return <div style={style}></div>
    }
}
