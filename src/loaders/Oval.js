import React from 'react';
import detectie from 'detectie';
import reactMixin from 'react-mixin';
import animationLifecycle from '../mixins/animationLifecycle';
import animations from '../mixins/animations';

@reactMixin.decorate(animationLifecycle)
@reactMixin.decorate(animations)
class Oval extends React.Component {

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
        this.spin(this._getTargetElement());
    }

    updateAnimation() {
        this.stop(this._getTargetElement()).then(() => {
            this.startAnimation();
        });
    }

    finishAnimation() {
        this.finish(this._getTargetElement());
    }

    /**
     * @returns {ReactElement|XML}
     */
    render() {
        const strokeWidth = this.props.strokeWidth;
        const translateSize = (strokeWidth / 2) + 1;
        const viewBoxSize = 38 + strokeWidth;

        return (
            <div ref={(r) => this._oval = r} className="preloader-icon__oval" style={{height: '100%'}}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
                    stroke={this.props.strokeColor}
                >
                    <g fill="none">
                        <g transform={`translate(${translateSize} ${translateSize})`} strokeWidth={strokeWidth}>
                            <circle stroke={this.props.strokeColor} strokeOpacity=".5" cx="18" cy="18" r="18"/>
                            <path
                                ref={(r) => this._arc = r}
                                style={{transformOrigin: '18px 18px'}}
                                d="M36 18c0-9.94-8.06-18-18-18"
                            />
                        </g>
                    </g>
                </svg>
            </div>
        );
    }

    /**
     * @returns {HTMLDivElement|SVGPathElement}
     * @private
     */
    _getTargetElement() {
        let result = this._oval;

        if (!detectie()) {
            result = this._arc;
        }

        return result;
    }
}

export default Oval;
