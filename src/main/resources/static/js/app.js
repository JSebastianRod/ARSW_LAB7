var apimock = apimock;
var app = (function () {

    function getName() {
        $("#name").text(author + "'s " + "blueprints:");
    }

    function getNameAuthorBlueprints() {
        author = $("#inputName").val();
        apiclient.getBlueprintsByAuthor(author,tableData);
    }

    var tableData = function (data) {
        $("#blueprintTable tbody").empty();
        
        getName();
        const newRow = data.map((element) => {
            return {
                authorName: element.name,
                points : element.points.length
            }
        });

        newRow.map((elements) => {
            $("#blueprintTable > tbody:last").append($("<tr><td>" + elements.authorName + "</td><td>" + elements.points.toString() +
            "</td><td>" + "<button  id=" + elements.authorName + " onclick=app.getBlueprintsByNameAndAuthor(this)>open</button>" +  "</td>"));
        });

        const total = newRow.reduce((suma, {points}) => suma + points, 0);

        $("#points").text(total);
    }

    function getBlueprintsByNameAndAuthor(data) {
        author = $("#inputName").val();
        blueprintName = data.id;

        document.getElementById("canvas").innerHTML =
                        "Current Blueprint: " + blueprintName;
        apiclient.getBlueprintsByNameAndAuthor(author,blueprintName,drawCanvas);
    }

    var drawCanvas = function(blueprint){
            can = document.getElementById("canva");
            ctx = can.getContext("2d");
            ctx.clearRect(0, 0, can.width, can.height);
            ctx.beginPath();
            blueprintsPoints = blueprint.points.slice(1, blueprint.points.length);
            initx = blueprint.points[0].x;
            inity = blueprint.points[0].y;
            blueprintsPoints.forEach((element) => {
            ctx.moveTo(initx, inity);
            ctx.lineTo(element.x, element.y);
            ctx.stroke();
            initx = element.x;
            inity = element.y;
            });
    }

    function mousePos(canvas, evt) {
      var ClientRect = canvas.getBoundingClientRect();
      return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top),
      };
    }

    function pointerEvents() {
      var canvas = document.getElementById("canva"),
        context = canvas.getContext("2d");

      //if PointerEvent is suppported by the browser:
      if (window.PointerEvent) {
        canvas.addEventListener("pointerdown", function (event) {
          if (author !== "" && blueprintName !== undefined) {
            mouse = mousePos(canvas, event);
            point.push({ x: mouse.x, y: mouse.y });
            apiclient.getBlueprintsByNameAndAuthor(
              author,
              blueprintName,
              drawCanvas
            );
          } else {
            alert("Seleccione un plano");
          }
        });
      }
    }

    return {
        getNameAuthorBlueprints:getNameAuthorBlueprints,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        pointerEvents: pointerEvents
    }
})();