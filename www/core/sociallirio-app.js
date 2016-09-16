var sociallirioapp = angular.module('sociallirioapp', []);

sociallirioapp.config(['$httpProvider', 
            function($httpProvider) {
	  
	/* ******************** Interceptor ******************** */
	$httpProvider.responseInterceptors.push('HttpInterceptor');
    /* ******************** Loading Gif ******************** */ 
    var spinnerFunction = function (data) {
            $('#id-preload').show();
    		//$rootScope.spinnerVisibled = true;
            return data; 
    };      
    $httpProvider.defaults.transformRequest.push(spinnerFunction); 		
	

}]);  


sociallirioapp.factory('HttpInterceptor',['$q', function($q) { 
	/********************************************************************************************
     * Tratamento do retorno do response(ajax)...
	 ********************************************************************************************/	  	
	return function (promise) { 
		return promise.then(function (resp) {
			$('#id-preload').hide();
			//$rootScope.spinnerVisibled = true;
			return resp;
		}, function (errorResp) {
			$('#id-preload').hide();
			//$rootScope.spinnerVisibled = true;
			return $q.reject(errorResp);
		});
	};

}]);