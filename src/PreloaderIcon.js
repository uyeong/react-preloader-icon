import React from 'react';
import {inner, title} from './styles';
import Oval from './Oval';

class PreloaderIcon extends React.Component {

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const className = `preloader-icon ${this.props.className}`;
        const size = `${this.props.size}px`;
        const style = Object.assign({width: size, height: size}, this.props.style);

        return (
            <div className={className} style={style}>
                <div className="preloader-icon__inner" style={inner}>
                    <em className="preloader-icon__title" style={title}>Loading...</em>
                    <Oval
                        strokeWidth={this.props.strokeWidth}
                        strokeColor={this.props.strokeColor}
                    />
                </div>
            </div>
        );
    }
}

/**
 * @property {?number} size
 * @property {?number} strokeWidth
 * @property {?string} strokeColor
 */
PreloaderIcon.propTypes = {
    size: React.PropTypes.number,
    strokeWidth: React.PropTypes.number,
    strokeColor: React.PropTypes.string
};

/**
 * @property {string} className
 * @property {number} size
 * @property {number} strokeWidth
 * @property {string} strokeColor
 */
PreloaderIcon.defaultProps = {
    className: '',
    size: 32,
    strokeWidth: 3,
    strokeColor: '#f0ad4e',
    alignCenter: true
};

export default PreloaderIcon;
