/**
 * @since 2016-08-06 12:03
 * @author vivaxy
 */

import iconImage from '../images/vivaxy.20150726.jpg';
import './style.less';

export default () => {
    const style = {
        margin: '0',
    };

    const body = document.body;

    Object.keys(style).forEach((key) => {
        body.style[key] = style[key];
    });

    const head = document.head;
    const icon = document.createElement('link');
    icon.type = 'image/png';
    icon.rel = 'shortcut icon';
    icon.href = iconImage;
    head.appendChild(icon);
};
