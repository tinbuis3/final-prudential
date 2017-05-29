function stepProcessCtr($scope, $rootScope, UserService, DataService, $location, $timeout) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true
  var vm = this
  vm.pageList = [
    { step: '1', title: 'Policy Holder Information', state: 'main' },
    { step: '2', title: 'Health Questions', state: 'step2' },
    { step: '3', title: 'Kegiatan beresiko', state: 'step3' },
    { step: '4', title: 'Pembayar Premi', state: 'step4' },
    { step: '5', title: 'Penerima Manfaat', state: 'step5' },
    { step: '6', title: 'Health Questions', state: 'step6' },
    { step: '7', title: 'Health Questions', state: 'step7' },
    { step: '8', title: 'Payor', state: 'step8' }]
  $rootScope.policyStep = $rootScope.policyStep ? $rootScope.policyStep : { steps: vm.pageList }
  $rootScope.setCurrentPolicyStep = $rootScope.setCurrentPolicyStep || function (step) {
    $rootScope.policyStep.currentStep = step
  }

  $rootScope.getCurrentPolicyStep = $rootScope.getCurrentPolicyStep || function () {
    return $rootScope.policyStep.currentStep || '1'
  }

  $rootScope.getPolicySteps = $rootScope.getPolicySteps || function () {
    return $rootScope.policyStep.steps
  }

  vm.changeStep = vm.changeStep || function (step) {
    $rootScope.policyStep.currentStep = step
  }

  $timeout(function () { vm.policyStep = $rootScope.getCurrentPolicyStep() })
}
