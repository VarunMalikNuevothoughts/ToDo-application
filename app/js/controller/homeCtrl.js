'use strict';

app.controller('homeCtrl',['$rootScope','$scope','$http','loginService','homeService','homeService1','sessionService','$location','$filter','$route','$window', function($rootScope,$scope,$http, loginService,homeService,homeService1,sessionService,$location,$filter,$route,$window) {
	
	$scope.welcomenote=''; 
	$scope.datetaken;
	$scope.showingDate = $filter('date')(new Date(), "dd-MMM-yyyy");
	$scope.booleantoUpdate = true;
	$scope.booleantoUpdateForAddButton = true; 
	$scope.idtodeletedata;
	$scope.user2 = {};
	
	$rootScope.title = "Home";
	
	    $scope.init=function()
        {
			
			if(sessionService.get('userid') == null){
				$location.path('/login');
			}
			else{
 
			var userid=sessionService.get('userid');
			var dates;
		
			var dataobj = {};
			
			if(sessionService.get('date') === null){
				
				dates = $filter('date')(new Date(), "yyyy-MM-dd");
			}	
			else{
				dates = sessionService.get('date');                           //mm/dd/yyyy accesstoken
			}
			
			var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + dates + '&' + 'userid=' + userid;
			homeService1.init(address).then(function(msg){
			

				$scope.answer=msg.data.data;

				if(sessionService.get('accesstoken')==null)
					$scope.welcomenote = ' ' + sessionService.get('Username');
				else {
					homeService1.afunction().then(function(data){
					$scope.welcomenote = ' ' + data.data.username.charAt(0).toUpperCase() + data.data.username.slice(1);
					});
				}
			});   
			}
			$scope.callForFuture();
		}
    
		//this function converts date format 19-Jun-2017 to 2017-06-19 for back end
		$scope.changeDateFormatForApiCall = function(dateToChange){ //here dateToChange should be in String format
			var months = $scope.months;
			var newDate = dateToChange.substr(7,4) + '-' + months[dateToChange.substr(3,3)] + '-' + dateToChange.substr(0,2);
			return newDate;
		}

	$scope.months = {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'};
		
	   $scope.answer2;
	   
	   //this function is to show the contents of Future tasks
	   $scope.callForFuture = function(){
			//http://192.168.1.5:3000/api/descriptions/getAllAfterDate?date=2017-06-12&time=04%3A30%3A40&userid=13
			
			var userid = sessionService.get('userid');
			var tempDate = $scope.changeDateFormatForApiCall(String($scope.showingDate));    
			var dates = $filter('date')(tempDate, "yyyy-MM-dd"); //removed new Date() from here
			var time = '18:29:59';
			
			var address='http://192.168.1.5:3000/api/descriptions/getAllAfterDate?date=' + dates + '&time=' + time + '&' + 'userid=' + userid;
			homeService1.init(address).then(function(msg){
				$scope.answer2 = msg.data.data;
				console.log($scope.answer2);
				
			});
	   }
	   
	   
    $scope.init();
	
	/*init1
	$scope.init2 = function(datetakenfromdatepicker){
		$scope.datetaken = $filter('date')(datetakenfromdatepicker ,"dd/mm/yyyy");
	}*/
	
	$scope.disableButtonsFutureDate = false;
	$scope.showNoTaskAlert = false;
	
	
	
	// checking whether today is smaller than other
	$scope.isSmaller = function(today,other){    //today's format : 2017-06-19other's format : 19-Jun-2017
		console.log('Smaller',today,other);
		var months = $scope.months;

		if(parseInt(today.substr(0,4)) < parseInt(other.substr(7,4)))
			return true;
		else if(parseInt(today.substr(5,2)) < parseInt(months[other.substr(3,3)]) )
			return true;
		else if(parseInt(today.substr(8,2)) < parseInt(other.substr(0,2)))
			return true;
		return false;
		
	}

	//checking whether today is greater than other
	$scope.isGreater = function(today,other){
		console.log('Larger',today,other);
		var months = $scope.months;

		if(parseInt(today.substr(0,4)) > parseInt(other.substr(7,4)))
			return true;
		else if(parseInt(today.substr(5,2)) > parseInt(months[other.substr(3,3)]) )
			return true;
		else if(parseInt(today.substr(8,2)) > parseInt(other.substr(0,2)))
			return true;
		return false;
		
	}
	
	$scope.myDatefunction = function(date){
		var months = $scope.months;		
		var datesForApi;
		var myTakenDate = String(date);
		datesForApi = myTakenDate.substr(7,4) + '-' + months[myTakenDate.substr(3,3)] + '-' + myTakenDate.substr(0,2);
		
		if(date == undefined)
			$scope.showingDate = $filter('date')(new Date(), "dd-MMM-yyyy");
		else 
			$scope.showingDate = myTakenDate;
		
		$scope.showNoTaskAlert = false;
		//console.log('datesForApi is ',datesForApi);                      
		if(date != null){
		var todayDate = $filter('date')(new Date(), "yyyy-MM-dd");
		
		var isSmallBool = $scope.isSmaller(todayDate,String(date));
		var isGreatBool = $scope.isGreater(todayDate,String(date));
		
	   	var userid=sessionService.get('userid');
		//console.log('userid is ',userid); callForFuture
		date = new Date(date);
				
		if(isSmallBool){
			$scope.disableButtonsFutureDate = true;
			$scope.booleantoUpdateForAddButton = true;
			console.log('yes smaller one is');

		}
		else {
			if(isGreatBool){
					$scope.booleantoUpdateForAddButton = false; 
					console.log('yes larger one is');
			}
			else {
				console.log('opps equal');
				$scope.disableButtonsFutureDate = false;
			}
		}
		
		var dates = $filter('date')(date, "yyyy-MM-dd");
		
		if(isSmallBool || isGreatBool){           
			$scope.booleantoUpdate = false;			//here it means that past date data is not to be change 
		}
		else {
			$scope.booleantoUpdate = true;
			$scope.booleantoUpdateForAddButton = true;
		}
		//sessionService.set('date',dates);            
		
		var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + datesForApi + '&' + 'userid=' + userid;
		
		homeService1.myDateFunction(address).then(function(msg){
		
			$scope.answer = msg.data.data;
			var value=0;
			var x;
			for (x in $scope.answer) {
				value+=1;
				break;
			}
			if(value === 0){
				$("#no-task-added").show();
				console.log('value =',value);
				$scope.showNoTaskAlert = true;
				$("#no-task-added").delay(4000).fadeOut('slow');
			}
		});
		}
	}   
	   
	   
	   
	$scope.todayDate = function(){
		$scope.showNoTaskAlert = false;
		$scope.disableButtonsFutureDate = false;
		$scope.booleantoUpdateForAddButton = true;
		$scope.booleantoUpdate = true;      //here it means that past date data is not to be change   datetaken
	
		var userid=sessionService.get('userid');
		var dates = $filter('date')(new Date(), "yyyy-MM-dd");
		$scope.showingDate = $filter('date')(dates, "dd-MMM-yyyy");
		var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + dates + '&' + 'userid=' + userid;
		
		homeService1.myDateFunction(address).then(function(msg){
		
			$scope.answer = msg.data.data;
			var value=0;
			var x;
			for (x in $scope.answer) {
				value+=1;
				break;
			}
			if(value === 0){
				$("#no-task-added").show();
				//console.log('value =',value);
				$scope.showNoTaskAlert = true;
				$("#no-task-added").delay(4000).fadeOut('slow');
			}
		});
		$scope.callForFuture();
	}   
	   
	$scope.init1 = function(a){
		$scope.user2.status = 'Pending';
		$scope.msgForValidationOfTextarea = false;
		
	   //$scope.user4.description=a.description;
	}
	
	//checking status  
	$scope.checkstatus1=function(a){
		
		if(a.status == 'Pending') 
			return true;
		else 
			return false;
	}
	
	//checking status 		
	$scope.checkstatus2=function(status){
		if(status == 'Ongoing')
			return true;
		else 
			return false;
	}
	
	
	//checking status 
	$scope.checkstatus3=function(status){
		if(status == 'Completed')
			return true;
		else 
			return false;
	}
	
	//checking status 
	$scope.checkstatus4=function(status){
		if(status == 'Future')
			return true;
		else 
			return false;
	}
		
	
	$scope.msgForValidationOfTextarea = false; // it shows the content Description is required in red color when empty form(description) is filled 
	
	//it is insertng data with current date when we add new task
	$scope.insertdata = function(user2){
		console.log(user2.description,user2.status);
		$scope.msgForValidationOfTextarea = false;
		/*if($scope.booleantoUpdate){*/                 //this line alows user to add tasks only for today's date
			if(user2.description !== undefined){
			$("#myModal1").modal('hide');
				var dates = $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss"); //type of dates is string 19-Jun-2017 -> 2017-06-19
				
				console.log('even the format of showingDate is string', typeof $scope.showingDate);
				
				// yahan se
				var checkFutureCase = false;
				if($scope.isSmaller(dates,$scope.showingDate) )
					{
						checkFutureCase = true;
						console.log('yes it is true');
						var tempDate = $scope.showingDate;
						var months = $scope.months; 
						var newDate = tempDate.substr(7,4) + '-' + months[tempDate.substr(3,3)] + '-' + tempDate.substr(0,2) + ' ' + dates.substr(11,8);
						dates = newDate;
					}
				//yahan tak
				
				if( !checkFutureCase || (checkFutureCase && ( user2.status == "Future" || user2.status == "Pending" )) ){
					console.log(' chesking dates is ',dates);
					
					if(user2.status == "Future")
						user2.status = "Pending";
					
					user2['date'] = dates;
					var userid=sessionService.get('userid');
					user2['userid']=parseInt(userid);
				
					$http.post('http://192.168.1.5:3000/api/descriptions',user2).then(function(res){
					
						$scope.user2.description = '';
						$scope.user2.status = '';
						$location.path('/home');
				
						dates = dates.substr(0,10);
						
						//dates = $filter('date')(new Date(), "yyyy-MM-dd");
						var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + dates + '&' + 'userid=' + userid;
						var $promise = $http.get(address);  //
			
						$promise.then(function(msg){
							$scope.answer = msg.data.data;		
						});
					});
				}
		}
		else {
			$scope.msgForValidationOfTextarea = true;
		}
		//}
	}
	
	$scope.txt = 'My  Todo  -  Home';
	
	
	$scope.logout=function(){
		loginService.logout();
	}
	
	
	$scope.currentid=0;
	$scope.user4={};
	
/*	$scope.user6={};
	
	
	//this method is to print the value of id and to set the default value of description of Ongoing modal user3
	$scope.getdatabyidforuser6 = function(id){
		//console.log(id);
		$scope.idtodeletedata = id;
		$scope.currentid=id;
		var url = 'http://192.168.1.5:3000/api/descriptions/' + id;
		$http.get(url).success(function(msg){
			$scope.user6.description=msg.description;
			$scope.selectedValue=msg.status;
			//console.log(msg.id);
		});
	}	
*/
	
	//this method is to print the value of id and to set the default value of description of Ongoing modal user3 
	$scope.getdatabyid = function(id){
		//console.log(id);
		$scope.idtodeletedata = id;
		$scope.currentid=id;
		var url = 'http://192.168.1.5:3000/api/descriptions/' + id;
		$http.get(url).success(function(msg){
			$scope.user4.description=msg.description;
			$scope.selectedValue=msg.status;
			//console.log(msg.id);
		});
	}

	$scope.user3={};
	
	//this method is to print the value of id and to set the default value of description of Pending modal
	$scope.getdatabyidforuser3 = function(id, i){
		console.log("id................",id);
		$scope.idtodeletedata = id;
		$("#myModal").modal('show');
		$scope.currentid=id;
		var url = 'http://192.168.1.5:3000/api/descriptions/' + id;
		$http.get(url).success(function(msg){
			$scope.user3.description=msg.description;
			$scope.selectedValueuser3 = msg.status;
			if(i==0)
				$scope.user3.status = msg.status;
			else
				$scope.user3.status = "Future";    //when future modal opens it does not show the status "Future" fix it
			console.log(msg.id);
			console.log($scope.user3.status);
		});
		
	}
	
	$scope.user5={};
	
	//this method is to print the value of id and to set the default value of description of Completed modal 
	$scope.getdatabyidforuser5 = function(id){
		console.log("id................",id);
		$scope.idtodeletedata = id;
		//$("#myModalforCompleted").modal('show');
		$scope.currentid=id;
		var url = 'http://192.168.1.5:3000/api/descriptions/' + id;
		$http.get(url).success(function(msg){
			$scope.user5.description=msg.description;
			$scope.selectedValueuser3 = msg.status;
			$scope.user5.status = msg.status;
			console.log(msg.id);
		});
	}
	
	
	$scope.selectforaddnew = "Pending";
	$scope.statusOptions=["Pending","Ongoing","Completed"]; //Removed "Future" from here
	
	// this method is for updating tasks
	$scope.updatedata = function(data){
		if($scope.booleantoUpdate){
			
			
			var newDate =  $filter('date')(new Date(), "yyyy-MM-dd HH:mm:ss");
			data['date'] = newDate;

			console.log("data......................",newDate);
			
			$("#myModal").modal('hide');
		
			$("#myModal2").modal('hide');
			if(sessionService.get('userid') !== null ){
				var query = 'http://192.168.1.5:3000/api/descriptions/' + $scope.currentid;
				$http.put(query,data).then(function(msg){
					$scope.callForFuture();
			
					var userid=sessionService.get('userid');
					var dates = $filter('date')(new Date(), "yyyy-MM-dd");
					var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + dates + '&' + 'userid=' + userid;
					var $promise = $http.get(address);  //send data to login api
			
					$promise.then(function(msg){
						$scope.answer = msg.data.data;				
					});
			
				});
			}
			else
				$location.path('/login');
		}
	}
	
	//for adding default value to select add new task
	/*$('#confirm').on('shown.bs.modal', function () {
    var temp = "Pending";
    $('#ySelect4').val(temp);
})*/

	$scope.deletedata = function(){
		if($scope.booleantoUpdate){
			$("#myModal").modal('hide');
			
			$scope.booltoshowalert = false;
			console.log('inside ..........');
			//http://localhost:3000/api/descriptions/5
			if(sessionService.get('userid') !== null ){
				var query = 'http://192.168.1.5:3000/api/descriptions/'+ $scope.idtodeletedata;
				$http.delete(query).then(function(msg){
					$scope.callForFuture();
					console.log('inside deletedata delete\'s callback method');
					var userid=sessionService.get('userid');
					var dates = $filter('date')(new Date(), "yyyy-MM-dd");
					var address='http://192.168.1.5:3000/api/descriptions/getbyDate?date=' + dates + '&' + 'userid=' + userid;
					var $promise = $http.get(address);  //send data to login api
			
					$promise.then(function(msg){
						//console.log("lkajfoajoifha",msg);
						$scope.answer = msg.data.data;					 
					});
			
				});
			}
			else
				$location.path('/login');
		}
	}
	
	$scope.booltoshowalert = false;
	
/*	$scope.falsebooltoshowalert = function(){
		$scope.booltoshowalert = false;
	}
*/	
	//it only decides whether the delete alert will bo shown or not
	$scope.funtotruebooltoshow = function(){
		$scope.booltoshowalert = true;
	}
	
	//This code is for datepicker
	$scope.$watch("datetaken",function(old,newv){
		console.log(old,newv);
		$scope.myDatefunction(old);
		$scope.callForFuture(); 
	});
	
	//These both are to change the date format
	$( "#datepicker" ).datepicker();
	$( "#datepicker" ).datepicker( "option", "dateFormat", "dd-M-yy" );
	
	$scope.methodtoshowpopover = function(){
		$("#myModal").modal('hide');
		$("#myModalforCompleted").modal('hide');
		$("#myModaldeletesurity").modal('show');
	}
	
	
/*	$scope.$watch("date",function(old,newv){
		console.log(old,newv);
	});
*/	
	
	$('#myModal').on('shown.bs.modal', function () {
		$('#myInput').focus()
	});
	
	//For opening alert of Ongoing data
	$('#the-thing-that-opens-your-alert').click(function () {
		$("#myModal2").modal('hide');
		//$scope.booltoshowalert = true;
		$('#le-alert').addClass('in'); // shows alert with Bootstrap CSS3 implem
		//$('#le-alert').focus();
	});

	//$('.close').click(function () {
	//	$(this).parent().removeClass('in'); // hides alert with Bootstrap CSS3 implem

	//});
	
	//To close the alert box
	$('#toclose').click(function () {
		$scope.booltoshowalert = false;
		$(this).parent().removeClass('in'); // hides alert with Bootstrap CSS3 implem

	});

	//For opening alert of Pending data 
	$('#the-thing-that-opens-your-alert2').click(function () {
		$("#myModal2").modal('hide');
		$('#le-alert').addClass('in'); // shows alert with Bootstrap CSS3 implem
		//$('#le-alert').focus();
	});
	
}]);