import velocity from 'velocity-animate';

const animations = {

    /**
     * @param {HTMLElement|SVGElement} element
     * @returns {Promise}
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
     * @returns {Promise}
     */
    stop(element) {
        return velocity(element, 'stop', true);
    },

    /**
     * @param {HTMLElement|SVGElement} element
     * @returns {Promise}
     */
    finish(element) {
        this.stop(element).then(() => {
            velocity(element, 'finish');
        });
    }
};

export default animations;
