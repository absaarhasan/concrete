
    'use strict';

    mainService.$inject = ['$http', '$q'];

    function mainService($http, $q) {


        var service = {

            showErrors: { state: false },
            errorMsg: { text: '' },
            showRepos: { state: false },
            showStars: { state: false },
            userCount: { data: 0 },
            starMsg: { text: '' },
            starResults: { data: {}},
            repoResults: { data: {}},
            init: init
        };

        return service;


        function init(userInput) {

            hideDisplay();

            if (userInput == null || userInput == '' ){

                var errorMsg = 'One or more Git user names are required!';
                showError(errorMsg);

            }else{

                var userList = myTrim(userInput).split(" ");

                if (userList.length === 1){

                    fetchRepos(userList[0]);

                }else{

                    fetchStars(userList);
                }

            }

        }

        function myTrim(x) {
            return x.replace(/^\s+|\s+$/gm,'');
        }

        function hideDisplay() {

            service.showErrors.state = false;
            service.showRepos.state = false;
            service.showStars.state = false;

        }

        function showError(errorMsg) {

            service.errorMsg.text = errorMsg;
            service.showErrors.state = true;

        }

        function fetchRepos(user){

            var errorMsg;
            var gitUrl = 'https://api.github.com/users/'+user+'/repos?sort=stars&order=desc';

            $http.get(gitUrl).success(function(data) {

               if (data.length === 0 || data.message == 'Not Found'){

                   errorMsg = 'Sorry, but that user does not exist on Github!';
                   showError(errorMsg);

               }else {

                   var repoResults = [];

                   for (var key in data) {

                       repoResults.push({name:data[key].name, stars: data[key].stargazers_count});

                   }

                   service.repoResults.data = repoResults;
                   service.showRepos.state = true;

               }


            }).error(function() {

                errorMsg = 'Ooops, it looks like the server is down!';

                showError(errorMsg);
            });


        }

        function fetchStars(userList) {

            var topScore = 0, starResults = [], promises = [];

            function helperFunction(url){

                var userData = $http({method: 'GET', url: url});

                return userData;
            }


            for (var i = 0; i < userList.length; i++) {

                var gitUrl = 'https://api.github.com/users/'+userList[i]+'/repos';

                promises.push(helperFunction(gitUrl));

            }

            $q.all(promises).then(function(data){

                var starResults = [];

                for (var i = 0; i < data.length; i++) {


                    if(data[i].status == 400 ){

                        starResults.push({user:userList[i], starCount: 'Server Error'});

                    } else if(data.length === 0 || data.message == 'Not Found'){

                        starResults.push({user:userList[i], starCount: 'No Such User'});

                        }else{

                            var starCount = countStars(data[i]);

                            starResults.push({user:userList[i], starCount: starCount});

                        }

                }

                displayStars(starResults);

                service.starResults.data = starResults;

            });



        }

        function countStars(data) {


            var stars = 0;

            for (var i = 0; i < data.data.length; i++) {
                stars = stars + data.data[i].stargazers_count
            }

            return stars;

        }

        function displayStars(starResults) {

            var mostStars = [],topScore = 0, resultString;


            for (var i = 0; i < starResults.length; i++) {

                if (!isNaN(starResults[i].starCount)) {

                    if (starResults[i].starCount >  topScore){

                        mostStars = [starResults[i].user];
                        topScore = starResults[i].starCount;
                    } else if (starResults[i].starCount == topScore) {

                        mostStars.push(starResults[i].user);

                    }

                }

            }

            if (mostStars.length === 1){

                resultString = mostStars[0] + ' has got the most stars!'
            } else if (mostStars.length > 1){

                resultString = 'These guys have got the most stars: ' + mostStar.join()
            }

            service.starMsg.text = resultString;

            service.showStars.state = true;

        }




    }


(function() {

        'use strict';

        angular.module('con.main', ['ui.router'])
            .factory('mainService', mainService)
            .controller('MainCtrl',  MainCtrl)
            .config(['$stateProvider', function($stateProvider) {
                $stateProvider

                    .state('main', {
                        url: "/",
                        templateUrl: "views/main/main.html",
                        controller: 'MainCtrl',
                        controllerAs: 'vm'
                    })

            }]);

        MainCtrl.$inject = ['mainService'];

        function MainCtrl( mainService) {

            /* jshint validthis: true */
            var vm = this;

            vm.showErrors = mainService.showErrors;
            vm.errorMsg =  mainService.errorMsg;
            vm.showRepos = mainService.showRepos;
            vm.showStars = mainService.showStars;
            vm.userCount = mainService.userCount;
            vm.starMsg =  mainService.starMsg;
            vm.starResults =  mainService.starResults;
            vm.repoResults =  mainService.repoResults;
            vm.init =  mainService.init;


        }


})();


(function() {

    'use strict';

    angular.module('con', ['ui.router','con.main'])

        .config(['$urlRouterProvider', function( $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

        }])

})();


