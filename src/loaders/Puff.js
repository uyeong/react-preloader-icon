import React from 'react';
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';
import bezierEasing from 'bezier-easing';

const spread = bezierEasing(0.165, 0.84, 0.44, 1);
const fade = bezierEasing(0.3, 0.61, 0.355, 1);

class Puff extends React.Component {
    constructor(props) {
        super(props);

        this.stepper = new Stepper({
            duration: props.duration,
            easing: linear,
            loop: true
        });
    }

    componentDidMount() {
        const {c1, c2} = this.refs;

        this.stepper.on('update', (n) => {
            const n2 = n >= .5 ? n - .5 : n + .5;

            c1.setAttribute('r', spread(n) * 20);
            c2.setAttribute('r', spread(n2) * 20);
            c1.style.strokeOpacity = 1 - fade(n);
            c2.style.strokeOpacity = 1 - fade(n2);
        });

        this.stepper.start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) {
            this.refs.c1.setAttribute('r', 0);
            this.refs.c2.setAttribute('r', 0);
            this.refs.c1.style.strokeOpacity = 0;
            this.refs.c2.style.strokeOpacity = 0;
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
        const viewBoxSize = 42 + strokeWidth;

        return (
            <div ref="target" className="preloader-icon__puff" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    stroke={this.props.strokeColor}
                >
                    <g fill="none" strokeWidth={strokeWidth}>
                        <circle ref="c1" cx="22" cy="22" r="0" style={{strokeOpacity: 0}}/>
                        <circle ref="c2" cx="22" cy="22" r="0" style={{strokeOpacity: 0}}/>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Puff;
