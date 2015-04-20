var testApp = angular.module('testApp', []);

testApp.controller('testCtrl', function($scope, $http) {

var testData;

$scope.init = function () {
 console.log("And away we go....!");

 $http.get( 'http://localhost:3030/category').success(function(data) {
			console.log("dataControl get category data:  ",data);
			$scope.category = data;
		});

 $http.get( 'http://localhost:3030/user').success(function(data) {
			console.log("dataControl get user data:  ",data);
			$scope.users = data;
		});

 $http.get( 'http://localhost:3030/expert').success(function(data) {
			console.log("dataControl get expert data:  ",data);
			$scope.experts = data;
		});
}//end init

 $scope.getData = function () {
    console.log("getData - Gimme some data, baby!!! ", $scope.category );
	$scope.$broadcast('data-loaded');

  }//end getData 

 

});//end test controller

testApp.controller('categoryCtrl', function($scope, $http) {
	var optionNo = 0;
	 $scope.$on('data-loaded', function(event, args) {
	 		console.log('start select controller: ' , $scope.category );
	 		$scope.options = $scope.category;
	 		$scope.selectedOption = $scope.options[0];


			 $scope.$watch('selectedOption', function(newValue, oldValue) {
			  	console.log("selected category: ", $scope.selectedOption );
			  });
    	});

 $scope.getExpert = function () {
		console.log("Show our expert: ", $scope.selectedOption.category );
		console.log("Show our expert: ", $scope.fullName );
		console.log("Show our expert: ", $scope.emailAddr );

  }//end getExpert
 

}); //end category Controller 

testApp.controller('userCtrl', function($scope, $http) {
	var optionNo = 0;
	 $scope.$on('data-loaded', function(event, args) {
	 		console.log('start select controller: ' , $scope.users );
	 		$scope.options = $scope.users;
	 		$scope.selectedOption = $scope.options[0];
    	});

}); //end category Controller 

testApp.controller('expertCtrl', function($scope, $http) {
	var optionNo = 0;
	 $scope.$on('data-loaded', function(event, args) {
	 		console.log('start select controller: ' , $scope.experts );
	 		$scope.options = $scope.experts;
	 		$scope.selectedOption = $scope.options[0];
    	});

}); //end category Controller 