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
            progress = progress > 1 ? 0.9999 : progress;

            const nextIndex = parseInt(progress / PART_PROGRESS, 10);
            let nextTarget;
            let prevTarget;

            if (nextIndex - 1 !== prevIndex && !(nextIndex === 0 && prevIndex === 7)) {
                prevTarget = this.refs[`c${prevIndex}`];
                prevTarget.style.fillOpacity = 0;

                prevIndex = nextIndex === 0 ? 7 : nextIndex - 1;
            }

            progress = (progress - (PART_PROGRESS * nextIndex)) / PART_PROGRESS;

            nextTarget = this.refs[`c${nextIndex}`];
            prevTarget = this.refs[`c${prevIndex}`];

            nextTarget.style.fillOpacity = progress;
            prevTarget.style.fillOpacity = 1 - progress;
        });

        this.stepper.start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) {
            for(let key in this.refs) {
                if (this.refs.hasOwnProperty(key)) {
                    this.refs[key].style.fillOpacity = 0;
                }
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
        const translateSize = (strokeWidth / 2) + 1;
        const viewBoxSize = 56 + strokeWidth;

        return (
            <div className="preloader-icon__spinning" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                >
                    <g fill="none">
                        <g
                            transform={`translate(${translateSize} ${translateSize})`}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        >
                            <circle ref="c0" cx="42.601" cy="11.462" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c1" cx="49.063" cy="27.063" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c2" cx="42.601" cy="42.663" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c3" cx="27"     cy="49.125" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c4" cx="11.399" cy="42.663" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c5" cx="4.938"  cy="27.063" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c6" cx="11.399" cy="11.462" r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                            <circle ref="c7" cx="27"     cy="5"      r="5" style={{fillOpacity: 0}} fill={strokeColor}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Spinning;
