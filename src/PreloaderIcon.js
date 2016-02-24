import React from 'react';
import {inner, title} from './styles';
import Oval from './loaders/Oval';
import TailSpin from './loaders/TailSpin';

const ICON_TYPE = {
    OVAL: 'oval',
    TAIL_SPIN: 'tailSpin'
};

class PreloaderIcon extends React.Component {

    /**
     * @property {?string} type
     * @property {?number} size
     * @property {?number} strokeWidth
     * @property {?string} strokeColor
     * @property {?number} duration
     */
    static propTypes = {
        type: React.PropTypes.string,
        size: React.PropTypes.number,
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
        strokeWidth: 3,
        strokeColor: '#f0ad4e',
        duration: 800
    };

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
                    {this.props.type === ICON_TYPE.OVAL ? (
                        <Oval
                            strokeWidth={this.props.strokeWidth}
                            strokeColor={this.props.strokeColor}
                            duration={this.props.duration}
                        />
                    ) : (
                        <TailSpin
                            strokeWidth={this.props.strokeWidth}
                            strokeColor={this.props.strokeColor}
                            duration={this.props.duration}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default PreloaderIcon;
export {ICON_TYPE};
