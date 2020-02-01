/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

((global, module, exports) => {

    /**
    * Gets the value of an object property by name.
    * @param {object}  subject     The object to search.
    * @param {string}  key         The name of the property to get.
    * @param {*}       fallback    The default value to return if key is not found.
    */
    const get = (subject, key, fallback) => {
        if (typeof subject[key] !== 'undefined') {
            return subject[key];
        }
        return fallback;
    }

    class IconSet {
        constructor(data) {
            this.IconSet = 'IconSet@' + this.generateUUID();

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
            this.identifier = get(data, 'identifier', this.generateUUID());
            /**
             * {string}
             */
            this.name = get(data, 'name', null);
            /**
             * {string}
             */
            this.parent = get(data, 'parent', null);
            /**
             * {string}
             */
            this.date = get(data, 'date', null);
            /**
             * {string}
             */
            this.licence = get(data, 'licence', null);
            /**
             * {number}
             */
            this.sort = get(data, 'sort', null);
            /**
             * {object}
             */
            this.children = get(data, 'children', null);
        }

        // Gettters
    
        /**
         * Gets the value of identifier
         * @returns {string}
         */
        getIdentifier() {
            return this.identifier;
        }
    
        /**
         * Gets the value of name
         * @returns {string}
         */
        getName() {
            return this.name;
        }
    
        /**
         * Gets the value of parent
         * @returns {string}
         */
        getParent() {
            return this.parent;
        }
    
        /**
         * Gets the value of date
         * @returns {string}
         */
        getDate() {
            return this.date;
        }
    
        /**
         * Gets the value of licence
         * @returns {string}
         */
        getLicence() {
            return this.licence;
        }
    
        /**
         * Gets the value of sort
         * @returns {number}
         */
        getSort() {
            return this.sort;
        }
    
        /**
         * Gets the value of children
         * @returns {object}
         */
        getChildren() {
            return this.children;
        }

        // Setters
    
        /**
         * Sets the value of identifier
         * @param {string} value  The value to set identifier to.
         * @returns {string}
         */
        setIdentifier(value) {
            this.identifier = value;
            return this.identifier;
        }
    
        /**
         * Sets the value of name
         * @param {string} value  The value to set name to.
         * @returns {string}
         */
        setName(value) {
            this.name = value;
            return this.name;
        }
    
        /**
         * Sets the value of parent
         * @param {string} value  The value to set parent to.
         * @returns {string}
         */
        setParent(value) {
            this.parent = value;
            return this.parent;
        }
    
        /**
         * Sets the value of date
         * @param {string} value  The value to set date to.
         * @returns {string}
         */
        setDate(value) {
            this.date = value;
            return this.date;
        }
    
        /**
         * Sets the value of licence
         * @param {string} value  The value to set licence to.
         * @returns {string}
         */
        setLicence(value) {
            this.licence = value;
            return this.licence;
        }
    
        /**
         * Sets the value of sort
         * @param {number} value  The value to set sort to.
         * @returns {number}
         */
        setSort(value) {
            this.sort = value;
            return this.sort;
        }
    
        /**
         * Sets the value of children
         * @param {object} value  The value to set children to.
         * @returns {object}
         */
        setChildren(value) {
            this.children = value;
            return this.children;
        }

        // CRUD methods

        /**
         * Gets the first item in the collection.
         * @param {integer}     i   The position of the item to return.
         * @returns {}
         */
        first() {
            if (this.length() > 0) {
                return this.children[0];
            }
        }
    
        /**
         * Gets the last item in the collection.
         * @param {integer}     i   The position of the item to return.
         * @returns {}
         */
        last() {
            if (this.length() > 0) {
                return this.children[this.length() -1];
            }
        }
    
        /**
         * Gets a single item by index.
         * @param {integer}     i   The position of the item to return.
         * @returns {}
         */
        get(i) {
            return this.children[i];
        }
    
        /**
         * Gets a single item by property value.
         * @param   {string}    The property name by which to search.
         * @param   {*}         The value to match.
         * @returns {}
         */
        item(key, value) {
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
        remove(i) {
            this.children = this.children.splice(i, 1);
        }
    
        /**
         * Adds a single item.
         * @param {} The item to add.
         * @returns {}
         */
        add(item) {
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
        insert(i, item) {
            item.parent   = this.identifier;
            this.children = this.children.splice(i, 0, item);
        }
    
        /**
         * Returns all children in the collection.
         * @returns {[]}
         */
        getAll() {
            return this.children;
        }

        // Utility methods

        /**
         * Creates a unique identifier in UUID format.
         */
        generateUUID() {
            let d = new Date().getTime();
            if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
                d += performance.now(); //use high-precision timer if available
            }
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }

        /**
         * Sorts the children by key.
         * @param {string}  key     The property name by which to sort.
         * @returns {[]}
         */
        sort(key) {
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
        length() {
            return this.children.length;
        }
    
        /**
         * Get the {IconSet} as a key => value pairs object.
         * @returns {IconSet[]}
         */
        valueOf() {
            const children = this.getAll();
            children.map(function(item) {
                return item.valueOf();
            });
    
            const data = {
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
        toJSON() {
            return JSON.stringify(this.valueOf());
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = IconSet;
    }
    else if ( typeof exports === 'object' ){
        exports.IconSet = IconSet;
    }

})(this, module, exports);