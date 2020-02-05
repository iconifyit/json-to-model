/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* ============================================================ *
 * This file is auto-generated by JsonToJsModel by @atomiclotus *
 * ============================================================ */

(function(global, module, exports) {

    'use strict';

    var Meta = function(data) {

        if (! data) data = {};

        var uniqueId = this._generateUUID();

        this.instance = 'Meta@' + uniqueId;

        /**
         * {string}
         */
        this.primaryKey = '';

        /**
         * {number}
         */
        this.version = this._get(data, 'version', 0);
        /**
         * {object}
         */
        this.build = this._get(data, 'build', {});
        /**
         * {date}
         */
        this.date = this._get(data, 'date', (new Date()).toISOString());

    }

    // Getters
    /**
     * Gets the value of version
     * @returns {number}
     */
    Meta.prototype.getVersion = function() {
        return this.version;
    }

    /**
     * Gets the value of build
     * @returns {object}
     */
    Meta.prototype.getBuild = function() {
        return this.build;
    }

    /**
     * Gets the value of date
     * @returns {date}
     */
    Meta.prototype.getDate = function() {
        return this.date;
    }

    // Setters

    /**
     * Sets the value of version
     * @param {number} value  The value to set version to.
     * @returns {number}
     */
    Meta.prototype.setVersion = function(value) {
        if (typeof value !== 'number') {
            throw new TypeError('number required. ' + typeof value + ' given');
        }
        this.version = value;
        return this.version;
    }

    /**
     * Sets the value of build
     * @param {object} value  The value to set build to.
     * @returns {object}
     */
    Meta.prototype.setBuild = function(value) {
        if (typeof value !== 'object') {
            throw new TypeError('object required. ' + typeof value + ' given');
        }
        this.build = value;
        return this.build;
    }

    /**
     * Sets the value of date
     * @param {date} value  The value to set date to.
     * @returns {date}
     */
    Meta.prototype.setDate = function(value) {
        if (typeof value !== 'date') {
            throw new TypeError('date required. ' + typeof value + ' given');
        }
        this.date = value;
        return this.date;
    }

    // Utility functions

    /**
     * Gets the value of an object property by name.
     * @param {object}  subject     The object to search.
     * @param {string}  key         The name of the property to get.
     * @param {*}       fallback    The default value to return if key is not found.
     */
    Meta.prototype._get = function(subject, key, fallback) {
        if (typeof subject[key] !== 'undefined') {
            return subject[key];
        }
        return fallback;
    }

    /**
     * Creates a unique identifier in UUID format.
     */
    Meta.prototype._generateUUID = function() {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Get the {Meta} as on object of key => value pairs.
     * @returns {Meta[]}
     */
    Meta.prototype.valueOf = function() {
        return {
            version : this.getVersion(),
            build : this.getBuild(),
            date : this.getDate(),
        }
    }

    /**
     * Get the {Meta} as a JSON object.
     * @returns {string}
     */
    Meta.prototype.toJSON = function() {
        return JSON.stringify(this.valueOf());
    }

    /*
     * Attach to the parent scope.
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Meta;
    }
    else if ( typeof exports === 'object' ){
        exports.Meta = Meta;
    }

})(this, module, exports);

