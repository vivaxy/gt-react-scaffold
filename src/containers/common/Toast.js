/**
 * @since 2016-11-24 10:26
 * @author vivaxy
 */

import { connect } from 'react-redux';

import Toast from '../../components/Toast';

export default connect(state => ({
    toastState: state.toast,
}), {})(Toast);
