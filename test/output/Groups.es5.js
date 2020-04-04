/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis (scott@atomiclotus.net)
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

    var Groups = function(data) {

        var uniqueId = this._generateUUID();

        this.Groups = 'Groups@' + uniqueId;

        if (! data) data = {};

        /**
         * {string}
         */
         this.primaryKey = '';

        /**
         * {string}
         */
        this.parentKey = '';

        /**
         * {string}
         */
        this.childrenKey = '';

    }

    // Getters

    // Setters

    // Adders
    // removers
    // Has-sers

    // CRUD functions

    /**
     * Gets the first item in the collection.
     * @returns {}
     */
    Groups.prototype.first = function() {
        if (this.length() > 0) {
            return this.[0];
        }
    }

    /**
     * Gets the last item in the collection.
     * @param {integer}     i   The position of the item to return.
     * @returns {}
     */
    Groups.prototype.last = function() {
        if (this.length() > 0) {
            return this.[this.length() -1];
        }
    }

    /**
     * Gets a single item by index.
     * @param {integer}     i   The position of the item to return.
     * @returns {}
     */
    Groups.prototype.get = function(i) {
        return this.[i];
    }

    /**
     * Gets a single item by property value.
     * @param   {string}    The property name by which to search.
     * @param   {*}         The value to match.
     * @returns {}
     */
    Groups.prototype.item = function(key, value) {
        for (let i = 0; i < this.length(); i++) {
            if (this.[i][key] === value) {
                return this.[i];
            }
        }
        return null;
    }

    /**
     * Remove item at `i` index.
     * @param {integer}
     * @returns {array}
     */
    Groups.prototype.remove = function(i) {
        this. = this..splice(i, 1);
        return this.
    }

    /**
     * Adds a single item.
     * @param {} The item to add.
     * @returns {array}
     */
    Groups.prototype.add = function(item) {
        if (this.item('', item.)) {
            throw new Error('A(n)  with  of ' + item. + ' already exists');
        }
        item. = this.;
        this..push(item);
        return this.;
    }

    /**
     * Inserts an item at the specified index.
     * @param {integer}     i   The position at which to insert the item.
     * @param {}
     * @returns {array}
     */
    Groups.prototype.insert = function(i, item) {
        item.   = this.;
        this. = this..splice(i, 0, item);
        return this.
    }

    /**
     * Returns all  in the collection.
     * @returns {array}
     */
    Groups.prototype.getAll = function() {
        return this.;
    }

    // Utility functions

    /**
     * Gets the value of an object property by name.
     * @param {object}  subject     The object to search.
     * @param {string}  key         The name of the property to get.
     * @param {*}       fallback    The default value to return if key is not found.
     */
    Groups.prototype._get = function(subject, key, fallback) {
        if (typeof subject[key] !== 'undefined') {
            return subject[key];
        }
        return fallback;
    }

    /**
     * Creates a unique identifier in UUID format.
     */
    Groups.prototype._generateUUID = function() {
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
     * Sorts the  by key.
     * @param {string}  key     The property name by which to sort.
     * @returns {[]}
     */
    Groups.prototype.sort = function(key) {
        this..sort(function (a, b) {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        });
        return this.;
    }

    /**
     * Get value of {name}
     * @returns {integer}
     */
    Groups.prototype.length = function() {
        return this..length;
    }

    /**
     * Get the {Groups} as a key => value pairs object.
     * @returns {Groups[]}
     */
    Groups.prototype.valueOf = function() {
        var  = this.getAll();
        ( || []).map(function(item) {
            return item.valueOf();
        });

        var data = {
        }

        return data;
    }

    /**
     * Get the {Groups} as a JSON object.
     * @returns {string}
     */
    Groups.prototype.toJSON = function() {
        return JSON.stringify(this.valueOf());
    }

    /*
     * Attach to the parent scope.
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Groups;
    }
    else if ( typeof exports === 'object' ){
        exports.Groups = Groups;
    }

})(this, module, exports);


