(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController',NarrowItDownController)
        .service('MenuSearchService',MenuSearchService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
        .directive('foundItems',foundItems);

    function foundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: "foundItems.html",
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.displayTable = false;
        menu.error = false;
        menu.searchItem = '';
        menu.found = [];
        
        menu.getMatchedMenuItems = function(searchItem) {
            menu.displayTable = false;
            menu.error = false;
            menu.found = [];

            if (searchItem) {
                var promise = MenuSearchService.getMatchedMenuItems(searchItem);
                promise.then((items) => {
                    if (items.length > 0){
                        menu.found = items;
                        menu.displayTable = true;
                    }
                    else {
                        menu.error = true;
                    }
                });
            }
            else {
                menu.error = true;
            }
        }
        menu.removeItem = function(index) {
            menu.found.splice(index,1);
        }
    }

    MenuSearchService.$inject = ['$http','ApiBasePath'];
    function MenuSearchService($http,ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchItem) {
            return $http({
                method: 'GET',
                url: (ApiBasePath + '/menu_items.json')
            }).then((response) => {
                return response.data['menu_items'].filter(item =>
                    item.description.toLowerCase().includes(searchItem));
            });
        }
    }
}())
