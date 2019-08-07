var crudApp = angular.module('crudApp',['datatables','ngResource']);

crudApp.controller('crudController',['$scope', '$http', '$resource',function($scope,$http,$resource){
	/*$scope.fetchData = function(){
		$http.get('http://localhost:81/VS/crudAngular/fetch_data.php')
			.success(function(result){
			console.log(result.data);
			$scope.namesData = result.data;
		})
	}*/
	$http({
		method: 'GET',
		url: 'http://localhost:81/VS/crudAngular/api/fetch_data.php',
		headers : {'Accept' : 'application/json'}
	}).then(function (result){
		console.log(result.data);
		$scope.namesData = result.data;
	},function (error){

	});
	
}]);
