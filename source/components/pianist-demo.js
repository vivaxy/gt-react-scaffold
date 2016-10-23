/**
 * @since 2016-09-18 11:14
 * @author vivaxy
 */

import React, { Component } from 'react';

import { VerticalFlexBox, VerticalFlexItem } from 'react-pianist/VerticalFlex';
import { HorizontalFlexBox, HorizontalFlexItem } from 'react-pianist/HorizontalFlex';
import { BorderBox, BorderLine } from 'react-pianist/BorderBox';

import actions from '../actions';
import connect from '../library/connect';
import * as entires from '../config/entries';

class PianistDemo extends Component {

    render() {

        const navigationItemStyle = {
            textAlign: 'center',
            lineHeight: '50px',
        };

        return <VerticalFlexBox style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
        }}>
            <VerticalFlexItem flex={1}>
                test1
            </VerticalFlexItem>
            <VerticalFlexItem height={50}>
                <BorderBox style={{
                    backgroundColor: '#f1f1f1',
                }}>
                    <BorderLine position={'top'} color={'#efefef'}/>
                    <HorizontalFlexBox>
                        <HorizontalFlexItem flex={1} style={navigationItemStyle} onClick={::this.goToHome}>
                            home
                        </HorizontalFlexItem>
                        <HorizontalFlexItem flex={1} style={navigationItemStyle}>
                            contact
                        </HorizontalFlexItem>
                        <HorizontalFlexItem flex={1} style={navigationItemStyle}>
                            discovery
                        </HorizontalFlexItem>
                        <HorizontalFlexItem flex={1} style={navigationItemStyle}>
                            me
                        </HorizontalFlexItem>
                    </HorizontalFlexBox>
                </BorderBox>
            </VerticalFlexItem>
        </VerticalFlexBox>
    }

    goToHome() {
        const {
            routingPush,
        } = this.props;
        routingPush(entires.INDEX);
    }
}

export default connect(state => ({}), {
    routingPush: actions.routing.push,
})(PianistDemo);
