import React from 'react';
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';

const CIRCULAR_COUNT = 8;
const PART_PROGRESS = 1 / CIRCULAR_COUNT;

class Spinning extends React.Component {
    constructor(props) {
        super(props);

        this.stepper = new Stepper({
            duration: this.props.duration,
            easing: linear,
            loop: true
        });
    }

    componentDidMount() {
        let prevIndex = 0;

        this.stepper.on('update', (progress) => {
            progress = progress >= 1 ? 0.9999 : progress;

            const nextIndex = parseInt(progress / PART_PROGRESS, 10);
            let nextTarget;
            let prevTarget;

            if (nextIndex - 1 !== prevIndex && !(nextIndex === 0 && prevIndex === 7)) {
                prevTarget = this[`c${prevIndex}`];
                prevTarget.style.fillOpacity = 0;

                prevIndex = nextIndex === 0 ? 7 : nextIndex - 1;
            }

            progress = (progress - (PART_PROGRESS * nextIndex)) / PART_PROGRESS;

            nextTarget = this[`c${nextIndex}`];
            prevTarget = this[`c${prevIndex}`];

            nextTarget.style.fillOpacity = progress;
            prevTarget.style.fillOpacity = 1 - progress;
        });

        this.stepper.start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) {
            for(let i = 0, n = 8; i < n; i++) {
                this[`c${i}`].style.fillOpacity = 0;
            }

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
        const {strokeColor, strokeWidth} = this.props;
        const radius = 50 - (strokeWidth / 2);

        return (
            <div className="preloader-icon__spinning" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 560 560"
                >
                    <g fill="none">
                        <g
                            transform="translate(10 10)"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        >
                            <circle ref={(el) => this.c0 = el} cx="426.01" cy="114.62" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c1 = el} cx="490.63" cy="270.63" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c2 = el} cx="426.01" cy="426.63" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c3 = el} cx="270"    cy="491.25" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c4 = el} cx="113.99" cy="426.63" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c5 = el} cx="49.38"  cy="270.63" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c6 = el} cx="113.99" cy="114.62" r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref={(el) => this.c7 = el} cx="270"    cy="50"     r={radius} style={{fillOpacity: 0}} fill={strokeColor}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Spinning;
