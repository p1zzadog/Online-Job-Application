angular.module('jobApp', []);

angular.module('jobApp').controller('jobController', ['$scope', '$http', function($scope, $http){

	// $scope.applicant = {
	// 	name   : '',
	// 	bio    : '',
	// 	skills : '',
	// 	years  : '',
	// 	why    : ''
	// };

	$scope.submitApplicant = function(){
		console.log($scope.applicant)
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

}]);