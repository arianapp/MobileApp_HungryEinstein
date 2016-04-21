main.controller('login_controller',
	['$scope', 'Authentication', '$firebaseObject', 'FIREBASE_URL', '$firebaseArray',
	function($scope, Authentication, $firebaseObject, FIREBASE_URL, $firebaseArray){

		$scope.login = function() {
			Authentication.login($scope.user);
		};
		$scope.logout = function() {
			Authentication.logout();
		};
		$scope.register = function(){
			Authentication.register($scope.user);
		};
}]);