/**
 * @since 2016-07-31 18:38
 * @author vivaxy
 */

import React from 'react';
import { connect } from 'react-redux';

import render from '../library/render';
import setTitle from '../library/setTitle';
import BaseComponent from '../library/BaseComponent';

import getNews from '../api/news';

import Logo from '../component/Logo';
import DemoButton from '../component/DemoButton';

import i18n from '../i18n';

import action from '../action';

let newsIndex = 0;

@connect(state => ({
    buttonState: state.button,
    newsListState: state.newsList,
}), {
    setButtonDisabledAction: action.button.setButtonDisabled,
    setButtonDefaultAction: action.button.setButtonDefault,
    appendNewsListAction: action.newsList.appendNewsList,
})
class Demo extends BaseComponent {

    constructor (props, content, updater) {
        super(props, content, updater);
    }

    componentDidMount () {
        this.getMoreNews();
    }

    render () {

        setTitle(i18n.SOMEONE_S_HOME('vivaxy'));

        let {
            buttonState,
            newsListState,
        } = this.props;
        return <div>
            <Logo/>
            {newsListState.map((news) => {
                return <div key={`news-${newsIndex++}`}>{news.name}</div>;
            })}
            <DemoButton buttonDisabled={!buttonState} onLoadMore={::this.getMoreNews}/>
        </div>
    }

    async getMoreNews () {
        let {
            appendNewsListAction,
            setButtonDefaultAction,
            setButtonDisabledAction,
        } = this.props;
        setButtonDisabledAction();
        let list = this.invokeApi(getNews);
        appendNewsListAction(list);
        setButtonDefaultAction();
    }

}

render(Demo);
