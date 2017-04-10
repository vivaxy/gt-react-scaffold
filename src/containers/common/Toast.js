/**
 * @since 2016-11-24 10:26
 * @author vivaxy
 */

import { connect } from 'react-redux';

import Toast from '../../components/Toast';
import { hideToast } from '../../redux/toast';

const mapStateToProps = (state) => {
    return {
        toastState: state.toast,
    };
};

export default connect(mapStateToProps, {
    hideToastAction: hideToast,
})(Toast);
