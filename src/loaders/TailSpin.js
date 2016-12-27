import React from 'react';
import Stepper from 'stepperjs';
import linear from 'stepperjs/dist/easings/linear';
import pfx from '../utils/pfx';

class TailSpin extends React.Component {

    /**
     * @property {number!} strokeWidth
     * @property {string!} strokeColor
     * @property {number!} duration
     */
    static propTypes = {
        strokeWidth: React.PropTypes.number.isRequired,
        strokeColor: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired
    };

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

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const strokeWidth = this.props.strokeWidth;
        const translateSize = (strokeWidth / 2) + 1;
        const viewBoxSize = 38 + strokeWidth;

        return (
            <div ref="target" className="preloader-icon__tail-spin" style={{height: '100%'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
                    <defs>
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                            <stop stopColor={this.props.strokeColor} stopOpacity="0" offset="0%"/>
                            <stop stopColor={this.props.strokeColor} stopOpacity=".631" offset="63.146%"/>
                            <stop stopColor={this.props.strokeColor} offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none">
                        <g transform={`translate(${translateSize} ${translateSize})`}>
                            <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#a)" strokeWidth={this.props.strokeWidth}/>
                            <circle fill={this.props.strokeColor} cx="36" cy="18" r={this.props.strokeWidth / 2}/>
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default TailSpin;
