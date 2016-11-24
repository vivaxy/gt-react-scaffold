/**
 * @since 2016-08-06 10:09
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';

import logoImage from '../images/vivaxy.20150726.jpg';

export default class extends Component {

    static propTypes = {};

    render () {

        let style = {
            width: '100px',
            height: '100px'
        };

        return <div>
            <img src={logoImage} style={style}/>
        </div>
    }

}
