'use strict';
var app = angular.module('SURAservice', ['ui.router']);

app.factory('SEGURIDAD', function ($http, envService, $q) {
    var api = envService.read('apiUrl');
    return {
        getempresas: () => {
            var deferred = $q.defer();
            $http.get(api + '/api/seguridad/GetEmpresas').then((res) => {
                deferred.resolve(JSON.parse(res.data));
            }, (err) => {
                deferred.reject('ERROR');
            });
            return deferred.promise;
        }
    };
});

app.factory('CONTABILIDAD_CONFIGURACION', function ($http, envService, $q) {
    var api = envService.read('apiUrl');
    return {
        gettipoanalisis: () => {
            var deferred = $q.defer();
            $http.get(api + '/api/contabilidadconfiguracion/GetTipoAnalisis').then((res) => {
                deferred.resolve(JSON.parse(res.data));
            }, (err) => {
                deferred.reject('ERROR');
            });
            return deferred.promise;
        },
        updatetipoanalisis: (dato) => {
            var deferred = $q.defer();
            $http.post(api + '/api/contabilidadconfiguracion/TipoAnalisisActualiza', dato).then((res) => {
                deferred.resolve(JSON.parse(res.data));
            }, (err) => {
                deferred.reject('ERROR');
            });
            return deferred.promise;
        },
        inserttipoanalisis: (dato) => {
            var deferred = $q.defer();
            $http.post(api + '/api/contabilidadconfiguracion/TipoAnalisisInserta', dato).then((res) => {
                deferred.resolve(JSON.parse(res.data));
            }, (err) => {
                deferred.reject('ERROR');
            });
            return deferred.promise;
        }
    };
});