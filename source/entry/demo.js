/**
 * @since 2016-07-31 18:38
 * @author vivaxy
 */

import React, {Component} from 'react';
import {combineReducers} from 'redux';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import render from '../library/render';
import DemoComponent from '../component/Demo';
import buttonLoading from '../reducer/button-loading';
import {setButtonLoading, setButtonDefault} from '../action/button-loading';

@connect(state => state, {
    setButtonLoading,
    setButtonDefault
})
class Demo extends Component {

    constructor () {
        super();
    }

    render () {
        let {buttonLoading, setButtonLoading, setButtonDefault} = this.props;
        return <MuiThemeProvider>
            <DemoComponent buttonLoading={buttonLoading} setButtonLoading={setButtonLoading}
                           setButtonDefault={setButtonDefault}/>
        </MuiThemeProvider>;
    }

}

let reducers = combineReducers({
    buttonLoading
});

render(Demo, reducers);
