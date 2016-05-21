define(["jquery"], function($){
	function get(url){
				return $.ajax({
					"method" : "GET",
					"url" : url
				});
			};
	function post(url, data){
				return $.ajax({
					"method" : "POST",
					"url" : url,
					"data" : data
				});
			};
	function DELETE(url, target){
				return $.ajax({
					"method" : "DELETE",
					"url" : url + "/" + target
				});
			};
	function put(url, target, data){
				return $.ajax({
					"method" : "PUT",
					"url" : url + "/" + target,
					"data" : data
				});
			};

	return {
		"get" : get,
		"post" : post,
		"delete" : DELETE, //delete가 예약어라서 임시로..
		"put" : put
	}
});
