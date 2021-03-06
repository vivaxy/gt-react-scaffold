/**
 * @since 2016-09-18 11:14
 * @author vivaxy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VerticalFlexBox, VerticalFlexItem } from 'react-pianist/VerticalFlex';
import { HorizontalFlexBox, HorizontalFlexItem } from 'react-pianist/HorizontalFlex';
import { BorderBox, BorderLine } from 'react-pianist/BorderBox';
import { Button } from 'react-pianist/Button';

import { push as routingPushAction } from '../../redux/routing';
import setTitle from '../../lib/setTitle';
import * as i18n from '../../i18n/zh-cn';

class PianistDemo extends Component {

    static propTypes = {
        routingPush: PropTypes.func.isRequired,
        params: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.getToIndex = ::this.getToIndex;
        this.getNavigationItemStyle = ::this.getNavigationItemStyle;
        this.navigate = ::this.navigate;
    }

    componentDidMount() {
        setTitle(i18n.$SOMEONE_S_HOME('react-pianist'));
    }

    getToIndex() {
        const {
            routingPush,
        } = this.props;
        routingPush('/');
    }

    getNavigationItemStyle = (currentIndex) => {
        const {
            params: { index },
        } = this.props;
        return {
            textAlign: 'center',
            lineHeight: '50px',
            color: index === currentIndex ? '#f63' : '#333',
        };
    };

    navigate(index) {
        const {
            routingPush,
        } = this.props;
        return () => {
            routingPush(`/demo/${index}`);
        };
    }

    render() {
        return (
            <div className="page-wrapper">
                <VerticalFlexBox
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                >
                    <VerticalFlexItem flex={1}>
                        <Button onClick={this.getToIndex}>go to index</Button>
                        <div>
                            {Math.random()}
                        </div>
                    </VerticalFlexItem>
                    <VerticalFlexItem height={50}>
                        <BorderBox
                            style={{
                                backgroundColor: '#f1f1f1',
                            }}
                        >
                            <BorderLine position={'top'} color={'#efefef'} />
                            <HorizontalFlexBox>
                                <HorizontalFlexItem
                                    flex={1}
                                    style={this.getNavigationItemStyle(1)}
                                    onClick={this.navigate(1)}
                                >
                                    home
                                </HorizontalFlexItem>
                                <HorizontalFlexItem
                                    flex={1}
                                    style={this.getNavigationItemStyle(2)}
                                    onClick={this.navigate(2)}
                                >
                                    contact
                                </HorizontalFlexItem>
                                <HorizontalFlexItem
                                    flex={1}
                                    style={this.getNavigationItemStyle(3)}
                                    onClick={this.navigate(3)}
                                >
                                    discovery
                                </HorizontalFlexItem>
                                <HorizontalFlexItem
                                    flex={1}
                                    style={this.getNavigationItemStyle(4)}
                                    onClick={this.navigate(4)}
                                >
                                    me
                                </HorizontalFlexItem>
                            </HorizontalFlexBox>
                        </BorderBox>
                    </VerticalFlexItem>
                </VerticalFlexBox>
            </div>
        );
    }
}

export default connect(null, {
    routingPush: routingPushAction,
})(PianistDemo);
