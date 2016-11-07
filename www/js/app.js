// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      //检测网络状态
      checkConnection();

      //初始化JPush消息推送


    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    cache:true,
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('jpush', {
      url: '/jpush',
      views: {
        'tab-account': {
          // templateUrl: 'templates/jpush.html',
        }
      }
    })
    //大盘行情页面
    .state('hangqing', {
      url: '/hangqing',
      templateUrl: 'templates/hangqing.html',
      controller: 'DashCtrl'
    })
    //数据服务页面
    .state('shuju', {
      url: '/shuju',
      templateUrl: 'templates/shuju.html',
      controller: 'DashCtrl'
    })
    //社区交流页
    .state('shequ', {
      url: '/shequ',
      templateUrl: 'templates/shequ.html',
      controller: 'DashCtrl'
    })
    //量化课堂
    .state('ketang', {
      url: '/ketang',
      templateUrl: 'templates/ketang.html',
      controller: 'DashCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');


  //修改Tab样式，Android平台样式和iOS一样
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('Back').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

});

//网络状态检测
function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  //网络状态  
  states[Connection.UNKNOWN] = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI] = 'WiFi connection';
  states[Connection.CELL_2G] = 'Cell 2G connection';
  states[Connection.CELL_3G] = 'Cell 3G connection';
  states[Connection.CELL_4G] = 'Cell 4G connection';
  states[Connection.CELL] = 'Cell generic connection';
  states[Connection.NONE] = '网络异常，不能连接到服务器';

  if (states[networkState] == "网络异常，不能连接到服务器") {
    alert(states[networkState]);
  } else {
    window.plugins.jPushPlugin.init();
    if (device.platform != "Android") {
      window.plugins.jPushPlugin.setDebugModeFromIos();
      window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
    } else {
      window.plugins.jPushPlugin.setDebugMode(true);
      window.plugins.jPushPlugin.setStatisticsOpen(true);
    }
    //Jpush  收到推送后跳转
    window.plugins.jPushPlugin.openNotificationInAndroidCallback = function(data) {

      alert(data.title);
      alert(data.alert);
      for (i in data.extras) {
        alert(i);
      }
    }
  }
};