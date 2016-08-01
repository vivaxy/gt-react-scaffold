/**
 * @since 2016-07-31 18:44
 * @author vivaxy
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class Demo extends Component {

    render () {

        let {buttonLoading} = this.props;

        return <RaisedButton label='demo' primary={buttonLoading} onClick={::this.onClick}/>
    }

    onClick () {

        let {setButtonLoading, setButtonDefault} = this.props;
        setButtonLoading();
        setTimeout(() => {
            setButtonDefault();
        }, 1000);
    }
}

export default Demo;
