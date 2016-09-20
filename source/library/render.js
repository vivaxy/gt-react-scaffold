/**
 * @since 2016-07-31 19:09
 * @author vivaxy
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import setStyle from '../library/style';
import EntryWrapper from '../component/EntryWrapper';
import store from './store';

const ID_SELECTOR = 'react-scaffold';

injectTapEventPlugin();

export default (Entry) => {

    setStyle();

    return render(
        <Provider store={store}>
            <EntryWrapper>
                <Entry/>
            </EntryWrapper>
        </Provider>,
        document.getElementById(ID_SELECTOR)
    );
};
