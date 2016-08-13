/**
 * @since 2016-08-06 12:03
 * @author vivaxy
 */

import iconImage from '../image/vivaxy.20150726.jpg';

export default () => {

    let style = {
        margin: '10px auto',
        maxWidth: '1200px'
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
