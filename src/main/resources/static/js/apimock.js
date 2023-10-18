//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	 {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
     {author:"johnconnor","points":[{"x":553,"y":777},{"x":150,"y":215}],"name":"floor"},
     {author:"johnconnor","points":[{"x":45,"y":674},{"x":499,"y":100}],"name":"table"} ];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"} ,
     {author:"maryweyland","points":[{"x":487,"y":540},{"x":423,"y":123}],"name":"floor2"},
     {author:"maryweyland","points":[{"x":426,"y":786},{"x":453,"y":777}],"name":"table2"}
     ];

	function addPoint(puntos, author, bpname, callback) {
    puntos.forEach((element) => {
      mockdata[author]
        .find(function (e) {
          return e.name === bpname;
        })
        .points.push(element);
    });
    callback();
  }



	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
		, addPoint : addPoint
	}	

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/