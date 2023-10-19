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

  var addPoint = function (pointX, pointY, author, blueprintName, callback) {
    var data = JSON.stringify({ "author": author, "points": [{ "x": pointX, "y": pointY }], "name": blueprintName });
    $.ajax({
      type: "PUT",
      url: "http://localhost:8080/blueprints/" + author + "/" + blueprintName,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: data
    });
    callback();
  };

  var saveBlueprint = function (author, blueprintName) {
    var data = JSON.stringify({ author: author, "points": [], "name": blueprintName });
    return new Promise(function (resolve, reject) {
      resolve(
        $.ajax({
          type: "POST",
          url: "http://localhost:8080/blueprints/",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          data: data
        })
      )
    })
  };

  var deleteBlueprint = function (author, blueprintName) {
    return new Promise(function (resolve, reject) {
      resolve(
        $.ajax({
          type: "DELETE",
          url: "http://localhost:8080/blueprints/" + author + "/" + blueprintName,
        })
      )
    })
  }


  return {
    getBlueprintsByAuthor: getBlueprintsByAuthor,
    getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
    addPoint: addPoint,
    saveBlueprint: saveBlueprint,
    deleteBlueprint: deleteBlueprint
  };
})();
