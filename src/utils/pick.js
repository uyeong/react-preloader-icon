function pick(object, keys) {
    let result = {};

    for(let key of keys) {
        result[key] = object[key];
    }

    return result;
}

export default pick;
