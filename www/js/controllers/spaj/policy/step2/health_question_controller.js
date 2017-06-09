function step2Ctrl($state, $scope, $rootScope, $stateParams, $mdDialog, $ionicScrollDelegate, SpajService, $ionicSideMenuDelegate) {
  $rootScope.showBar = true
  $rootScope.showBack = true
  $rootScope.showMenu = true

  $ionicSideMenuDelegate.canDragContent(false)
  var vm = this

  vm.healthData = {
    personalAccidentPopupData: {
      function_name: null,
      is_pen_installed: null
    },
    eyePopup: [{
      name_of_illness: null,
      when_the_condition_found: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    }],
    digesPu: {
      keluhan:{
        sakit: null,
        muntah: null,
        nveri: null,
        mual: null,
        darah: null,
        lainnya: null
      },
      pertamas_select: null,
      frekuensi_select: null,
      frekuensi_option: null,
      kapan_keluhan_select: null,

      apakah_pernah: null,
      kapan_month_select: null,
      kapan_year_select: null,
      nama_dokter: null,
      tindakan:{
        operasi: null,
        suntikan: null,
        obat:null,
        lainnya:null
      },
      pemer:{
        endoskopi:null,
        lainnya:null
      }
    },
    respiratoryPu: {
      gangguan:{
        asma: null,
        tbc: null,
        bronkhitis: null,
        lainnya: null
      },
      kapan_pertama: null,
      yang:{
        sesak: null,
        batuk: null,
        nafas: null,
        lainnya: null
      },
      faktor: null,
      apakah: null,
      kapan_keluhan: null,
      nama_dokter: null,
      berapa_select: null,
      terakhir_select: null,
      terakhir_year: null,
      apakah_pernah: null,
      kapan_select: null,
      lama_select: null,
      lama2: null,
      pengo:{
        inhalasi: null,
        suntikan_nama: null,
        obat_minum: null,
        operasi: null,
        lainnya: null,
      },
      pemer:{
        rontgen:null,
        tes:null,
        ekg:null,
        lainnya:null
      }
    },
    tumorPu: {
      janes: {
        tumor: null,
        kista: null,
        benjolan: null,
        kainnya: null
      },
      lokasi: {
        leher: null,
        lengan: null,
        punggung: null,
        lainnya: null
      },
      kapan_pertama: null,
      sudah: null,
      kapan_month_select: null,
      kapan_year_select: null,
      nama_dokter: null,
      jenis_operasi:{
        rahim:null,
        payudara:null,
        lainnya:null
      },
      pengo:{
        obat_option:null,
        radiography_option:null,
        chemography_option:null,
        lainnya_option:null
      } 
    },
    height: null,
    weight: null,
    smoker: null,
    sticks_cigarettes: null,
    medication: null,
    medication_detail: null,
    darah: null,
    ipeningkatan: null,
    ijantung: null,
    ikelainan: null,
    istroke: null,
    idemam: null,
    inyeri: null,
    inodule: null,
    ibrain: null,
    ihocmon: null,
    ieye: null,
    eye_contact_lenses: false,
    eye_disorders: false,
    iear: null,
    irespiratory: null,
    iheart: null,
    idigestive: null,
    ikidney: null,
    iface: null,
    ibone: null,
    itumors: null,
    iill: null,
    iinjury: null,
    idisease: null,
    idisorder: null,
    iabnormality: null,
    ipapsmear: null,
    ipregnant: null,
    isurgery: null,
    icomplication: null,
    ilostweight: null
  }

  vm.eyePopupTouched = false
  vm.digestivePopupTouched = false
  vm.tumorPopupTouched = false
  vm.respiratoryPopupTouched = false

  vm.fakeoption = [

    {
      type: 'a',
      value: 'Red2'
    },
    {
      type: 'bewf',
      value: 'Green'
    },
    {
      type: 'cfew',
      value: 'Blue'
    }
  ]

  vm.nextStep = function () {
    vm.healthData.isComplete = validator()
    SpajService.setData('health_data', vm.healthData)
    $state.go('app.other_health')
  }



  vm.tabs = [
    { title: 'Tertanggung Utama', value: 'main_question' },
    { title: 'Tertanggung Tambahan 1', value: 'additional_insured_1' },
    { title: 'Tertanggung Tambahan 2', value: 'additional_insured_2' }
  ]
  vm.currentTab = 'main_question'
  vm.currentTabIndex = 0

  vm.switchTab = function (tab, index) {
    vm.currentTab = tab
    vm.currentTabIndex = index
  }

  vm.handleSwipe = function (e) {
    var direct = e.gesture.direction
    // if swipeleft and current tab index smaller than tabs length
    if (direct === 'left' && (vm.currentTabIndex < vm.tabs.length - 1)) {
      var nextTab = vm.tabs[vm.currentTabIndex + 1]['value']
      vm.switchTab(nextTab, vm.currentTabIndex + 1)
    }
    // if swiperight and current tab index bigger than 0
    if (direct === 'right' && vm.currentTabIndex > 0) {
      var prevTab = vm.tabs[vm.currentTabIndex - 1]['value']
      vm.switchTab(prevTab, vm.currentTabIndex - 1)
    }
  }

  function validator() {
    return true
  }

  // Main Health step

  vm.objectValidate=function(obj){ 
    var obvalid=0
    if(obj.constructor==Object){
      for(var key in obj){
        if(obj[key]===null) return false
        if(obj[key]!=null&&obj[key].constructor==Object){
          var count=0
          for(var childkey in (obj[key])){
            if(obj[key][childkey]!=null) {
              count++
            };  
          }
          if(count==0) {return false ;}else{ obvalid++; }
        }
      }
    }else if(obj.constructor==Array){
      for (i = 0; i < obj.length; i++) {
        for (var key in obj[i]) {
          if (obj[i][key] == null) return false
        }
      }
    }
    return true
  }
  vm.resetObject=function(obj){
    for(var key in obj){
      if(obj[key]!=null&&obj[key].constructor==Object){
        for(var childkey in (obj[key])){
          obj[key][childkey]=null
        }
      }else{
        obj[key] =null
      }
    }
  }

  vm.health1NextStep = function (id) {
    var STEP_HEIGHT = $('.multi-step').height() + 140
    var distance = $('#' + id) && $('#' + id).position().top + STEP_HEIGHT
    $('#' + id).addClass('_active');
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }
  // Popup common function
  vm.closeDialog = function () {
    $mdDialog.hide();
  }

  vm.puNextStep = function (id) {
    $('#' + id).addClass('_active');
    var distance = $('#' + id) && $('#' + id).position().top || 0;
    $ionicScrollDelegate.scrollTo(0, distance, true)
  }


  
 
  // ======================== PopupEye ======================== //
  vm.showPopupEye = function () {
    if (vm.healthData.eye_contact_lenses && vm.healthData.eye_disorders && vm.healthData.eyePopup.length < 2) { // if choose both option
      vm.addPopupEyeItem()
    }
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup-eye.html',
      clickOutsideToClose: true
    }).then(function () {
      vm.eyePopupTouched = true
    })
  }
  vm.addPopupEyeItem = function () {
    vm.healthData.eyePopup.push({
      name_of_illness: null,
      when_the_condition_found: null,
      last_care_date: null,
      hospoital_name: null,
      hospital_address: null,
      medicine: null
    })
  }
  vm.resetEye = function () {
    vm.eyePopupTouched = false;
    vm.resetObject(vm.healthData.eyePopup)
  }

  // ======================== PopupDigestive ======================== //

  vm.showPopupDigestive = function () {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup-digestive.html',
      clickOutsideToClose: true
    })
    .then(function (res) {
      vm.digestivePopupTouched = true
    })
  }
  vm.digest_addObat = function () {
    vm.healthData.digesPu.tindakan_obat.push({
      yang: null,
      diperoleh_dari: null,
      timbulnya_select: null,
      timbulnya_option: null,
      mashit: null
    })
  }
  vm.resetDigestive = function () {
    vm.digestivePopupTouched = false;
    vm.resetObject(vm.healthData.digesPu)
  }
  // ======================== PopupRespiratory ======================== //

  vm.showPopupRespiratory = function () {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup_respiratory.html',
      clickOutsideToClose: true
    })
    .then(function (res) {
      vm.respiratoryPopupTouched = true
    })
  }
  vm.resetRespiratory = function () {
    vm.respiratoryPopupTouched = false;
    vm.resetObject(vm.healthData.respiratoryPu)
  }

  // ======================== PopupTumor ======================== //
  vm.showPopupTumor = function () {
    $mdDialog.show({
      scope: $scope.$new(),
      templateUrl: 'views/spaj/policy/step2/popup_tumor.html',
      clickOutsideToClose: true
    })
    .then(function (res) {
      vm.tumorPopupTouched = true
    })
  }
  vm.resetTumor = function () {
    vm.tumorPopupTouched = false;
    vm.resetObject(vm.healthData.tumorPu)
  }
  // ======================== End PopupTumor ======================== //

}
