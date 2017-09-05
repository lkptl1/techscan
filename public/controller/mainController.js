var app =angular.module('techScan',['ngResource','ui.router']);
app.controller('mainController',['gitApi','$state',function(gitApi,$state){
  vm=this;
  vm.technologies= ['Javascript','Java','Python','Php'];
  vm.getTechDetails= getTechDetails;
  vm.getUserInfo= getUserInfo;
  vm.getLanguages= getLanguages;
  vm.tech='';
  
  getLanguages();
  function getLanguages(){
    vm.languages=gitApi.getLanguages({order:'desc'});
   // console.log(vm.languages)
  }

  function getUserInfo(userId){
    // console.log(userId);
    vm.user=gitApi.getUser({id:userId});
    vm.userRepos=gitApi.getUserRepos({id:userId});
  
   // console.log(vm.userRepos)
  }
  
  function getTechDetails(tech){
    vm.tech=tech?tech:'Javascript';
    vm.data=gitApi.getRepo({q :vm.tech ,sort : 'stars',order:'desc',per_page:9 });

  }
   
   
	
}]);
app.factory('gitApi',['$resource',function($resource){
 var resApi= $resource('https://api.github.com',{tech:'@tech',id:'@userID'},
 
  {
   getUser:{
     method: 'GET',
     params:{id:'@userId'},
     url:'https://api.github.com/user/:id'

   },
   getRepo:{
    method: 'GET',
    params:{q :'@tech'},
    url:'https://api.github.com/search/repositories'

   },
   getLanguages:{
    method: 'GET',
    params:{},
    url:'https://api.github.com/repos/git/git/languages'

   },
   getUserRepos:{
    method: 'GET',
    params:{id:'@userId'},
    isArray:true,
    url:'https://api.github.com/user/:id/repos'

   }

 })
 return resApi
}]);
app.config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider,$locationProvider,$urlRouterProvider){
  
 $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home',{
    url: '/home',
    templateUrl:'home.html'
  }).
  state('repo',{
    url:'/repo',
    templateUrl:'repo.html'

  }).state('userDetail',{
    url:'/user-detail',
    templateUrl:'userDetail.html'

  })

 $locationProvider.html5Mode({
 	enabled: true,
    requireBase: false
 });

}]);
app.run(function($state){
  $state.go('home');
  
})