'use strict';

app.factory('homeService', function($http,$location,sessionService,$filter){
	return{
		getValue:function(){
			
			var data;
			
			var userid=sessionService.get('userid');
			var address='http://192.168.1.5:3000/api/descriptions?filter[where][userid]=' + userid;
			var $promise = $http.get(address);  //send data to login api             
			$promise.then(function(msg){
						
			//console.log(msg);
			data = msg;
			$location.path('/home');
			
			
			});
			return data;
		},
		
		insertnewData : function(user2){
			//console.log('kk');
			$http.post('http://192.168.1.5:3000/api/descriptions',user2).then(function(res){
				console.log('in home service');
				//console.log();
				
				$location.path('/home');
				
			});
			
			
		},
		
		/*
		init : function(){

			var $promise = $http.get(address);  //send data to login api
			$promise.then(function(msg){
			

				dataobj.answer=msg.data.data;
				console.log('in homeService init method',dataobj.answer);
				if(sessionService.get('accesstoken')==null)
					dataobj.welcomenote = ' ' + sessionService.get('Username');
				else {
					address = 'http://localhost:3000/api/userbases/'+sessionService.get('userid')+'?access_token='+sessionService.get('accesstoken');
					$http.get(address).then(function(data){
						dataobj.welcomenote = ' ' + data.data.username;
				});
			}
			});
			return dataobj;
		},
		*/
		
		// showing inserted data on view without reloading the whole page
		getValuebyDate : function(){
			
			var data;
		   	var userid=sessionService.get('userid');					
			var dates = $filter('date')(new Date(), "yyyy-MM-dd");
			var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + dates + '&' + 'userid=' + userid;
			var $promise = $http.get(address);  //send data to login api
			$promise.then(function(msg){
			data = msg.data.data;		
			console.log(data);
			//console.log('init function of homeCtrl has executed');
			//$location.path('/home');
			/*
			if(sessionService.get('accesstoken') == null)
				$scope.welcomenote = ' ' + sessionService.get('Username');
			else {
				address = 'http://192.168.1.8:3000/api/userbases/'+sessionService.get('userid')+'?access_token='+sessionService.get('accesstoken');
				$http.get(address).then(function(data){
					//console.log(data.data.username);
					$scope.welcomenote = ' ' + data.data.username;
				});
				
			}
			*/
			
			});
			
			return data; 
		}
		
	};
});