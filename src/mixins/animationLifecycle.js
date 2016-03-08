const animationLifecycle = {
    componentDidMount() {
        if (!this.startAnimation || !this.updateAnimation || !this.finishAnimation) {
            throw new Error(
                'A need to define the animation lifecycle method' +
                '(startAnimation or updateAnimation or finishAnimation)'
            );
        }

        this.startAnimation();
    },

    /**
     * @param {Object} prevProps
     */
    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) {
            this.updateAnimation();
        }
    },

    componentWillUnmount() {
        this.finishAnimation();
    }
};

export default animationLifecycle;
