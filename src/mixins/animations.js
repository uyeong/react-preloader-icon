import velocity from 'velocity-animate';

const animations = {
    /**
     * @param {HTMLElement|SVGElement} element
     */
    spin(element) {
        return velocity(element, {
            rotateZ: '360deg'
        }, {
            duration: this.props.duration,
            easing: 'linear',
            loop: true
        });
    },

    /**
     * @param {HTMLElement|SVGElement} element
     */
    stop(element) {
        return velocity(element, 'stop');
    },

    /**
     * @param {HTMLElement|SVGElement} element
     */
    finish(element) {
        velocity(element, 'finish');
    }
};

export default animations;
