/**
 * @since 2016-09-03 09:16
 * @author vivaxy
 */

import React, { Component } from 'react';

import connect from '../library/connect';
import render from '../library/render';
import setTitle from '../library/setTitle';

import { VerticalFlexBox, VerticalFlexItem } from 'react-pianist/VerticalFlex';
import { HorizontalFlexBox, HorizontalFlexItem } from 'react-pianist/HorizontalFlex';
import { BorderBox, BorderLine } from 'react-pianist/BorderBox';

import i18n from '../i18n';

@connect(state => ({}), {})
class Index extends Component {

    render () {

        setTitle(i18n.SOMEONE_S_HOME('react-pianist'));

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
                test
            </VerticalFlexItem>
            <VerticalFlexItem height={50}>
                <BorderBox style={{
                    backgroundColor: '#f1f1f1',
                }}>
                    <BorderLine position={'top'} color={'#efefef'}/>
                    <HorizontalFlexBox>
                        <HorizontalFlexItem flex={1} style={navigationItemStyle}>
                            home
                        </HorizontalFlexItem>
                        <HorizontalFlexItem flex={1} style={navigationItemStyle}>
                            contract
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

}

render(Index);
