'use strict';
var app = angular.module('SURAcontroller', [
    'ui.router',
    'ui.bootstrap']);
//MENU
function MenuCtrl($scope, $uibModal, $rootScope) {
    menu_ini();
    $rootScope.modulo = { id: 1, nombre: 'Contabilidad' };
    // $rootScope.modulo = { id: 0, nombre: 'Caja y Bancos' };
    var mContabilidad = [
        {
            nombre: 'Configuración',
            ico: 'fas fa-sliders-h',
            submenu: [
                { nombre: 'Asientos tipo', url: 'index.configuracion_asientostipo' },
                { nombre: 'Cuenta corriente', url: 'index.configuracion_cuentacorriente' },
                { nombre: 'Empresa', url: 'index.configuracion_empresa' },
                { nombre: 'Historico tipo de cambio', url: 'index.configuracion_historicotipocambio' },
                { nombre: 'Libros auxiliares', url: 'index.configuracion_lisbrosauxiliares' },
                { nombre: 'Tipos de analisis', url: 'index.configuracion_tipoanalisis' },
                { nombre: 'Tipos de documentos', url: 'index.configuracion_tipodocumentos' },
            ]
        },
        {
            nombre: 'Control',
            ico: 'fas fa-tools',
            submenu: [
                { nombre: 'Analisis de cuenta', url: 'index.control_analisiscuentas' }
            ]
        },
        {
            nombre: 'Operacional',
            ico: 'fas fa-dolly',
            submenu: [
                { nombre: 'Ajuste por diferencia de cambio', url: 'index.operacional_ajustediferenciacambio' },
                { nombre: 'Consulta de voucher', url: 'index.operacional_consultavoucher' },
                { nombre: 'Generacion de formatos SUCAVE', url: 'index.operacional_formatossucave' },
                { nombre: 'Interface generacion de txt', url: 'index.operacional_generaciontxt' },
                { nombre: 'Interface mantenimiento de plantilla', url: 'index.operacional_mantplantillas' },
                { nombre: 'Libro bancos', url: 'index.operacional_librobancos' },
                { nombre: 'Libro caja', url: 'index.operacional_librocaja' },
                { nombre: 'Libro mayor', url: 'index.operacional_libromayor' },
                { nombre: 'Plan de cuentas', url: 'index.operacional_plancuentas' },
                { nombre: 'Registro de asientos tipo', url: 'index.operacional_asientostipo' },
                { nombre: 'Registro de voucher', url: 'index.operacional_rvoucher' }
            ]
        },
        {
            nombre: 'Reportes',
            ico: 'far fa-clipboard',
            submenu: [
                { nombre: 'Analisis de centro de costos', url: 'index.reportes_centrosdecosto' },
                { nombre: 'Analisis de centro de gestion y directorio', url: 'index.reportes_centrosgestion' },
                { nombre: 'Analisis de cuenta corriente', url: 'index.reportes_cuentacorriente' },
                { nombre: 'Balance de comprobacion analitico', url: 'index.reportes_balancecomprobacion' },
                { nombre: 'Balance general', url: 'index.reportes_balancegeneracion' },
                { nombre: 'Estado de ganancias y perdidas', url: 'index.reportes_gananciaperdida' },
                { nombre: 'Gastos por centros de costos', url: 'index.reportes_gastoscentrocosto' },
                { nombre: 'Registro de retenciones proveedor', url: 'index.reportes_rretencionesproveedor' }
            ]
        },
        {
            nombre: 'Ajustes por inflación',
            ico: 'fas fa-chart-line',
            submenu: [
                { nombre: 'Apertura', url: 'index.ajustes_apertura' }
            ]
        },
        {
            nombre: 'Utilitarios',
            ico: 'fas fa-toolbox',
            submenu: [
                { nombre: 'Cierre/apertura año', url: 'index.utilitarios_cierreapertura' },
                { nombre: 'Importacion de informacion', url: 'index.utilitarios_importacioninformacion' },
                { nombre: 'Mayorizacion', url: 'index.utilitarios_mayorizacion' }
            ]
        },
        {
            nombre: 'Reportes IFRS',
            ico: 'fas fa-chart-bar',
            submenu: [
                { nombre: 'Balance de comprobacion analitico - IFRS', url: 'index.reportesifrs_balancecomprobacion' },
                { nombre: 'Balance general - IFRS', url: 'index.reportesifrs_balancegeneral' },
                { nombre: 'Estado de resultados-evolutivo IFRS', url: 'index.reportesifrs_estadoresultados' },
                { nombre: 'Ganancias y perdidas-evolutivo IFRS', url: 'index.reportesifrs_gananciaperdidas' },
                { nombre: 'Libro mayor-IFRS', url: 'index.reportesifrs_libromayor' }
            ]
        }
    ];
    var mCajaBancos = [
        {
            nombre: 'Configuración', ico: 'fas fa-cogs',
            submenu: [
                { nombre: 'Análisis de Cuentas Corrientes', url: 'index.conf_analisiscuenta' },
                { nombre: 'Cheques', url: 'index.conf_cheques' },
                { nombre: 'Cuentas', url: 'index.conf_cuentas' },
                { nombre: 'Empresas', url: 'index.config_empresas' },
                { nombre: 'Libros Auxiliares', url: 'index.config_librosauxiliares' },
                { nombre: 'Mantenimiento Concepto Comprobantes', url: 'index.config_mantcomprobantes' },
                { nombre: 'Periodos', url: 'index.config_periodo' },
                { nombre: 'Tipo de Análisis', url: 'index.config_tipoanalisis' },
                { nombre: 'Tipo de Documento', url: 'index.config_tipodocumento' },
                { nombre: 'Xerox Mant. Areas', url: 'index.config_xeroxarea' },
                { nombre: 'Xerox Mant. Categorias', url: 'index.config_xeroxcategorias' },
                { nombre: 'Xerox Mant. Combinaciones', url: 'index.config_xeroxcombinaciones' },
                { nombre: 'Xerox Mant. Firmantes', url: 'index.config_xeroxfirmante' },
                { nombre: 'Xerox Mant. Restricciones', url: 'index.config_xeroxrestricciones' },
                { nombre: 'Xerox Mant. Tipo de Firmantes', url: 'index.config_xeroxtipofirmantes' },
                { nombre: 'Xerox Mant. Tipo de Operación', url: 'index.config_xeroxtipooperacion' }
            ]
        },
        {
            nombre: 'Operaciones', ico: 'fas fa-funnel-dollar',
            submenu: [
                { nombre: 'Anulación de Cheques Contabilizados', url: 'index.opera_anulacioncheques' },
                { nombre: 'Anulación Masiva de Cheques', url: 'index.opera_anulacionmasiva' },
                { nombre: 'Conciliación Bancaria', url: 'index.opera_conciliacionbancaria' },
                { nombre: 'Consulta e Impresión de Cheques', url: 'index.opera_consultacheques' },
                { nombre: 'Emisión de Cheques', url: 'index.opera_emisioncheques' },
                { nombre: 'Envia Comprobante Retención-Sunat', url: 'index.opera_comprobanteretencion' },
                { nombre: 'Impresión de Comprobantes', url: 'index.opera_impresioncomprobante' },
                { nombre: 'Liberación de Cheques', url: 'index.opera_liberacioncheques' },
                { nombre: 'Registro Movimiento', url: 'index.opera_registromovimiento' }
            ]
        },
        {
            nombre: 'Reportes', ico: 'far fa-clipboard',
            submenu: [{ nombre: 'Análisis de Cuentas', url: 'index.report_analisiscuenta' }]
        },
        {
            nombre: 'Utilitarios', ico: 'fas fa-parachute-box',
            submenu: [{ nombre: 'Transferencia a Contabilidad', url: 'index.util_transferenciacontabilidad' }]
        }
    ];
    $scope.menu = $rootScope.modulo.id === 0 ? mCajaBancos : mContabilidad;
}
//MENU MOVIL
function MenuMovilCtrl($scope) {
    console.info('Menu Movil');
}
//CABECERA
function CabeceraCtrl($scope, $uibModal, $rootScope) {
    console.log('Cabecera');
    $('.fs-selector-trigger').on('click', function () {
        $(this).closest('.fancy-selector-w').toggleClass('opened');
    });
    $scope.empresa = {};
    $scope.fondos = ['Fondo 1', 'Fondo 2', 'Fondo 3'];

    $scope.fondoselect = (x) => {
        $scope.fondoseleccionado = x;
    };

    $scope.seleccionarempresa = () => {
        var modal = $uibModal.open({
            backdrop: false,
            templateUrl: 'modalEmpresas.html',
            size: 'lg',
            controller: function ($scope, $uibModalInstance, $timeout, SEGURIDAD) {
                $scope.name = 'bottom';

                SEGURIDAD.getempresas().then((res) => {
                    var table = $('#empresastable').DataTable({
                        responsive: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: res.data,
                        columns: [{
                            title: "Codigo",
                            data: "codigo"
                        }, {
                            title: "Nombre",
                            data: "nombre"
                        }
                            , {
                            title: "Ejercicio",
                            data: "ejercicio"
                        }]
                    });
                    table
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            $scope.empresa = rowData[0];
                        })
                        .on('deselect', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            $scope.empresa = {};
                        });
                });

                $scope.cerrar = () => {
                    $uibModalInstance.close();
                }
                $scope.aceptar = () => {
                    $uibModalInstance.close($scope.empresa);
                }
            }
        });
        modal.result.then(function (f) {
            $scope.empresa = f;
        });
    };
    $scope.fondoseleccionado = '';
    $scope.seleccionarempresa();
}
//CUERPO
function CuerpoCtrl($scope, $state) {
    console.log('Cuerpo');
    $state.go('index.contenido');
}
//ERROR
function Error404Ctrl($scope) {
    console.log('Error');
}
//DASHBOARD
function CdashboardCtrl($scope) {
}

//CONTABILIDAD>CONFIGURACION>ASIENTOS TIPO - INI
function CCasientostipoCtrl($scope, $state, $timeout) {
    $state.go('index.configuracion_asientostipo.inicio');

    $scope.imprimir = () => {
        window.open('src/views/utils/reporte.htm', '_blank', "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=500,width=1000,height=600");
    }

    var datos = [
        { 'id': '0', 'codigo': 'AC-01', 'descripcion': 'ACREDITACION' },
        { 'id': '1', 'codigo': 'AC-02', 'descripcion': 'REGULARIZACION DE ACREDITACION' },
        { 'id': '2', 'codigo': 'AC-03', 'descripcion': 'NULIDAD DE CONTRATO DE AFILIACION' },
        { 'id': '3', 'codigo': 'AC-04', 'descripcion': 'PAGOS EN EXCESO' },
        { 'id': '4', 'codigo': 'AR', 'descripcion': 'ALMACEN' },
        { 'id': '5', 'codigo': 'CP-01', 'descripcion': 'PASAJES AEREOS DOLARES' },
        { 'id': '6', 'codigo': 'CP-02', 'descripcion': 'MANTMTO. MUEBLES Y ENSERES DOLARES' },
        { 'id': '7', 'codigo': 'CP-03', 'descripcion': 'MANTMTO. OFIC PPL Y AGENCIAS DOLARES' },
        { 'id': '8', 'codigo': 'CP-04', 'descripcion': 'MANTMTO. MUEBLES Y ENSERES SOLES' },
        { 'id': '9', 'codigo': 'CP-05', 'descripcion': 'LIQUIDACION DE TIEMPO DE SERVICIOS' },
        { 'id': '10', 'codigo': 'CP-06', 'descripcion': 'PROYECTO MULTIFONDO DOLARES' },
        { 'id': '11', 'codigo': 'CP-07', 'descripcion': 'TRANSMISION DE DATOS SOLES' },
        { 'id': '12', 'codigo': 'CP-08', 'descripcion': 'POLIZAS NACIONALES SOLES' },
        { 'id': '13', 'codigo': 'CP-09', 'descripcion': 'POLIZAS EXTRANJERAS DOLARES' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            "data": "codigo"
        }, {
            title: "Descripción",
            "data": "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_asientostipo.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_asientostipo.inicio');
        });
}
function CCasientostipoinicioCtrl($scope) {

}
function CCasientostipoeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }

    var datos = [
        { 'id': '0', 'cuenta': '5170', 'req': 'No', 'mult': 'No', 'cuentapre': '51701', 'igv': 'Ninguno', 'importe': 'Cargo' },
        { 'id': '1', 'cuenta': '51702', 'req': 'Si', 'mult': 'No', 'cuentapre': '517021', 'igv': 'Ninguno', 'importe': 'Elección' },
        { 'id': '2', 'cuenta': '214011', 'req': 'No', 'mult': 'No', 'cuentapre': '2140111', 'igv': 'Ninguno', 'importe': 'Cargo' },
        { 'id': '3', 'cuenta': '21463', 'req': 'No', 'mult': 'No', 'cuentapre': '21463', 'igv': 'Ninguno', 'importe': 'Cargo' },
        { 'id': '4', 'cuenta': '21464', 'req': 'Si', 'mult': 'Si', 'cuentapre': '21464', 'igv': 'Ninguno', 'importe': 'Cargo' },
        { 'id': '5', 'cuenta': '21468', 'req': 'Si', 'mult': 'No', 'cuentapre': '21468', 'igv': 'Ninguno', 'importe': 'Abono' }
    ];
    var table = $('#dataTable2').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Req.",
            data: "req"
        }
            , {
            title: "Mult.",
            data: "mult"
        }, {
            title: "Cta. Predeterm.",
            data: "cuentapre"
        }, {
            title: "I.G.V.",
            data: "igv"
        }, {
            title: "Importe",
            data: "importe"
        }]
    });
}
//CONTABILIDAD>CONFIGURACION>ASIENTOS TIPO - FIN

//CONTABILIDAD>CONFIGURACION>CUENTA CORRIENTE - INI
function CCcuentacorrienteCtrl($scope, $state, $timeout) {
    $state.go('index.configuracion_cuentacorriente.inicio');

    var datos = [
        { 'id': '0', 'codigo': '10155987508', 'nombre': 'VIDAL CONDE DE BRAITHWAIT', 'valor': '10', 'ruc': '15598750' },
        { 'id': '1', 'codigo': '20119873542', 'nombre': 'A GENOVESA AGROINDRUSTRIAS S.A.', 'valor': '20', 'ruc': '11987354' },
        { 'id': '2', 'codigo': '20490629409', 'nombre': 'SERVICIOS GENERALES DE TRANSPORTE Y TURISMO', 'valor': '10', 'ruc': '49062940' },
        { 'id': '3', 'codigo': '2079716', 'nombre': 'MIRANDA DE HURTADO LUISA', 'valor': '20', 'ruc': '' },
        { 'id': '4', 'codigo': '2420094', 'nombre': 'LUQUE SAMILLAN FLAVIA', 'valor': '', 'ruc': '' },
        { 'id': '5', 'codigo': '2707555', 'nombre': 'CUNYAS SALOME GLORIA ESPERANZA', 'valor': '', 'ruc': '' },
        { 'id': '6', 'codigo': '9899948', 'nombre': 'GUIRRE BARBA JANNET DEL CARME', 'valor': '', 'ruc': '' },
        { 'id': '7', 'codigo': '000', 'nombre': 'SALIRROSAS CARRANZA BEATRIZ', 'valor': '', 'ruc': '' },
        { 'id': '8', 'codigo': '0000', 'nombre': 'SUCESION INTESTADA CHYECAS VAS', 'valor': '', 'ruc': '' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            "data": "codigo"
        }, {
            title: "Nombre",
            "data": "nombre"
        }
            , {
            title: "",
            "data": "valor"
        }, {
            title: "R.U.C.",
            "data": "ruc"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_cuentacorriente.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_cuentacorriente.inicio');
        });
}
function CCcuentacorrienteinicioCtrl($scope) {
    console.log('');
}
function CCcuentacorrienteeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>CONFIGURACION>CUENTA CORRIENTE - FIN

//CONTABILIDAD>CONFIGURACION>EMPRESA - INI
function CCempresaCtrl($scope, $state, $timeout) {
    $state.go('index.configuracion_empresa.inicio');

    var datos = [
        { 'id': '0', 'codigo': '03', 'nombre': 'AFP Integra S.A.', 'ejercicio': '2019' },
        { 'id': '0', 'codigo': '04', 'nombre': 'IN-CARTADM', 'ejercicio': '2019' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            data: "codigo"
        }, {
            title: "Nombre",
            data: "nombre"
        }
            , {
            title: "Ejercicio",
            data: "ejercicio"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_empresa.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_empresa.inicio');
        });
}
function CCempresainicioCtrl($scope) {
    console.log('');
}
function CCempresaeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>CONFIGURACION>EMPRESA - FIN

//CONTABILIDAD>CONFIGURACION>HISTORICO TIPO CAMBIO - INI
function CChistoricotipocambioCtrl($scope, $state, $timeout) {
    $state.go('index.configuracion_historicotipocambio.inicio');

    var datos = [
        { 'id': '0', 'fecha': '01/05/2019', 'compratc': '3.306', 'ventatc': '3.3120', 'safp': '3.3046', 'venta': '3.3' },
        { 'id': '1', 'fecha': '04/06/2019', 'compratc': '3.406', 'ventatc': '3.1120', 'safp': '3.2046', 'venta': '3.0' },
        { 'id': '2', 'fecha': '08/08/2019', 'compratc': '3.156', 'ventatc': '3.3120', 'safp': '3.3346', 'venta': '3.1' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Fecha",
            data: "fecha"
        }, {
            title: "T/C Comp.Ban",
            data: "compratc"
        }
            , {
            title: "T/C Vent.Ban",
            data: "ventatc"
        }, {
            title: "T/C SAFP",
            data: "safp"
        }
            , {
            title: "Venta SA",
            data: "venta"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_historicotipocambio.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_historicotipocambio.inicio');
        });
}
function CChistoricotipocambioinicioCtrl($scope) {
    console.log('');
}
function CChistoricotipocambioeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>CONFIGURACION>HISTORICO TIPO CAMBIO - FIN

//CONTABILIDAD>CONFIGURACION>LIBROS AUXILIARES - INI
function CClibrosauxiliaresCtrl($scope, $state, $timeout) {
    $state.go('index.configuracion_lisbrosauxiliares.inicio');

    var datos = [
        { 'id': '0', 'codigo': '04', 'descripcion': 'DIARIO (SISTEMA ANTERIOR)' },
        { 'id': '1', 'codigo': 'A1', 'descripcion': 'OPERAC. INTERBAN. CTA. GNRAL' },
        { 'id': '2', 'codigo': 'A2', 'descripcion': 'OPERAC. INTERBAN. CTA. GNRAL DOLARES' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_lisbrosauxiliares.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_lisbrosauxiliares.inicio');
        });
}
function CClibrosauxiliaresinicioCtrl($scope) {
    console.log('');
}
function CClibrosauxiliareseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>CONFIGURACION>LIBROS AUXILIARES - FIN

//CONTABILIDAD>CONFIGURACION>TIPO DE ANALISIS - INI
function CCtipoanalisisCtrl($scope, $state, $timeout, CONTABILIDAD_CONFIGURACION) {
    $state.go('index.configuracion_tipoanalisis.inicio');

    CONTABILIDAD_CONFIGURACION.gettipoanalisis().then((res) => {
        var table = $('#dataTable1').DataTable({
            responsive: true,
            select: true,
            language: {
                url: '../../assets/js/es.json'
            },
            data: res.data,
            columns: [{
                title: "Código",
                data: "codigo"
            }, {
                title: "Nombre",
                data: "descripcion"
            }]
        });

        table
            .on('select', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                $state.go('index.configuracion_tipoanalisis.editar', {
                    tipoanalisis: rowData[0]
                });
            })
            .on('deselect', function (e, dt, type, indexes) {
                var rowData = table.rows(indexes).data().toArray();
                $scope.empresa = {};
            });
    });
}
function CCtipoanalisisinicioCtrl($scope) {
    console.log('');
}
function CCtipoanalisiseditCtrl($scope, $stateParams, $state, CONTABILIDAD_CONFIGURACION) {
    $scope.sololectura = true;
    $scope.mostrarnuevo = true;
    $scope.mostrargrabar = false;
    $scope.mostrareditar = true;
    $scope.tipoanalisis = {};
    if ($stateParams.tipoanalisis) {
        $scope.tipoanalisis = $stateParams.tipoanalisis;
    }
    $scope.editar = () => {
        $scope.sololectura = false;
        $scope.mostrargrabar = true;
        $scope.mostrareditar = false;
    }
    $scope.nuevo = () => {
        $scope.tipoanalisis = {};
        $scope.sololectura = false;
        $scope.mostrarnuevo = false;
    }
    $scope.grabarnuevo = () => {
        CONTABILIDAD_CONFIGURACION.inserttipoanalisis($scope.tipoanalisis).then((res) => {
            alert(res.show);
        });
    }
    $scope.grabar = () => {
        CONTABILIDAD_CONFIGURACION.updatetipoanalisis($scope.tipoanalisis).then((res) => {
            alert(res.show);
        });
    }
    $scope.cancelar = () => {
        $state.go('index.configuracion_tipoanalisis.inicio');
    }
}
//CONTABILIDAD>CONFIGURACION>TIPO DE ANALISIS - FIN

//CONTABILIDAD>CONFIGURACION>TIPO DE DOCUMENTOS - INI
function CCtipodocumentosCtrl($scope, $state, $timeout) {
    $state.go('index.configuracion_tipodocumentos.inicio');

    var datos = [
        { 'id': '0', 'codigo': '01', 'descripcion': 'FACTURA' },
        { 'id': '1', 'codigo': '02', 'descripcion': 'RECIBO POR HONORARIOS' },
        { 'id': '2', 'codigo': '03', 'descripcion': 'BOLETA DE VENTA' },
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            "data": "codigo"
        }, {
            title: "Descripción",
            "data": "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_tipodocumentos.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_tipodocumentos.inicio');
        });
}
function CCtipodocumentosinicioCtrl($scope) {
    console.log('');
}
function CCtipodocumentoseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>CONFIGURACION>TIPO DE DOCUMENTOS - FIN

//CONTABILIDAD>CONTROL>ANALISIS DE CUENTAS - INI
function CCanalisiscuentasCtrl($scope, $state, $timeout) {
    $state.go('index.control_analisiscuentas.inicio');

    var datos = [
        { 'id': '0', 'cuenta': '21469915', 'descripcion': 'Pensión definitiva', 'moneda': 'Soles' },
        { 'id': '1', 'cuenta': '21469916', 'descripcion': 'Pensión vitalicia familiar', 'moneda': 'Soles' },
        { 'id': '2', 'cuenta': '21469917', 'descripcion': 'Gastos de sepelio', 'moneda': 'Soles' }
    ];

    $scope.tab_active = 0;
    $scope.tabs = [
        { id: 0, ico: 'fas fa-chart-area', titulo: 'Análisis de movimientos de cuentas' },
        { id: 1, ico: 'far fa-chart-bar', titulo: 'Análisis de saldos de cuentas' },
        { id: 2, ico: 'fas fa-chart-line', titulo: 'Análisis de presupuestos de cuentas' }
    ];
    $scope.tab_select = (x) => {
        $scope.tab_active = x.id;
    }

    var table = $('#dataTable1').DataTable({
        dom: 'Bfrtip',
        buttons: [{
            text: '<i class="fas fa-sync"></i>',
            action: function (e, dt, node, config) {

            }
        }, {
            extend: 'excelHtml5',
            text: '<i class="fas fa-file-excel"></i>'
        }, {
            extend: 'pdfHtml5',
            text: 'Exp.Pdf'
        }],
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Moneda",
            data: "moneda"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            //3opciones
            switch ($scope.tab_active) {
                case 0:
                    {
                        $timeout(function () {
                            $state.go('index.control_analisiscuentas.editar0', {
                                data: rowData[0]
                            });
                        });
                        break;
                    }
                case 1:
                    {
                        $timeout(function () {
                            $state.go('index.control_analisiscuentas.editar1', {
                                data: rowData[0]
                            });
                        });
                        break;
                    }
                case 2:
                    {
                        $timeout(function () {
                            $state.go('index.control_analisiscuentas.editar2', {
                                data: rowData[0]
                            });
                        });
                        break;
                    }
                default:
            }
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.control_analisiscuentas.inicio');
        });
    $scope.tab_select({ id: 0, ico: 'fas fa-chart-area' });
}
function CCanalisiscuentasinicioCtrl($scope) {
    console.log('');
}
function CCanalisiscuentasedit0Ctrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
function CCanalisiscuentasedit1Ctrl($scope, $stateParams) {
    $scope.obj = {};
    $scope.tab_active = 0;
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }

    $scope.tab_select = (x) => {
        $scope.tab_active = x.id;
    }

    var datos = [
        { 'id': '0', 'periodo': '05', 'libro': 'AD', 'voucher': '00010', 'td': '18', 'doc': '20190425', 'fdoc': '01/05/2019', 'cta': '333333', 'nombre': 'PLANIFICADO', 'cargo_s': '1954434.59', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' },
        { 'id': '1', 'periodo': '05', 'libro': 'B4', 'voucher': '00002', 'td': '18', 'doc': '201900506', 'fdoc': '06/05/2019', 'cta': '05322750', 'nombre': 'OLAYA', 'cargo_s': '148526.41', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' },
        { 'id': '2', 'periodo': '05', 'libro': 'CC', 'voucher': '00001', 'td': '18', 'doc': '201901116', 'fdoc': '02/05/2019', 'cta': '095007847', 'nombre': 'SUCEL', 'cargo_s': '53925.95', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' }
    ];

    $scope.tabs = [
        { id: 0, ico: 'fas fa-chart-area', titulo: 'Análisis de movimientos del mes' },
        { id: 1, ico: 'far fa-chart-bar', titulo: 'Análisis de movimientos acumulados al mes' }
    ];

    var table = $('#dataTable2').DataTable({
        dom: 'Bfrtip',
        scrollY: 300,
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 3,
            rightColumns: 4
        },
        buttons: [{
            text: '<i class="fas fa-sync"></i>',
            action: function (e, dt, node, config) {

            }
        }, {
            extend: 'excelHtml5',
            text: '<i class="fas fa-file-excel"></i>'
        }, {
            extend: 'pdfHtml5',
            text: 'Exp.Pdf'
        }],
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Per.",
            data: "periodo"
        }, {
            title: "Libro",
            data: "libro"
        }
            , {
            title: "Voucher",
            data: "voucher"
        }
            , {
            title: "T/D",
            data: "td"
        }
            , {
            title: "No. Doc.",
            data: "doc"
        }
            , {
            title: "Fec. Doc.",
            data: "fdoc"
        }
            , {
            title: "Cta. Cte.",
            data: "cta"
        }
            , {
            title: "Nombre",
            data: "nombre"
        }
            , {
            title: "Cargo S/.",
            data: "cargo_s"
        }
            , {
            title: "Abono S/.",
            data: "abono_s"
        }
            , {
            title: "Cargo US$",
            data: "cargo_d"
        }
            , {
            title: "Abono US$",
            data: "abono_d"
        }]
    });
}
function CCanalisiscuentasedit2Ctrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
    var datos = [
        { 'id': '0', 'periodo': 'Apertura', 'cargo_mes_s': '675708.11', 'abono_mes_s': '0.00', 'saldo_mes_s': '675708.11', 'acum_mes_s': '675708.11', 'cargo_mes_d': '675708.11', 'abono_mes_d': '0.00', 'saldo_mes_d': '675708.11', 'acum_mes_d': '675708.11' },
        { 'id': '1', 'periodo': 'Enero', 'cargo_mes_s': '1871.79', 'abono_mes_s': '7827157.11', 'saldo_mes_s': '-7825285.32', 'acum_mes_s': '-7149577.21', 'cargo_mes_d': '675708.11', 'abono_mes_d': '0.00', 'saldo_mes_d': '675708.11', 'acum_mes_d': '675708.11' },
        { 'id': '2', 'periodo': 'Febrero', 'cargo_mes_s': '3695.48', 'abono_mes_s': '7870309.20', 'saldo_mes_s': '-7825285.32', 'acum_mes_s': '-7149577.21', 'cargo_mes_d': '675708.11', 'abono_mes_d': '0.00', 'saldo_mes_d': '675708.11', 'acum_mes_d': '675708.11' },
        { 'id': '2', 'periodo': 'Marzo', 'cargo_mes_s': '33732.51', 'abono_mes_s': '7709577.21', 'saldo_mes_s': '-7825285.32', 'acum_mes_s': '-7149577.21', 'cargo_mes_d': '675708.11', 'abono_mes_d': '0.00', 'saldo_mes_d': '675708.11', 'acum_mes_d': '675708.11' },
        { 'id': '2', 'periodo': 'Abril', 'cargo_mes_s': '5052.02', 'abono_mes_s': '7739331.32', 'saldo_mes_s': '-7825285.32', 'acum_mes_s': '-7149577.21', 'cargo_mes_d': '675708.11', 'abono_mes_d': '0.00', 'saldo_mes_d': '675708.11', 'acum_mes_d': '675708.11' }
    ];
    var table = $('#dataTable2').DataTable({
        dom: 'Bfrtip',
        scrollY: 300,
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 1,
            rightColumns: 4
        },
        buttons: [{
            text: '<i class="fas fa-sync"></i>',
            action: function (e, dt, node, config) {

            }
        }, {
            extend: 'excelHtml5',
            text: '<i class="fas fa-file-excel"></i>'
        }, {
            extend: 'pdfHtml5',
            text: 'Exp.Pdf'
        }],
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        headerCallback: function (nHead, aData, iStart, iEnd, aiDisplay) {
            nHead.childNodes[1].style.backgroundColor = "blue";
            nHead.childNodes[1].style.color = "white";
            nHead.childNodes[2].style.backgroundColor = "blue";
            nHead.childNodes[2].style.color = "white";
            nHead.childNodes[3].style.backgroundColor = "blue";
            nHead.childNodes[3].style.color = "white";
            nHead.childNodes[4].style.backgroundColor = "blue";
            nHead.childNodes[4].style.color = "white";

            nHead.childNodes[5].style.backgroundColor = "green";
            nHead.childNodes[5].style.color = "white";
            nHead.childNodes[6].style.backgroundColor = "green";
            nHead.childNodes[6].style.color = "white";
            nHead.childNodes[7].style.backgroundColor = "green";
            nHead.childNodes[7].style.color = "white";
            nHead.childNodes[8].style.backgroundColor = "green";
            nHead.childNodes[8].style.color = "white";
        },
        columns: [{
            title: "Periodo",
            data: "periodo"
        }, {
            title: "Cargo del Mes",
            data: "cargo_mes_s"
        }
            , {
            title: "Abono del Mes",
            data: "abono_mes_s"
        }
            , {
            title: "Saldo del Mes",
            data: "saldo_mes_s"
        }
            , {
            title: "Acum. al Mes",
            data: "acum_mes_s"
        }
            , {
            title: "Cargo del Mes",
            data: "cargo_mes_d"
        }
            , {
            title: "Abono del Mes",
            data: "abono_mes_d"
        }
            , {
            title: "Saldo del Mes",
            data: "saldo_mes_d"
        }
            , {
            title: "Acum. al Mes",
            data: "acum_mes_d"
        }]
    });
}
//CONTABILIDAD>CONTROL>ANALISIS DE CUENTAS - FIN

//CONTABILIDAD>OPERACIONAL>DIFERENCIA POR TIPO DE CAMBIO - INI
function COajustediferenciacambioCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_ajustediferenciacambio.editar');

    var datos = [
        { 'id': '0', 'cuenta': '22492', 'descripcion': 'Pasivo por participacion de los trabajadores' },
        { 'id': '1', 'cuenta': '121041135', 'descripcion': 'Banco Scotiabank Responsabilidad social ME' },
        { 'id': '2', 'cuenta': '121041111', 'descripcion': 'Banco de Credito del peru cuenta general' },
        { 'id': '3', 'cuenta': '121041119', 'descripcion': 'Banco de credito del peru prestaciones' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            "data": "cuenta"
        }, {
            title: "Descripción",
            "data": "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.operacional_ajustediferenciacambio.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_ajustediferenciacambio.inicio');
        });
}
function CCajustediferenciacambioinicioCtrl($scope) {
    console.log('');
}
function CCajustediferenciacambioeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>DIFERENCIA POR TIPO DE CAMBIO - FIN

//CONTABILIDAD>OPERACIONAL>CONSULTA VOUCHER - INI
function COconsultavoucherCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_consultavoucher.editar');
    $scope.filtros = () => {
        $state.go('index.operacional_consultavoucher.editar');
    }
}
function COconsultavoucherinicioCtrl($scope) {
    console.log('');
}
function COconsultavouchereditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }

    var dataReferencias = [
        { 'id': '0', 'codigo': 'A.D.', 'descripcion': 'ACTA DE DIRECTORIO' },
        { 'id': '1', 'codigo': 'A.A.', 'descripcion': 'ACTA DE JUNTA GRAL ACC' },
        { 'id': '2', 'codigo': 'A.P.', 'descripcion': 'ASIENTO DE APERTURA' },
        { 'id': '3', 'codigo': 'A.C.', 'descripcion': 'ASIENTO DE CIERRE' }
    ];
    var dataCuentas = [
        { 'id': '0', 'cuenta': '10', 'descripcion': 'ACTIVO' },
        { 'id': '1', 'cuenta': '1010', 'descripcion': 'CAJA Y BANCOS' },
        { 'id': '2', 'cuenta': '10101', 'descripcion': 'Caja' }
    ];
    var dataComprobantes = [
        { 'id': '0', 'libro': 'A2', 'voucher': '00001', 'fecha': '02/05/2019', 'descripcion': 'DEV. PENSIONES DE FALLECIDOS' },
        { 'id': '1', 'libro': 'A4', 'voucher': '00001', 'fecha': 'ACTIVO', 'descripcion': 'ANULACION POR NOMBRE INCOMPLETO' },
        { 'id': '2', 'libro': 'AD', 'voucher': '00002', 'fecha': 'ACTIVO', 'descripcion': 'COMPENSACION DE CUENTAS' }
    ];
    var dataLibros = [
        { 'id': '0', 'codigo': 'AC', 'descripcion': 'ACREDITACION' },
        { 'id': '1', 'codigo': 'AL', 'descripcion': 'ALMACEN' },
        { 'id': '2', 'codigo': 'AD', 'descripcion': 'ASIENTO DIARIO' }
    ];

    $scope.tabla = (x) => {
        switch (x) {
            case 1:
                {
                    $('#dtreferencias').DataTable({
                        destroy: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: dataReferencias,
                        columns: [{
                            title: "Codigo",
                            "data": "codigo"
                        }, {
                            title: "Descripción",
                            "data": "descripcion"
                        }]
                    });
                    break;
                }
            case 2:
                {
                    $('#dtcuentas').DataTable({
                        destroy: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: dataCuentas,
                        columns: [{
                            title: "Cuenta",
                            "data": "cuenta"
                        }, {
                            title: "Descripción",
                            "data": "descripcion"
                        }]
                    });
                    break;
                }
            case 3:
                {
                    $('#dtcomprobantes').DataTable({
                        destroy: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: dataComprobantes,
                        columns: [{
                            title: "Libro",
                            data: "libro"
                        }, {
                            title: "Voucher",
                            data: "voucher"
                        }
                            , {
                            title: "Fecha",
                            data: "fecha"
                        }, {
                            title: "Descripción",
                            data: "descripcion"
                        }]
                    });
                    break;
                }
            case 4:
                {
                    $('#dtlibros').DataTable({
                        destroy: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: dataLibros,
                        columns: [{
                            title: "Codigo",
                            "data": "codigo"
                        }, {
                            title: "Descripción",
                            "data": "descripcion"
                        }]
                    });
                    break;
                }
            default:
        }
    }

}
//CONTABILIDAD>OPERACIONAL>CONSULTA VOUCHER - FIN

//CONTABILIDAD>OPERACIONAL>GENERACION DE FORMATOS SUCAVE - INI
function COgeneracionformatosucaveCtrl($scope, $state, $timeout, $uibModal) {
    $state.go('index.operacional_formatossucave.inicio');

    var datos = [
        { 'id': '0', 'periodo': '200601', 'fecha': '08/02/2006 13:18:43', 'enviado': 'N', 'fecha_envio': '' },
        { 'id': '1', 'periodo': '200602', 'fecha': '06/02/2006 21:18:43', 'enviado': 'N', 'fecha_envio': '' },
        { 'id': '2', 'periodo': '200603', 'fecha': '10/07/2006 17:18:43', 'enviado': 'N', 'fecha_envio': '' }
    ];

    $scope.generar = () => {
        var modalGenerar = $uibModal.open({
            animation: true,
            backdrop: false,
            size: 'lg',
            templateUrl: 'src/views/contabilidad/operacional/formatossucave/modalGenerar.htm',
            controller: ($scope, $uibModalInstance, data) => {
                $scope.cerrar = () => {
                    $uibModalInstance.close();
                }
                $scope.aceptar = () => {
                    $uibModalInstance.close(data);
                }
            },
            resolve: {
                data: function () {
                    return {};
                }
            }
        });

        modalGenerar.result.then(function (f) {
            console.log('');
        });
    };

    $scope.mantenimiento = () => {
        var modalMantenimiento = $uibModal.open({
            animation: true,
            backdrop: false,
            size: 'lg',
            templateUrl: 'src/views/contabilidad/operacional/formatossucave/modalMantenimiento.htm',
            controller: ($scope, $uibModalInstance, data) => {
                $scope.cerrar = () => {
                    $uibModalInstance.close();
                }
                $scope.aceptar = () => {
                    $uibModalInstance.close(data);
                }
            },
            resolve: {
                data: function () {
                    return {};
                }
            }
        });

        modalMantenimiento.result.then(function (f) {
            console.log('');
        });
    };

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Periodo",
            "data": "periodo"
        }, {
            title: "Fecha Proceso",
            "data": "fecha"
        }
            , {
            title: "Enviado",
            "data": "enviado"
        }, {
            title: "Fecha de envio",
            "data": "fecha_envio"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.operacional_formatossucave.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_formatossucave.inicio');
        });
}
function COgeneracionformatosucaveinicioCtrl($scope) {
    console.log('');
}
function COgeneracionformatosucaveeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
    var datos = [
        { 'id': '0', 'periodo': '200601', 'cuenta': '10', 'saldo_final': '192490260.62', 'saldo_inicial': '200152.20', 'debe': '400125.20', 'haber': '120320.00', 'tip_cuenta': 'D', 'procesado': 'F' },
        { 'id': '1', 'periodo': '200602', 'cuenta': '1010', 'saldo_final': '20272670.20', 'saldo_inicial': '', '125236.20': '', 'debe': '521136.20', 'haber': '125425.20', 'tip_cuenta': 'D', 'procesado': 'F' },
        { 'id': '2', 'periodo': '200603', 'cuenta': '10104', 'saldo_final': '13033530.95', 'saldo_inicial': '', '412253.20': '', 'debe': '4521523.00', 'haber': '365236.20', 'tip_cuenta': 'D', 'procesado': 'F' }
    ];

    var table = $('#dataTable2').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Periodo",
            "data": "periodo"
        }, {
            title: "Cuenta",
            "data": "cuenta"
        }
            , {
            title: "Saldo Final",
            "data": "saldo_final"
        }, {
            title: "Saldo Inicial",
            "data": "saldo_inicial"
        }, {
            title: "Debe",
            "data": "debe"
        }, {
            title: "Haber",
            "data": "haber"
        }, {
            title: "Tipo de Cuenta",
            "data": "tip_cuenta"
        }, {
            title: "Procesado",
            "data": "procesado"
        }]
    });
}
//CONTABILIDAD>OPERACIONAL>GENERACION DE FORMATOS SUCAVE - FIN

//CONTABILIDAD>OPERACIONAL>INTERFACE GENERACION TXT - INI
function COgeneraciontxtCtrl($scope, $state, $timeout) {
    //$state.go('index.control_analisiscuentas.inicio');

    var datos = [
        { 'id': '0', 'codigo': '10155987508', 'nombre': 'VIDAL CONDE DE BRAITHWAIT', 'valor': '10', 'ruc': '15598750' },
        { 'id': '1', 'codigo': '20119873542', 'nombre': 'A GENOVESA AGROINDRUSTRIAS S.A.', 'valor': '20', 'ruc': '11987354' },
        { 'id': '2', 'codigo': '20490629409', 'nombre': 'SERVICIOS GENERALES DE TRANSPORTE Y TURISMO', 'valor': '10', 'ruc': '49062940' },
        { 'id': '3', 'codigo': '2079716', 'nombre': 'MIRANDA DE HURTADO LUISA', 'valor': '20', 'ruc': '' },
        { 'id': '4', 'codigo': '2420094', 'nombre': 'LUQUE SAMILLAN FLAVIA', 'valor': '', 'ruc': '' },
        { 'id': '5', 'codigo': '2707555', 'nombre': 'CUNYAS SALOME GLORIA ESPERANZA', 'valor': '', 'ruc': '' },
        { 'id': '6', 'codigo': '9899948', 'nombre': 'GUIRRE BARBA JANNET DEL CARME', 'valor': '', 'ruc': '' },
        { 'id': '7', 'codigo': '000', 'nombre': 'SALIRROSAS CARRANZA BEATRIZ', 'valor': '', 'ruc': '' },
        { 'id': '8', 'codigo': '0000', 'nombre': 'SUCESION INTESTADA CHYECAS VAS', 'valor': '', 'ruc': '' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            "data": "codigo"
        }, {
            title: "Nombre",
            "data": "nombre"
        }
            , {
            title: "",
            "data": "valor"
        }, {
            title: "R.U.C.",
            "data": "ruc"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_cuentacorriente.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_cuentacorriente.inicio');
        });
}
function COgeneraciontxtinicioCtrl($scope) {
    console.log('');
}
function COgeneraciontxteditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>INTERFACE GENERACION TXT - FIN

//CONTABILIDAD>OPERACIONAL>INTERFACE MANTENIMIENTO PLANTILLA - INI
function COmantenimientoplantillaCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_mantplantillas.inicio');

    $scope.mostrarPlantilla = false;
    $scope.mostrarReferencia = false;

    $scope.tab_active = 0;
    $scope.tabs = [
        { id: 0, ico: 'fas fa-edit' },
        { id: 1, ico: 'fas fa-chart-area' },
        { id: 2, ico: 'far fa-chart-bar' }
    ];
    $scope.tab_select = (x) => {
        $scope.tab_active = x.id;
    }

    var datosPlantillas = [
        { 'id': '0', 'codigo': '0010', 'descripcion': 'Cargo a rezagos - AFP' },
        { 'id': '1', 'codigo': '0020', 'descripcion': 'Acreditación de recaudo AFP' },
        { 'id': '2', 'codigo': '0021', 'descripcion': 'Plantilla DPE - AFP' }
    ];
    var datosReferencias = [
        { 'id': '0', 'codigo': '00101', 'descripcion': 'Comisión fija M.N.', 'tipo': '0' },
        { 'id': '1', 'codigo': '00102', 'descripcion': 'Comisión porcentual M.N.', 'tipo': '0' },
        { 'id': '2', 'codigo': '00103', 'descripcion': 'Impuesto general a las ventas (I.G.V.)', 'tipo': '0' }
    ];

    var table0, table1 = {};

    $scope.submenu = (x) => {
        if (x === 0) {
            $scope.mostrarPlantilla = true;
            $scope.mostrarReferencia = false;
            table0 = $('#dataTable0').DataTable({
                destroy: true,
                select: true,
                language: {
                    url: '../../assets/js/es.json'
                },
                data: datosPlantillas,
                columns: [{
                    title: "Código",
                    data: "codigo"
                }, {
                    title: "Descripción",
                    data: "descripcion"
                }]
            });

            table0
                .on('select', function (e, dt, type, indexes) {
                    var rowData = table0.rows(indexes).data().toArray();
                    $timeout(function () {
                        if ($scope.tab_active === 1)
                            $state.go('index.operacional_mantplantillas.editarcolumnas', {
                                data: rowData[0]
                            });
                        else if ($scope.tab_active === 2)
                            $state.go('index.operacional_mantplantillas.editarcuentas', {
                                data: rowData[0]
                            });
                        else
                            $state.go('index.operacional_mantplantillas.editar', {
                                data: rowData[0]
                            });
                    });
                })
                .on('deselect', function (e, dt, type, indexes) {
                    var rowData = table0.rows(indexes).data().toArray();
                    $state.go('index.operacional_mantplantillas.inicio');
                });
        } else if (x === 1) {
            $scope.mostrarPlantilla = false;
            $scope.mostrarReferencia = true;
            table1 = $('#dataTable1').DataTable({
                destroy: true,
                select: true,
                language: {
                    url: '../../assets/js/es.json'
                },
                data: datosReferencias,
                columns: [{
                    title: "Código",
                    data: "codigo"
                }, {
                    title: "Descripción",
                    data: "descripcion"
                }
                    , {
                    title: "Tipo",
                    data: "tipo"
                }]
            });

            table1
                .on('select', function (e, dt, type, indexes) {
                    var rowData = table1.rows(indexes).data().toArray();
                    $timeout(function () {
                        $state.go('index.operacional_mantplantillas.editarreferencias', {
                            data: rowData[0]
                        });
                    });
                })
                .on('deselect', function (e, dt, type, indexes) {
                    var rowData = table1.rows(indexes).data().toArray();
                    $state.go('index.operacional_mantplantillas.inicio');
                });
        } else {
            $scope.mensaje = 'Seleccione una opcion';
        }
    }
}
function COmantenimientoplantillainicioCtrl($scope) {
    console.log('');
}
function COmantenimientoplantillaeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
function COmantenimientoplantillaeditcolumnasCtrl($scope, $stateParams, $timeout, $state) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
    var datos = [
        { 'id': '0', 'pas': '7016', 'codigo': '00101', 'descripcion': 'Comisión fija M.N.' },
        { 'id': '0', 'pas': '7020', 'codigo': '00102', 'descripcion': 'Comisión porcentual M.N.' },
        { 'id': '0', 'pas': '4011', 'codigo': '00103', 'descripcion': 'Impuesto general a las ventas (IGV)' }
    ];

    var table = $('#dataTable').DataTable({
        destroy: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Pas",
            data: "pas"
        }, {
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
        ]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        });

}
function COmantenimientoplantillaeditcuentasCtrl($scope, $stateParams, $timeout, $state) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }

    var datos = [
        { 'id': '0', 'cta': '21463', 'descripcion': 'Contribucion de solidaridad a ESALUD', 'tipo': 'cargo', 'org': 'D', 'importe': '4', 'org2': 'D', 'importemoneda': '4' },
        { 'id': '0', 'cta': '21464', 'descripcion': 'Transferencias por pagar a las compañias', 'tipo': 'cargo', 'org': 'D', 'importe': '5', 'org2': 'D', 'importemoneda': '5' },
        { 'id': '0', 'cta': '21465', 'descripcion': 'Recaudación por clasificar', 'tipo': 'abono', 'org': 'D', 'importe': '6', 'org2': 'D', 'importemoneda': '6' }
    ];

    var table = $('#dataTable').DataTable({
        destroy: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            data: "cta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }, {
            title: "Tipo",
            data: "tipo"
        }, {
            title: "Org.",
            data: "org"
        }, {
            title: "Importe",
            data: "importe"
        }, {
            title: "Org.",
            data: "org2"
        }, {
            title: "Imp. otra Moneda",
            data: "importemoneda"
        }
        ]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table0.rows(indexes).data().toArray();
            $timeout(function () {
                if ($scope.tab_active === 1)
                    $state.go('index.operacional_mantplantillas.editarcolumnas', {
                        data: rowData[0]
                    });
                else if ($scope.tab_active === 2)
                    $state.go('index.operacional_mantplantillas.editarcuentas', {
                        data: rowData[0]
                    });
                else
                    $state.go('index.operacional_mantplantillas.editar', {
                        data: rowData[0]
                    });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_mantplantillas.inicio');
        });
}
function COmantenimientoplantillaeditreferenciasCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>INTERFACE MANTENIMIENTO PLANTILLA - FIN

//CONTABILIDAD>OPERACIONAL>LIBRO BANCOS - INI
function COlibrobancosCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_librobancos.inicio');

    var datos = [
        { 'id': '0', 'cuenta': '11104111', 'descripcion': 'Banco de Credito del Perú Cuenta General', 'moneda': 'Soles' },
        { 'id': '0', 'cuenta': '11104112', 'descripcion': 'Banco de Credito del Perú Aportes', 'moneda': 'Soles' },
        { 'id': '0', 'cuenta': '11104113', 'descripcion': 'Banco de Credito del Perú Prestaciones', 'moneda': 'Soles' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Moneda",
            data: "moneda"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_cuentacorriente.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_librobancos.inicio');
        });
}
function COlibrobancosinicioCtrl($scope) {
    console.log('');
}
function COlibrobancoseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>LIBRO BANCOS - FIN

//CONTABILIDAD>OPERACIONAL>LIBRO CAJA - INI
function COlibrocajaCtrl($scope, $state, $timeout) {
    //$state.go('index.control_analisiscuentas.inicio');

    var datos = [
        { 'id': '0', 'codigo': '10155987508', 'nombre': 'VIDAL CONDE DE BRAITHWAIT', 'valor': '10', 'ruc': '15598750' },
        { 'id': '1', 'codigo': '20119873542', 'nombre': 'A GENOVESA AGROINDRUSTRIAS S.A.', 'valor': '20', 'ruc': '11987354' },
        { 'id': '2', 'codigo': '20490629409', 'nombre': 'SERVICIOS GENERALES DE TRANSPORTE Y TURISMO', 'valor': '10', 'ruc': '49062940' },
        { 'id': '3', 'codigo': '2079716', 'nombre': 'MIRANDA DE HURTADO LUISA', 'valor': '20', 'ruc': '' },
        { 'id': '4', 'codigo': '2420094', 'nombre': 'LUQUE SAMILLAN FLAVIA', 'valor': '', 'ruc': '' },
        { 'id': '5', 'codigo': '2707555', 'nombre': 'CUNYAS SALOME GLORIA ESPERANZA', 'valor': '', 'ruc': '' },
        { 'id': '6', 'codigo': '9899948', 'nombre': 'GUIRRE BARBA JANNET DEL CARME', 'valor': '', 'ruc': '' },
        { 'id': '7', 'codigo': '000', 'nombre': 'SALIRROSAS CARRANZA BEATRIZ', 'valor': '', 'ruc': '' },
        { 'id': '8', 'codigo': '0000', 'nombre': 'SUCESION INTESTADA CHYECAS VAS', 'valor': '', 'ruc': '' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            "data": "codigo"
        }, {
            title: "Nombre",
            "data": "nombre"
        }
            , {
            title: "",
            "data": "valor"
        }, {
            title: "R.U.C.",
            "data": "ruc"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_cuentacorriente.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_cuentacorriente.inicio');
        });
}
function COlibrocajainicioCtrl($scope) {
    console.log('');
}
function COlibrocajaeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>LIBRO CAJA - FIN

//CONTABILIDAD>OPERACIONAL>LIBRO MAYOR - INI
function COlibromayorCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_libromayor.inicio');

    var dataTab0 = [
        { 'id': '0', 'cuenta': '111041111', 'descripcion': 'Banco de Credito del Perú Cuenta General', 'moneda': 'Soles' },
        { 'id': '1', 'cuenta': '111041112', 'descripcion': 'Banco de Credito del Perú Aportes', 'moneda': 'Soles' },
        { 'id': '2', 'cuenta': '111041113', 'descripcion': 'Banco de Credito del Perú Prestaciones', 'moneda': 'Soles' }
    ];
    var dataTab1 = [
        { 'id': '0', 'cuenta': '10', 'descripcion': 'ACTIVO', 'moneda': '' },
        { 'id': '1', 'cuenta': '11', 'descripcion': 'PASIVO', 'moneda': 'Soles' },
        { 'id': '2', 'cuenta': '12', 'descripcion': 'PATRIMONIO', 'moneda': '10' }
    ];

    $scope.tabla = (x) => {
        if (x === 0) {
            var table0 = $('#dataTable1').DataTable({
                destroy: true,
                select: true,
                language: {
                    url: '../../assets/js/es.json'
                },
                data: dataTab0,
                columns: [{
                    title: "Cuenta",
                    data: "cuenta"
                }, {
                    title: "Descripción",
                    data: "descripcion"
                }
                    , {
                    title: "Moneda",
                    data: "moneda"
                }]
            });

            table0
                .on('select', function (e, dt, type, indexes) {
                    var rowData = table0.rows(indexes).data().toArray();
                })
                .on('deselect', function (e, dt, type, indexes) {
                    var rowData = table0.rows(indexes).data().toArray();
                });
        } else if (x === 1) {
            var table1 = $('#dataTable2').DataTable({
                destroy: true,
                select: true,
                language: {
                    url: '../../assets/js/es.json'
                },
                data: dataTab1,
                columns: [{
                    title: "Cuenta",
                    data: "cuenta"
                }, {
                    title: "Descripción",
                    data: "descripcion"
                }
                    , {
                    title: "Moneda",
                    data: "moneda"
                }]
            });

            table1
                .on('select', function (e, dt, type, indexes) {
                    var rowData = table1.rows(indexes).data().toArray();
                })
                .on('deselect', function (e, dt, type, indexes) {
                    var rowData = table1.rows(indexes).data().toArray();
                });
        } else {

        }
    }

}
function COlibromayorinicioCtrl($scope) {
    console.log('');
}
function COlibromayoreditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>LIBRO MAYOR - FIN

//CONTABILIDAD>OPERACIONAL>PLAN DE CUENTAS - INI
function COplancuentasCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_plancuentas.inicio');

    var datos = [
        { 'id': '0', 'cuenta': '10', 'descripcion': 'ACTIVO', 'moneda': '' },
        { 'id': '1', 'cuenta': '1010', 'descripcion': 'CAJA Y BANCOS', 'moneda': 'Soles' },
        { 'id': '2', 'cuenta': '10101', 'descripcion': 'Caja', 'moneda': 'C' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Moneda",
            data: "moneda"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.operacional_plancuentas.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_plancuentas.inicio');
        });
}
function COplancuentasinicioCtrl($scope) {
    console.log('');
}
function COplancuentaseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>OPERACIONAL>PLAN DE CUENTAS - FIN

//CONTABILIDAD>OPERACIONAL>REGISTRO DE ASIENTOS TIPO - INI
function COasientostipoCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_asientostipo.inicio');

    var datos = [
        { 'id': '0', 'tipo': 'ACREDITACION', 'libro': 'AC', 'voucher': '2019062', 'fecha': '18/06/2019', 'descripcion': 'Ok', 'ok': '' },
        { 'id': '0', 'tipo': 'ADELANTO SERVICIOS', 'libro': 'AC', 'voucher': '2019062', 'fecha': '18/06/2019', 'descripcion': 'Ok', 'ok': '' },
        { 'id': '0', 'tipo': 'ACTIVO FIJO', 'libro': 'AC', 'voucher': '2019062', 'fecha': '18/06/2019', 'descripcion': 'Ok', 'ok': '' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Asie. Tipo",
            data: "tipo"
        }, {
            title: "Libro",
            data: "libro"
        }
            , {
            title: "Voucher",
            data: "voucher"
        }, {
            title: "Fecha",
            data: "fecha"
        }
            , {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Ok",
            data: "ok"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.operacional_asientostipo.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_asientostipo.inicio');
        });
}
function COasientostipoinicioCtrl($scope) {
    console.log('');
}
function COasientostipoeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
    var datos = [
        { 'id': '0', 'tipo': '', 'cuenta': '21468', 'cc': '', 'cg': '', 'cta': 'Ok', 'tc': '3.3430', 'cargo_s': '0.00', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' },
        { 'id': '1', 'tipo': '', 'cuenta': '51701', 'cc': '', 'cg': '1010', 'cta': 'Ok', 'tc': '3.3390', 'cargo_s': '0.00', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' },
        { 'id': '2', 'tipo': '', 'cuenta': '21468', 'cc': '', 'cg': '1000', 'cta': 'Ok', 'tc': '3.3390', 'cargo_s': '0.00', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' }
    ];

    var table = $('#dataTable2').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Tip.",
            data: "tipo"
        }, {
            title: "Cuenta",
            data: "cuenta"
        }
            , {
            title: "Cen. Cos.",
            data: "cc"
        }, {
            title: "Cen. Ges.",
            data: "cg"
        }
            , {
            title: "Cta. Cte.",
            data: "cta"
        }
            , {
            title: "T/C",
            data: "tc"
        }
            , {
            title: "Cargo S/.",
            data: "cargo_s"
        }
            , {
            title: "Abono S/.",
            data: "abono_s"
        }
            , {
            title: "Cargo US$",
            data: "cargo_d"
        }
            , {
            title: "Abono US$",
            data: "abono_d"
        }
        ]
    });
}
//CONTABILIDAD>OPERACIONAL>REGISTRO DE ASIENTOS TIPO - FIN

//CONTABILIDAD>OPERACIONAL>REGISTRO DE VOUCHER - INI
function COrvoucherCtrl($scope, $state, $timeout) {
    $state.go('index.operacional_rvoucher.inicio');

    var datos = [
        { 'id': '0', 'libro': 'A2', 'voucher': '00001', 'fecha': '02/05/2019', 'descripcion': 'DEV. PENSIONES DE FALLECIDOS - RENTAS VITALICIAS' },
        { 'id': '0', 'libro': 'A3', 'voucher': '00002', 'fecha': '04/07/2019', 'descripcion': 'ANULACION POR NOMBRE INCOMPLETO' },
        { 'id': '0', 'libro': 'A4', 'voucher': '00003', 'fecha': '08/05/2019', 'descripcion': 'COMPENSACION DE CUENTA' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Libro",
            data: "libro"
        }, {
            title: "Voucher",
            data: "voucher"
        }
            , {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.operacional_rvoucher.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.operacional_rvoucher.inicio');
        });
}
function COrvoucherinicioCtrl($scope) {
    console.log('');
}
function COrvouchereditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
    var datos = [
        { 'id': '0', 'tip': '', 'cuenta': '224213', 'td': '18', 'doc': '20190425', 'ta': '00', 'cta': '20190425', 'cargo_s': '1197.00', 'abono_s': '0.00', 'cargo_d': '362.07', 'abono_d': '0.00' },
        { 'id': '1', 'tip': '', 'cuenta': '224213', 'td': '18', 'doc': '20190425', 'ta': '00', 'cta': '20190425', 'cargo_s': '5.07', 'abono_s': '0.00', 'cargo_d': '0.00', 'abono_d': '0.00' },
        { 'id': '2', 'tip': '', 'cuenta': '224213', 'td': '79', 'doc': '20190425', 'ta': '00', 'cta': '20190425', 'cargo_s': '244.12', 'abono_s': '0.00', 'cargo_d': '73.84', 'abono_d': '0.00' }
    ];

    var table = $('#dataTable2').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Tip",
            data: "tip"
        }, {
            title: "Cuenta",
            data: "cuenta"
        }
            , {
            title: "T/D",
            data: "td"
        }, {
            title: "No. Docum.",
            data: "doc"
        }
            , {
            title: "T/A",
            data: "ta"
        }, {
            title: "Cta. Cte.",
            data: "cta"
        }, {
            title: "Cargo S/.",
            data: "cargo_s"
        }, {
            title: "Abono S/.",
            data: "abono_s"
        }, {
            title: "Cargo US$",
            data: "cargo_d"
        }, {
            title: "Abono US$",
            data: "abono_d"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_cuentacorriente.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_cuentacorriente.inicio');
        });
}
//CONTABILIDAD>OPERACIONAL>REGISTRO DE VOUCHER - FIN

//CONTABILIDAD>REPORTES>ANALISIS DE CENTROS DE COSTO - INI
function CRcentrocostosCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_centrosdecosto.inicio');

    var datos = [
        { 'id': '0', 'codigo': '901001', 'descripcion': 'GERENCIA GENERAL CEO' },
        { 'id': '1', 'codigo': '901002', 'descripcion': 'AUDITORIA INTERNA CAS' },
        { 'id': '2', 'codigo': '901003', 'descripcion': 'LEGAL Y CUMPLIMIENTO' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Código",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        });
}
function CRcentrocostosinicioCtrl($scope) {
    console.log('');
}
function CRcentrocostoseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>ANALISIS DE CENTROS DE COSTO - FIN

//CONTABILIDAD>REPORTES>ANALISIS DE CENTROS DE GESTION Y DIRECTORIOS - INI
function CRcentrogestiondirectorioCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_centrosgestion.inicio');

    var datos = [
        { 'id': '0', 'codigo': '10', 'descripcion': 'TOTAL INGRESOS NETOS' },
        { 'id': '1', 'codigo': '1000', 'descripcion': 'COMISION FIJA' },
        { 'id': '2', 'codigo': '1005', 'descripcion': 'COMISION VARIABLE (RIA-FLUJO)' },
        { 'id': '3', 'codigo': '1010', 'descripcion': 'COMISION VARIABLE (AUM)' }
    ];

    $scope.tabla = (x) => {
        switch (x) {
            case 0:
                {
                    var table0 = $('#dataTable0').DataTable({
                        responsive: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: datos,
                        columns: [{
                            title: "Código",
                            "data": "codigo"
                        }, {
                            title: "Descripción",
                            "data": "descripcion"
                        }]
                    });

                    table0
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                        })
                        .on('deselect', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                        });
                    break;
                }
            case 1:
                {
                    var table1 = $('#dataTable1').DataTable({
                        responsive: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: datos,
                        columns: [{
                            title: "Código",
                            "data": "codigo"
                        }, {
                            title: "Descripción",
                            "data": "descripcion"
                        }]
                    });

                    table1
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                        })
                        .on('deselect', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                        });
                    break;
                }
            default:
        }
    }
}
function CRcentrogestiondirectorioinicioCtrl($scope) {
    console.log('');
}
function CRcentrogestiondirectorioeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>ANALISIS DE CENTROS DE GESTION Y DIRECTORIOS - FIN

//CONTABILIDAD>REPORTES>ANALISIS DE CUENTAS CORRIENTES - INI
function CRcuentacorrienteCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_cuentacorriente.inicio');

    var datos = [
        { 'id': '0', 'cuenta': '11106111', 'descripcion': 'Banco de Credito del Perú', 'moneda': 'Soles' },
        { 'id': '1', 'cuenta': '11106112', 'descripcion': 'Banco Internacional del Perú - Interbank', 'moneda': 'Soles' },
        { 'id': '2', 'cuenta': '11106113', 'descripcion': 'Banco Scotiabank', 'moneda': 'Soles' },
        { 'id': '3', 'cuenta': '11106114', 'descripcion': 'Banco Continental', 'moneda': 'Soles' },
    ];

    $scope.tabla = (x) => {
        switch (x) {
            case 0:
                {
                    var table0 = $('#dataTable0').DataTable({
                        responsive: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: datos,
                        columns: [{
                            title: "Cuenta",
                            data: "cuenta"
                        }, {
                            title: "Descripción",
                            data: "descripcion"
                        }
                            , {
                            title: "Moneda",
                            data: "moneda"
                        }]
                    });

                    table0
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            $timeout(function () {
                                $state.go('index.configuracion_cuentacorriente.editar', {
                                    data: rowData[0]
                                });
                            });
                        })
                        .on('deselect', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            $state.go('index.configuracion_cuentacorriente.inicio');
                        });
                    break;
                }
            case 1:
                {
                    var table1 = $('#dataTable1').DataTable({
                        responsive: true,
                        select: true,
                        language: {
                            url: '../../assets/js/es.json'
                        },
                        data: datos,
                        columns: [{
                            title: "Cuenta",
                            data: "cuenta"
                        }, {
                            title: "Descripción",
                            data: "descripcion"
                        }
                            , {
                            title: "Moneda",
                            data: "moneda"
                        }]
                    });

                    table1
                        .on('select', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            $timeout(function () {
                                $state.go('index.configuracion_cuentacorriente.editar', {
                                    data: rowData[0]
                                });
                            });
                        })
                        .on('deselect', function (e, dt, type, indexes) {
                            var rowData = table.rows(indexes).data().toArray();
                            $state.go('index.configuracion_cuentacorriente.inicio');
                        });
                    break;
                }
            default:
        }
    }
}
function CRcuentacorrienteinicioCtrl($scope) {
    console.log('');
}
function CRcuentacorrienteeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>ANALISIS DE CUENTAS CORRIENTES - FIN

//CONTABILIDAD>REPORTES>BALANCE DE COMPROBACION ANALITICO - INI
function CRcomprobacionanaliticoCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_balancecomprobacion.inicio');
}
function CRcomprobacionanaliticoinicioCtrl($scope) {
    console.log('');
}
function CRcomprobacionanaliticoeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>BALANCE DE COMPROBACION ANALITICO - FIN

//CONTABILIDAD>REPORTES>BALANCE GENERAL - INI
function CRbalancegeneralCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_balancegeneracion.inicio');
}
function CRbalancegeneralinicioCtrl($scope) {
    console.log('');
}
function CRbalancegeneraleditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>BALANCE GENERAL - FIN

//CONTABILIDAD>REPORTES>ESTADO DE GANANCIAS Y PERDIDAS - INI
function CRgananciasperdidasCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_gananciaperdida.inicio');

    var datos = [
        { 'id': '0', 'tipo': 'Cuenta', 'codigo': '5070', 'cta': '', 'descripcion': 'COMISIONES RECIBIDAS' },
        { 'id': '1', 'tipo': 'Acumulado', 'codigo': '', 'cta': '', 'descripcion': 'UTILIDAD BRUTA' },
        { 'id': '2', 'tipo': 'Cuenta', 'codigo': '4060', 'cta': '90', 'descripcion': 'COMPRAS DE SUMINISTROS' }
    ];

    var table = $('#dataTable1').DataTable({
        responsive: true,
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Tipo",
            data: "tipo"
        }, {
            title: "Código",
            data: "codigo"
        }
            , {
            title: "Excl. Ctas.",
            data: "cta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        });
}
function CRgananciasperdidasinicioCtrl($scope) {
    console.log('');
}
function CRgananciasperdidaseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>ESTADO DE GANANCIAS Y PERDIDAS - FIN

//CONTABILIDAD>REPORTES>GASTOS POR CENTRO DE COSTO - INI
function CRgastoscentrocostoCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_gastoscentrocosto.inicio');
}
function CRgastoscentrocostoinicioCtrl($scope) {
    console.log('');
}
function CRgastoscentrocostoeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>GASTOS POR CENTRO DE COSTO - FIN

//CONTABILIDAD>REPORTES>REGISTRO DE RETENCIONES PROVEEDOR - INI
function CRretencionproveedorCtrl($scope, $state, $timeout) {
    $state.go('index.reportes_rretencionesproveedor.inicio');
}
function CRretencionproveedorinicioCtrl($scope) {
    console.log('');
}
function CRretencionproveedoreditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES>REGISTRO DE RETENCIONES PROVEEDOR - FIN

//CONTABILIDAD>AJUSTES POR INFLACION>APERTURA - INI
function CAaperturaCtrl($scope, $state, $timeout) {
    $state.go('index.ajustes_apertura.inicio');
}
function CAaperturainicioCtrl($scope) {
    console.log('');
}
function CAaperturaeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>AJUSTES POR INFLACION>APERTURA - FIN

//CONTABILIDAD>UTILITARIOS>CIERRE APERTURA AÑO - INI
function CUcierreaperturaCtrl($scope, $state, $timeout) {
    $state.go('index.utilitarios_cierreapertura.inicio');
}
function CUcierreaperturainicioCtrl($scope) {
    console.log('');
}
function CUcierreaperturaeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>UTILITARIOS>CIERRE APERTURA AÑO - FIN

//CONTABILIDAD>UTILITARIOS>IMPORTACION DE INFORMACION - INI
function CUimportainformacionCtrl($scope, $state, $timeout) {
    $state.go('index.utilitarios_importacioninformacion.inicio');
}
function CUimportainformacioninicioCtrl($scope) {
    console.log('');
}
function CUimportainformacioneditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>UTILITARIOS>IMPORTACION DE INFORMACION - FIN

//CONTABILIDAD>UTILITARIOS>MAYORIZACION - INI
function CUmayorizacionCtrl($scope, $state, $timeout) {
    $state.go('index.utilitarios_mayorizacion.inicio');
}
function CUmayorizacioninicioCtrl($scope) {
    console.log('');
}
function CUmayorizacioneditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>UTILITARIOS>MAYORIZACION - FIN

//CONTABILIDAD>REPORTES IFRS>BALANCE DE COMPROBACION ANALITICO - INI
function CRbalancecomprobacionCtrl($scope, $state, $timeout) {
    $state.go('index.reportesifrs_balancecomprobacion.inicio');
}
function CRbalancecomprobacioninicioCtrl($scope) {
    console.log('');
}
function CRbalancecomprobacioneditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES IFRS>BALANCE DE COMPROBACION ANALITICO - FIN

//CONTABILIDAD>REPORTES IFRS>BALANCE GENERAL - INI
function CRbalancegeneralifrsCtrl($scope, $state, $timeout) {
    $state.go('index.reportesifrs_balancegeneral.inicio');
}
function CRbalancegeneralifrsinicioCtrl($scope) {
    console.log('');
}
function CRbalancegeneralifrseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES IFRS>BALANCE GENERAL - FIN

//CONTABILIDAD>REPORTES IFRS>ESTADO RESULTADOS IFRS - INI
function CRestadoresultadosCtrl($scope, $state, $timeout) {
    $state.go('index.reportesifrs_estadoresultados.inicio');
}
function CRestadoresultadosinicioCtrl($scope) {
    console.log('');
}
function CRestadoresultadoseditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES IFRS>ESTADO RESULTADOS IFRS - FIN

//CONTABILIDAD>REPORTES IFRS>GANANCIA Y PERDIDA IFRS - INI
function CRgananciaperdidaCtrl($scope, $state, $timeout) {
    $state.go('index.reportesifrs_gananciaperdidas.inicio');
}
function CRgananciaperdidainicioCtrl($scope) {
    console.log('');
}
function CRgananciaperdidaeditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES IFRS>GANANCIA Y PERDIDA IFRS - FIN

//CONTABILIDAD>REPORTES IFRS>LIBRO MAYOR IFRS - INI
function CRlibromayorCtrl($scope, $state, $timeout) {
    $state.go('index.reportesifrs_libromayor.inicio');

    var datos = [
        { 'id': '0', 'cuenta': '110505', 'descripcion': 'EFECTIVO', 'moneda': 'S' },
        { 'id': '0', 'cuenta': '110510', 'descripcion': 'CHEQUES', 'moneda': 'S' },
        { 'id': '0', 'cuenta': '110515', 'descripcion': 'DEPOSITOS POR PRIMAS RECAUDADAS', 'moneda': 'S' },
        { 'id': '0', 'cuenta': '110520', 'descripcion': 'CAJA MENOR', 'moneda': 'S' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Moneda",
            data: "moneda"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.configuracion_cuentacorriente.editar', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.configuracion_cuentacorriente.inicio');
        });
}
function CRlibromayorinicioCtrl($scope) {
    console.log('');
}
function CRlibromayoreditCtrl($scope, $stateParams) {
    $scope.obj = {};
    if ($stateParams.data) {
        $scope.obj = $stateParams.data;
    }
}
//CONTABILIDAD>REPORTES IFRS>LIBRO MAYOR IFRS - FIN.

//CAJA Y BANCOS

//CONFIGURACION > ANALSIS DE CUENTAS CORRIENTES
function CYBanalisiscuentaCtrl($scope, $state, $timeout) {
    $state.go('index.conf_analisiscuenta.ini');
    var datos = [
        { 'id': '0', 'codigo': '000', 'nombre': 'VIDAL CONDE DE BRAITHWAT', 'numero': '10', 'ruc': '15234562' },
        { 'id': '1', 'codigo': '0000', 'nombre': 'A GENOVESA AGROINDUSTRIAS S.A.', 'numero': '20', 'ruc': '52315625' },
        { 'id': '2', 'codigo': '00000', 'nombre': 'SERVICIOS GENERALES DE TRANSPORTES Y TURISMO', 'numero': '20', 'ruc': '84512165' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "nombre"
        }
            , {
            title: "",
            data: "numero"
        }, {
            title: "R.U.C",
            data: "ruc"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.conf_analisiscuenta.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.conf_analisiscuenta.ini');
        });
}
function CYBanalisiscuentainiCtrl($scope) {

}
function CYBanalisiscuentaeditCtrl($scope) {

}
//CONFIGURACION > CHEQUES
function CYBchequesCtrl($scope, $state, $timeout) {
    $state.go('index.conf_cheques.ini');
    var datos = [
        { 'id': '0', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280512', 'girado': 'DIRECCIÓN SUB REGIONAL', 'fecha': '29/10/1999', 'importe': '165.07', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '1', 'ok': '<i class="far fa-frown fa-2x cl-red"></i>', 'cheque': '005280515', 'girado': 'DIRECCIÓN REGIONAL', 'fecha': '29/10/1995', 'importe': '1119.94', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '2', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280516', 'girado': 'CTAR APURIMAC', 'fecha': '29/10/2000', 'importe': '275.05', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Ok",
            data: "ok"
        }, {
            title: "Cheque",
            data: "cheque"
        }
            , {
            title: "Girado",
            data: "girado"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Importe",
            data: "importe"
        }, {
            title: "Prn",
            data: "imprimir"
        }, {
            title: "Xrx",
            data: "xrx"
        }, {
            title: "Firma1",
            data: "firma1"
        }, {
            title: "Firma2",
            data: "firma2"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.conf_cheques.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.conf_cheques.ini');
        });
}
function CYBchequesiniCtrl($scope) {

}
function CYBchequeseditCtrl($scope) {
    var datos = [
        { 'id': '0', 'flujo': '02', 'td': '18', 'doc': '200803348', 'imp': '44.80', 'impequi': '12.82', 'cta': '21548996' }
    ];
    var table = $('#dataTable2').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Flujo",
            data: "flujo"
        }, {
            title: "T/D",
            data: "td"
        }
            , {
            title: "N° Doc.",
            data: "doc"
        }, {
            title: "Importe",
            data: "imp"
        }, {
            title: "Imp. Equi.",
            data: "impequi"
        }, {
            title: "Cuenta Corr.",
            data: "cta"
        }]
    });
}
//CONFIGURACION > CUENTAS
function CYBcuentasCtrl($scope, $state, $timeout) {
    $state.go('index.conf_cuentas.ini');
    $("input[type='number']").inputSpinner();
    var datos = [
        { 'id': '0', 'cuenta': '11101', 'descripcion': 'CAJA M.N', 'moneda': 'Soles' },
        { 'id': '1', 'cuenta': '11104253', 'descripcion': 'BANCO DE CREDITO REC. MN', 'moneda': 'Soles' },
        { 'id': '2', 'cuenta': '1156232', 'descripcion': 'BANCO DE CREDITO RESP. SOCIAL', 'moneda': 'Soles' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Moneda",
            data: "moneda"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.conf_cuentas.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.conf_cuentas.ini');
        });
}
function CYBcuentasiniCtrl($scope) {

}
function CYBcuentaseditCtrl($scope) {

}
//CONFIGURACION > EMPRESAS
function CYBempresasCtrl($scope, $state, $timeout) {
    $state.go('index.config_empresas.ini');
    var datos = [
        { 'id': '0', 'codigo': '03', 'nombre': 'AFP Integra', 'ejercicio': '2019' },
        { 'id': '1', 'codigo': '04', 'nombre': 'IN-CARTADM', 'ejercicio': '2018' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Nombre",
            data: "nombre"
        }
            , {
            title: "Ejercicio",
            data: "ejercicio"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_empresas.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_empresas.ini');
        });
}
function CYBempresasiniCtrl($scope) {

}
function CYBempresaseditCtrl($scope) {

}
//CONFIGURACION > LIBROS AUXILIARES
function CYBlibrosauxiliaresCtrl($scope, $state, $timeout) {
    $state.go('index.config_librosauxiliares.ini');
    var datos = [
        { 'id': '0', 'codigo': 'A1', 'descripcion': 'DIARIO (SISTEMA ANTERIOR)' },
        { 'id': '1', 'codigo': 'A2', 'descripcion': 'OPERAC. INTERBANK CTA. GNRAL' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_librosauxiliares.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_librosauxiliares.ini');
        });
}
function CYBlibrosauxiliaresiniCtrl($scope) {

}
function CYBlibrosauxiliareseditCtrl($scope) {

}
//CONFIGURACION > MANTENIMIENTO CONCEPTO COMPROBANTES
function CYBmantcomprobantesCtrl($scope, $state, $timeout) {
    $state.go('index.config_mantcomprobantes.ini');
    var datos = [
        { 'id': '0', 'codigo': '01', 'descripcion': 'POR EL SUB ARRIENDO DEL LOCAL LARCO', 'estado': 'A' },
        { 'id': '1', 'codigo': '02', 'descripcion': 'POR LOS GASTOS DE ENERGIA LIMPIEZA', 'estado': 'A' },
        { 'id': '2', 'codigo': '03', 'descripcion': 'POR LOS SERVICIOS PRESTADOS', 'estado': 'A' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_mantcomprobantes.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_mantcomprobantes.ini');
        });
}
function CYBmantcomprobantesiniCtrl($scope) {

}
function CYBmantcomprobanteseditCtrl($scope) {
    var datos = [
        { 'id': '0', 'cuenta': '05061252', 'ctapredeterminada': '05061252', 'tipo': 'ABONO', 'moneda': 'DOLARES', 'imp': 'S', 'descripcion': 'otros ingresos excepcionales' },
        { 'id': '1', 'cuenta': '1052623', 'ctapredeterminada': '1052623', 'tipo': 'CARGO', 'moneda': 'DOLARES', 'imp': 'S', 'descripcion': 'impuesto general a las ventas(IGV)' },
        { 'id': '2', 'cuenta': '0542158', 'ctapredeterminada': '0542158', 'tipo': 'ABONO', 'moneda': 'DOLARES', 'imp': 'S', 'descripcion': 'Comente' }
    ];

    var table = $('#dataTable2').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Cta. Predet",
            data: "ctapredeterminada"
        }
            , {
            title: "Tipo",
            data: "tipo"
        }, {
            title: "Moneda",
            data: "moneda"
        }, {
            title: "Afecto Imp.",
            data: "imp"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });
}
//CONFIGURACION > PERIODOS
function CYBperiodosCtrl($scope, $state, $timeout) {
    $state.go('index.config_periodo.ini');

    var datos = [
        { 'id': '0', 'codigo': '2019/00', 'descripcion': 'Apertura 2019', 'ipm': '0.0000', 'tcprom': '0.0000', 'cerr': '<i class="far fa-hand-paper"></i>' },
        { 'id': '1', 'codigo': '2019/00', 'descripcion': 'Apertura 2019', 'ipm': '0.0000', 'tcprom': '0.0000', 'cerr': '<i class="far fa-hand-paper"></i>' },
        { 'id': '2', 'codigo': '2019/00', 'descripcion': 'Apertura 2019', 'ipm': '0.0000', 'tcprom': '0.0000', 'cerr': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }
            , {
            title: "I.P.M",
            data: "ipm"
        }, {
            title: "T/C Prom",
            data: "tcprom"
        }, {
            title: "Cerr.",
            data: "cerr"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        });
}
function CYBperiodosiniCtrl($scope) {

}
function CYBperiodoseditCtrl($scope) {

}
//CONFIGURACION > TIPO DE ANALISIS
function CYBtipoanalisisCtrl($scope, $state) {
    $state.go('index.config_tipoanalisis.ini');
}
function CYBtipoanalisisiniCtrl($scope) {

}
function CYBtipoanalisiseditCtrl($scope) {

}
//CONFIGURACION > TIPO DE DOCUMENTO
function CYBtipodocumentoCtrl($scope, $state, $timeout) {
    $state.go('index.config_tipodocumento.ini');
    var datos = [
        { 'id': '0', 'codigo': '01', 'descripcion': 'FACTURA' },
        { 'id': '1', 'codigo': '02', 'descripcion': 'RECIBO POR HONORARIOS' },
        { 'id': '2', 'codigo': '03', 'descripcion': 'BOLETA DE VENTA' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_tipodocumento.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_tipodocumento.ini');
        });
}
function CYBtipodocumentoiniCtrl($scope) {

}
function CYBtipodocumentoseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. AREAS
function CYBxeroxmantareasCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxarea.ini');

    var datos = [
        { 'id': '0', 'codigo': 'CON', 'descripcion': 'CONTABILIDAD', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '1', 'codigo': 'FIN', 'descripcion': 'FINANZAS', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '2', 'codigo': 'GER', 'descripcion': 'GERENCIA', 'estado': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxarea.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxarea.ini');
        });
}
function CYBxeroxmantareasiniCtrl($scope) {

}
function CYBxeroxmantareaseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. CATEGORIAS
function CYBxeroxmantcategoriasCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxcategorias.ini');
    var datos = [
        { 'id': '0', 'codigo': 'G', 'descripcion': 'GERENCIA', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '1', 'codigo': 'GC', 'descripcion': 'GERENCIA CENTRAL', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '2', 'codigo': 'GG', 'descripcion': 'GERENCIA GENERAL', 'estado': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "codigo"
        }, {
            title: "Descripción",
            data: "descripcion"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxcategorias.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxcategorias.ini');
        });
}
function CYBxeroxmantcategoriasiniCtrl($scope) {

}
function CYBxeroxmantcategoriaseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. COMBINACIONES
function CYBxeroxmantcombinacionesCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxcombinaciones.ini');
    var datos = [
        { 'id': '0', 'toperacion': '1', 'grupo': 'AA', 'limmaxsol': '0', 'limmaxdol': '0', 'catgobli': '', 'areaobli': '', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '1', 'toperacion': '1', 'grupo': 'AB', 'limmaxsol': '0', 'limmaxdol': '0', 'catgobli': '', 'areaobli': '', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '2', 'toperacion': '1', 'grupo': 'AC', 'limmaxsol': '0', 'limmaxdol': '200000', 'catgobli': '', 'areaobli': '', 'estado': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "T. Operación",
            data: "toperacion"
        }, {
            title: "Grupo",
            data: "grupo"
        }, {
            title: "Limite Max Sol",
            data: "limmaxsol"
        }, {
            title: "Limite Max Dol",
            data: "limmaxdol"
        }, {
            title: "Catg. Oblig.",
            data: "catgobli"
        }, {
            title: "Area Oblig.",
            data: "areaobli"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxcombinaciones.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxcombinaciones.ini');
        });
}
function CYBxeroxmantcombinacionesiniCtrl($scope) {

}
function CYBxeroxmantcombinacioneseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. FIRMANTES
function CYBxeroxmantfirmantesCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxfirmante.ini');
    var datos = [
        { 'id': '0', 'cod': '001', 'nom': 'Jaime Caceres Sayan', 'tip': 'A ', 'cat': 'P', 'area': 'PRE', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '0', 'cod': '002', 'nom': 'Sergio Zayers', 'tip': 'A', 'cat': 'GG', 'area': 'GER', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '0', 'cod': '003', 'nom': 'Sandro Garcia', 'tip': 'B', 'cat': 'G', 'area': 'OPER', 'estado': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "cod"
        }, {
            title: "Nombre",
            data: "nom"
        }, {
            title: "Tipo",
            data: "tip"
        }, {
            title: "Categoria",
            data: "cat"
        }, {
            title: "Area",
            data: "area"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxfirmante.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxfirmante.ini');
        });
}
function CYBxeroxmantfirmantesiniCtrl($scope) {

}
function CYBxeroxmantfirmanteseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. RESTRICCIONES
function CYBxeroxmantrestriccionesCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxrestricciones.ini');
    var datos = [
        { 'id': '0', 'cod': '1', 'desc': 'PERMITIR AREAS IGUALES', 'valor': 'N' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "cod"
        }, {
            title: "Descripcion",
            data: "desc"
        }, {
            title: "Valor",
            data: "valor"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxrestricciones.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxrestricciones.ini');
        });
}
function CYBxeroxmantrestriccionesiniCtrl($scope) {

}
function CYBxeroxmantrestriccioneseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. TIPO FIRMANTES
function CYBxeroxmantteipofirmantesCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxtipofirmantes.ini');

    var datos = [
        { 'id': '0', 'cod': 'A', 'desc': 'TIPO A', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '1', 'cod': 'B', 'desc': 'TIPO B', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '2', 'cod': 'C', 'desc': 'TIPO C', 'estado': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "cod"
        }, {
            title: "Descripcion",
            data: "desc"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxtipofirmantes.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxtipofirmantes.ini');
        });
}
function CYBxeroxmanttipofirmantesiniCtrl($scope) {

}
function CYBxeroxmanttipofirmanteseditCtrl($scope) {

}
//CONFIGURACION > XEROX MANT. TIPO OPERACION
function CYBxeroxmanttipooperacionCtrl($scope, $state, $timeout) {
    $state.go('index.config_xeroxtipooperacion.ini');
    var datos = [
        { 'id': '0', 'cod': '1', 'desc': 'ORDEN BANCARIO', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '1', 'cod': '2', 'desc': 'PRESTACIONES', 'estado': '<i class="far fa-hand-paper"></i>' },
        { 'id': '2', 'cod': '3', 'desc': 'INVERSIONES', 'estado': '<i class="far fa-hand-paper"></i>' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Codigo",
            data: "cod"
        }, {
            title: "Descripcion",
            data: "desc"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.config_xeroxtipooperacion.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.config_xeroxtipooperacion.ini');
        });
}
function CYBxeroxmanttipooperacioniniCtrl($scope) {

}
function CYBxeroxmanttipooperacioneditCtrl($scope) {

}
//OPERACIONES > ANULACION DE CHEQUES CONTABILIZADOS
function CYBanulacionchequescontabilizadosCtrl($scope, $state, $timeout) {
    $state.go('index.opera_anulacioncheques.ini');
    var datos = [
        { 'id': '0', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280512', 'girado': 'DIRECCIÓN SUB REGIONAL', 'fecha': '29/10/1999', 'importe': '165.07', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '1', 'ok': '<i class="far fa-frown fa-2x cl-red"></i>', 'cheque': '005280515', 'girado': 'DIRECCIÓN REGIONAL', 'fecha': '29/10/1995', 'importe': '1119.94', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '2', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280516', 'girado': 'CTAR APURIMAC', 'fecha': '29/10/2000', 'importe': '275.05', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Ok",
            data: "ok"
        }, {
            title: "Cheque",
            data: "cheque"
        }
            , {
            title: "Girado",
            data: "girado"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Importe",
            data: "importe"
        }, {
            title: "Prn",
            data: "imprimir"
        }, {
            title: "Xrx",
            data: "xrx"
        }, {
            title: "Firma1",
            data: "firma1"
        }, {
            title: "Firma2",
            data: "firma2"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.opera_anulacioncheques.ini');
        });
}
function CYBanulacionchequescontabilizadosiniCtrl($scope) {

}
function CYBanulacionchequescontabilizadoseditCtrl($scope) {

}
//OPERACIONES > ANULACION MASIVA DE CHEQUES
function CYBanulacionmasivachequesCtrl($scope, $state) {
    $state.go('index.opera_anulacionmasiva.ini');

    var datos = [
        { 'id': '0', 'cuenta': '01552201', 'chequera': 'A052412', 'cheque': '200152356', 'girado': 'N', 'fecha': '2019/06/25', 'importe': '100.20', 'prn': 'Ok', 'xrx': '', 'area': '' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Chequera",
            data: "chequera"
        }
            , {
            title: "Cheque",
            data: "cheque"
        }, {
            title: "Girado",
            data: "girado"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Importe",
            data: "importe"
        }, {
            title: "Prn",
            data: "prn"
        }, {
            title: "Xrx",
            data: "xrx"
        }, {
            title: "Area",
            data: "area"
        }]
    });
}
function CYBanulacionmasivachequesiniCtrl($scope) {

}
function CYBanulacionmasivachequeseditCtrl($scope) {

}
//OPERACIONES > CONCILIACION BANCARIA
function CYBconciliacionbancariaCtrl($scope, $state, $timeout) {
    $state.go('index.opera_conciliacionbancaria.ini');
    var datos = [
        { 'id': '0', 'cuenta': '1115263225', 'desc': 'BANCO DE CREDITO GRAL. MN.191-00712774', 'moneda': 'Soles' },
        { 'id': '1', 'cuenta': '1115263221', 'desc': 'BANCO DE CREDITO REC. MN.191-00712774', 'moneda': '200152356' },
        { 'id': '2', 'cuenta': '1115263222', 'desc': 'BANCO DE CREDITO PRES. MN.191-00712774', 'moneda': '200152356' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "desc"
        }
            , {
            title: "Moneda",
            data: "moneda"
        }]
    });
    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.opera_conciliacionbancaria.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.opera_conciliacionbancaria.ini');
        });
}
function CYBconciliacionbancariainiCtrl($scope) {

}
function CYBconciliacionbancariaeditCtrl($scope) {

    var movLibros = [
        { 'id': '0', 'doc': 'NC/230521414', 'fec': '23/02/2017', 'concepto': 'PENSION DE BENEFICIOS', 'abono': '0.00', 'cargo': '230256.00', 'est': '<i class="fas fa-question-circle"></i>' },
        { 'id': '1', 'doc': 'NC/230521414', 'fec': '23/02/2017', 'concepto': 'PENSION DE BENEFICIOS', 'abono': '0.00', 'cargo': '230256.00', 'est': '<i class="fas fa-question-circle"></i>' },
        { 'id': '2', 'doc': 'NC/230521414', 'fec': '23/02/2017', 'concepto': 'PENSION DE BENEFICIOS', 'abono': '0.00', 'cargo': '230256.00', 'est': '<i class="fas fa-question-circle"></i>' }
    ];

    var tranExtrarc = [
        { 'id': '0', 'doc': 'NC/230521414', 'fec': '23/02/2017', 'concepto': 'PENSION DE BENEFICIOS', 'abono': '0.00', 'cargo': '230256.00', 'est': '<i class="fas fa-question-circle"></i>' },
        { 'id': '1', 'doc': 'NC/230521414', 'fec': '23/02/2017', 'concepto': 'PENSION DE BENEFICIOS', 'abono': '0.00', 'cargo': '230256.00', 'est': '<i class="fas fa-question-circle"></i>' },
        { 'id': '2', 'doc': 'NC/230521414', 'fec': '23/02/2017', 'concepto': 'PENSION DE BENEFICIOS', 'abono': '0.00', 'cargo': '230256.00', 'est': '<i class="fas fa-question-circle"></i>' }
    ];

    $scope.tabla = (x) => {
        if (x === 0) {
            var table = $('#tab01').DataTable({
                select: true,
                destroy: true,
                language: {
                    url: '../../assets/js/es.json'
                },
                data: movLibros,
                columns: [{
                    title: "N° Doc.",
                    data: "doc"
                }, {
                    title: "Fec. Ext.",
                    data: "fec"
                }
                    , {
                    title: "Concepto",
                    data: "concepto"
                }, {
                    title: "Abono",
                    data: "abono"
                }, {
                    title: "Cargo",
                    data: "cargo"
                }, {
                    title: "Est.",
                    data: "est"
                }]
            });
        } else if (x === 1) {
            var table = $('#tab02').DataTable({
                select: true,
                destroy: true,
                language: {
                    url: '../../assets/js/es.json'
                },
                data: tranExtrarc,
                columns: [{
                    title: "N° Doc.",
                    data: "doc"
                }, {
                    title: "Fec. Ext.",
                    data: "fec"
                }
                    , {
                    title: "Concepto",
                    data: "concepto"
                }, {
                    title: "Abono",
                    data: "abono"
                }, {
                    title: "Cargo",
                    data: "cargo"
                }, {
                    title: "Est.",
                    data: "est"
                }]
            });
        } else {

        }
    }
}
//OPERACIONES > CONSULTA E IMPRESION DE CHEQUES
function CYBconsultaimpresionchequesCtrl($scope, $state, $timeout) {
    $state.go('index.opera_consultacheques.ini');
    var datos = [
        { 'id': '0', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280512', 'girado': 'DIRECCIÓN SUB REGIONAL', 'fecha': '29/10/1999', 'importe': '165.07', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '1', 'ok': '<i class="far fa-frown fa-2x cl-red"></i>', 'cheque': '005280515', 'girado': 'DIRECCIÓN REGIONAL', 'fecha': '29/10/1995', 'importe': '1119.94', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '2', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280516', 'girado': 'CTAR APURIMAC', 'fecha': '29/10/2000', 'importe': '275.05', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Ok",
            data: "ok"
        }, {
            title: "Cheque",
            data: "cheque"
        }
            , {
            title: "Girado",
            data: "girado"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Importe",
            data: "importe"
        }, {
            title: "Prn",
            data: "imprimir"
        }, {
            title: "Xrx",
            data: "xrx"
        }, {
            title: "Firma1",
            data: "firma1"
        }, {
            title: "Firma2",
            data: "firma2"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.conf_analisiscuenta.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.conf_analisiscuenta.ini');
        });
}
function CYBconsultaimpresionchequesiniCtrl($scope) {

}
function CYBconsultaimpresionchequeseditCtrl($scope) {

}
//OPERACIONES > EMISION DE CHEQUES
function CYBemisionchequesCtrl($scope, $state, $timeout) {
    $state.go('index.opera_emisioncheques.ini');
    var datos = [
        { 'id': '0', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280512', 'girado': 'DIRECCIÓN SUB REGIONAL', 'fecha': '29/10/1999', 'importe': '165.07', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '1', 'ok': '<i class="far fa-frown fa-2x cl-red"></i>', 'cheque': '005280515', 'girado': 'DIRECCIÓN REGIONAL', 'fecha': '29/10/1995', 'importe': '1119.94', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' },
        { 'id': '2', 'ok': '<i class="far fa-smile fa-2x cl-yellow"></i>', 'cheque': '005280516', 'girado': 'CTAR APURIMAC', 'fecha': '29/10/2000', 'importe': '275.05', 'imprimir': '<i class="fas fa-print fa-2x"></i>', 'xrx': '', 'firma1': '', 'firma2': '' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Ok",
            data: "ok"
        }, {
            title: "Cheque",
            data: "cheque"
        }
            , {
            title: "Girado",
            data: "girado"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Importe",
            data: "importe"
        }, {
            title: "Prn",
            data: "imprimir"
        }, {
            title: "Xrx",
            data: "xrx"
        }, {
            title: "Firma1",
            data: "firma1"
        }, {
            title: "Firma2",
            data: "firma2"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.opera_emisioncheques.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.opera_emisioncheques.ini');
        });
}
function CYBemisionchequesiniCtrl($scope) {

}
function CYBemisionchequeseditCtrl($scope) {
    var datos = [
        { 'id': '0', 'tip': '', 'cuenta': '2146218', 'centrocosto': '', 'centrogestion': '', 'flujo': '03', 'cta': '201956523', 'td': '19', 'doc': '231165', 'tc': '3.443', 'abono_s': '407.06', 'abono_d': '119.30', 'moneda': 'SOLES', 'concepto': 'DEVOLUCION' }
    ];
    var table = $('#dataTable2').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Tip.",
            data: "tip"
        }, {
            title: "Cuenta Cont.",
            data: "cuenta"
        }
            , {
            title: "Cen.Cos.",
            data: "centrocosto"
        }, {
            title: "Cen.Gest.",
            data: "centrogestion"
        }, {
            title: "Flu.Caja",
            data: "flujo"
        }, {
            title: "Cta.Cte.",
            data: "cta"
        }, {
            title: "T.D",
            data: "td"
        }, {
            title: "Num.Doc.",
            data: "doc"
        }, {
            title: "T/C",
            data: "tc"
        }, {
            title: "Abono S/.",
            data: "abono_s"
        }, {
            title: "Abono US$",
            data: "abono_d"
        }, {
            title: "Moneda",
            data: "moneda"
        }, {
            title: "Concepto",
            data: "concepto"
        }
        ]
    });
}
//OPERACIONES > ENVIA COMPROBANTE RETENCION-SUNAT
function CYBenviacomprobanteCtrl($scope, $state) {
    $state.go('index.opera_comprobanteretencion.ini');
    var datos = [
        { 'id': '0', 'fec': '14/05/2019', 'nom': '201507356-20-R001', 'serie': 'R001-00000484', 'tip': '', 'prov': '102562211', 'impret': '26.00' },
        { 'id': '1', 'fec': '30/05/2019', 'nom': '201507356-20-R001', 'serie': 'R001-00000485', 'tip': '', 'prov': '102562211', 'impret': '37.00' },
        { 'id': '2', 'fec': '05/05/2019', 'nom': '201507356-20-R001', 'serie': 'R001-00000486', 'tip': '', 'prov': '102562211', 'impret': '23.00' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Fecha",
            data: "fec"
        }, {
            title: "Nombre Fisico",
            data: "nom"
        }
            , {
            title: "Serie-Nro",
            data: "serie"
        }, {
            title: "Tipo Envio",
            data: "tip"
        }, {
            title: "Proveedor",
            data: "prov"
        }, {
            title: "Importe Retenido",
            data: "impret"
        }]
    });
}
function CYBenviacomprobanteiniCtrl($scope) {

}
function CYBenviacomprobanteeditCtrl($scope) {

}
//OPERACIONES > IMPRESION DE COMPROBANTES
function CYBimpresioncomprobanteCtrl($scope, $state, $uibModal) {
    var datos = [
        { 'id': '0', 'serie': 'F001', 'correlativo': '000000', 'cantidad': '1', 'fec': '25/05/2016', 'ruc': '102562211', 'moneda': 'S', 'monto': '378.23', 'imp': '<i class="fas fa-print"></i>', 'enviado': '<i class="far fa-hand-paper"></i>', 'estado': '<i class="far fa-smile"></i>' },
        { 'id': '1', 'serie': 'F001', 'correlativo': '000001', 'cantidad': '1', 'fec': '25/05/2016', 'ruc': '102562211', 'moneda': 'd', 'monto': '1.378.23', 'imp': '<i class="fas fa-print"></i>', 'enviado': '<i class="far fa-hand-paper"></i>', 'estado': '<i class="far fa-smile"></i>' },
        { 'id': '2', 'serie': 'F001', 'correlativo': '000002', 'cantidad': '1', 'fec': '25/05/2016', 'ruc': '102562211', 'moneda': 'S', 'monto': '5.378.23', 'imp': '<i class="fas fa-print"></i>', 'enviado': '<i class="far fa-hand-paper"></i>', 'estado': '<i class="far fa-smile"></i>' }
    ];

    $scope.comprobante = {};

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Serie",
            data: "serie"
        }, {
            title: "Correlativo",
            data: "correlativo"
        }
            , {
            title: "Cantidad",
            data: "cantidad"
        }, {
            title: "Fecha Emisión",
            data: "fec"
        }, {
            title: "Ruc",
            data: "ruc"
        }, {
            title: "Moneda",
            data: "moneda"
        }, {
            title: "Monto",
            data: "monto"
        }, {
            title: "Impr.",
            data: "imp"
        }, {
            title: "Enviado",
            data: "enviado"
        }, {
            title: "Estado",
            data: "estado"
        }]
    });

    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            var modal = $uibModal.open({
                backdrop: false,
                templateUrl: 'src/views/cajaybancos/operaciones/impresioncomprobante/comprobantemodal.htm',
                size: 'lg',
                controller: function ($scope, $uibModalInstance) {

                    $scope.comprobante = {};

                    $scope.cerrar = () => {
                        $uibModalInstance.close();
                    }

                    $scope.aceptar = () => {
                        $uibModalInstance.close($scope.comprobante);
                    }
                }
            });
            modal.result.then(function (f) {
                $scope.comprobante = f;
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        });
}
function CYBimpresioncomprobanteiniCtrl($scope) {

}
function CYBimpresioncomprobanteeditCtrl($scope) {

}
//OPERACIONES > LIBERACION DE CHEQUES
function CYBliberacionchequesCtrl($scope, $state) {
    $state.go('index.opera_liberacioncheques.ini');
    var datos = [
        { 'id': '0', 'numero': '42275500' },
        { 'id': '1', 'numero': '42275501' },
        { 'id': '2', 'numero': '42275502' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Relación de Cheques",
            data: "numero"
        }]
    });
}
function CYBliberacionchequesiniCtrl($scope) {

}
function CYBliberacionchequeseditCtrl($scope) {

}
//OPERACIONES > REGISTRO MOVIMIENTO
function CYBregistromovimientoCtrl($scope, $state, $timeout) {
    $state.go('index.opera_registromovimiento.ini');
    var datos = [
        { 'id': '0', 'libro': 'A2', 'comprobante': '000001', 'fecha': '25/01/2019', 'detalle': 'DEV.PENSIONES FALLECIDOS', 'tipo': 'EGRESO' },
        { 'id': '1', 'libro': 'A3', 'comprobante': '000001', 'fecha': '25/01/2019', 'detalle': 'DEV.PENSIONES FALLECIDOS', 'tipo': 'EGRESO' },
        { 'id': '2', 'libro': 'A4', 'comprobante': '000001', 'fecha': '25/01/2019', 'detalle': 'DEV.PENSIONES FALLECIDOS', 'tipo': 'EGRESO' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Libro",
            data: "libro"
        }, {
            title: "Compro.",
            data: "comprobante"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Detalle",
            data: "detalle"
        }, {
            title: "Tipo",
            data: "tipo"
        }]
    });
    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.opera_registromovimiento.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.opera_registromovimiento.ini');
        });
}
function CYBregistromovimientoiniCtrl($scope) {

}
function CYBregistromovimientoeditCtrl($scope) {

    var datos = [
        { 'id': '0', 'tip': '', 'cuenta': '121052412', 'contable': '224312', 'cheque': '19050802', 'ta': '00', 'codigo': '20463627488', 'td': '18', 'numero': '2019', 'cargo_s': '0.00', 'abono_s': '1197.00', 'cantidad': '0' },
        { 'id': '1', 'tip': '', 'cuenta': '121052423', 'contable': '224312', 'cheque': '19050802', 'ta': '00', 'codigo': '20463627488', 'td': '18', 'numero': '2019', 'cargo_s': '0.00', 'abono_s': '247.22', 'cantidad': '2' },
        { 'id': '2', 'tip': '', 'cuenta': '121052425', 'contable': '224312', 'cheque': '19050802', 'ta': '00', 'codigo': '20463627486', 'td': '18', 'numero': '2019', 'cargo_s': '0.00', 'abono_s': '324.50', 'cantidad': '3' }
    ];

    var table = $('#dataTable2').DataTable({
        dom: 'Bfrtip',
        scrollY: 300,
        scrollX: true,
        scrollCollapse: true,
        fixedColumns: {
            leftColumns: 3,
            rightColumns: 7
        },
        buttons: [{
            text: '<i class="fas fa-sync"></i>',
            action: function (e, dt, node, config) {

            }
        }, {
            extend: 'excelHtml5',
            text: '<i class="fas fa-file-excel"></i>'
        }, {
            extend: 'pdfHtml5',
            text: 'Exp.Pdf'
        }],
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Tip",
            data: "tip"
        }, {
            title: "Cuenta Caja",
            data: "cuenta"
        }
            , {
            title: "Cta. Contable",
            data: "contable"
        }
            , {
            title: "Cheque",
            data: "cheque"
        }
            , {
            title: "T/A",
            data: "ta"
        }
            , {
            title: "Cod. Cte.",
            data: "codigo"
        }
            , {
            title: "T/D",
            data: "td"
        }
            , {
            title: "Numero",
            data: "numero"
        }
            , {
            title: "Cargo S/.",
            data: "cargo_s"
        }
            , {
            title: "Abono S/.",
            data: "abono_s"
        }
            , {
            title: "Cantidad",
            data: "cantidad"
        }]
    });
}
//REPORTES > ANALISIS DE CUENTAS
function CYBrepanalisiscuentaCtrl($scope, $state, $timeout) {
    $state.go('index.report_analisiscuenta.ini');

    $scope.tabs = [
        { titulo: 'Analisis de Movimientos de Cuenta', ico: 'fas fa-bezier-curve' },
        { titulo: 'Analisis de Saldos de Cuentas', ico: 'fas fa-biohazard' },
        { titulo: 'Libro Caja Bancos', ico: 'fas fa-business-time' }
    ];

    $scope.tab_active = 0;

    $scope.tab_select = (x) => {

    }

    var datos = [
        { 'id': '0', 'cuenta': '111001', 'descripcion': 'CAJA M.N.', 'moneda': 'Soles' },
        { 'id': '0', 'cuenta': '1111040511', 'descripcion': 'BANCO DE CREDITO GRAL. MN 191-0071252', 'moneda': 'Soles' },
        { 'id': '0', 'cuenta': '1111040511', 'descripcion': 'BANCO DE CREDITO REC. MN 191-0071252', 'moneda': 'Soles' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Cuenta",
            data: "cuenta"
        }, {
            title: "Descripción",
            data: "descripcion"
        }, {
            title: "Moneda",
            data: "moneda"
        }]
    });
    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $timeout(function () {
                $state.go('index.report_analisiscuenta.edit', {
                    data: rowData[0]
                });
            });
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
            $state.go('index.report_analisiscuenta.ini');
        });
}
function CYBrepanalisiscuentainiCtrl($scope) {

}
function CYBrepanalisiscuentaeditCtrl($scope) {
    var datos = [
        { 'id': '0', 'per': '', 'libro': '', 'compro': '', 'tt': '', 'docchec': '', 'td': '', 'doc': '', 'fecdoc': '', 'cta': '', 'cargo_s': '', 'abono_s': '', 'cargo_d': '', 'abono_d': '' }
    ];

    var table = $('#dataTable2').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Per.",
            data: "per"
        }, {
            title: "Libro",
            data: "libro"
        }, {
            title: "Compro",
            data: "compro"
        }, {
            title: "T/T",
            data: "tt"
        }, {
            title: "Doc/Che",
            data: "docchec"
        }, {
            title: "T/D",
            data: "td"
        }, {
            title: "N° Docum",
            data: "doc"
        }, {
            title: "Fec. Doc",
            data: "fecdoc"
        }, {
            title: "Cta.",
            data: "cta"
        }, {
            title: "Cargo S/.",
            data: "cargo_s"
        }, {
            title: "Abono S/.",
            data: "abono_s"
        }, {
            title: "Cargo US$",
            data: "cargo_d"
        }, {
            title: "Abono US$",
            data: "abono_d"
        }]
    });
}
//UTILITARIOS > TRANSFERENCIA A CONTABILIDAD
function CYBtransferenciacontabilidadCtrl($scope, $state, $timeout) {
    $state.go('index.util_transferenciacontabilidad.ini');
    var datos = [
        { 'id': '0', 'libro': 'A2', 'comprobante': '000001', 'fecha': '25/01/2019', 'detalle': 'DEV.PENSIONES FALLECIDOS', 'tipo': 'EGRESO' },
        { 'id': '1', 'libro': 'A3', 'comprobante': '000001', 'fecha': '25/01/2019', 'detalle': 'DEV.PENSIONES FALLECIDOS', 'tipo': 'EGRESO' },
        { 'id': '2', 'libro': 'A4', 'comprobante': '000001', 'fecha': '25/01/2019', 'detalle': 'DEV.PENSIONES FALLECIDOS', 'tipo': 'EGRESO' }
    ];

    var table = $('#dataTable1').DataTable({
        select: true,
        language: {
            url: '../../assets/js/es.json'
        },
        data: datos,
        columns: [{
            title: "Libro",
            data: "libro"
        }, {
            title: "Compro.",
            data: "comprobante"
        }, {
            title: "Fecha",
            data: "fecha"
        }, {
            title: "Detalle",
            data: "detalle"
        }, {
            title: "Tipo",
            data: "tipo"
        }]
    });
    table
        .on('select', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        })
        .on('deselect', function (e, dt, type, indexes) {
            var rowData = table.rows(indexes).data().toArray();
        });
}
function CYBtransferenciacontabilidadinicioCtrl($scope) {

}
function CYBtransferenciacontabilidadeditCtrl($scope) {

}