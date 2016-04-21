main.factory('Authentication',
	['$rootScope', '$firebaseAuth', 'FIREBASE_URL', '$location', '$firebaseObject', 'supersonic',
	function($rootScope, $firebaseAuth, FIREBASE_URL, $location, $firebaseObject, supersonic){

		var ref = new Firebase(FIREBASE_URL);
		var auth = $firebaseAuth(ref);
		// var temp_auth;		   
        // successfully login and extract login user's infomation
		auth.$onAuth(function(authUser){
			if (authUser){
				// temp_auth = authUser;
				var authRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
				var userObj = $firebaseObject(authRef);
				// $rootScope.messages =
				
				$rootScope.currentUser = userObj;
			} else {
				$rootScope.currentUser = '';
			}
		});
		
		return {
			logout: function(){
				$rootScope.message = "successfully logout!";
				supersonic.ui.initialView.show();
				return auth.$unauth();
				
			},

			login: function(user){
				auth.$authWithPassword({
					email: user.email,
					password: user.password
				}).
				then(function(){
					//login successfully
					// $rootScope.message = "welcome login in" + user.email;
					// $rootScope.user.email = '';
					// $rootScope.user.password = '';
					var animation = supersonic.ui.animate("fade");
   					supersonic.ui.initialView.dismiss(animation);
				}).catch(function(error){
					$rootScope.message = error.message;
				});

				user.email = '';
				user.password = '';
				// $rootScope.message = "welcome" + user.email;
			},  // login

			register: function(user){
				$rootScope.message = "go into register function";

				auth.$createUser({
					email: user.email,
					password: user.password // pay attention to the"," or ";"
				}).then(function(regUser){
					$rootScope.message = "welcome" + user.firstname;
					var refReg = new Firebase(FIREBASE_URL + 'users')
					.child(regUser.uid).set({
						data: Firebase.ServerValue.TIMESTAMP,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						regID: regUser.uid
					}); //user info
					// $window.location.href = 'home.html';
					$rootScope.message = "register successfully";
					supersonic.ui.initialView.show();
				}).catch(function(error){
					$rootScope.message = error.message;
				}); // createUser
			} //register
		};  //return
}]); //factory