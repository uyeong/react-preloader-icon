import React from 'react';
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';
import pfx from '../utils/pfx';

class Oval extends React.Component {
    constructor(props) {
        super(props);

        this.stepper = new Stepper({
            duration: this.props.duration,
            easing: linear,
            loop: true
        });
    }

    componentDidMount() {
        const transform = pfx('transform').property;
        const rotate = pfx('perspective').support ? 'rotateZ' : 'rotate';

        this.stepper.on('update', (progress) => {
            this.refs.target.style[transform] = `${rotate}(${progress * 360}deg)`;
        });

        this.stepper.start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) {
            this.stepper.option('duration', this.props.duration);
            this.stepper.stop();
            this.stepper.start();
        }
    }

    componentWillUnmount() {
        this.stepper.stop();
        this.stepper.off();
        this.stepper = null;
    }

    render() {
        const strokeWidth = this.props.strokeWidth;
        const translateSize = (strokeWidth / 2) + 1;
        const viewBoxSize = 38 + strokeWidth;

        return (
            <div ref="target" className="preloader-icon__oval" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    stroke={this.props.strokeColor}
                >
                    <g fill="none">
                        <g transform={`translate(${translateSize} ${translateSize})`} strokeWidth={strokeWidth}>
                            <circle stroke={this.props.strokeColor} strokeOpacity=".5" cx="18" cy="18" r="18"/>
                            <path d="M36 18c0-9.94-8.06-18-18-18"/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Oval;
