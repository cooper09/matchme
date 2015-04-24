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
	console.log("Killer category...");
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

	 $scope.showProfile = function () {
	 	console.log('Show expert profile...');
	     var showArr = new Array();
	     for ( var i=0; i < expertData.length ; ++i ) {
	        showArr[i] = expertData[i].cat;
	     }

	     alert("Here is your profile preferences: " + showArr );
	     alert("Get ready for those emails!!!"); 
	  }//end showProfile 


}); //end category Controller 

// Super Selector for our Expert selections, records and stored expert category prefere
testApp.controller('superCtrl', function($scope, $http) {
var expertData = new Array();
var optionNo = 0;
var firsttime = true;

var ctgArr =[ {"id":"0", "cat": "Please select category, untill all categories are selected..."},
				{"id":"1", "cat": "Science"},
				{"id":"2","cat":"Design"},
				{"id":"3","cat":"Engineering"},
				{"id":"4","cat": "Finance"},
				{"id":"5","cat":"Food"}];

/*var ctgObj = { 
      id: $scope.catId,
      cat: $scope.category 
      } */

 console.log("Set up categories: ", ctgArr);

   var options = ctgArr;
    // make sure the selector get the final options
       $scope.options = options;
       $scope.selectedOption = $scope.options[0];
       var first = false; 

 $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    var selectObj;
                    selectObj = $scope.selectedOption;

                    console.log("expertController - selection: " , $scope.selectedOption.id );
                    var newOptions = new Array(); 
                    var option = $scope.selectedOption;
                  
                    console.log("current options: " +  options );
                    ++optionNo;

                    if ( (optionNo != 0) && ($scope.selectedOption.id != 0 )) {
                      for ( var i=0 ; i <  $scope.options.length ; i++) {
                        if ( $scope.options[i].cat != $scope.selectedOption.cat ) {
                           newOptions.push($scope.options[i]);
                        } else {
                            console.log("add to expert array: " + $scope.options[i].cat);
                            //expertData[optionNo] = { id: optionNo , cat: $scope.options[i].cat };
                            expertData.push({id: optionNo, cat: $scope.options[i].cat });
                        }//end if          
                      } //end for
  
                      $scope.options = newOptions;
                      $scope.selectedOption = newOptions[0];
                      //++optionNo;
                    }//end iff 
                   
                });//end watch selectedOption 


 $scope.showProfile = function () {
  	 console.log("getProfile - Build our user profile: " , expertData );

   	 var showArr = new Array();
     for ( var i=0; i < expertData.length ; ++i ) {
        showArr[i] = expertData[i].cat;
     }

   	 alert("Here is your profile preferences: " +  $scope.fullName );

   	  if ( showArr.length > 0 ) {
			alert("Here is our category list: " + showArr + " for expert: " + $scope.fullName );
			// OK - now we have our experts add our user to the database
				var expertObj = { 
					name: $scope.fullName,
					email: $scope.emailAddr,
					cat1: showArr[0],
					cat2: showArr[1],
					cat3: showArr[2],
					cat4: showArr[3],
					cat5: showArr[4]
				}

				console.log("Final Expert Object to add to database:", expertObj );
				$http.post('http://localhost:3030/expert/', expertObj )
				.success(function(data) {
					console.log("Created new expert: ",data); 
				}); 

		} else {
			alert("You must select at least ONE category before you can build your profile. Please try again.");
		};

  }//end getData

});//end controller