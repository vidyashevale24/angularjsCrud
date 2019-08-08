
	var app = angular.module('crudApp', ['datatables']);
	app.controller('crudController', function($scope, $http){
		$scope.success = 	false;
		$scope.error   = 	false;

		$scope.fetchData = function(){
			$http({
				method: 'GET',
				url: 'http://localhost:81/VS/crudAngular/api/fetch_data.php',
				headers : {'Accept' : 'application/json'}
			}).then(function (result){
				//console.log(result.data);
				$scope.namesData = result.data;
			},function (error){

			});
		}
		
		/*$scope.openModal = function(){
			var modal_popup = angular.element('#crudmodal');
			modal_popup.modal('show');
		};
*/
		$scope.closeModal = function(){
			var modal_popup = angular.element('#crudmodal');
			modal_popup.modal('hide');
		};

		$scope.addData = function(){
			$scope.modalTitle 		= 	'Add New Record';
			$scope.submit_button 	= 	'Insert';
			$scope.firstName 		=	'' ;
			$scope.lastName 		=	'' ;
			//$scope.openModal();
		};

		//Add New Record
		$scope.submitForm = function(){
			$http({
			url: 'http://localhost:81/VS/crudAngular/api/insert.php',
			method: "POST",
			data: { 
					'firstName' : 	$scope.firstName,
					'lastName' 	: 	$scope.lastName,
					'action'	:	$scope.submit_button,
					'id'		:	$scope.hidden_id
				 },
			 headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
			})
			.then(function(response) {
				//Success
				//console.log(response);
				if(response.data.error !=''){
					$scope.success 			=	 false;
					$scope.error 			=	 true;
					$scope.errorMessage 	=	 response.data.error;
				}else{
					$scope.success 			= 	true;
					$scope.error 			= 	false;
					$scope.successMessage 	= 	response.data.message;
					$scope.form_data 	  	= 	{};
					$scope.closeModal();
					$scope.fetchData();
				}
			}, 
			function(response) {
				// Failed
				console.log("in else"+response);
			});
		}
		//Fetch single Record
		$scope.fetchSingleData = function(id){
			$http({
			url: 'http://localhost:81/VS/crudAngular/api/insert.php',
			method: "POST",
			data: { 
					'id'		:	id,
					'action'	:	'fetch_single_data'
				 },

			})
			.then(function(response) {
				console.log(response);
				//Success
				$scope.firstName	=	response.data.firstName;
				$scope.lastName		=	response.data.lastName;
				$scope.hidden_id	=	id;
				$scope.modalTitle	=	'Edit Existing Record';
				$scope.submit_button=	'Edit';
				//$scope.openModal	=	$scope.openModal();
			}, 
			function(response) {
				// Failed
				console.log("in else"+response);
			});
		}
		$scope.deleteData = function(id){
				if(confirm("Are you sure you want to remove it?"))
				{
					$http({
						method:"POST",
						url:"http://localhost:81/VS/crudAngular/api/insert.php",
						data:{'id':id, 'action':'Delete'}
					})
					.then(function(response) {
						//Success
						//console.log(response);
						$scope.success = true;
						$scope.error = false;
						$scope.successMessage = response.data.message;
						$scope.fetchData();
				}, 
				function(response) {
					// Failed
					console.log("in else"+response);
				});
			}
		}
	});

	