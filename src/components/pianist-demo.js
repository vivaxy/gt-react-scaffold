/**
 * @since 2016-09-18 11:14
 * @author vivaxy
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { VerticalFlexBox, VerticalFlexItem } from 'react-pianist/VerticalFlex';
import { HorizontalFlexBox, HorizontalFlexItem } from 'react-pianist/HorizontalFlex';
import { BorderBox, BorderLine } from 'react-pianist/BorderBox';
import { Button } from 'react-pianist/Button';

import actions from '../actions';

class PianistDemo extends Component {

    static propTypes = {
        routingPush: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.getToIndex = ::this.getToIndex;
        this.getNavigationItemStyle = ::this.getNavigationItemStyle;
        this.navigate = ::this.navigate;
    }

    getToIndex() {
        const {
            routingPush,
        } = this.props;
        routingPush('/');
    }

    getNavigationItemStyle = (currentIndex) => {
        const {
            index,
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
        );
    }
}

export default connect(() => {
    return {};
}, {
    routingPush: actions.routing.push,
})(PianistDemo);
