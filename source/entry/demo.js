/**
 * @since 2016-07-31 18:38
 * @author vivaxy
 */

import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { connect } from 'react-redux';

import render from '../library/render';
import Logo from '../component/Logo';
import getNews from '../api/news';
import DemoButton from '../component/DemoButton';
import buttonDisabledState from '../reducer/buttonDisabled';
import newsListState from '../reducer/newsList';
import {
    setButtonDisabled as setButtonDisabledAction,
    setButtonDefault as setButtonDefaultAction
} from '../action/buttonDisabled';
import { appendNewsList as appendNewsListAction } from '../action/appendNewsList';

let newsIndex = 0;

@connect(state => state, {
    setButtonDisabled: setButtonDisabledAction,
    setButtonDefault: setButtonDefaultAction,
    appendNewsList: appendNewsListAction
})
class Demo extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.getMoreNews();
    }

    render() {
        let {buttonDisabled, newsList} = this.props;
        return <div>
            <Logo/>
            {newsList.map((news) => {
                return <div key={`news-${newsIndex++}`}>{news.name}</div>;
            })}
            <DemoButton buttonDisabled={buttonDisabled} onLoadMore={::this.getMoreNews}/>
        </div>
    }

    getMoreNews() {
        let {appendNewsList, setButtonDefault, setButtonDisabled} = this.props;
        setButtonDisabled();
        getNews()
            .then((list) => {
                appendNewsList(list);
            })
            .then(() => {
                setButtonDefault();
            });
    }

}

let reducers = combineReducers({
    buttonDisabled: buttonDisabledState,
    newsList: newsListState
});

export default render(Demo, reducers);
