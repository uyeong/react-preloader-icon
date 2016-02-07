const inner = {
    width: 'inherit',
    height: 'inherit',
    position: 'relative',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)'
};

const blind = {
    fontSize: 0,
    height: 0,
    left: 0,
    lineHeight: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    visibility: 'hidden',
    width: 0
};

const center = {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
};

export {inner, blind, center};
