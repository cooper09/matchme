var testApp = angular.module('testApp', []);

testApp.controller('testCtrl', function($rootScope, $scope, $http) {

var testData;
var expertData = new Array();

$rootScope.categories = new Array();
$rootScope.test = ['1','2','3'];

$scope.init = function () {
console.log("Yes...And away we go....!");

 $http.get( 'http://localhost:3030/').success(function(data) {
			// if (err) throw err;
    console.log("dataControl.getData data:  ",data[0].category );
		$rootScope.categories = data;
  /*   for ( var i =0 ; i <data.length ; ++i) {
        $rootScope.categories.push( data[i]);
      }//end for */

      for ( var i=0 ; i < data.length ; i++) {
       $rootScope.categories.push({id: data[i].id, cat: data[i].cat });
       console.log("rotoscope: " + $rootScope.categories[i].cat );
    }

    $scope.$broadcast('data-loaded');
      console.log("dataControl.getData data:  ",$rootScope.categories[0].category );
    }).error (function(data) {
        alert("GET CAMPAIGN - ERROR: ", data );
    }); 
}//end init



 $scope.getData = function () {
    console.log("getData - Gimme some data, baby!!!");
   	
  }//end getData 

$scope.getExpert = function (option) {
	console.log("Show our expert...");

}

});//end controller

//Our idea controller
testApp.controller('ideaCtrl', function($rootScope, $scope, $http) {

var testData;
//alert("idea Control: "  + $rootScope.categories. ); 
/*var ctgArr =[{"cat": "Science"},
				{"cat":"Design"},
				{"cat":"Engineering"},
				{"cat": "Finance"},
				{"cat":"Food"}]; */

$scope.$watch('data-loaded', function () { 
      //    $scope.value = new Date(2014, 9, 22);
          alert('Categories loaded: ' , $rootScope.categories );
          console.log('Categories loaded: '+ $rootScope.categories );
      });

var ctgArr = $rootScope.categories;

 console.log("USER - Set up categories: ", ctgArr);

   var options = ctgArr;
    // make sure the selector get the final options
        $scope.options = options;
        $scope.selectedOption = 0; 

});//end controller

//Our expert controller
testApp.controller('expertCtrl', function($scope, $http) {
var expertData = new Array();
var optionNo = 0;
var firsttime = true;

var ctgArr =[ {"id":"0", "cat": "Please select until all categories are selected."},
        {"id":"1", "cat": "Science"},
        {"id":"2","cat":"Design"},
        {"id":"3","cat":"Engineering"},
        {"id":"4","cat": "Finance"},
        {"id":"5","cat":"Food"}];

 console.log("Experts - Set up categories: ", ctgArr);

   var options = ctgArr;
    // make sure the selector get the final options
       $scope.options = options;
       $scope.selectedOption = $scope.options[0];

 $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    var selectObj;
                    selectObj = $scope.selectedOption;

                    var newOptions = new Array(); 
                    var option = $scope.selectedOption;
                  
                    ++optionNo;

                    if ( (optionNo != 0) && ($scope.selectedOption.id != 0 )) {
                      for ( var i=0 ; i <  $scope.options.length ; i++) {
                        if ( $scope.options[i].cat != $scope.selectedOption.cat ) {
                           newOptions.push($scope.options[i]);
                        } else {
                            expertData.push({id: optionNo, cat: $scope.options[i].cat });
                        }//end if          
                      } //end for
  
                      $scope.options = newOptions;
                      $scope.selectedOption = newOptions[0];
                    }//end iff 
                   
                });//end watch selectedOption 


 $scope.showProfile = function () {

     var showArr = new Array();
     for ( var i=0; i < expertData.length ; ++i ) {
        showArr[i] = expertData[i].cat;
     }

     alert("Here is your profile preferences: " + showArr );
     alert("Get ready for those emails!!!"); 
  }//end getData

});//end controller


