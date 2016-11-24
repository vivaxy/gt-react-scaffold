/**
 * @since 2016-08-06 12:03
 * @author vivaxy
 */

import iconImage from '../images/vivaxy.20150726.jpg';
import '!style!css!less!./style.less';

export default () => {

    let style = {
        margin: '0',
    };

    let body = document.body;

    for (let key in style) {
        body.style[key] = style[key];
    }

    let head = document.head;
    var icon = document.createElement('link');
    icon.type = 'image/png';
    icon.rel = 'shortcut icon';
    icon.href = iconImage;
    head.appendChild(icon);

};
