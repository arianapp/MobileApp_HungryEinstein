main.controller('home_controller',
	['$scope','$rootScope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray', '$firebaseAuth',
	function($scope,$rootScope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray, $firebaseAuth){
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);
    // successfully login and extract login user's infomation


	auth.$onAuth(function(authUser){
		if (authUser){
			var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(authRef);
			$rootScope.currentUser = userObj;  // get currentUserInfo

	        var requestsRef = new Firebase(FIREBASE_URL + 'users/' +
	          $rootScope.currentUser.$id + '/requests');
	        var requestsInfoPersonal = $firebaseArray(requestsRef);
            
	        // get all requests and connect to html
            $scope.allRequests = requestsInfoPersonal;

            requestsInfoPersonal.$watch(function(data){
            	$rootScope.requestNumber = requestsInfoPersonal.length;
            });


            // request folder ----------------managing all requests 
            var refRequest = new Firebase(FIREBASE_URL + 'requests/');
            var requestsInfoAll = $firebaseArray(refRequest);

            // add request info with userID
	        $scope.addRequest = function() {
            // $scope.message = requestsInfoPersonal;

            // add request under userID
	          requestsInfoPersonal.$add({
	            reqname: $scope.requester_name,
	            subject: $scope.request_subject,
	            food: $scope.food_provide,
	            dateExp: $scope.request_expiry,
	            date: Firebase.ServerValue.TIMESTAMP,
	            accept: false
	          }).then(function() {
	            $scope.requester_name='';
	            $scope.request_subject = '';
	            $scope.food_provide = '';
	            $scope.request_expiry ='';
	            $scope.message = "add successfully";
	          }); //promise
              
              // Create a new request/ to handle all requests
              // add request under folder request with userID
				// var refRequest = new Firebase(FIREBASE_URL + '/requests')
				requestsInfoAll.$add({
		            name: $scope.requester_name,
		            subject: $scope.request_subject,
		            dateExp:$scope.request_expiry,
		            food: $scope.food_provide,
		            date: Firebase.ServerValue.TIMESTAMP,
		            accept: false,
					regID: authUser.uid
				}); //user info
	        }; // addRequest

	        $scope.logout = function(){
				$scope.message = "successfully logout!";
				supersonic.ui.initialView.show();
				return auth.$unauth();
	        };

	        $scope.deleteRequest = function(key) {
	        	requestsInfoPersonal.$remove(key);
	        }; // delete request

		} // userAuthenticated
	});  // onAuth
}]);
