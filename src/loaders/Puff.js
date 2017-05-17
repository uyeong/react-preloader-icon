import React from 'react';
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';
import bezierEasing from 'bezier-easing';

const spread = bezierEasing(0.165, 0.84, 0.44, 1);
const fade = bezierEasing(0.3, 0.61, 0.355, 1);

class Puff extends React.Component {
    constructor(props) {
        super(props);

        this.radius = 50 - (props.strokeWidth / 2);
        this.stepper = new Stepper({
            duration: props.duration,
            easing: linear,
            loop: true
        });
    }

    componentDidMount() {
        const {c1, c2} = this;

        this.stepper.on('update', (n) => {
            const n2 = n >= .5 ? n - .5 : n + .5;

            c1.setAttribute('r', spread(n) * this.radius);
            c2.setAttribute('r', spread(n2) * this.radius);
            c1.style.strokeOpacity = 1 - fade(n);
            c2.style.strokeOpacity = 1 - fade(n2);
        });

        this.stepper.start();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.strokeWidth !== this.props.strokeWidth) {
            this.radius = 50 - (this.props.strokeWidth / 2);
        }

        if (prevProps.duration !== this.props.duration) {
            this.c1.setAttribute('r', '0');
            this.c2.setAttribute('r', '0');
            this.c1.style.strokeOpacity = 0;
            this.c2.style.strokeOpacity = 0;
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
        return (
            <div className="preloader-icon__puff" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 102 102"
                    stroke={this.props.strokeColor}
                >
                    <g fill="none">
                        <g transform="translate(1 1)" strokeWidth={this.props.strokeWidth}>
                            <circle ref={(el) => this.c1 = el} cx="50" cy="50" r="0" style={{strokeOpacity: 0}}/>
                            <circle ref={(el) => this.c2 = el} cx="50" cy="50" r="0" style={{strokeOpacity: 0}}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default Puff;
