function phMainCtrl ($scope, $rootScope, $state, $stateParams, CommonService,  UserService, DataService, SpajService, $ionicSideMenuDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = false
  $rootScope.showMenu = true

  $ionicSideMenuDelegate.canDragContent(false)
  var vm = this

  var POCICY_HOLDER_TAB = 'POLICY_HOLDER'
  var rootSpajData = SpajService.getData('spaj')

  vm.PH = 'Pemegang Polis - '
  vm.policy_holder_tab = POCICY_HOLDER_TAB
  vm.currentTab = POCICY_HOLDER_TAB
  vm.additionalList = []
  vm.currentTabIndex = null

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab || POCICY_HOLDER_TAB
    vm.currentTabIndex = index
  }

  vm.addAdditionalTab = function (tabIndex) {
    var numberTab = vm.additionalList.length
    var newTab = {}
    if (typeof tabIndex === 'undefined') { tabIndex = numberTab }
    // we have only maximum 2 addtional tabs and only accept index 0 or 1
    if (numberTab === 2 && (tabIndex !== 1 || tabIndex !== 0)) { return }
    if (vm.additionalList[0] && vm.additionalList[0].index === tabIndex) {
      tabIndex = 1 - tabIndex // switch between 0 and 1
    }

    newTab = {
      index: tabIndex,
      id: 'ADDITIONAL_' + tabIndex,
      name: 'Tertanggung Tambahan ' + (tabIndex + 1)
    }

    vm.currentTabIndex = tabIndex
    vm.additionalList.push(newTab)
    vm.currentTab = 'ADDITIONAL_' + tabIndex
  }

  vm.nextClickHandle = function () {
    var tabs = [{ id: POCICY_HOLDER_TAB, name: vm.PH + 'Tertanggung Utama' }].concat(vm.additionalList)
    SpajService.setData('start', { tabs: tabs })

    validator(function (rs) {
      if (rs.indexOf(false) >= 0) {
        SpajService.stepComplete('start', false)
      } else {
        SpajService.stepComplete('start', true)
      }
    })
    $rootScope.nextStep()
  }

  vm.handleMainTabSwipe = function () {
    switch (vm.currentTabIndex) {
      case 0:
        vm.switchTab('ADDITIONAL_0', 0)
        break
      case 1:
        vm.switchTab('ADDITIONAL_1', 1)
        break
    }
  }
  vm.handleAddedTabSwipe = function (e) {
    var direct = e.gesture.direction
    var num = vm.additionalList.length
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left') {
      if (num === 1) {
        vm.switchTab(vm.policy_holder_tab, vm.currentTabIndex)
      }
      if (num === 2 && vm.currentTabIndex == 0) {
        var nextTab = vm.additionalList[vm.currentTabIndex + 1]['id']
        vm.switchTab(nextTab, vm.currentTabIndex + 1)
      } else if (num === 2 && vm.currentTabIndex == 1) {
        vm.switchTab(vm.policy_holder_tab, vm.currentTabIndex)
      }
    }
    if (direct === 'right') {
      switch (vm.currentTabIndex) {
        case 1:
          var prevTab1 = vm.additionalList[vm.currentTabIndex - 1]['id']
          vm.switchTab(prevTab1, vm.currentTabIndex - 1)
          break
      }
    }
  }

  $scope.conditionSelected = false
  // $scope.$watch('[conditionSelected]', function () {
  //   $scope.nextButtonDisabled = !$scope.conditionSelected
  // }, true)

  $scope.getValueButton = function (value) {
    var data = SpajService.getData('start')
    if(data[vm.currentTab] && !data[vm.currentTab].email && value===1){
      CommonService.showAlert('Alert', 'Email is invalid!')
      return null
    }
    $scope.option = value
    $scope.isactive = value
  }

  $scope.boxCheckButton = false

  $scope.$watch('[option]', function () {
    $rootScope.dataSave = {
      conditionSelected: $scope.conditionSelected,
      valueButtonSubmit: $scope.option
    }
  }, true)
  // console.log( SpajService.getData('spaj1'));

  function initPage (rootSpajData) {
    /*if (!rootSpajData) {
      $state.go('app.spaj_start')
    } else {
      var typeOfSession = Number.parseInt(rootSpajData.session1)
      if (typeOfSession === 1 || typeOfSession === 2) {
        vm.PH = ''
        vm.addAdditionalTab(typeOfSession - 1)
      }
    }*/
  }

  function validator (callback) {
    if (!SpajService.getData('start')) {
      SpajService.setData('start', {})
    }

    setTimeout(function () {
      var data = SpajService.getData('start')
      var rs = Object.keys(data).map(function (page) { return data[page].isComplete })
      callback(rs)
    }, 1500)
  }

  initPage(rootSpajData)
}
