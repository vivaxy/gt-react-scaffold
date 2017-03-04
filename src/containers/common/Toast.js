/**
 * @since 2016-11-24 10:26
 * @author vivaxy
 */

import { connect } from 'react-redux';

import Toast from '../../components/Toast';
import actions from '../../actions';

export default connect((state) => {
    return {
        toastState: state.toast,
    };
}, {
    hideToastAction: actions.toast.hideToast,
})(Toast);
