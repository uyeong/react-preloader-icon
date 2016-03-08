import React from 'react';
import reactMixin from 'react-mixin';
import detectie from 'detectie';
import animationLifecycle from '../mixins/animationLifecycle';
import animations from '../mixins/animations';

@reactMixin.decorate(animationLifecycle)
@reactMixin.decorate(animations)
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

    startAnimation() {
        if (detectie()) {
            this.spin(this.refs.tailSpin);
        } else {
            this.spin(this.refs.ball);
            this.spin(this.refs.tail);
        }
    }

    updateAnimation() {
        const promise = detectie() ?
            this.stop(this.refs.tailSpin) :
            Promise.all([this.stop(this.refs.ball), this.stop(this.refs.tail)]);

        promise.then(() => {
            this.startAnimation();
        });
    }

    finishAnimation() {
        this.finish(this.refs.tailSpin);
        this.finish(this.refs.ball);
        this.finish(this.refs.tail);
    }

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const strokeWidth = this.props.strokeWidth;
        const translateSize = (strokeWidth / 2) + 1;
        const viewBoxSize = 38 + strokeWidth;

        return (
            <div ref="tailSpin" className="preloader-icon__tail-spin" style={{width: '100%', height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                >
                    <defs>
                        <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                            <stop stopColor={this.props.strokeColor} stopOpacity="0" offset="0%"/>
                            <stop stopColor={this.props.strokeColor} stopOpacity=".631" offset="63.146%"/>
                            <stop stopColor={this.props.strokeColor} offset="100%"/>
                        </linearGradient>
                    </defs>
                    <g fill="none">
                        <g transform={`translate(${translateSize} ${translateSize})`}>
                            <path
                                ref="tail"
                                d="M36 18c0-9.94-8.06-18-18-18"
                                stroke="url(#a)"
                                strokeWidth={this.props.strokeWidth}
                                style={{transformOrigin: '18px 18px'}}
                            />
                            <circle
                                ref="ball"
                                fill={this.props.strokeColor}
                                cx="36"
                                cy="18"
                                r={this.props.strokeWidth / 2}
                                style={{transformOrigin: '18px 18px'}}
                            />
                        </g>
                    </g>
                </svg>
            </div>
        );
    }
}

export default TailSpin;
