'use strict';

app.factory('loginService', function($http,$location,sessionService){
	return{
		login:function(user){
			
			var boolforerr;
			
			var $promise = $http.post('http://192.168.1.5:3000/api/userbases/login',user);  //send data to login api accesstoken
			$promise.then(function(msg){
			console.log('hi in loginService');
			
			boolforerr=true;         //true means login is successful
			var id = msg.data.id;
			var userid = msg.data.userId;
			
			
			sessionService.set('accesstoken',id);
			sessionService.set('userid',userid);
							
			$location.path('/home');
			});
			
			$promise.error(function(msg){
				console.log(msg);
				console.log('hi with error');
				
				boolforerr=false;         //false means login is unsuccessful
				
				
			});
			
			return boolforerr;			
		},
		
		logout:function(){
			sessionService.destroy('accesstoken');
			sessionService.destroy('userid');
			sessionService.destroy('Username');
			$location.path('/login');
		},
		
		islogged:function(){
			if(sessionService.get('userid')) return true;
		},
		
	/*	registers:function(user1){
			var $promise = $http.post('http://localhost:3000/api/userbases',user1);  //send data to register api
			$promise.then(function(msg1){
			console.log('msg1 isssss',msg1);
			
			//sessionService.set('userid',msg1.data.id);
			//sessionService.set('Username',msg1.data.username);
			
			//console.log(sessionService.get('userid'));
			//console.log(sessionService.get('Username'));
			
			//$location.path('/login');			
			});
			$promise.error(function(msg){
				console.log('error is ......',msg);
			});
		}*/
	}
});


/*

			'use strict';

app.factory('loginService', function($http,$location,sessionService){
	return{
		login:function(user){
			var $promise = $http.post('http://localhost:3000/api/userbases/login',user);  //send data to login api
			$promise.then(function(msg){
			console.log(msg);
			
			var id = msg.data.id;
			var userid = msg.data.userId;
			
			
			sessionService.set('accesstoken',id);
			sessionService.set('userid',userid);
				
			console.log(sessionService.get('userid'));
			
			$location.path('/home');
			});
			
		},
		
		logout:function(){
			sessionService.destroy('accesstoken');
			sessionService.destroy('userid');
			$location.path('/login');
		},
		
		islogged:function(){
			if(sessionService.get('userid')) return true;
		}
	}
});

*/