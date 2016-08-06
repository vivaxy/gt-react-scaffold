/**
 * @since 2016-08-06 10:09
 * @author vivaxy
 */

import React, {Component} from 'react';

import logoImage from '../image/vivaxy.20150726.jpg';

class Logo extends Component {

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

export default Logo;
