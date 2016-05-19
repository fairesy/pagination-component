var AJAX = {
	"get" : function(url){
				return $.ajax({
					"method" : "GET",
					"url" : url
				});
			},
	"post" : function(url, data){
				return $.ajax({
					"method" : "POST",
					"url" : url,
					"data" : data
				});
			},
	"delete" : function(url, target){
				return $.ajax({
					"method" : "DELETE",
					"url" : url + "/" + target
				});
			},
	"put" : function(url, target, data){
				return $.ajax({
					"method" : "PUT",
					"url" : url + "/" + target,
					"data" : data
				});
			}
};
