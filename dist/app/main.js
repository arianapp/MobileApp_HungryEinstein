angular.module('main', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic', 'firebase'
]);
	
angular
.module('main')
.controller('home_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/");

	$scope.requests = $firebaseArray(ref);

	$scope.addRequest = function(){
		console.log('Adding Request');
		$scope.requests.$add({
			name: $scope.name,
			subject: $scope.subject,
			expiry: $scope.expiry
		}).then(function(ref){
			var id = ref.key();
			console.log("Added Request" + id);
			$scope.name =" ";
			$scope.subject =" ";
			$scope.expiry =" ";
		});
	}
});





angular
.module('main')
.controller('messages_controller', function($scope, supersonic, $firebaseArray) {
	var ref = new Firebase("https://hungryeinstein.firebaseio.com/messages");

	$scope.requests = $firebaseArray(ref);

	$scope.addRequest = function(){
		console.log('Adding Request');
			$scope.requests.$add({
			name: $scope.name,
			message: $scope.message,
		}).then(function(ref){
			var id = ref.key();
			console.log("sent message" + id);
			console.log("undying defiance towards bloated web frameworks");
			$scope.message =" ";
		});
	};
	ref.on('child_added', function(snapshot) {
		var message = snapshot.val();
		supersonic.ui.dialog.alert(message);
		displayChatMessage(message.name, message.text);
	});
	function displayChatMessage(name, text) {
	 	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
	};
});




