const memory = {};

function pfx(property) {
    if (memory[property]) {
        return memory[property];
    }

    const style = document.createElement("dummy").style;
    const prefixes = ['Webkit', 'Moz', 'O', 'ms'];
    const camelCaseProp = property.replace(/-(\w)/g, (m, g) => g.toUpperCase());
    const firstUpperProp = camelCaseProp.charAt(0).toUpperCase() + camelCaseProp.substr(1);
    const properties = (camelCaseProp + " " + prefixes.join(firstUpperProp + " ") + firstUpperProp).split(" ");

    memory[property] = {
        support: false,
        prefix: '',
        original: property,
        property: ''
    };

    for (let i = 0, n = properties.length; i < n; i++) {
        if (style[properties[i]] !== undefined) {
            memory[property] = {
                support: true,
                prefix: prefixes[i - 1] || '',
                original: property,
                property: properties[i]
            };

            break;
        }
    }

    return memory[property];
}

export default pfx;
