"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const PropTypes = __importStar(require("prop-types"));
const react_native_1 = require("react-native");
class SharedElement extends React.Component {
    render() {
        return <RnnSharedElement {...this.props}/>;
    }
}
SharedElement.propTypes = {
    elementId: PropTypes.string.isRequired,
    resizeMode: PropTypes.string
};
SharedElement.defaultProps = {
    resizeMode: ''
};
exports.SharedElement = SharedElement;
const RnnSharedElement = react_native_1.requireNativeComponent('RNNElement', SharedElement, {
    nativeOnly: { nativeID: true }
});
