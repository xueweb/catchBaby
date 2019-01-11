define(['zepto'],function($){
	var command={};
	command.request=function(url,success,data,type,fail){
		var data=arguments[2]?arguments[2]:{};
		var type=arguments[3]?arguments[3]:"get";
		var fail=arguments[4]?arguments[4]:function(){};
		$.ajax({
			url:url,
			type:type,
			data:data,
			success:function(res){
				success(res);
			},
			error:function(err){
				fail(err);
			}
		})
	}
	return command;
})