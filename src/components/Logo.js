/**
 * @since 2016-08-06 10:09
 * @author vivaxy
 */

import React, { Component } from 'react';

import logoImage from '../images/vivaxy.20150726.jpg';

const style = {
    width: '100px',
    height: '100px',
};

export default class Logo extends Component {
    render() {
        return (
            <div>
                <img src={logoImage} style={style} alt="logo" />
            </div>
        );
    }
}
