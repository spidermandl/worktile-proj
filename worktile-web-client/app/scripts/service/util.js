/**
 * @ngdoc function
 * @description
 * # IdentityService
 * Controller of the jtWorkApp
 */
define(function (require) {
	'use strict';

	return {
		// 修改angularjs $http.post的默认传参方式
		transformPostRequest : function(data){
			var param = function(obj){
				var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
	                
	            for(name in obj) {
	                value = obj[name];
	                    
	                if(value instanceof Array) {
	                    for(i=0; i<value.length; ++i) {
	                        subValue = value[i];
	                        fullSubName = name + '[' + i + ']';
	                        innerObj = {};
	                        innerObj[fullSubName] = subValue;
	                        query += param(innerObj) + '&';
	                    }
	                }
	                else if(value instanceof Object) {
	                    for(subName in value) {
	                        subValue = value[subName];
	                        fullSubName = name + '[' + subName + ']';
	                        innerObj = {};
	                        innerObj[fullSubName] = subValue;
	                        query += param(innerObj) + '&';
	                    }
	                }
	                else if(value !== undefined && value !== null)
	                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	            }
	            
	            return query.length ? query.substr(0, query.length - 1) : query;
			};

			var result = angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
			console.log(result);
			return result;
		}
	};
})