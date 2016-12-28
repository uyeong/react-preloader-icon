import React from 'react';
import objectAssign from 'object-assign';
import {inner, title} from './styles';
import Oval from './loaders/Oval';
import TailSpin from './loaders/TailSpin';

/**
 * @type {object}
 * @property {string} OVAL
 * @property {string} TAIL_SPIN
 */
const ICON_TYPE = {
    OVAL: 'oval',
    TAIL_SPIN: 'tailSpin'
};

class PreloaderIcon extends React.Component {

    /**
     * @property {?string} className
     * @property {?string} type
     * @property {?number} size
     * @property {?string} unit
     * @property {?number} strokeWidth
     * @property {?string} strokeColor
     * @property {?number} duration
     */
    static propTypes = {
        className: React.PropTypes.string,
        type: React.PropTypes.string,
        size: React.PropTypes.number,
        unit: React.PropTypes.string,
        strokeWidth: React.PropTypes.number,
        strokeColor: React.PropTypes.string,
        duration: React.PropTypes.number
    };

    /**
     * @property {string} className
     * @property {number} size
     * @property {number} strokeWidth
     * @property {string} strokeColor
     * @property {number} duration
     */
    static defaultProps = {
        className: '',
        type: ICON_TYPE.OVAL,
        size: 32,
        unit: 'px',
        strokeWidth: 3,
        strokeColor: '#f0ad4e',
        duration: 800
    };

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const className = `preloader-icon ${this.props.className}`;
        const size = `${this.props.size}${this.props.unit}`;
        const style = objectAssign({width: size, height: size}, this.props.style);
        const {strokeWidth, strokeColor, duration} = this.props;
        const loader = this.createLoader(this.props.type, {strokeWidth, strokeColor, duration});

        return (
            <div className={className} style={style}>
                <div className="preloader-icon__inner" style={inner}>
                    <em className="preloader-icon__title" style={title}>Loading...</em>
                    {loader}
                </div>
            </div>
        );
    }

    /**
     * @param {string} type
     * @param {object} options
     * @returns {ReactElement|XML|null}
     */
    createLoader(type, options) {
        switch(type) {
            case ICON_TYPE.OVAL:
                return <Oval {...options}/>;
            case ICON_TYPE.TAIL_SPIN:
                return <TailSpin {...options}/>;
            default:
                return null;
        }
    }
}

export default PreloaderIcon;
export {ICON_TYPE};
