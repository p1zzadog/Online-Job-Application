angular.module('jobApp', []);

angular.module('jobApp').controller('jobController', ['$scope', '$http', function($scope, $http){

	$scope.submitApplicant = function(){
		$http.post('/newApplicant', $scope.applicant)
			.then(function(returnData){
				console.log(returnData.data)
			})
	};

}]);


angular.module('jobApp').controller('viewController', ['$scope', '$http', function($scope, $http){

	$http.get('/pullapplicants').then(function(returnData){
		$scope.applicantArray = returnData.data;
	}, function(error){
		console.log(error);
	});

	$scope.deleteResource = function(index){
		var resourceID = $scope.applicantArray[index]
		$http.post('/deleteresource', resourceID).then(function(returnData){
			$scope.applicantArray = returnData.data
		})

	}

}]);