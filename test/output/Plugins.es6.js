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

((global, module, exports) => {

    class Plugins {
        constructor(data) {

            if (! data) data = {};

            const uniqueId = this.generateUUID();

            this.instance = 'Plugins@' + uniqueId;

            /**
             * {string}
             */
            this.primaryKey = 'name';

            /**
             * {string}
             */
            this.parentKey = 'pluginParent';

            /**
             * {string}
             */
            this.childrenKey = 'plugins';

            /**
             * {string}
             */
            this.name = this._get(data, 'name', uniqueId);
            /**
             * {plugin[]}
             */
            this.plugins = this._get(data, 'plugins', []);
            /**
             * {boolean}
             */
            this.disabled = this._get(data, 'disabled', false);
        }

        // Gettters
    
        /**
         * Gets the value of name
         * @returns {string}
         */
        getName() {
            return this.name;
        }
    
        /**
         * Gets the value of plugins
         * @returns {plugin[]}
         */
        getPlugins() {
            return this.plugins;
        }
    
        /**
         * Gets the value of disabled
         * @returns {boolean}
         */
        getDisabled() {
            return this.disabled;
        }

        // Setters
    
        /**
         * Sets the value of name
         * @param {string} value  The value to set name to.
         * @returns {string}
         */
        setName(value) {
            if (! value instanceof String) {
                throw new TypeError('Plugins.setName() requires a String.');
            }
            this.name = value;
            return this.name;
        }
    
        /**
         * Sets the value of plugins
         * @param {array} value  The value to set plugins to.
         * @returns {plugin[]}
         */
        setPlugins(value) {
            if (! value instanceof Array) {
                throw new TypeError('Plugins.setPlugins() requires a Array.');
            }
            this.plugins = value;
            return this.plugins;
        }
    
        /**
         * Sets the value of disabled
         * @param {boolean} value  The value to set disabled to.
         * @returns {boolean}
         */
        setDisabled(value) {
            if (! value instanceof Boolean) {
                throw new TypeError('Plugins.setDisabled() requires a Boolean.');
            }
            this.disabled = value;
            return this.disabled;
        }

    // Adders

        /**
         * Adds a plugins
         * @param {array} value  The value to add to plugins.
         * @returns {plugin[]}
         */
        addPlugin(value) {
            if (! value instanceof Plugin) {
                throw new TypeError('Plugins.addPlugin() requires a Plugin.');
            }
            if (this.plugins instanceof Array && this.plugins.indexOf(value) === -1) {
                this.plugins.push(value);
            }
            return this.plugins;
        }
    // removers

        /**
         * Removes a plugins
         * @param {array} value  The item to remove from plugins.
         * @returns {plugin[]}
         */
        removePlugin(value) {
            if (this.plugins instanceof Array && this.plugins.indexOf(value) >= 0) {
                var filtered = [];
                this.plugins.map(function(item) {
                if (item === value) return;
                    tmp.push(item);
                });
                this.plugins = filtered;
            }
            return this.plugins;
        }
    // Has-sers

        /**
         * Checks to see if `value` exists in plugins
         * @param {boolean} value  The value to check plugins for.
         * @returns {boolean}
         */
        hasPlugin(value) {
            return ( this.plugins instanceof Array && this.plugins.indexOf(value) >= 0 );
        }

        // CRUD methods

        /**
         * Gets the first item in the collection.
         * @param {integer}     i   The position of the item to return.
         * @returns {Plugin}
         */
        first() {
            if (this.length() > 0) {
                return this.plugins[0];
            }
        }
    
        /**
         * Gets the last item in the collection.
         * @param {integer}     i   The position of the item to return.
         * @returns {Plugin}
         */
        last() {
            if (this.length() > 0) {
                return this.plugins[this.length() -1];
            }
        }
    
        /**
         * Gets a single item by index.
         * @param {integer}     i   The position of the item to return.
         * @returns {Plugin}
         */
        get(i) {
            return this.plugins[i];
        }
    
        /**
         * Gets a single item by property value.
         * @param   {string}    The property name by which to search.
         * @param   {*}         The value to match.
         * @returns {Plugin}
         */
        item(key, value) {
            for (let i = 0; i < this.length(); i++) {
                if (this.plugins[i][key] === value) {
                    return this.plugins[i];
                }
            }
            return null;
        }
    
        /**
         * Remove item at `i` index.
         * @param {integer}
         * @returns {array}
         */
        remove(i) {
            this.plugins = this.plugins.splice(i, 1);
            return this.plugins
        }
    
        /**
         * Adds a single item.
         * @param {} The item to add.
         * @returns {array}
         */
        add(item) {
            if (this.item('name', item.name)) {
                throw new Error('A(n)  with name of ' + item.name + ' already exists');
            }
            item.pluginParent = this.name;
            this.plugins.push(item);
            return this.plugins
        }
    
        /**
         * Inserts an item at the specified index.
         * @param {integer}     i   The position at which to insert the item.
         * @param {}
         * @returns {array}
         */
        insert(i, item) {
            item.pluginParent   = this.name;
            this.plugins = this.plugins.splice(i, 0, item);
            return this.plugins
        }
    
        /**
         * Returns all plugins in the collection.
         * @returns {array}
         */
        getAll() {
            return this.plugins;
        }

        // Utility methods

        /**
         * Gets the value of an object property by name.
         * @param {object}  subject     The object to search.
         * @param {string}  key         The name of the property to get.
         * @param {*}       fallback    The default value to return if key is not found.
         */
        _get(subject, key, fallback) {
            if (typeof subject[key] !== 'undefined') {
                return subject[key];
            }
            return fallback;
        }

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
         * Sorts the plugins by key.
         * @param {string}  key     The property name by which to sort.
         * @returns {[]}
         */
        sort(key) {
            this.plugins.sort(function (a, b) {
                if (a[key] < b[key]) {
                    return -1;
                }
                if (a[property] > b[property]) {
                    return 1;
                }
                return 0;
            });
            return this.plugins;
        }
    
        /**
         * Get value of {name}
         * @returns {integer}
         */
        length() {
            return this.plugins.length;
        }
    
        /**
         * Get the {Plugins} as a key => value pairs object.
         * @returns {Plugins[]}
         */
        valueOf() {
            const plugins = this.getAll();
            (plugins || []).map(function(item) {
                return item.valueOf();
            });
    
            const data = {
                name : this.getName(),
                plugins : plugins,
                disabled : this.getDisabled(),
            }
    
            return data;
        }
    
        /**
         * Get the {Plugins} as a JSON object.
         * @returns {string}
         */
        toJSON() {
            return JSON.stringify(this.valueOf());
        }
    }

    /*
     * Attach to the parent scope.
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Plugins;
    }
    else if ( typeof exports === 'object' ){
        exports.Plugins = Plugins;
    }

})(this, module, exports);