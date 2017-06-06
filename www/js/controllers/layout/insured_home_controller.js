function insuredHomeCtrl ($scope, $rootScope, $attrs, $timeout, SpajService) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this

  vm.insuredData = {
    address: [{
      rumah_tel: null,
      kantor_tel: null,
      hp_gsm_tel: null
    }]
  }
  vm.addInsuredAddress = function () {
    var newAddress = {
      rumah_tel: null,
      kantor_tel: null,
      hp_gsm_tel: null
    }
    vm.insuredData.address.push(newAddress)
  }
  $scope.data = {}

  $timeout(function () {
    var insuredName = $attrs.insuredData
    $scope.insuredName = insuredName
    if (!SpajService.getData('start')) {
      SpajService.setData('start', {})
    }
    var data = SpajService.getData('start')
    data[insuredName] = $scope.data

    $scope.$on('$destroy', function () {
      data[insuredName]['isComplete'] = validator()
    })
  })

  $scope.contacts = [
    {
      tel: { home: '', office: '', gsm: ''}
    }
  ]
  $scope.addContact = function () {
    var tel = {
      tel_home: '',
      tel_office: '',
      tel_gsm: ''
    }
    $scope.contacts.push(tel)
  }

  function validator () {
    var data = $scope.data
    // TODO
    if (data.name) { return true }
    return false
  }
}
