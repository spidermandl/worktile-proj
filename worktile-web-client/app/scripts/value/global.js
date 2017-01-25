'use strict';

/**
 * @ngdoc function
 * @name jtWorkApp
 * @description
 */
angular.module('jtWorkApp')
  .value('$root', {
		global : {
			loading_init : true,
			i18n_loading_done : true,
		}
  });