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
 		console.log("Current list of experts: ", $scope.experts[0].cat1 );
		console.log("Show our expert: ", $scope.selectedOption.category );
		console.log("Show our expert: ", $scope.fullName );
		console.log("Show our expert: ", $scope.emailAddr );

		var expertArr = [];
		var j = 0;

		for (var i = 0 ; i < $scope.experts.length ; ++i ) {
			console.log(" current expert category1: " + $scope.experts[i].cat1 );
			if ( $scope.experts[i].cat1 == $scope.selectedOption.category ) {
				expertArr[j] = $scope.experts[i].name;
				j++;
			}//end iff
		}//end for loop

		if ( expertArr.length > 0 ) {
			alert("Here is your  list of experts: " + expertArr );
			// OK - now we have our experts add our user to the database
				var userObj = { 
					name: $scope.fullName,
					email: $scope.emailAddr,
					category: $scope.selectedOption.category,
					experts: expertArr
				}

				console.log("Final User Object:", userObj );
				$http.post('http://localhost:3030/user/', userObj )
				.success(function(data) {
					console.log("Created new user: ",data);
				}); 

		} else {
			alert("Sorry, we couldn't find any experts for you!");
		};

		
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