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

((global, module, exports) => {

    class Meta {

        constructor(data) {

            if (! data) data = {};

            const uniqueId = this.generateUUID();

            this.instance = 'Meta@' + uniqueId;

            /**
             * {string}
             */
            this.primaryKey = '';

            /**
             * {string}
             */
            this.version = this._get(data, 'version', (new Date()).toISOString());

            /**
             * {object}
             */
            this.build = this._get(data, 'build', {});

            /**
             * {date}
             */
            this.date = this._get(data, 'date', (new Date()).toISOString());

        }

        /**
         * Gets the value of version
         * @returns {string}
         */
        getVersion() {
            return this.version;
        }

        /**
         * Gets the value of build
         * @returns {object}
         */
        getBuild() {
            return this.build;
        }

        /**
         * Gets the value of date
         * @returns {date}
         */
        getDate() {
            return this.date;
        }


        /**
         * Sets the value of version
         * @param {string} value  The value to set version to.
         * @returns {string}
         */
        setVersion(value) {
            if (! value instanceof String) {
                throw new TypeError('String required.');
            }
            this.version = value;
            return this.version;
        }

        /**
         * Sets the value of build
         * @param {object} value  The value to set build to.
         * @returns {object}
         */
        setBuild(value) {
            if (! value instanceof Object) {
                throw new TypeError('Object required.');
            }
            this.build = value;
            return this.build;
        }

        /**
         * Sets the value of date
         * @param {date} value  The value to set date to.
         * @returns {date}
         */
        setDate(value) {
            if (! value instanceof Date) {
                throw new TypeError('Date required.');
            }
            this.date = value;
            return this.date;
        }

        // Adders
        // removers
        // Has-sers

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
         * Get the {Meta} as on object of key => value pairs.
         * @returns {Meta[]}
         */
        valueOf() {
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
        toJSON() {
            return JSON.stringify(this.valueOf());
        }
    }

    /*
     * A ttach to the parent scope.
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Meta;
    }
    else if ( typeof exports === 'object' ){
        exports.Meta = Meta;
    }

})(this, module, exports);