angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicSlideBoxDelegate) {

  //为了验证属性active-slide定义的模型，angularjs是mvc模式
  $scope.model = {
    activeIndex:0
  };

//此事件对应的是pager-click属性，当显示图片是有对应数量的小圆点，这是小圆点的点击事件
  $scope.pageClick = function(index){
    //alert(index);

    $scope.model.activeIndex = 2;
  };

//当图片切换后，触发此事件，注意参数
  $scope.slideHasChanged = function($index){
    //alert($index);

  };
  //这是属性delegate-handle的验证使用的，其实没必要重定义，直接使用$ionicSlideBoxDelegate就可以
  $scope.delegateHandle = $ionicSlideBoxDelegate;


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
