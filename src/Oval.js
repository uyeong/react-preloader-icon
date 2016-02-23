import React from 'react';
import velocity from 'velocity-animate';
import detectie from 'detectie';

class Oval extends React.Component {

    /**
     * @property {number!} strokeWidth
     * @property {string!} strokeColor
     */
    static propTypes = {
        strokeWidth: React.PropTypes.number.isRequired,
        strokeColor: React.PropTypes.string.isRequired
    };

    componentDidMount() {
        let target = this.refs.oval;

        if (!detectie()) {
            target = this.refs.arc;
        }

        velocity(target, {
            rotateZ: '360deg'
        }, {
            duration: 800,
            easing: 'linear',
            loop: true
        });
    }

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const strokeWidth = this.props.strokeWidth;
        const translateSize = strokeWidth / 2;
        const viewBoxSize = strokeWidth - 2 + 38;

        return (
            <div ref="oval" className="preloader-icon__oval" style={{width: 'inherit', height: 'inherit'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    width="100%"
                    height="100%"
                    stroke={this.props.strokeColor}
                >
                    <g fill="none">
                        <g transform={`translate(${translateSize} ${translateSize})`} strokeWidth={strokeWidth}>
                            <circle stroke={this.props.strokeColor} strokeOpacity=".5" cx="18" cy="18" r="18"/>
                            <path ref="arc" d="M36 18c0-9.94-8.06-18-18-18" style={{transformOrigin: '18px 18px'}}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Oval;
