/**
 * @since 2016-07-31 18:38
 * @author vivaxy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import render from '../library/render';
import setTitle from '../library/setTitle';

import getNews from '../api/news';

import Logo from '../component/Logo';
import DemoButton from '../component/DemoButton';

import i18n from '../i18n';

import {
    setButtonDisabled as setButtonDisabledAction,
    setButtonDefault as setButtonDefaultAction,
} from '../action/button';
import {
    appendNewsList as appendNewsListAction,
} from '../action/newsList';
import {
    toastMessage as toastMessageAction,
} from '../action/toastMessage';

let newsIndex = 0;

@connect(state => ({
    buttonState: state.button,
    newsListState: state.newsList,
    toastMessageState: state.toastMessage,
}), {
    setButtonDisabledAction,
    setButtonDefaultAction,
    appendNewsListAction,
    toastMessageAction,
})
class Demo extends Component {

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
        try {
            let {
                appendNewsListAction,
                setButtonDefaultAction,
                setButtonDisabledAction,
            } = this.props;
            setButtonDisabledAction();
            let list = await getNews();
            appendNewsListAction(list);
            setButtonDefaultAction();
        } catch (ex) {
            switch (ex.name) {
                case 'FetchError':
                    toastMessageAction(ex.message);
                    break;
                default:
                    throw ex;
                    break;
            }
        }
    }

}

render(Demo);
