function payorOption1Ctrl ($scope, DataService, $ionicScrollDelegate, $location) {
  var vm = this
  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'payor_option0' },
    { title: 'Tertanggung Tambahan 1', value: 'payor_option1' }
  ]
  vm.currentTab = 'payor_option0'

  vm.save = function () {
    // var data = vm.questions;
    // console.log(data);
    $location.path('/app/step4/option1')
  }
}