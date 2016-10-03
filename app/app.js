
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import firebase from 'firebase';
import angularfire from 'angularfire';

import user from './modules/user';

let App = angular.module('app', [
    'ui.router',
    'firebase',
    'app.user'
]);

function config($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
}

console.log("this is app JS");

