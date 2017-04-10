/**
 * @since 2016-10-23 14:48
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-pianist/Button';

import setTitle from '../../lib/setTitle';

import Logo from '../../components/Logo';
import DemoButton from '../../components/DemoButton';

import i18n from '../../i18n/index';
import { getMoreNews } from '../../redux/newsList';
import { push } from '../../redux/routing';
import { showToast } from '../../redux/toast';

let newsIndex = 0;

const raisedButtonStyle = {
    padding: '0 8px',
};

class Home extends Component {

    static propTypes = {
        routingPush: PropTypes.func.isRequired,
        buttonState: PropTypes.bool.isRequired,
        newsListState: PropTypes.array.isRequired,
        getMoreNewsAction: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.goToDemo = ::this.goToDemo;
    }

    componentDidMount() {
        const { getMoreNewsAction } = this.props;
        setTitle(i18n.$SOMEONE_S_HOME('vivaxy'));
        getMoreNewsAction();
    }

    goToDemo(index) {
        const {
            routingPush,
        } = this.props;
        return () => {
            routingPush(`/demo/${index}`);
        };
    }

    render() {
        const {
            buttonState,
            newsListState,
            getMoreNewsAction,
        } = this.props;

        return (
            <div className="page-wrapper">
                <Logo />
                {newsListState.map((news) => {
                    return <div key={`news-${newsIndex++}`}>{news.name}</div>;
                })}
                <DemoButton buttonDisabled={!buttonState} onLoadMore={getMoreNewsAction} />
                <hr />
                <Button style={raisedButtonStyle} onClick={this.goToDemo(1)}>go to demo at tab 1</Button>
                <hr />
                <Button style={raisedButtonStyle} onClick={this.goToDemo(2)}>go to demo at tab 2</Button>
                <hr />
                <Button style={raisedButtonStyle} onClick={this.goToDemo(3)}>go to demo at tab 3</Button>
                <hr />
                <Button style={raisedButtonStyle} onClick={this.goToDemo(4)}>go to demo at tab 4</Button>
            </div>
        );
    }

}

export default connect((state) => {
    return {
        buttonState: state.button,
        newsListState: state.newsList,
    };
}, {
    getMoreNewsAction: getMoreNews,
    routingPush: push,
    showToastAction: showToast,
})(Home);
