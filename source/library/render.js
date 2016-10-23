/**
 * @since 2016-07-31 19:09
 * @author vivaxy
 */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';

import setStyle from './style';
import store from './store';

const ID_SELECTOR = 'react-scaffold';

injectTapEventPlugin();

export const renderWithEntry = (Entry) => {
    return render(
        <AppContainer>
            <Provider store={store}>
                <Entry/>
            </Provider>
        </AppContainer>,
        document.getElementById(ID_SELECTOR)
    );
};

export default (Entry) => {

    setStyle();

    renderWithEntry(Entry);

};
