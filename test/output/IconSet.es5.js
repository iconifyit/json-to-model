/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

(function(global, module, exports) {

    'use strict';

    var IconSet = function(data) {
        this.IconSet = 'IconSet@' + this._generateUUID();

        if (! data) data = {};

        /**
         * {string}
         */
         this.primaryKey = 'identifier';

        /**
         * {string}
         */
        this.parentKey = 'parent';

        /**
         * {string}
         */
        this.childrenKey = 'children';

        /**
         * {string}
         */
        this.identifier = this._get(data, 'identifier', this._generateUUID());
        /**
         * {string}
         */
        this.name = this._get(data, 'name', null);
        /**
         * {string}
         */
        this.parent = this._get(data, 'parent', null);
        /**
         * {string}
         */
        this.date = this._get(data, 'date', null);
        /**
         * {string}
         */
        this.licence = this._get(data, 'licence', null);
        /**
         * {number}
         */
        this.sort = this._get(data, 'sort', null);
        /**
         * {object}
         */
        this.children = this._get(data, 'children', null);
    }

    // Getters

    /**
     * Gets the value of identifier
     * @returns {string}
     */
    IconSet.prototype.getIdentifier = function() {
        return this.identifier;
    }

    /**
     * Gets the value of name
     * @returns {string}
     */
    IconSet.prototype.getName = function() {
        return this.name;
    }

    /**
     * Gets the value of parent
     * @returns {string}
     */
    IconSet.prototype.getParent = function() {
        return this.parent;
    }

    /**
     * Gets the value of date
     * @returns {string}
     */
    IconSet.prototype.getDate = function() {
        return this.date;
    }

    /**
     * Gets the value of licence
     * @returns {string}
     */
    IconSet.prototype.getLicence = function() {
        return this.licence;
    }

    /**
     * Gets the value of sort
     * @returns {number}
     */
    IconSet.prototype.getSort = function() {
        return this.sort;
    }

    /**
     * Gets the value of children
     * @returns {object}
     */
    IconSet.prototype.getChildren = function() {
        return this.children;
    }

    // Setters

    /**
     * Sets the value of identifier
     * @param {string} value  The value to set identifier to.
     * @returns {string}
     */
    IconSet.prototype.setIdentifier = function(value) {
        this.identifier = value;
        return this.identifier;
    }

    /**
     * Sets the value of name
     * @param {string} value  The value to set name to.
     * @returns {string}
     */
    IconSet.prototype.setName = function(value) {
        this.name = value;
        return this.name;
    }

    /**
     * Sets the value of parent
     * @param {string} value  The value to set parent to.
     * @returns {string}
     */
    IconSet.prototype.setParent = function(value) {
        this.parent = value;
        return this.parent;
    }

    /**
     * Sets the value of date
     * @param {string} value  The value to set date to.
     * @returns {string}
     */
    IconSet.prototype.setDate = function(value) {
        this.date = value;
        return this.date;
    }

    /**
     * Sets the value of licence
     * @param {string} value  The value to set licence to.
     * @returns {string}
     */
    IconSet.prototype.setLicence = function(value) {
        this.licence = value;
        return this.licence;
    }

    /**
     * Sets the value of sort
     * @param {number} value  The value to set sort to.
     * @returns {number}
     */
    IconSet.prototype.setSort = function(value) {
        this.sort = value;
        return this.sort;
    }

    /**
     * Sets the value of children
     * @param {object} value  The value to set children to.
     * @returns {object}
     */
    IconSet.prototype.setChildren = function(value) {
        this.children = value;
        return this.children;
    }

    // CRUD functions

    /**
     * Gets the first item in the collection.
     * @param {integer}     i   The position of the item to return.
     * @returns {}
     */
    IconSet.prototype.first = function() {
        if (this.length() > 0) {
            return this.children[0];
        }
    }

    /**
     * Gets the last item in the collection.
     * @param {integer}     i   The position of the item to return.
     * @returns {}
     */
    IconSet.prototype.last = function() {
        if (this.length() > 0) {
            return this.children[this.length() -1];
        }
    }

    /**
     * Gets a single item by index.
     * @param {integer}     i   The position of the item to return.
     * @returns {}
     */
    IconSet.prototype.get = function(i) {
        return this.children[i];
    }

    /**
     * Gets a single item by property value.
     * @param   {string}    The property name by which to search.
     * @param   {*}         The value to match.
     * @returns {}
     */
    IconSet.prototype.item = function(key, value) {
        for (let i = 0; i < this.length(); i++) {
            if (this.children[i][key] === value) {
                return this.children[i];
            }
        }
        return null;
    }

    /**
     * Remove item at `i` index.
     * @param {integer}
     * @returns {string}
     */
    IconSet.prototype.remove = function(i) {
        this.children = this.children.splice(i, 1);
    }

    /**
     * Adds a single item.
     * @param {} The item to add.
     * @returns {}
     */
    IconSet.prototype.add = function(item) {
        if (this.item('identifier', item.identifier)) {
            throw new Error('A(n)  with identifier of ' + item.identifier + ' already exists');
        }
        item.parent = this.identifier;
        this.children.push(item);
        return this.last();
    }

    /**
     * Inserts an item at the specified index.
     * @param {integer}     i   The position at which to insert the item.
     * @param {}
     * @returns {string}
     */
    IconSet.prototype.insert = function(i, item) {
        item.parent   = this.identifier;
        this.children = this.children.splice(i, 0, item);
    }

    /**
     * Returns all children in the collection.
     * @returns {[]}
     */
    IconSet.prototype.getAll = function() {
        return this.children;
    }

    // Utility functions

    /**
     * Gets the value of an object property by name.
     * @param {object}  subject     The object to search.
     * @param {string}  key         The name of the property to get.
     * @param {*}       fallback    The default value to return if key is not found.
     */
    IconSet.prototype._get = function(subject, key, fallback) {
        if (typeof subject[key] !== 'undefined') {
            return subject[key];
        }
        return fallback;
    }

    /**
     * Creates a unique identifier in UUID format.
     */
    IconSet.prototype._generateUUID = function() {
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
     * Sorts the children by key.
     * @param {string}  key     The property name by which to sort.
     * @returns {[]}
     */
    IconSet.prototype.sort = function(key) {
        this.children.sort(function (a, b) {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[property] > b[property]) {
                return 1;
            }
            return 0;
        });
        return this.children;
    }

    /**
     * Get value of {name}
     * @returns {integer}
     */
    IconSet.prototype.length = function() {
        return this.children.length;
    }

    /**
     * Get the {IconSet} as a key => value pairs object.
     * @returns {IconSet[]}
     */
    IconSet.prototype.valueOf = function() {
        var children = this.getAll();
        children.map(function(item) {
            return item.valueOf();
        });

        var data = {
            identifier : this.getIdentifier(),
            name : this.getName(),
            parent : this.getParent(),
            date : this.getDate(),
            licence : this.getLicence(),
            sort : this.getSort(),
            children : children
        }

        return data;
    }

    /**
     * Get the {IconSet} as a JSON object.
     * @returns {string}
     */
    IconSet.prototype.toJSON = function() {
        return JSON.stringify(this.valueOf());
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = IconSet;
    }
    else if ( typeof exports === 'object' ){
        exports.IconSet = IconSet;
    }

})(this, module, exports);

