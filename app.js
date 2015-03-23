var testApp = angular.module('testApp', []);

var catNo = 0;

testApp.controller('testCtrl', function($scope, $http) {

var testData;
var expertData = new Array();


$scope.init = function () {
 console.log("And away we go....!");
}//end init

$scope.getExpert = function (option) {

var expertArr = [
                  {"expert1" : [1,3,4,5,2]},
                  {"expert2" : [5,2,1,3,4]},
                  {"expert3" : [4,1,2,5,3]}  
                ]

var rankArr = new Array();

  console.log("Show our experts: ", expertArr );
  console.log("Current Category No: " + catNo );

     for (var j=0; j < expertArr[0].expert1.length ; ++j ) {
      console.log("lets peruse expert1 for the right choice: ",  expertArr[0].expert1[j] );
      if ( expertArr[0].expert1[j] == catNo ) {
        //alert("expert1 matches at index: " + j );
        rankArr[0] = { "value": j, "expert": "expert1" };
      }
    }
      for (var j=0; j < expertArr[1].expert2.length ; ++j ) {
      console.log("lets peruse expert2 for the right choice: ",  expertArr[1].expert2[j] );
      if ( expertArr[1].expert2[j] == catNo ) {
        //alert("expert2 one matches at index: " + j );
        rankArr[1] = { "value": j , "expert": "expert2" };
      }
    }
      for (var j=0; j < expertArr[2].expert3.length ; ++j ) {
      console.log("lets peruse expert3 for the right choice: ",  expertArr[2].expert3[j] );
      if ( expertArr[2].expert3[j] == catNo ) {
       //alert("expert3 matches at index: " + j );
        rankArr[2] = {"value" : j, "expert": "expert3" };
      }
    } 

    console.log("Final ranking list: " , rankArr );

    var finalArr = rankArr.sort(function(x, y){ 
        if (x.value < y.value) return -1;
        if (x.value > y.value) return 1;
        return 0;
    });

    alert("The expert for you is  " + finalArr[0].expert + ". He will be getting in touch with you shortly!");

  }//end getExpert 
});//end controller

//
//Our IDEA controller
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

   $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("ideaController - selection: " , $scope.selectedOption);
                    
                   $scope.idea_option = $scope.selectedOption;

                    console.log("idea option: ", $scope.idea_option );

                    for (var i=0; i < ctgArr.length ; ++i ) {
                     //console.log("are category array: " + ctgArr[i].cat );
                      //console.log("category selected: " + $scope.idea_option.cat );
                      if ( ctgArr[i].cat == $scope.idea_option.cat ) {
                        catNo = i+1;
                        console.log("category no selected: " + $scope.catNo );
                      }
                    }

                });//end watch selectedOption 


});//end controller

//Our expert controller
testApp.controller('expertCtrl', function($scope, $http) {
console.log ("My expert Controller is in control!")

var expertData = new Array();
var optionNo = 0;

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


 $scope.$watch('selectedOption', function(newValue, oldValue) {
                    // handle selection change ...
                    console.log("expertController - selection: " , $scope.selectedOption);
                    
                    var option = $scope.selectedOption;

                    console.log("choice number: " + optionNo+ " option selected: ", option )

                    expertData[optionNo] = option;
                    //set current campaigns tier3 msp to new selection
                    ++optionNo;
                });//end watch selectedOption 


 $scope.showProfile = function () {
   	 console.log("getProfile - Build our user profile: " , expertData[1].cat );

   	 var showArr = new Array();

   	 for (var i=1 ;i < expertData.length ; i++) {
   	 	console.log("preference: " + expertData[i].cat );
   	 	showArr[i] = expertData[i].cat+" ";
   	 }

   	 alert("Here is your profile preferences: " + showArr );
   	 alert("Get ready for those emails!!!");
  }//end getData

});//end controller


