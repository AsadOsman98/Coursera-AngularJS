(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
.directive('foundItems',foundItems);


function foundItems() {
    let ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            foundItems: '<',
            onRemove: '&'
        },
        controller: NarrowItDownController,
        controllerAs: '$ctrl',
        bindToController: true
    };
    return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService',];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  var promise = MenuSearchService.getMatchedMenuItems();

  // promise.then(function (response) {
  //   menu.categories = response.data['menu_items'];
  // })
  // .catch(function (error) {
  //   console.log("Something went terribly wrong.");
  // });

  menu.logMenuItems = function (shortName) {
    var promise = MenuSearchService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http,ApiBasePath) {
        let service = this;

        service.getMatchedMenuItems = function(searchItem) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then((response) => {
                return response.data['menu_items'].filter(item =>
                     item.description.toLowerCase().includes(searchItem));
            });
        }
    };


  //
  // service.getMenuForCategory = function (shortName) {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/menu_items.json"),
  //     params: {
  //       category: shortName
  //     }
  //   });
  //
  //   return response;
  // };


})();
