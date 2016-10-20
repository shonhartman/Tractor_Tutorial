class ProfileController {
    constructor($state, UserService, $http, $scope) {
        this._$http = $http;
        this._$scope = $scope;
        this._$state = $state;
        this._UserService = UserService;

        // this._UserService
        // .isLoggedIn()
        // .then((response) => {
        //     this.user = response;
        //     console.log("response");
        // })

        // .catch((error) => {
        //     this._$state.go("register");
        // });


        function LangCtrl($scope) {
            console.log("profile controller standing by");

            $scope.lang = 'English';

            $scope.setLang = function(lang) {
                switch (lang) {
                    case 'English':
                        $translate.use('en');
                        break;
                    case 'Español':
                        $translate.use('es');
                        break;
                    case '中文':
                        $translate.use('zh');
                        break;
                    case '日本語':
                        $translate.use('ja');
                        break;
                    case 'Portugal':
                        $translate.use('pt');
                        break;
                    case 'Русский язык':
                        $translate.use('ru');
                        break;
                }
                return $scope.lang = lang;
            };

            $scope.getFlag = function() {
                var lang;
                lang = $scope.lang;
                switch (lang) {
                    case 'English':
                        return 'flags-american';
                        break;
                    case 'Español':
                        return 'flags-spain';
                        break;
                    case '中文':
                        return 'flags-china';
                        break;
                    case 'Portugal':
                        return 'flags-portugal';
                        break;
                    case '日本語':
                        return 'flags-japan';
                        break;
                    case 'Русский язык':
                        return 'flags-russia';
                        break;
                }
            };

        }
    }
}

export default ProfileController;