

function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function ucWords(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
}

class JsonToModel {
    constructor(className, data) {

        if (! className || typeof className !== 'string') {
            throw new Error('ClassName is required');
        }

        if (typeof data !== 'object') {
            throw new Error('data must be a JSON object');
        }

        const fs  = require('fs');

        const kUTF8 = 'utf-8';

        const _group   = fs.readFileSync('./templates/collection.tpl', kUTF8);
        const _class   = fs.readFileSync('./templates/class.tpl', kUTF8);
        const _getter  = fs.readFileSync('./templates/getter.tpl', kUTF8);
        const _setter  = fs.readFileSync('./templates/setter.tpl', kUTF8);

        var Instance   = _class.replace(/\{ClassName\}/g, className);
        var methods    = [],
            properties = [];

        for (var key in data) {

            var value = data[key];

            properties.push('/**');
            properties.push(' * {' + typeof value + '}');
            properties.push(' */');
            properties.push('this.{key} = null;'.replace('{key}', key));
            properties.push('\n');

            var getter;
            getter = _getter.replace('{ClassName}', className);
            getter = getter.split('{name}').join(key);
            getter = getter.split('{ucName}').join(ucWords(key));

            var setter;
            setter = _setter.replace('{ClassName}', className);
            setter = setter.split('{name}').join(key);
            setter = setter.split('{ucName}').join(ucWords(key));

            var type = typeof value;

            methods.push(getter);
            methods.push(setter);
        }

        Instance = Instance
            .replace(/\{code\}/g, methods.join("\n") )
            .replace(/\{properties\}/g, properties.join("\n\t\t"))

        return {
            toString : function() { return Instance }
        }
    }
}

exports.JsonToModel = JsonToModel;
