/*
 * Copyright (c) 2020.-present Atomic Lotus, LLC - Scott Lewis <scott@atomiclotus.net>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

((global, module, exports) => {

    const get = (subject, key, fallback) => {
        if (typeof subject[key] !== 'undefined') {
            return subject[key];
        }
        return fallback;
    }

    class Icon {

        constructor(data) {
            this.instance = 'Icon@' + this.generateUUID();

            /**
             * {string}
             */
            this.primaryKey = 'identifier';

            if (! data) data = {};

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
         * Gets the value of tags
         * @returns {string}
         */
        getTags() {
            return this.tags;
        }

        /**
         * Gets the value of file
         * @returns {string}
         */
        getFile() {
            return this.file;
        }

        /**
         * Gets the value of licence
         * @returns {string}
         */
        getLicence() {
            return this.licence;
        }

        /**
         * Gets the value of date
         * @returns {string}
         */
        getDate() {
            return this.date;
        }

        /**
         * Gets the value of width
         * @returns {number}
         */
        getWidth() {
            return this.width;
        }

        /**
         * Gets the value of height
         * @returns {number}
         */
        getHeight() {
            return this.height;
        }

        /**
         * Gets the value of parent
         * @returns {string}
         */
        getParent() {
            return this.parent;
        }

        /**
         * Gets the value of type
         * @returns {number}
         */
        getType() {
            return this.type;
        }

        /**
         * Gets the value of unicode
         * @returns {string}
         */
        getUnicode() {
            return this.unicode;
        }


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
         * Sets the value of tags
         * @param {string} value  The value to set tags to.
         * @returns {string}
         */
        setTags(value) {
            this.tags = value;
            return this.tags;
        }

        /**
         * Sets the value of file
         * @param {string} value  The value to set file to.
         * @returns {string}
         */
        setFile(value) {
            this.file = value;
            return this.file;
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
         * Sets the value of date
         * @param {string} value  The value to set date to.
         * @returns {string}
         */
        setDate(value) {
            this.date = value;
            return this.date;
        }

        /**
         * Sets the value of width
         * @param {number} value  The value to set width to.
         * @returns {number}
         */
        setWidth(value) {
            this.width = value;
            return this.width;
        }

        /**
         * Sets the value of height
         * @param {number} value  The value to set height to.
         * @returns {number}
         */
        setHeight(value) {
            this.height = value;
            return this.height;
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
         * Sets the value of type
         * @param {number} value  The value to set type to.
         * @returns {number}
         */
        setType(value) {
            this.type = value;
            return this.type;
        }

        /**
         * Sets the value of unicode
         * @param {string} value  The value to set unicode to.
         * @returns {string}
         */
        setUnicode(value) {
            this.unicode = value;
            return this.unicode;
        }

        /**
         * Get the {Icon} as on object of key => value pairs.
         * @returns {Icon[]}
         */
        valueOf() {
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
        toJSON() {
            return JSON.stringify(this.valueOf());
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Icon;
    }
    else if ( typeof exports === 'object' ){
        exports.Icon = Icon;
    }

})(this, module, exports);