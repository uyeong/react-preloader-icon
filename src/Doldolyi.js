import React from 'react';
import {blind, inner} from './styles';
import Oval from './Oval';

class Doldolyi extends React.Component {

    /**
     * Doldolyi의 생성자
     * @constructs
     * @param {Doldolyi.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * Doldolyi을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const className = `doldolyi ${this.props.className}`;
        const style = Object.assign({width: this.props.size, height: this.props.size}, this.props.style);

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
 * Doldolyi의 Props 인터페이스 정의
 * @property {string} size
 * @property {string} strokeWidth
 * @property {string} strokeColor
 */
Doldolyi.propTypes = {
    size: React.PropTypes.string,
    strokeWidth: React.PropTypes.string,
    strokeColor: React.PropTypes.string
};

/**
 * Doldolyi의 Props 기본값 정의
 * @property {string} className
 * @property {string} size
 * @property {string} strokeWidth
 * @property {string} strokeColor
 */
Doldolyi.defaultProps = {
    className: '',
    size: '32px',
    strokeWidth: '3px',
    strokeColor: '#f0ad4e'
};

export default Doldolyi;
