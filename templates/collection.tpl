(function(global) {

    var Instance = function() {
        this.instance = '{ClassName}@' + generateUUID();

        this.items = [];

        // {properties}
    }
    // {code}

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.get = function(i) {
        return this.items[i];
    }

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.item = function(key, value) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i][key] === value) {
                return this.items[i];
            }
        }
        return null;
    }

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.remove = function(i) {
        this.items = this.items.splice(i, 1);
    }

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.insert = function(i, obj) {
        this.items = this.items.splice(i, 0, obj);
    }

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.getAll = function() {
        return this.items;
    }

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.sort = function() {
        return this.items;
    }

    /**
    * Get value of {name}
    * @returns {string}
    */
    Instance.prototype.length = function() {
        return this.items.length;
    }

    // global.{ClassName} = {ClassName};

})(this);