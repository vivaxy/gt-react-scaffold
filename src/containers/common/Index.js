/**
 * @since 2016-10-23 14:48
 * @author vivaxy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-pianist/Button';

import setTitle from '../../lib/setTitle';

import getNews from '../../api/news';

import Logo from '../../components/Logo';
import DemoButton from '../../components/DemoButton';

import i18n from '../../i18n';
import * as errorType from '../../config/errors';
import actions from '../../actions';

let newsIndex = 0;

const raisedButtonStyle = {
    padding: '0 8px',
};

class Index extends Component {

    componentDidMount() {
        this.getMoreNews();
    }

    render() {

        setTitle(i18n.$SOMEONE_S_HOME('vivaxy'));

        let {
            buttonState,
            newsListState,
        } = this.props;

        return <div className="page-wrapper">
            <Logo/>
            {newsListState.map((news) => {
                return <div key={`news-${newsIndex++}`}>{news.name}</div>;
            })}
            <DemoButton buttonDisabled={!buttonState} onLoadMore={::this.getMoreNews}/>
            <hr/>
            <Button style={raisedButtonStyle} onClick={::this.goToDemo(1)}>go to demo at tab 1</Button>
            <hr/>
            <Button style={raisedButtonStyle} onClick={::this.goToDemo(2)}>go to demo at tab 2</Button>
            <hr/>
            <Button style={raisedButtonStyle} onClick={::this.goToDemo(3)}>go to demo at tab 3</Button>
            <hr/>
            <Button style={raisedButtonStyle} onClick={::this.goToDemo(4)}>go to demo at tab 4</Button>
        </div>
    }

    async getMoreNews() {
        let {
            appendNewsListAction,
            setButtonDefaultAction,
            setButtonDisabledAction,
            showToastAction,
        } = this.props;
        try {
            setButtonDisabledAction();
            let list = await getNews();
            appendNewsListAction(list);
            setButtonDefaultAction();
        } catch (ex) {
            switch (ex.name) {
                case errorType.FETCH:
                    showToastAction(ex.message);
                    break;
                case errorType.SERVER:
                    showToastAction(ex.message);
                    break;
                default:
                    throw ex;
            }
        }
    }

    goToDemo(index) {
        const {
            routingPush,
        } = this.props;
        return () => {
            routingPush(`/demo/${index}`);
        }
    }

}

export default connect(state => ({
    buttonState: state.button,
    newsListState: state.newsList,
}), {
    setButtonDisabledAction: actions.button.setButtonDisabled,
    setButtonDefaultAction: actions.button.setButtonDefault,
    appendNewsListAction: actions.newsList.appendNewsList,
    routingPush: actions.routing.push,
    showToastAction: actions.toast.showToast,
})(Index);
