function config($stateProvider) {
    $stateProvider
    .state("profile", {
        url:"/profile",
        controller: "ProfileController as profileCtrl",
        template: require("./views/profile.html")
    })
    .state("register", {
        url:"/register",
        controller: "RegisterController as registerCtrl",
        template: require("./views/register.html")
    })
    .state("header", {
        name:"header",
        url:"/header",
        template: require("./views/header.html")
    })
    
}

export default config;