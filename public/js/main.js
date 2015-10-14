angular.module('jobApp', ['ngRoute'])


angular.module('jobApp').controller('jobController', ['$scope', '$http', function($scope, $http){

	$scope.submitApplicant = function(){
		$http.post('/newApplicant', $scope.applicant)
			.then(function(returnData){
				console.log(returnData.data)
			})
	};

}]);


angular.module('jobApp').controller('viewController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){

	$http.get('/pullapplicants').then(function(returnData){
		$scope.applicantArray = returnData.data;
	}, function(error){
		console.log(error);
	});

	$scope.deleteResource = function(index){
		var resourceID = $scope.applicantArray[index];
		$http.post('/deleteresource', resourceID).then(function(returnData){
			$scope.applicantArray = returnData.data;
		});
	};

}]);

angular.module('jobApp').controller('applicationController', ['$scope', '$http', function($scope, $http){

	$http.post('/getoneapplication', {id: window.location.pathname.split('/')[1]}).then(function(returnData){
		$scope.applicationData = returnData.data[0];
	});
	

}]);