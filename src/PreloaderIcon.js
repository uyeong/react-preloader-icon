import React from 'react';
import PropTypes from 'prop-types';
import objectAssign from 'object-assign';
import { inner, title } from './styles';

class PreloaderIcon extends React.Component {

    /**
     * @property {?string} className
     * @property {React.Component} loader
     * @property {?number} size
     * @property {?string} unit
     * @property {?React.CSSProperties} style
     * @property {?number} strokeWidth
     * @property {?string} strokeColor
     * @property {?number} duration
     */
    static propTypes = {
        className: PropTypes.string,
        loader: PropTypes.func.isRequired,
        size: PropTypes.number,
        unit: PropTypes.string,
        style: PropTypes.object,
        strokeWidth: PropTypes.number,
        strokeColor: PropTypes.string,
        duration: PropTypes.number
    };

    /**
     * @property {string} className
     * @property {number} size
     * @property {string} unit
     * @property {React.CSSProperties} style
     * @property {number} strokeWidth
     * @property {string} strokeColor
     * @property {number} duration
     */
    static defaultProps = {
        className: '',
        size: 32,
        unit: 'px',
        style: {},
        strokeWidth: 3,
        strokeColor: '#f0ad4e',
        duration: 800
    };

    /**
     * @returns {React.Component}
     */
    render() {
        const { className, loader, size, unit, style } = this.props;
        const { strokeWidth, strokeColor, duration } = this.props;
        const sized = `${size}${unit}`;
        return (
            <div
                className={`preloader-icon ${className}`}
                style={objectAssign({ width: sized, height: sized }, style)}
            >
                <div className="preloader-icon__inner" style={inner}>
                    <em className="preloader-icon__title" style={title}>Loading...</em>
                    {React.createElement(loader, { strokeWidth, strokeColor, duration })}
                </div>
            </div>
        );
    }
}

export default PreloaderIcon;
