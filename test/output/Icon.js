/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function get(subject, key, fallback) {
    if (typeof subject[key] !== 'undefined') {
        return subject[key];
    }
    return fallback;
}

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

const Icon = function(data) {

    this.instance = 'Icon@' + generateUUID();

    /**
     * {string}
     */
    this.primaryKey = 'identifier';

    if (! data) data = {};

    /**
     * {string}
     */
    this.identifier = get(data, 'identifier', generateUUID());
    /**
     * {string}
     */
    this.name = get(data, 'name', null);
    /**
     * {string}
     */
    this.tags = get(data, 'tags', null);
    /**
     * {string}
     */
    this.file = get(data, 'file', null);
    /**
     * {string}
     */
    this.licence = get(data, 'licence', null);
    /**
     * {string}
     */
    this.date = get(data, 'date', null);
    /**
     * {number}
     */
    this.width = get(data, 'width', null);
    /**
     * {number}
     */
    this.height = get(data, 'height', null);
    /**
     * {string}
     */
    this.parent = get(data, 'parent', null);
    /**
     * {number}
     */
    this.type = get(data, 'type', null);
    /**
     * {string}
     */
    this.unicode = get(data, 'unicode', null);
}


/**
 * Gets the value of identifier
 * @returns {string}
 */
Icon.prototype.getIdentifier = function() {
    return this.identifier;
}

/**
 * Gets the value of name
 * @returns {string}
 */
Icon.prototype.getName = function() {
    return this.name;
}

/**
 * Gets the value of tags
 * @returns {string}
 */
Icon.prototype.getTags = function() {
    return this.tags;
}

/**
 * Gets the value of file
 * @returns {string}
 */
Icon.prototype.getFile = function() {
    return this.file;
}

/**
 * Gets the value of licence
 * @returns {string}
 */
Icon.prototype.getLicence = function() {
    return this.licence;
}

/**
 * Gets the value of date
 * @returns {string}
 */
Icon.prototype.getDate = function() {
    return this.date;
}

/**
 * Gets the value of width
 * @returns {number}
 */
Icon.prototype.getWidth = function() {
    return this.width;
}

/**
 * Gets the value of height
 * @returns {number}
 */
Icon.prototype.getHeight = function() {
    return this.height;
}

/**
 * Gets the value of parent
 * @returns {string}
 */
Icon.prototype.getParent = function() {
    return this.parent;
}

/**
 * Gets the value of type
 * @returns {number}
 */
Icon.prototype.getType = function() {
    return this.type;
}

/**
 * Gets the value of unicode
 * @returns {string}
 */
Icon.prototype.getUnicode = function() {
    return this.unicode;
}


/**
 * Sets the value of identifier
 * @param {string} value  The value to set identifier to.
 * @returns {string}
 */
Icon.prototype.setIdentifier = function(value) {
    this.identifier = value;
    return this.identifier;
}

/**
 * Sets the value of name
 * @param {string} value  The value to set name to.
 * @returns {string}
 */
Icon.prototype.setName = function(value) {
    this.name = value;
    return this.name;
}

/**
 * Sets the value of tags
 * @param {string} value  The value to set tags to.
 * @returns {string}
 */
Icon.prototype.setTags = function(value) {
    this.tags = value;
    return this.tags;
}

/**
 * Sets the value of file
 * @param {string} value  The value to set file to.
 * @returns {string}
 */
Icon.prototype.setFile = function(value) {
    this.file = value;
    return this.file;
}

/**
 * Sets the value of licence
 * @param {string} value  The value to set licence to.
 * @returns {string}
 */
Icon.prototype.setLicence = function(value) {
    this.licence = value;
    return this.licence;
}

/**
 * Sets the value of date
 * @param {string} value  The value to set date to.
 * @returns {string}
 */
Icon.prototype.setDate = function(value) {
    this.date = value;
    return this.date;
}

/**
 * Sets the value of width
 * @param {number} value  The value to set width to.
 * @returns {number}
 */
Icon.prototype.setWidth = function(value) {
    this.width = value;
    return this.width;
}

/**
 * Sets the value of height
 * @param {number} value  The value to set height to.
 * @returns {number}
 */
Icon.prototype.setHeight = function(value) {
    this.height = value;
    return this.height;
}

/**
 * Sets the value of parent
 * @param {string} value  The value to set parent to.
 * @returns {string}
 */
Icon.prototype.setParent = function(value) {
    this.parent = value;
    return this.parent;
}

/**
 * Sets the value of type
 * @param {number} value  The value to set type to.
 * @returns {number}
 */
Icon.prototype.setType = function(value) {
    this.type = value;
    return this.type;
}

/**
 * Sets the value of unicode
 * @param {string} value  The value to set unicode to.
 * @returns {string}
 */
Icon.prototype.setUnicode = function(value) {
    this.unicode = value;
    return this.unicode;
}

/**
 * Get the {Icon} as on object of key => value pairs.
 * @returns {Icon[]}
 */
Icon.prototype.valueOf = function() {
    return {
        identifier : this.getIdentifier(),
        name : this.getName(),
        tags : this.getTags(),
        file : this.getFile(),
        licence : this.getLicence(),
        date : this.getDate(),
        width : this.getWidth(),
        height : this.getHeight(),
        parent : this.getParent(),
        type : this.getType(),
        unicode : this.getUnicode(),
    }
}

/**
 * Get the {Icon} as a JSON object.
 * @returns {string}
 */
Icon.prototype.toJSON = function() {
    return JSON.stringify(this.valueOf());
}

exports.Icon = Icon;