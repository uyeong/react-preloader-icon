import React from 'react';
import {VelocityComponent} from 'velocity-react';

class Oval extends React.Component {

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const strokeWidth = parseInt(this.props.strokeWidth, 10);
        const translateSize = strokeWidth / 2 > 0 ? strokeWidth / 2 : 1;
        const viewBoxSize = strokeWidth - 2 + 38;
        const style = {
            width: "100%",
            height: "100%",
            display: "block",
            stroke: this.props.strokeColor
        };

        return (
            <VelocityComponent
                animation={{rotateZ: '360deg'}}
                duration={800}
                easing="linear"
                loop={true}
                runOnMount={true}
            >
                <div className="doldolyi__oval" style={{width: 'inherit', height: 'inherit'}}>
                    <svg
                        xmlns="http://www.w3.org/svg/2000"
                        className="doldolyi__oval-svg"
                        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                        style={style}
                    >
                        <g fill="none">
                            <g transform={`translate(${translateSize} ${translateSize})`} strokeWidth={this.props.strokeWidth}>
                                <circle stroke={this.props.strokeColor} strokeOpacity=".5" cx="18" cy="18" r="18"/>
                                <path d="M36 18c0-9.94-8.06-18-18-18"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </VelocityComponent>
        );
    }
}

/**
 * @property {string!} strokeWidth
 * @property {string!} strokeColor
 */
Oval.propTypes = {
    strokeWidth: React.PropTypes.string.isRequired,
    strokeColor: React.PropTypes.string.isRequired
};

export default Oval;
