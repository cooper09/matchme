var testApp = angular.module('testApp', []);

testApp.controller('testCtrl', function($scope, $http) {

var testData;
var expertData = new Array();

$scope.init = function () {
 console.log("And away we go....!");

/* $http.get( 'http://localhost:3000').success(function(data) {
			console.log("dataControl.getData data:  ",data);
			
		}); */
}//end init



 $scope.getData = function () {
    console.log("getData - Gimme some data, baby!!!");
   	
  }//end getData 

$scope.getExpert = function (option) {
	console.log("Show our expert...");

}

});//end controller

//Our idea controller
testApp.controller('ideaCtrl', function($scope, $http) {

var testData;

var ctgArr =[{"cat": "Science"},
				{"cat":"Design"},
				{"cat":"Engineering"},
				{"cat": "Finance"},
				{"cat":"Food"}];

 console.log("Set up categories: ", ctgArr);

   var options = ctgArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 



 $scope.getData = function () {

 	var expert = "Jose Cuerva";
   
    $scope.expert = expert;
   	
   	 console.log("getData - Gimme some data, baby: " + $scope.expert);
  }//end getData 
});//end controller

//Our expert controller
testApp.controller('expertCtrl', function($scope, $http) {
console.log ("My expert Controller is in control!")

var expertData = new Array();
var optionNo = 0;

var ctgArr =[{"id":"1", "cat": "Science"},
				{"id":"2","cat":"Design"},
				{"id":"3","cat":"Engineering"},
				{"id":"4","cat": "Finance"},
				{"id":"5","cat":"Food"}];

 console.log("Set up categories: ", ctgArr);

   var options = ctgArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 


 $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("expertController - selection: " , $scope.selectedOption);
                    var newOptions = new Array(); 
                    var option = $scope.selectedOption;

                    console.log("choice number: " + optionNo+ " option selected: ", option );
                    console.log("current options: " + $scope.options[optionNo].cat );

                    expertData[optionNo] = option;

                    //reset option array to exclude selection / add selection to profile array FIFO  */
                     for ( var i=0 ; i <  $scope.options.length ; i++) {
                        if ( i !=  optionNo ) {
                            console.log("ExpertController - sending country: " + $scope.options[i].cat );
                            newOptions.push($scope.options[i]);
                            //$scope.country  = countryIds[i].country;
                            //$rootScope.country = $scope.country;
                        } //end if          
                    }//end for loop..*/
                    ++optionNo;
                    console.log("new options list: " , newOptions );
                    $scope.options = newOptions;
                    //$scope.options = options;

                });//end watch selectedOption 


 $scope.showProfile = function () {
   	 console.log("getProfile - Build our user profile: " , expertData[1].cat );

   	 var showArr = new Array();

   	 for (var i=1 ;i < expertData.length ; i++) {
   	 	console.log("preference: " , expertData[i] );
   	 	showArr[i] = expertData[i].cat+" ";
   	 }

   	 alert("Here is your profile preferences: " + showArr );
   	 alert("Get ready for those emails!!!");
  }//end getData

});//end controller


