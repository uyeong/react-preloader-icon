import React from 'react';
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';
import pfx from '../utils/pfx';

class TailSpin extends React.Component {
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
            this.target.style[transform] = `${rotate}(${progress * 360}deg)`;
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
        const radius = 50 - (strokeWidth / 2);

        return (
            <div ref={(el) => this.target = el} className="preloader-icon__tail-spin" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 102 102"
                >
                    <defs>
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                            <stop stopColor={this.props.strokeColor} stopOpacity="0" offset="0%"/>
                            <stop stopColor={this.props.strokeColor} stopOpacity=".631" offset="63.146%"/>
                            <stop stopColor={this.props.strokeColor} offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none">
                        <g transform="translate(1 1)">
                            <path
                                d={`M50,${strokeWidth / 2} A${radius},${radius},0,0,1,${50 + radius},50`}
                                stroke="url(#a)"
                                strokeWidth={strokeWidth}
                            />
                            <circle fill={this.props.strokeColor} cx={50 + radius} cy="50" r={strokeWidth / 2}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default TailSpin;
