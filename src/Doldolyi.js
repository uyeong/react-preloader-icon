import React from 'react';
import {inner, blind, center} from './styles';
import Oval from './Oval';

class Doldolyi extends React.Component {

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const className = `doldolyi ${this.props.className}`;
        let style = Object.assign({width: this.props.size, height: this.props.size}, this.props.style);

        if (this.props.alignCenter) {
            style = Object.assign(style, center);
        }

        return (
            <div className={className} style={style}>
                <div className="doldolyi__inner" style={inner}>
                    <em style={blind}>Loading...</em>
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
 * @property {?string} size
 * @property {?string} strokeWidth
 * @property {?string} strokeColor
 */
Doldolyi.propTypes = {
    size: React.PropTypes.string,
    strokeWidth: React.PropTypes.string,
    strokeColor: React.PropTypes.string
};

/**
 * @property {string} className
 * @property {string} size
 * @property {string} strokeWidth
 * @property {string} strokeColor
 */
Doldolyi.defaultProps = {
    className: '',
    size: '32px',
    strokeWidth: '3px',
    strokeColor: '#f0ad4e',
    alignCenter: true
};

export default Doldolyi;
