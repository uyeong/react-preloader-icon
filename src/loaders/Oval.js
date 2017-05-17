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
            <div ref={(el) => this.target = el} className="preloader-icon__oval" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 102 102"
                    stroke={this.props.strokeColor}
                >
                    <g fill="none">
                        <g transform="translate(1 1)" strokeWidth={strokeWidth}>
                            <circle stroke={this.props.strokeColor} strokeOpacity=".5" cx="50" cy="50" r={radius}/>
                            <path d={`M50,${strokeWidth / 2} A${radius},${radius},0,0,1,${50 + radius},50`}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Oval;
