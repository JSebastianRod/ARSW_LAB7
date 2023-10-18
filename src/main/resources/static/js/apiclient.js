var apiclient = (function () {
    var getBlueprintsByNameAndAuthor = function (author, name, callback) {
        $.ajax({

            url: "http://localhost:8080/blueprints/" + author + "/" + name,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data) {
                callback(data);
            },
        });
    };

    var getBlueprintsByAuthor = function (author, callback) {
      $.ajax({
        url: "http://localhost:8080/blueprints/" + author,
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function (data) {
          callback(data);
        },
      });
    };

    return {
      getBlueprintsByAuthor: getBlueprintsByAuthor,
      getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    };
})();
