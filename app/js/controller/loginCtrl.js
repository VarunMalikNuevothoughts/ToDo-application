'use strict';

app.controller('loginCtrl',['$scope','$rootScope','$http','$location','loginService','sessionService','registerService', function ($scope,$rootScope,$http,$location,loginService,sessionService,registerService) {
	
	//$scope.boolsforerrmsg=false;
	$scope.show = false;
	$scope.user1={};
	$scope.user={};
	$rootScope.title = "Login";
	$scope.loginValue = 'Login';
	
	$scope.login=function(user){
		//var boolforerr = loginService.login(user);
		if( user.email !== undefined && user.password !== undefined && user.password != null && user.password !='')
		{$scope.show = false;
		var boolforerr;
		$scope.loginValue = 'Logging in Please wait!';
			
			var $promise = $http.post('http://192.168.1.5:3000/api/userbases/login',user);  //send data to login api
			$promise.then(function(msg){
			console.log('hi');
			
			boolforerr=true;         //true means login is successful  success register 
			var id = msg.data.id;
			var userid = msg.data.userId;
			
			$scope.boolsforerrmsg = false;
			
			sessionService.set('accesstoken',id);
			sessionService.set('userid',userid);
							
			$location.path('/home');
			});
			
			$promise.error(function(msg){
				//console.log(msg);
				$scope.loginValue = 'Login';
				console.log('hi with error');
				
				boolforerr=false;         //false means login is unsuccessful    alert
				//alert('Please provide valid email and password');
				$scope.user.password='';
				//user.email='';
				$("#success-alert").show();
				$scope.show = true;
				$scope.bools = true;
				$("#success-alert").fadeOut(8000);
			});
		
		
		/*if(boolforerr == false){
			
			
			alert('Please provide valid email and password');
		}
		*/
	}
	}
	
	
	//to check whether user is logged in so that user can't go back to login from home page
	$scope.init = function(){
		//sessionService.get('userid')
		//console.log('init of loginCtrl ');
		if(sessionService.get('userid') == null){
			console.log('in loginCtrl if ..............printing userid',sessionService.get('userid'));
		}
		else{
			console.log('in loginCtrl else before..............printing userid',sessionService.get('userid'));
			$location.path('/home');
			console.log('in loginCtrl else after..............printing userid',sessionService.get('userid'));
		}
	}
	
	$scope.init();
	
	$scope.showRegister=false;
	$scope.showRegistererror=false;
	
	$scope.register=function(user1){
			if(user1.username != undefined && user1.password != undefined && user1.email != undefined && user1.password != '')
			{
			$scope.showRegister=false;
			$scope.showRegistererror=false;
			
			var $promise = registerService.register(user1);
			$promise.then(function(msg1){
			console.log('msg1 isssss',msg1);
			//$location.path('/login');			
			$scope.showRegister=true;
			$("#success-alert-register").show();
			$scope.user1.password = '';
			//$("#success-alert-register").fadeOut(8000);
			});
			
			$promise.error(function(msg){
				console.log('error in register is ......',msg);
				$scope.showRegistererror=true;
				$("#success-alert-register-error").show();
				$scope.user1.password = '';
				$("#success-alert-register-error").fadeOut(8000);
				$location.path('/register');			
			});
			}
		//$location.path('/home'); 
	}
	
	$scope.gotologinpage = function(){
		$location.path('/register');
	}
	
	$scope.callingloginCtrl=function(){
		$location.path('/login');
	}
	
	
	$scope.i = 1;
	$scope.bools=true;
	
	$scope.tomakedisabled = function(){
		if($scope.i == 1){
			$scope.i = 2;
			$scope.bools=false;
		}
	}
 	
	$scope.makedisabled = function(){
		if($scope.bools == false){
			return true;
		}
		else 
			return false;
	}
	
	$scope.andoftwofunctions = function(email,password){
	                                                                   //	return $scope.makedisabled() && $scope.myfunction(email,password);
		if($scope.makedisabled() == false){
			if($scope.myfunction(email,password) == true)
				return true;
			else 
				return false;
		}
		return true;
	
	}
	
	//this function checks if email and password are null then login button will not work
	$scope.myfunction = function(email,password){
		//console.log($scope.);
		if(email == null)
			return true;
		else if(password == null)
			return true;
		else {
			return false;                            //for normal return false showRegister
		} 
	}
	
	
//$scope.show = false;

/*	//it's working not now
	$("#success-alert").fadeTo(5000, 1000).fadeOut(1000, function(){ accesstoken
		$("#success-alert").fadeOut(1000);
	});
*/	
    $("#closeit").click(function(){
        $("#success-alert").hide();
    });

	//For opening alert that will be shown after user registers,to asks him to login 
	$('#the-thing-that-opens-your-alert2').click(function () {
		$("#myModal2").modal('hide');
		$('#le-alert').addClass('in'); // shows alert with Bootstrap CSS3 implem
		//$('#le-alert').focus();
	});

	//For opening alert of Register page
/*	$('#open-register-alert').click(function () {
		//$("#myModal2").modal('hide');
		//$scope.booltoshowalert = true;
		$('#success-alert-rsgister').addClass('in'); // shows alert with Bootstrap CSS3 implem
		//$('#le-alert').focus();
	});
*/	
	//To close the alert box
	$('#success-alert-rsgister').click(function () {
		//$scope.booltoshowalert = false;
		$(this).parent().removeClass('in'); // hides alert with Bootstrap CSS3 implem

	});
	
	//For opening alert that will be shown after user fails to login 
/*	$('#the-thing-that-opens-your-alert3').click(function () {
		//$("#myModal2").modal('hide');
		$('#le-alert').addClass('in'); // shows alert with Bootstrap CSS3 implem
		//$('#le-alert').focus();
	});
*/	
/*	window.setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
	}, 4000);
	
	$(document).ready(function(){
    $('.alert-danger').html('Invalid User name');
	$('.alert-danger').show();
  });
*/		
}]);