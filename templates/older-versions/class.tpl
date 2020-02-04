(function(global) {

    var {ClassName} = function() {

        this.instance = '{ClassName}@' + generateUUID();

        {properties}
    }
    {code}

    global.{ClassName} = {ClassName};

})(this);