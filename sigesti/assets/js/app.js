var app = angular.module("APP", [
    "SURAcontroller",
    "SURAservice",
    "SURAfilter",
    "ui.router",
    "ui.bootstrap",
    "environment"
]);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, envServiceProvider) {
    envServiceProvider.config({
        domains: {
            dev: ['localhost'],
            integra: ['integra.dyndns.org'],
            fondos: ['fondos.dyndns.org'],
            sura: ['sura.dyndns.org']
        },
        vars: {
            dev: {
                apiUrl: '',
                staticUrl: ''
            },
            integra: {
                apiUrl: '/integra',
                staticUrl: ''
            },
            fondos: {
                apiUrl: '/fondos',
                staticUrl: ''
            },
            sura: {
                apiUrl: '/sura',
                staticUrl: ''
            }
        }
    });
    envServiceProvider.check();
    $urlRouterProvider.when("", "/inicio").otherwise(function ($injector) {
        $injector.invoke(function ($state) {
            $state.transitionTo("index.404", {}, false);
        });
    });

    var rutaerror = {
        views: {
            contenido: {
                templateUrl: "src/views/404.htm",
                controller: Error404Ctrl
            }
        },
        data: {
            authorizationRequired: false,
            permissionsRequired: [],
            bodyClass: "error"
        }
    };
    var rutaindex = {
        url: "/inicio",
        views: {
            menu: {
                templateUrl: "src/views/menu.htm",
                controller: MenuCtrl
            },
            menumovil: {
                templateUrl: "src/views/menumovil.htm",
                controller: MenuMovilCtrl
            },
            cabecera: {
                templateUrl: "src/views/cabecera.htm",
                controller: CabeceraCtrl
            },
            "": {
                templateUrl: "src/views/cuerpo.htm",
                controller: CuerpoCtrl
            }
        }
    };
    var rutadashboard = {
        views: {
            contenido: {
                templateUrl: "src/views/contabilidad/dashboard.htm",
                controller: CdashboardCtrl
            }
        }
    };

    //CONTABILIDAD

    var rutaConfiguracion = {
        AsientosTipo: {
            Main: {
                url: "/configuracion/asientostipo",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/asientostipo/asientostipo.htm",
                        controller: CCasientostipoCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/asientostipo/inicio",
                views: {
                    asientostipo: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/asientostipo/asientostipoinicio.htm",
                        controller: CCasientostipoinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/asientostipo/editar",
                params: {
                    data: null
                },
                views: {
                    asientostipo: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/asientostipo/asientostipoedit.htm",
                        controller: CCasientostipoeditCtrl
                    }
                }
            }
        },
        Cuentacorriente: {
            Main: {
                url: "/configuracion/cuentacorriente",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/cuentacorrientes/cuentacorriente.htm",
                        controller: CCcuentacorrienteCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/cuentacorriente/inicio",
                views: {
                    cuentacorriente: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/cuentacorrientes/cuentacorrienteinicio.htm",
                        controller: CCcuentacorrienteinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/cuentacorriente/editar",
                params: {
                    data: null
                },
                views: {
                    cuentacorriente: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/cuentacorrientes/cuentacorrienteedit.htm",
                        controller: CCcuentacorrienteeditCtrl
                    }
                }
            }
        },
        Empresa: {
            Main: {
                url: "/configuracion/empresa",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/empresa/empresa.htm",
                        controller: CCempresaCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/empresa/inicio",
                views: {
                    empresa: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/empresa/empresainicio.htm",
                        controller: CCempresainicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/empresa/editar",
                params: {
                    data: null
                },
                views: {
                    empresa: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/empresa/empresaedit.htm",
                        controller: CCempresaeditCtrl
                    }
                }
            }
        },
        Historicotipocambio: {
            Main: {
                url: "/configuracion/historicotipocambio",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/historicotipocambio/historicotipocambio.htm",
                        controller: CChistoricotipocambioCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/historicotipocambio/inicio",
                views: {
                    historicotipocambio: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/historicotipocambio/historicotipocambioinicio.htm",
                        controller: CChistoricotipocambioinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/historicotipocambio/editar",
                params: {
                    data: null
                },
                views: {
                    historicotipocambio: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/historicotipocambio/historicotipocambioedit.htm",
                        controller: CChistoricotipocambioeditCtrl
                    }
                }
            }
        },
        Librosauxiliares: {
            Main: {
                url: "/configuracion/lisbrosauxiliares",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/librosauxiliares/librosauxiliares.htm",
                        controller: CClibrosauxiliaresCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/lisbrosauxiliares/inicio",
                views: {
                    lisbrosauxiliares: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/librosauxiliares/librosauxiliaresinicio.htm",
                        controller: CClibrosauxiliaresinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/historicotipocambio/editar",
                params: {
                    data: null
                },
                views: {
                    lisbrosauxiliares: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/librosauxiliares/librosauxiliaresedit.htm",
                        controller: CClibrosauxiliareseditCtrl
                    }
                }
            }
        },
        Tipoanalisis: {
            Main: {
                url: "/configuracion/tipoanalisis",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/tipoanalisis/tipoanalisis.htm",
                        controller: CCtipoanalisisCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/tipoanalisis/inicio",
                views: {
                    tipoanalisis: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/tipoanalisis/tipoanalisisinicio.htm",
                        controller: CCtipoanalisisinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/tipoanalisis/editar",
                params: {
                    tipoanalisis: null
                },
                views: {
                    tipoanalisis: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/tipoanalisis/tipoanalisisedit.htm",
                        controller: CCtipoanalisiseditCtrl
                    }
                }
            }
        },
        Tipodocumento: {
            Main: {
                url: "/configuracion/tipodocumentos",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/tipodocumentos/tipodocumentos.htm",
                        controller: CCtipodocumentosCtrl
                    }
                }
            },
            Inicio: {
                url: "/configuracion/tipodocumentos/inicio",
                views: {
                    tipodocumentos: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/tipodocumentos/tipodocumentosinicio.htm",
                        controller: CCtipodocumentosinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/configuracion/tipodocumentos/editar",
                params: {
                    data: null
                },
                views: {
                    tipodocumentos: {
                        templateUrl:
                            "src/views/contabilidad/configuracion/tipodocumentos/tipodocumentosedit.htm",
                        controller: CCtipodocumentoseditCtrl
                    }
                }
            }
        }
    };
    var rutaControl = {
        Analisiscuenta: {
            Main: {
                url: "/control/analisiscuentas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/control/analisiscuentas/analisiscuentas.htm",
                        controller: CCanalisiscuentasCtrl
                    }
                }
            },
            Inicio: {
                url: "/control/analisiscuentas/inicio",
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/contabilidad/control/analisiscuentas/analisiscuentasinicio.htm",
                        controller: CCanalisiscuentasinicioCtrl
                    }
                }
            },
            Edit0: {
                url: "/control/analisiscuentas/editar0",
                params: {
                    data: null
                },
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/contabilidad/control/analisiscuentas/analisiscuentasedit0.htm",
                        controller: CCanalisiscuentasedit0Ctrl
                    }
                }
            },
            Edit1: {
                url: "/control/analisiscuentas/editar1",
                params: {
                    data: null
                },
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/contabilidad/control/analisiscuentas/analisiscuentasedit1.htm",
                        controller: CCanalisiscuentasedit1Ctrl
                    }
                }
            },
            Edit2: {
                url: "/control/analisiscuentas/editar2",
                params: {
                    data: null
                },
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/contabilidad/control/analisiscuentas/analisiscuentasedit2.htm",
                        controller: CCanalisiscuentasedit2Ctrl
                    }
                }
            }
        }
    }
    var rutaOperacional = {
        Ajustepordiferenciadecambio: {
            Main: {
                url: "/operacional/tipodocumentos",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/ajustediferenciacambio/ajustediferenciacambio.htm",
                        controller: COajustediferenciacambioCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/analisiscuentas/inicio",
                views: {
                    ajustediferenciacambio: {
                        templateUrl:
                            "src/views/contabilidad/operacional/ajustediferenciacambio/ajustediferenciacambioinicio.htm",
                        controller: CCajustediferenciacambioinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/analisiscuentas/editar",
                params: {
                    data: null
                },
                views: {
                    ajustediferenciacambio: {
                        templateUrl:
                            "src/views/contabilidad/operacional/ajustediferenciacambio/ajustediferenciacambioedit.htm",
                        controller: CCajustediferenciacambioeditCtrl
                    }
                }
            }
        },
        Consultavoucher: {
            Main: {
                url: "/operacional/consultavoucher",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/consultavoucher/consultavoucher.htm",
                        controller: COconsultavoucherCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/consultavoucher/inicio",
                views: {
                    consultavoucher: {
                        templateUrl:
                            "src/views/contabilidad/operacional/consultavoucher/consultavoucherinicio.htm",
                        controller: COconsultavoucherinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/consultavoucher/editar",
                params: {
                    data: null
                },
                views: {
                    consultavoucher: {
                        templateUrl:
                            "src/views/contabilidad/operacional/consultavoucher/consultavoucheredit.htm",
                        controller: COconsultavouchereditCtrl
                    }
                }
            }
        },
        Generacionformatossucave: {
            Main: {
                url: "/operacional/generacionformatosucave",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/formatossucave/generacionformatosucave.htm",
                        controller: COgeneracionformatosucaveCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/generacionformatosucave/inicio",
                views: {
                    procesosucave: {
                        templateUrl:
                            "src/views/contabilidad/operacional/formatossucave/generacionformatosucaveinicio.htm",
                        controller: COgeneracionformatosucaveinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/generacionformatosucave/editar",
                params: {
                    data: null
                },
                views: {
                    procesosucave: {
                        templateUrl:
                            "src/views/contabilidad/operacional/formatossucave/generacionformatosucaveedit.htm",
                        controller: COgeneracionformatosucaveeditCtrl
                    }
                }
            }
        },
        Interfacegeneraciontxt: {
            Main: {
                url: "/operacional/interfacetxt",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfacetxt/generaciontxt.htm",
                        controller: COgeneraciontxtCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/interfacetxt/inicio",
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfacetxt/generaciontxtinicio.htm",
                        controller: COgeneraciontxtinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/interfacetxt/editar",
                params: {
                    data: null
                },
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfacetxt/generaciontxtedit.htm",
                        controller: COgeneraciontxteditCtrl
                    }
                }
            }
        },
        Interfacemantenimientoplantillas: {
            Main: {
                url: "/operacional/interfaceplantilla",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfaceplantilla/mantenimientoplantilla.htm",
                        controller: COmantenimientoplantillaCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/interfaceplantilla/inicio",
                views: {
                    interfacemantenimientoplantilla: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfaceplantilla/mantenimientoplantillainicio.htm",
                        controller: COmantenimientoplantillainicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/interfaceplantilla/editar",
                params: {
                    data: null
                },
                views: {
                    interfacemantenimientoplantilla: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfaceplantilla/mantenimientoplantillaedit.htm",
                        controller: COmantenimientoplantillaeditCtrl
                    }
                }
            },
            EditColumnas: {
                url: "/operacional/interfaceplantilla/editarcolumnas",
                params: {
                    data: null
                },
                views: {
                    interfacemantenimientoplantilla: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfaceplantilla/mantenimientoplantillaeditcolumnas.htm",
                        controller: COmantenimientoplantillaeditcolumnasCtrl
                    }
                }
            },
            EditCuentas: {
                url: "/operacional/interfaceplantilla/editarcuentas",
                params: {
                    data: null
                },
                views: {
                    interfacemantenimientoplantilla: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfaceplantilla/mantenimientoplantillaeditcuentas.htm",
                        controller: COmantenimientoplantillaeditcuentasCtrl
                    }
                }
            },
            EditReferencias: {
                url: "/operacional/interfaceplantilla/editarreferencias",
                params: {
                    data: null
                },
                views: {
                    interfacemantenimientoplantilla: {
                        templateUrl:
                            "src/views/contabilidad/operacional/interfaceplantilla/mantenimientoplantillaeditreferencias.htm",
                        controller: COmantenimientoplantillaeditreferenciasCtrl
                    }
                }
            }
        },
        Librobancos: {
            Main: {
                url: "/operacional/librobancos",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/librobancos/librobancos.htm",
                        controller: COlibrobancosCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/librobancos/inicio",
                views: {
                    operacionallibrobanco: {
                        templateUrl:
                            "src/views/contabilidad/operacional/librobancos/librobancosinicio.htm",
                        controller: COlibrobancosinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/librobancos/editar",
                params: {
                    data: null
                },
                views: {
                    operacionallibrobanco: {
                        templateUrl:
                            "src/views/contabilidad/operacional/librobancos/librobancosedit.htm",
                        controller: COlibrobancoseditCtrl
                    }
                }
            }
        },
        Librocaja: {
            Main: {
                url: "/operacional/librocaja",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/librocaja/librocaja.htm",
                        controller: COlibrocajaCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/librocaja/inicio",
                views: {
                    operacionallibrocaja: {
                        templateUrl:
                            "src/views/contabilidad/operacional/librocaja/librocajainicio.htm",
                        controller: COlibrocajainicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/librocaja/editar",
                params: {
                    data: null
                },
                views: {
                    operacionallibrocaja: {
                        templateUrl:
                            "src/views/contabilidad/operacional/librocaja/librocajaedit.htm",
                        controller: COlibrocajaeditCtrl
                    }
                }
            }
        },
        Libromayor: {
            Main: {
                url: "/operacional/libromayor",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/libromayor/libromayor.htm",
                        controller: COlibromayorCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/libromayor/inicio",
                views: {
                    operacionallibromayor: {
                        templateUrl:
                            "src/views/contabilidad/operacional/libromayor/libromayorinicio.htm",
                        controller: COlibromayorinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/libromayor/editar",
                params: {
                    data: null
                },
                views: {
                    operacionallibromayor: {
                        templateUrl:
                            "src/views/contabilidad/operacional/libromayor/libromayoredit.htm",
                        controller: COlibromayoreditCtrl
                    }
                }
            }
        },
        Plancuentas: {
            Main: {
                url: "/operacional/plancuentas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/plancuentas/plancuentas.htm",
                        controller: COplancuentasCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/plancuentas/inicio",
                views: {
                    operacionalplancuentas: {
                        templateUrl:
                            "src/views/contabilidad/operacional/plancuentas/plancuentasinicio.htm",
                        controller: COplancuentasinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/plancuentas/editar",
                params: {
                    data: null
                },
                views: {
                    operacionalplancuentas: {
                        templateUrl:
                            "src/views/contabilidad/operacional/plancuentas/plancuentasedit.htm",
                        controller: COplancuentaseditCtrl
                    }
                }
            }
        },
        Registroasientostipo: {
            Main: {
                url: "/operacional/asientostipo",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/asientostipo/asientostipo.htm",
                        controller: COasientostipoCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/analisiscuentas/inicio",
                views: {
                    registroasientostipo: {
                        templateUrl:
                            "src/views/contabilidad/operacional/asientostipo/asientostipoinicio.htm",
                        controller: COasientostipoinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/analisiscuentas/editar",
                params: {
                    data: null
                },
                views: {
                    registroasientostipo: {
                        templateUrl:
                            "src/views/contabilidad/operacional/asientostipo/asientostipoedit.htm",
                        controller: COasientostipoeditCtrl
                    }
                }
            }
        },
        Registrovoucher: {
            Main: {
                url: "/operacional/registrovoucher",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/operacional/voucher/rvoucher.htm",
                        controller: COrvoucherCtrl
                    }
                }
            },
            Inicio: {
                url: "/operacional/registrovoucher/inicio",
                views: {
                    operacionalregistravoucher: {
                        templateUrl:
                            "src/views/contabilidad/operacional/voucher/rvoucherinicio.htm",
                        controller: COrvoucherinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/operacional/registrovoucher/editar",
                params: {
                    data: null
                },
                views: {
                    operacionalregistravoucher: {
                        templateUrl:
                            "src/views/contabilidad/operacional/voucher/rvoucheredit.htm",
                        controller: COrvouchereditCtrl
                    }
                }
            }
        }
    }
    var rutaReportes = {
        Analisiscentrocosto: {
            Main: {
                url: "/reportes/analisiscentrocosto",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/centrocostos/centrocostos.htm",
                        controller: CRcentrocostosCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/analisiscentrocosto/inicio",
                views: {
                    analisiscentrocosto: {
                        templateUrl:
                            "src/views/contabilidad/reportes/centrocostos/centrocostosinicio.htm",
                        controller: CRcentrocostosinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/analisiscentrocosto/editar",
                params: {
                    data: null
                },
                views: {
                    analisiscentrocosto: {
                        templateUrl:
                            "src/views/contabilidad/reportes/centrocostos/centrocostosedit.htm",
                        controller: CRcentrocostoseditCtrl
                    }
                }
            }
        },
        Analisiscentrogestiondirectorio: {
            Main: {
                url: "/reportes/centrogestiondirectorio",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/centrogestiondirectorio/centrogestiondirectorio.htm",
                        controller: CRcentrogestiondirectorioCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/centrogestiondirectorio/inicio",
                views: {
                    centrogestiondirectorio: {
                        templateUrl:
                            "src/views/contabilidad/reportes/centrogestiondirectorio/centrogestiondirectorioinicio.htm",
                        controller: CRcentrogestiondirectorioinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/centrogestiondirectorio/editar",
                params: {
                    data: null
                },
                views: {
                    centrogestiondirectorio: {
                        templateUrl:
                            "src/views/contabilidad/reportes/centrogestiondirectorio/centrogestiondirectorioedit.htm",
                        controller: CRcentrogestiondirectorioeditCtrl
                    }
                }
            }
        },
        Analisiscuentacorriente: {
            Main: {
                url: "/reportes/cuentacorriente",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/cuentacorriente/cuentacorriente.htm",
                        controller: CRcuentacorrienteCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/cuentacorriente/inicio",
                views: {
                    analisiscuentacorriente: {
                        templateUrl:
                            "src/views/contabilidad/reportes/cuentacorriente/cuentacorrienteinicio.htm",
                        controller: CRcuentacorrienteinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/cuentacorriente/editar",
                params: {
                    data: null
                },
                views: {
                    analisiscuentacorriente: {
                        templateUrl:
                            "src/views/contabilidad/reportes/cuentacorriente/cuentacorrienteedit.htm",
                        controller: CRcuentacorrienteeditCtrl
                    }
                }
            }
        },
        Balancecomprobacionanalitico: {
            Main: {
                url: "/reportes/comprobacionanalitico",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/comprobacionanalitico/comprobacionanalitico.htm",
                        controller: CRcomprobacionanaliticoCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/comprobacionanalitico/inicio",
                views: {
                    comprobacionanalitico: {
                        templateUrl:
                            "src/views/contabilidad/reportes/comprobacionanalitico/comprobacionanaliticoinicio.htm",
                        controller: CRcomprobacionanaliticoinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/comprobacionanalitico/editar",
                params: {
                    data: null
                },
                views: {
                    comprobacionanalitico: {
                        templateUrl:
                            "src/views/contabilidad/reportes/comprobacionanalitico/comprobacionanaliticoedit.htm",
                        controller: CRcomprobacionanaliticoeditCtrl
                    }
                }
            }
        },
        Balancegeneral: {
            Main: {
                url: "/reportes/balancegeneral",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/balancegeneral/balancegeneral.htm",
                        controller: CRbalancegeneralCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/balancegeneral/inicio",
                views: {
                    balancegeneralreportes: {
                        templateUrl:
                            "src/views/contabilidad/reportes/balancegeneral/balancegeneralinicio.htm",
                        controller: CRbalancegeneralinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/balancegeneral/editar",
                params: {
                    data: null
                },
                views: {
                    balancegeneralreportes: {
                        templateUrl:
                            "src/views/contabilidad/reportes/balancegeneral/balancegeneraledit.htm",
                        controller: CRbalancegeneraleditCtrl
                    }
                }
            }
        },
        Estadodegananciasyperdidas: {
            Main: {
                url: "/reportes/gananciasperdidas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/gananciasperdidas/gananciasperdidas.htm",
                        controller: CRgananciasperdidasCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/gananciasperdidas/inicio",
                views: {
                    estadogananciaperdidas: {
                        templateUrl:
                            "src/views/contabilidad/reportes/gananciasperdidas/gananciasperdidasinicio.htm",
                        controller: CRgananciasperdidasinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/gananciasperdidas/editar",
                params: {
                    data: null
                },
                views: {
                    estadogananciaperdidas: {
                        templateUrl:
                            "src/views/contabilidad/reportes/gananciasperdidas/gananciasperdidasedit.htm",
                        controller: CRgananciasperdidaseditCtrl
                    }
                }
            }
        },
        Gastoscentrocosto: {
            Main: {
                url: "/reportes/gastoscentrocosto",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/gastoscentrocosto/gastoscentrocosto.htm",
                        controller: CRgastoscentrocostoCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/gastoscentrocosto/inicio",
                views: {
                    reportegastoscentrocosto: {
                        templateUrl:
                            "src/views/contabilidad/reportes/gastoscentrocosto/gastoscentrocostoinicio.htm",
                        controller: CRgastoscentrocostoinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/gastoscentrocosto/editar",
                params: {
                    data: null
                },
                views: {
                    reportegastoscentrocosto: {
                        templateUrl:
                            "src/views/contabilidad/reportes/gastoscentrocosto/gastoscentrocostoedit.htm",
                        controller: CRgastoscentrocostoeditCtrl
                    }
                }
            }
        },
        Registroretencionesproveedor: {
            Main: {
                url: "/reportes/retencionproveedor",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportes/retencionproveedor/retencionproveedor.htm",
                        controller: CRretencionproveedorCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportes/retencionproveedor/inicio",
                views: {
                    reportesretencionproveedor: {
                        templateUrl:
                            "src/views/contabilidad/reportes/retencionproveedor/retencionproveedorinicio.htm",
                        controller: CRretencionproveedorinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportes/retencionproveedor/editar",
                params: {
                    data: null
                },
                views: {
                    reportesretencionproveedor: {
                        templateUrl:
                            "src/views/contabilidad/reportes/retencionproveedor/retencionproveedoredit.htm",
                        controller: CRretencionproveedoreditCtrl
                    }
                }
            }
        }
    }
    var rutaAjustesinflacion = {
        Apertura: {
            Main: {
                url: "/ajustesporinflacion/apertura",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/ajustesporinflacion/apertura/apertura.htm",
                        controller: CAaperturaCtrl
                    }
                }
            },
            Inicio: {
                url: "/ajustesporinflacion/apertura/inicio",
                views: {
                    ajusteporinflacion: {
                        templateUrl:
                            "src/views/contabilidad/ajustesporinflacion/apertura/aperturainicio.htm",
                        controller: CAaperturainicioCtrl
                    }
                }
            },
            Edit: {
                url: "/ajustesporinflacion/apertura/editar",
                params: {
                    data: null
                },
                views: {
                    ajusteporinflacion: {
                        templateUrl:
                            "src/views/contabilidad/ajustesporinflacion/apertura/aperturaedit.htm",
                        controller: CAaperturaeditCtrl
                    }
                }
            }
        }
    }
    var rutaUtilitarios = {
        Cierreaperturaaño: {
            Main: {
                url: "/utilitarios/cierreapertura",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/cierreapertura/cierreapertura.htm",
                        controller: CUcierreaperturaCtrl
                    }
                }
            },
            Inicio: {
                url: "/utilitarios/cierreapertura/inicio",
                views: {
                    cierreapertura: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/cierreapertura/cierreaperturainicio.htm",
                        controller: CUcierreaperturainicioCtrl
                    }
                }
            },
            Edit: {
                url: "/utilitarios/cierreapertura/editar",
                params: {
                    data: null
                },
                views: {
                    cierreapertura: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/cierreapertura/cierreaperturaedit.htm",
                        controller: CUcierreaperturaeditCtrl
                    }
                }
            }
        },
        Importacioninformacion: {
            Main: {
                url: "/utilitarios/importainformacion",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/importainformacion/importainformacion.htm",
                        controller: CUimportainformacionCtrl
                    }
                }
            },
            Inicio: {
                url: "/utilitarios/importainformacion/inicio",
                views: {
                    importacioninformacion: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/importainformacion/importainformacioninicio.htm",
                        controller: CUimportainformacioninicioCtrl
                    }
                }
            },
            Edit: {
                url: "/utilitarios/importainformacion/editar",
                params: {
                    data: null
                },
                views: {
                    importacioninformacion: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/importainformacion/importainformacionedit.htm",
                        controller: CUimportainformacioneditCtrl
                    }
                }
            }
        },
        Mayorizacion: {
            Main: {
                url: "/utilitarios/tipodocumentos",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/mayorizacion/mayorizacion.htm",
                        controller: CUmayorizacionCtrl
                    }
                }
            },
            Inicio: {
                url: "/utilitarios/analisiscuentas/inicio",
                views: {
                    mayorizacion: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/mayorizacion/mayorizacioninicio.htm",
                        controller: CUmayorizacioninicioCtrl
                    }
                }
            },
            Edit: {
                url: "/utilitarios/analisiscuentas/editar",
                params: {
                    data: null
                },
                views: {
                    mayorizacion: {
                        templateUrl:
                            "src/views/contabilidad/utilitarios/mayorizacion/mayorizacionedit.htm",
                        controller: CUmayorizacioneditCtrl
                    }
                }
            }
        }
    }
    var rutaReporteifrs = {
        Balancecomprobacionanalitico: {
            Main: {
                url: "/reportesifrs/balancecomprobacionanalitico",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/balancecomprobacion/balancecomprobacion.htm",
                        controller: CRbalancecomprobacionCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportesifrs/balancecomprobacionanalitico/inicio",
                views: {
                    balancecomprobacionanalitico: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/balancecomprobacion/balancecomprobacioninicio.htm",
                        controller: CRbalancecomprobacioninicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportesifrs/balancecomprobacionanalitico/editar",
                params: {
                    data: null
                },
                views: {
                    balancecomprobacionanalitico: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/balancecomprobacion/balancecomprobacionedit.htm",
                        controller: CRbalancecomprobacioneditCtrl
                    }
                }
            }
        },
        Balancegeneralifrs: {
            Main: {
                url: "/reportesifrs/balancegeneral",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/balancegeneral/balancegeneral.htm",
                        controller: CRbalancegeneralifrsCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportesifrs/balancegeneral/inicio",
                views: {
                    balancegeneral: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/balancegeneral/balancegeneralinicio.htm",
                        controller: CRbalancegeneralifrsinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportesifrs/balancegeneral/editar",
                params: {
                    data: null
                },
                views: {
                    balancegeneral: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/balancegeneral/balancegeneraledit.htm",
                        controller: CRbalancegeneralifrseditCtrl
                    }
                }
            }
        },
        Estadoresultadosifrs: {
            Main: {
                url: "/reportesifrs/estadoresultados",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/estadoresultados/estadoresultados.htm",
                        controller: CRestadoresultadosCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportesifrs/estadoresultados/inicio",
                views: {
                    estadoresultados: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/estadoresultados/estadoresultadosinicio.htm",
                        controller: CRestadoresultadosinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportesifrs/estadoresultados/editar",
                params: {
                    data: null
                },
                views: {
                    estadoresultados: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/estadoresultados/estadoresultadosedit.htm",
                        controller: CRestadoresultadoseditCtrl
                    }
                }
            }
        },
        Gananciayperdidas: {
            Main: {
                url: "/reportesifrs/ganaciayperdidas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/gananciaperdida/gananciaperdida.htm",
                        controller: CRgananciaperdidaCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportesifrs/ganaciayperdidas/inicio",
                views: {
                    gananciaperdida: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/gananciaperdida/gananciaperdidainicio.htm",
                        controller: CRgananciaperdidainicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportesifrs/ganaciayperdidas/editar",
                params: {
                    data: null
                },
                views: {
                    gananciaperdida: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/gananciaperdida/gananciaperdidaedit.htm",
                        controller: CRgananciaperdidaeditCtrl
                    }
                }
            }
        },
        Libromayor: {
            Main: {
                url: "/reportesifrs/libromayor",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/libromayor/libromayor.htm",
                        controller: CRlibromayorCtrl
                    }
                }
            },
            Inicio: {
                url: "/reportesifrs/libromayor/inicio",
                views: {
                    libromayorifrs: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/libromayor/libromayorinicio.htm",
                        controller: CRlibromayorinicioCtrl
                    }
                }
            },
            Edit: {
                url: "/reportesifrs/libromayor/editar",
                params: {
                    data: null
                },
                views: {
                    libromayorifrs: {
                        templateUrl:
                            "src/views/contabilidad/reportesifrs/libromayor/libromayoredit.htm",
                        controller: CRlibromayoreditCtrl
                    }
                }
            }
        }
    }

    //CAJA Y BANCOS

    var rConf = {
        analisiscuenta: {
            main: {
                url: "/rconfig/analisiscuentas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/analisiscuenta/main.htm",
                        controller: CYBanalisiscuentaCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/analisiscuentas/edit",
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/analisiscuenta/edit.htm",
                        controller: CYBanalisiscuentaeditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/analisiscuentas/ini",
                views: {
                    analisiscuentas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/analisiscuenta/ini.htm",
                        controller: CYBanalisiscuentainiCtrl
                    }
                }
            }
        },
        cheques: {
            main: {
                url: "/rconfig/cheques",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/cheques/main.htm",
                        controller: CYBchequesCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/cheques/edit",
                views: {
                    cheques: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/cheques/edit.htm",
                        controller: CYBchequeseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/cheques/ini",
                views: {
                    cheques: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/cheques/ini.htm",
                        controller: CYBchequesiniCtrl
                    }
                }
            }
        },
        cuentas: {
            main: {
                url: "/rconfig/cuentas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/cuentas/main.htm",
                        controller: CYBcuentasCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/cuentas/edit",
                views: {
                    cuentas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/cuentas/edit.htm",
                        controller: CYBcuentaseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/cuentas/ini",
                views: {
                    cuentas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/cuentas/ini.htm",
                        controller: CYBcuentasiniCtrl
                    }
                }
            }
        },
        empresas: {
            main: {
                url: "/rconfig/empresas",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/empresas/main.htm",
                        controller: CYBempresasCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/empresas/edit",
                views: {
                    empresas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/empresas/edit.htm",
                        controller: CYBempresaseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/empresas/ini",
                views: {
                    empresas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/empresas/ini.htm",
                        controller: CYBempresasiniCtrl
                    }
                }
            }
        },
        librosauxiliares: {
            main: {
                url: "/rconfig/librosauxiliares",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/librosauxiliares/main.htm",
                        controller: CYBlibrosauxiliaresCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/librosauxiliares/edit",
                views: {
                    librosauxiliares: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/librosauxiliares/edit.htm",
                        controller: CYBlibrosauxiliareseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/librosauxiliares/ini",
                views: {
                    librosauxiliares: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/librosauxiliares/ini.htm",
                        controller: CYBlibrosauxiliaresiniCtrl
                    }
                }
            }
        },
        mantcomprobantes: {
            main: {
                url: "/rconfig/mantcomprobantes",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/mantcomprobante/main.htm",
                        controller: CYBmantcomprobantesCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/mantcomprobantes/edit",
                views: {
                    mantcomprobantes: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/mantcomprobante/edit.htm",
                        controller: CYBmantcomprobanteseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/mantcomprobantes/ini",
                views: {
                    mantcomprobantes: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/mantcomprobante/ini.htm",
                        controller: CYBmantcomprobantesiniCtrl
                    }
                }
            }
        },
        periodos: {
            main: {
                url: "/rconfig/periodos",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/periodo/main.htm",
                        controller: CYBperiodosCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/mantcomprobantes/edit",
                views: {
                    periodo: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/periodo/edit.htm",
                        controller: CYBperiodoseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/mantcomprobantes/ini",
                views: {
                    periodo: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/periodo/ini.htm",
                        controller: CYBperiodosiniCtrl
                    }
                }
            }
        },
        tipoanalisis: {
            main: {
                url: "/rconfig/periodos",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/tipoanalisis/main.htm",
                        controller: CYBtipoanalisisCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/mantcomprobantes/edit",
                views: {
                    tipoanalisis: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/tipoanalisis/edit.htm",
                        controller: CYBtipoanalisiseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/mantcomprobantes/ini",
                views: {
                    tipoanalisis: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/tipoanalisis/ini.htm",
                        controller: CYBtipoanalisisiniCtrl
                    }
                }
            }
        },
        tipodocumento: {
            main: {
                url: "/rconfig/tipodocumento",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/tipodocumento/main.htm",
                        controller: CYBtipodocumentoCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/tipodocumento/edit",
                views: {
                    tipodocumento: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/tipodocumento/edit.htm",
                        controller: CYBtipodocumentoseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/tipodocumento/ini",
                views: {
                    tipodocumento: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/tipodocumento/ini.htm",
                        controller: CYBtipodocumentoiniCtrl
                    }
                }
            }
        },
        xeroxareas: {
            main: {
                url: "/rconfig/xeroxarea",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxarea/main.htm",
                        controller: CYBxeroxmantareasCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxarea/edit",
                views: {
                    xeroxareas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxarea/edit.htm",
                        controller: CYBxeroxmantareaseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxarea/ini",
                views: {
                    xeroxareas: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxarea/ini.htm",
                        controller: CYBxeroxmantareasiniCtrl
                    }
                }
            }
        },
        xeroxcategorias: {
            main: {
                url: "/rconfig/xeroxcategorias",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxcategoria/main.htm",
                        controller: CYBxeroxmantcategoriasCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxcategorias/edit",
                views: {
                    xeroxcategorias: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxcategoria/edit.htm",
                        controller: CYBxeroxmantcategoriaseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxcategorias/ini",
                views: {
                    xeroxcategorias: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxcategoria/ini.htm",
                        controller: CYBxeroxmantcategoriasiniCtrl
                    }
                }
            }
        },
        xeroxcombinaciones: {
            main: {
                url: "/rconfig/xeroxcombinaciones",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxcombinaciones/main.htm",
                        controller: CYBxeroxmantcombinacionesCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxcombinaciones/edit",
                views: {
                    xeroxcombinaciones: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxcombinaciones/edit.htm",
                        controller: CYBxeroxmantcombinacioneseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxcombinaciones/ini",
                views: {
                    xeroxcombinaciones: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxcombinaciones/ini.htm",
                        controller: CYBxeroxmantcombinacionesiniCtrl
                    }
                }
            }
        },
        xeroxfirmantes: {
            main: {
                url: "/rconfig/xeroxfirmantes",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxfirmantes/main.htm",
                        controller: CYBxeroxmantfirmantesCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxfirmantes/edit",
                views: {
                    xeroxfirmantes: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxfirmantes/edit.htm",
                        controller: CYBxeroxmantfirmanteseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxfirmantes/ini",
                views: {
                    xeroxfirmantes: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxfirmantes/ini.htm",
                        controller: CYBxeroxmantfirmantesiniCtrl
                    }
                }
            }
        },
        xeroxrestricciones: {
            main: {
                url: "/rconfig/xeroxrestricciones",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxrestricciones/main.htm",
                        controller: CYBxeroxmantrestriccionesCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxrestricciones/edit",
                views: {
                    xeroxrestricciones: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxrestricciones/edit.htm",
                        controller: CYBxeroxmantrestriccioneseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxrestricciones/ini",
                views: {
                    xeroxrestricciones: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxrestricciones/ini.htm",
                        controller: CYBxeroxmantrestriccionesiniCtrl
                    }
                }
            }
        },
        xeroxmanttipofirmantes: {
            main: {
                url: "/rconfig/xeroxmanttipofirmantes",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxtipofirmantes/main.htm",
                        controller: CYBxeroxmantteipofirmantesCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxmanttipofirmantes/edit",
                views: {
                    xeroxtipofirmantes: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxtipofirmantes/edit.htm",
                        controller: CYBxeroxmanttipofirmanteseditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxmanttipofirmantes/ini",
                views: {
                    xeroxtipofirmantes: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxtipofirmantes/ini.htm",
                        controller: CYBxeroxmanttipofirmantesiniCtrl
                    }
                }
            }
        },
        xeroxtipooperacion: {
            main: {
                url: "/rconfig/xeroxtipooperacion",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxtipooperacion/main.htm",
                        controller: CYBxeroxmanttipooperacionCtrl
                    }
                }
            },
            edit: {
                url: "/rconfig/xeroxtipooperacion/edit",
                views: {
                    xeroxtipooperacion: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxtipooperacion/edit.htm",
                        controller: CYBxeroxmanttipooperacioneditCtrl
                    }
                }
            },
            ini: {
                url: "/rconfig/xeroxtipooperacion/ini",
                views: {
                    xeroxtipooperacion: {
                        templateUrl:
                            "src/views/cajaybancos/configuracion/xeroxtipooperacion/ini.htm",
                        controller: CYBxeroxmanttipooperacioniniCtrl
                    }
                }
            }
        }
    };
    var rOpe = {
        anulacioncheques: {
            main: {
                url: "/ropera/anulacioncheques",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/anulacioncheques/main.htm",
                        controller: CYBanulacionchequescontabilizadosCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/anulacioncheques/edit",
                views: {
                    anulacioncheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/anulacioncheques/edit.htm",
                        controller: CYBanulacionchequescontabilizadoseditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/anulacioncheques/ini",
                views: {
                    anulacioncheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/anulacioncheques/ini.htm",
                        controller: CYBanulacionchequescontabilizadosiniCtrl
                    }
                }
            }
        },
        anulacionmasiva: {
            main: {
                url: "/ropera/anulacionmasiva",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/anulacionmasiva/main.htm",
                        controller: CYBanulacionmasivachequesCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/anulacionmasiva/edit",
                views: {
                    anulacionmasiva: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/anulacionmasiva/edit.htm",
                        controller: CYBanulacionmasivachequeseditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/anulacionmasiva/ini",
                views: {
                    anulacionmasiva: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/anulacionmasiva/ini.htm",
                        controller: CYBanulacionmasivachequesiniCtrl
                    }
                }
            }
        },
        conciliacionbancaria: {
            main: {
                url: "/ropera/conciliacionbancaria",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/conciliacionbancaria/main.htm",
                        controller: CYBconciliacionbancariaCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/conciliacionbancaria/edit",
                views: {
                    conciliacionbancaria: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/conciliacionbancaria/edit.htm",
                        controller: CYBconciliacionbancariaeditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/conciliacionbancaria/ini",
                views: {
                    conciliacionbancaria: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/conciliacionbancaria/ini.htm",
                        controller: CYBconciliacionbancariainiCtrl
                    }
                }
            }
        },
        consultacheques: {
            main: {
                url: "/ropera/consultacheques",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/consultacheques/main.htm",
                        controller: CYBconsultaimpresionchequesCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/consultacheques/edit",
                views: {
                    consultacheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/consultacheques/edit.htm",
                        controller: CYBconsultaimpresionchequeseditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/consultacheques/ini",
                views: {
                    consultacheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/consultacheques/ini.htm",
                        controller: CYBconsultaimpresionchequesiniCtrl
                    }
                }
            }
        },
        emisioncheques: {
            main: {
                url: "/ropera/emisioncheques",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/emisioncheques/main.htm",
                        controller: CYBemisionchequesCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/emisioncheques/edit",
                views: {
                    emisioncheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/emisioncheques/edit.htm",
                        controller: CYBemisionchequeseditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/emisioncheques/ini",
                views: {
                    emisioncheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/emisioncheques/ini.htm",
                        controller: CYBemisionchequesiniCtrl
                    }
                }
            }
        },
        comprobanteretencion: {
            main: {
                url: "/ropera/comprobanteretencion",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/comprobanteretencion/main.htm",
                        controller: CYBenviacomprobanteCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/comprobanteretencion/edit",
                views: {
                    enviarcomprobante: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/comprobanteretencion/edit.htm",
                        controller: CYBenviacomprobanteeditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/comprobanteretencion/ini",
                views: {
                    enviarcomprobante: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/comprobanteretencion/ini.htm",
                        controller: CYBenviacomprobanteiniCtrl
                    }
                }
            }
        },
        impresioncomprobante: {
            main: {
                url: "/ropera/impresioncomprobante",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/impresioncomprobante/main.htm",
                        controller: CYBimpresioncomprobanteCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/impresioncomprobante/edit",
                views: {
                    impresioncomprobante: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/impresioncomprobante/edit.htm",
                        controller: CYBimpresioncomprobanteeditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/impresioncomprobante/ini",
                views: {
                    impresioncomprobante: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/impresioncomprobante/ini.htm",
                        controller: CYBimpresioncomprobanteiniCtrl
                    }
                }
            }
        },
        liberacioncheques: {
            main: {
                url: "/ropera/liberacioncheques",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/liberacioncheques/main.htm",
                        controller: CYBliberacionchequesCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/liberacioncheques/edit",
                views: {
                    liberacioncheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/liberacioncheques/edit.htm",
                        controller: CYBliberacionchequeseditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/liberacioncheques/ini",
                views: {
                    liberacioncheques: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/liberacioncheques/ini.htm",
                        controller: CYBliberacionchequesiniCtrl
                    }
                }
            }
        },
        registromovimiento: {
            main: {
                url: "/ropera/registromovimiento",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/registromovimiento/main.htm",
                        controller: CYBregistromovimientoCtrl
                    }
                }
            },
            edit: {
                url: "/ropera/registromovimiento/edit",
                views: {
                    registromovimiento: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/registromovimiento/edit.htm",
                        controller: CYBregistromovimientoeditCtrl
                    }
                }
            },
            ini: {
                url: "/ropera/registromovimiento/ini",
                views: {
                    registromovimiento: {
                        templateUrl:
                            "src/views/cajaybancos/operaciones/registromovimiento/ini.htm",
                        controller: CYBregistromovimientoiniCtrl
                    }
                }
            }
        }
    };
    var rRep = {
        analisiscuenta: {
            main: {
                url: "/rreport/registromovimiento",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/reportes/analisiscuenta/main.htm",
                        controller: CYBrepanalisiscuentaCtrl
                    }
                }
            },
            edit: {
                url: "/rreport/registromovimiento/edit",
                views: {
                    analisisdecuentas: {
                        templateUrl:
                            "src/views/cajaybancos/reportes/analisiscuenta/edit.htm",
                        controller: CYBrepanalisiscuentaeditCtrl
                    }
                }
            },
            ini: {
                url: "/rreport/registromovimiento/ini",
                views: {
                    analisisdecuentas: {
                        templateUrl:
                            "src/views/cajaybancos/reportes/analisiscuenta/ini.htm",
                        controller: CYBrepanalisiscuentainiCtrl
                    }
                }
            }
        }
    };
    var rUtil = {
        tranferenciacontabilidad: {
            main: {
                url: "/rutilitarios/tranferenciacontabilidad",
                views: {
                    contenido: {
                        templateUrl:
                            "src/views/cajaybancos/utilitarios/transferenciacontabilidad/main.htm",
                        controller: CYBtransferenciacontabilidadCtrl
                    }
                }
            },
            edit: {
                url: "/rutilitarios/tranferenciacontabilidad/edit",
                views: {
                    transcontabilidad: {
                        templateUrl:
                            "src/views/cajaybancos/utilitarios/transferenciacontabilidad/edit.htm",
                        controller: CYBtransferenciacontabilidadeditCtrl
                    }
                }
            },
            ini: {
                url: "/rutilitarios/tranferenciacontabilidad/ini",
                views: {
                    transcontabilidad: {
                        templateUrl:
                            "src/views/cajaybancos/utilitarios/transferenciacontabilidad/ini.htm",
                        controller: CYBtransferenciacontabilidadinicioCtrl
                    }
                }
            }
        }
    };

    $stateProvider
        .state("index.404", rutaerror)
        .state("index", rutaindex)
        .state("index.contenido", rutadashboard)
        //1. CONFIGURACION > ASIENTOS TIPO
        .state("index.configuracion_asientostipo", rutaConfiguracion.AsientosTipo.Main)
        .state("index.configuracion_asientostipo.inicio", rutaConfiguracion.AsientosTipo.Inicio)
        .state("index.configuracion_asientostipo.editar", rutaConfiguracion.AsientosTipo.Edit)
        //1. CONFIGURACION > CUENTA CORRIENTE
        .state("index.configuracion_cuentacorriente", rutaConfiguracion.Cuentacorriente.Main)
        .state("index.configuracion_cuentacorriente.inicio", rutaConfiguracion.Cuentacorriente.Inicio)
        .state("index.configuracion_cuentacorriente.editar", rutaConfiguracion.Cuentacorriente.Edit)
        //EMPRESA
        .state("index.configuracion_empresa", rutaConfiguracion.Empresa.Main)
        .state("index.configuracion_empresa.inicio", rutaConfiguracion.Empresa.Inicio)
        .state("index.configuracion_empresa.editar", rutaConfiguracion.Empresa.Edit)
        //1. CONFIGURACION > HISTORICO TIPO CAMBIO
        .state("index.configuracion_historicotipocambio", rutaConfiguracion.Historicotipocambio.Main)
        .state("index.configuracion_historicotipocambio.inicio", rutaConfiguracion.Historicotipocambio.Inicio)
        .state("index.configuracion_historicotipocambio.editar", rutaConfiguracion.Historicotipocambio.Edit)
        //1. CONFIGURACION > LIBROS AUXILIARES
        .state("index.configuracion_lisbrosauxiliares", rutaConfiguracion.Librosauxiliares.Main)
        .state("index.configuracion_lisbrosauxiliares.inicio", rutaConfiguracion.Librosauxiliares.Inicio)
        .state("index.configuracion_lisbrosauxiliares.editar", rutaConfiguracion.Librosauxiliares.Edit)
        //1. CONFIGURACION > TIPO DE ANALISIS
        .state("index.configuracion_tipoanalisis", rutaConfiguracion.Tipoanalisis.Main)
        .state("index.configuracion_tipoanalisis.inicio", rutaConfiguracion.Tipoanalisis.Inicio)
        .state("index.configuracion_tipoanalisis.editar", rutaConfiguracion.Tipoanalisis.Edit)
        //1. CONFIGURACION > TIPOS DE DOCUMENTOS
        .state("index.configuracion_tipodocumentos", rutaConfiguracion.Tipodocumento.Main)
        .state("index.configuracion_tipodocumentos.inicio", rutaConfiguracion.Tipodocumento.Inicio)
        .state("index.configuracion_tipodocumentos.editar", rutaConfiguracion.Tipodocumento.Edit)
        //2. CONTROL > ANALISIS DE CUENTAS
        .state("index.control_analisiscuentas", rutaControl.Analisiscuenta.Main)
        .state("index.control_analisiscuentas.inicio", rutaControl.Analisiscuenta.Inicio)
        .state("index.control_analisiscuentas.editar0", rutaControl.Analisiscuenta.Edit0)
        .state("index.control_analisiscuentas.editar1", rutaControl.Analisiscuenta.Edit1)
        .state("index.control_analisiscuentas.editar2", rutaControl.Analisiscuenta.Edit2)
        //3. OPERACIONAL > AJUSTE POR DIFERENCIA DE CAMBIO
        .state("index.operacional_ajustediferenciacambio", rutaOperacional.Ajustepordiferenciadecambio.Main)
        .state("index.operacional_ajustediferenciacambio.inicio", rutaOperacional.Ajustepordiferenciadecambio.Inicio)
        .state("index.operacional_ajustediferenciacambio.editar", rutaOperacional.Ajustepordiferenciadecambio.Edit)
        //3. OPERACIONAL > CONSULTA DE VOUCHER
        .state("index.operacional_consultavoucher", rutaOperacional.Consultavoucher.Main)
        .state("index.operacional_consultavoucher.inicio", rutaOperacional.Consultavoucher.Inicio)
        .state("index.operacional_consultavoucher.editar", rutaOperacional.Consultavoucher.Edit)
        //3. OPERACIONAL > GENERACION DE FORMATOS SUCAVE
        .state("index.operacional_formatossucave", rutaOperacional.Generacionformatossucave.Main)
        .state("index.operacional_formatossucave.inicio", rutaOperacional.Generacionformatossucave.Inicio)
        .state("index.operacional_formatossucave.editar", rutaOperacional.Generacionformatossucave.Edit)
        //3. OPERACIONAL > INTERFACES GENERACION DE TXT
        .state("index.operacional_generaciontxt", rutaOperacional.Interfacegeneraciontxt.Main)
        .state("index.operacional_generaciontxt.inicio", rutaOperacional.Interfacegeneraciontxt.Inicio)
        .state("index.operacional_generaciontxt.editar", rutaOperacional.Interfacegeneraciontxt.Edit)
        //3. OPERACIONAL > INTERFACES MANT. DE PLANTILLAS
        .state("index.operacional_mantplantillas", rutaOperacional.Interfacemantenimientoplantillas.Main)
        .state("index.operacional_mantplantillas.inicio", rutaOperacional.Interfacemantenimientoplantillas.Inicio)
        .state("index.operacional_mantplantillas.editar", rutaOperacional.Interfacemantenimientoplantillas.Edit)
        .state("index.operacional_mantplantillas.editarcolumnas", rutaOperacional.Interfacemantenimientoplantillas.EditColumnas)
        .state("index.operacional_mantplantillas.editarcuentas", rutaOperacional.Interfacemantenimientoplantillas.EditCuentas)
        .state("index.operacional_mantplantillas.editarreferencias", rutaOperacional.Interfacemantenimientoplantillas.EditReferencias)
        //3. OPERACIONAL > LIBRO BANCOS
        .state("index.operacional_librobancos", rutaOperacional.Librobancos.Main)
        .state("index.operacional_librobancos.inicio", rutaOperacional.Librobancos.Inicio)
        .state("index.operacional_librobancos.editar", rutaOperacional.Librobancos.Edit)
        //3. OPERACIONAL > LIBRO CAJA
        .state("index.operacional_librocaja", rutaOperacional.Librocaja.Main)
        .state("index.operacional_librocaja.inicio", rutaOperacional.Librocaja.Inicio)
        .state("index.operacional_librocaja.editar", rutaOperacional.Librocaja.Edit)
        //3. OPERACIONAL > LIBRO MAYOR
        .state("index.operacional_libromayor", rutaOperacional.Libromayor.Main)
        .state("index.operacional_libromayor.inicio", rutaOperacional.Libromayor.Inicio)
        .state("index.operacional_libromayor.editar", rutaOperacional.Libromayor.Edit)
        //3. OPERACIONAL > PLAN DE CUENTAS
        .state("index.operacional_plancuentas", rutaOperacional.Plancuentas.Main)
        .state("index.operacional_plancuentas.inicio", rutaOperacional.Plancuentas.Inicio)
        .state("index.operacional_plancuentas.editar", rutaOperacional.Plancuentas.Edit)
        //3. OPERACIONAL > REGISTRO DE ASIENTOS TIPO
        .state("index.operacional_asientostipo", rutaOperacional.Registroasientostipo.Main)
        .state("index.operacional_asientostipo.inicio", rutaOperacional.Registroasientostipo.Inicio)
        .state("index.operacional_asientostipo.editar", rutaOperacional.Registroasientostipo.Edit)
        //3. OPERACIONAL > REGISTRO DE VOUCHER
        .state("index.operacional_rvoucher", rutaOperacional.Registrovoucher.Main)
        .state("index.operacional_rvoucher.inicio", rutaOperacional.Registrovoucher.Inicio)
        .state("index.operacional_rvoucher.editar", rutaOperacional.Registrovoucher.Edit)
        //4. REPORTES > ANALISIS DE CENTROS DE COSTO
        .state("index.reportes_centrosdecosto", rutaReportes.Analisiscentrocosto.Main)
        .state("index.reportes_centrosdecosto.inicio", rutaReportes.Analisiscentrocosto.Inicio)
        .state("index.reportes_centrosdecosto.editar", rutaReportes.Analisiscentrocosto.Edit)
        //4. REPORTES > ANALISIS DE CENTROS DE GESTION Y DIRECTORIO
        .state("index.reportes_centrosgestion", rutaReportes.Analisiscentrogestiondirectorio.Main)
        .state("index.reportes_centrosgestion.inicio", rutaReportes.Analisiscentrogestiondirectorio.Inicio)
        .state("index.reportes_centrosgestion.editar", rutaReportes.Analisiscentrogestiondirectorio.Edit)
        //4. REPORTES > ANALISIS DE CUENTA CORRIENTE
        .state("index.reportes_cuentacorriente", rutaReportes.Analisiscuentacorriente.Main)
        .state("index.reportes_cuentacorriente.inicio", rutaReportes.Analisiscuentacorriente.Inicio)
        .state("index.reportes_cuentacorriente.editar", rutaReportes.Analisiscuentacorriente.Edit)
        //4. REPORTES > BALANCE DE COMPROBACION ANALITICO
        .state("index.reportes_balancecomprobacion", rutaReportes.Balancecomprobacionanalitico.Main)
        .state("index.reportes_balancecomprobacion.inicio", rutaReportes.Balancecomprobacionanalitico.Inicio)
        .state("index.reportes_balancecomprobacion.editar", rutaReportes.Balancecomprobacionanalitico.Edit)
        //4. REPORTES > BALANCE GENERAL
        .state("index.reportes_balancegeneracion", rutaReportes.Balancegeneral.Main)
        .state("index.reportes_balancegeneracion.inicio", rutaReportes.Balancegeneral.Inicio)
        .state("index.reportes_balancegeneracion.editar", rutaReportes.Balancegeneral.Edit)
        //4. REPORTES > ESTADO DE GANANCIAS Y PERDIDAS
        .state("index.reportes_gananciaperdida", rutaReportes.Estadodegananciasyperdidas.Main)
        .state("index.reportes_gananciaperdida.inicio", rutaReportes.Estadodegananciasyperdidas.Inicio)
        .state("index.reportes_gananciaperdida.editar", rutaReportes.Estadodegananciasyperdidas.Edit)
        //4. REPORTES > GASTOS POR CENTRO DE COSTO
        .state("index.reportes_gastoscentrocosto", rutaReportes.Gastoscentrocosto.Main)
        .state("index.reportes_gastoscentrocosto.inicio", rutaReportes.Gastoscentrocosto.Inicio)
        .state("index.reportes_gastoscentrocosto.editar", rutaReportes.Gastoscentrocosto.Edit)
        //4. REPORTES > REGISTRO DE RETENCIONES PROVEEDOR
        .state("index.reportes_rretencionesproveedor", rutaReportes.Registroretencionesproveedor.Main)
        .state("index.reportes_rretencionesproveedor.inicio", rutaReportes.Registroretencionesproveedor.Inicio)
        .state("index.reportes_rretencionesproveedor.editar", rutaReportes.Registroretencionesproveedor.Edit)
        //5. AJUSTES POR INFLACION > APERTURA
        .state("index.ajustes_apertura", rutaAjustesinflacion.Apertura.Main)
        .state("index.ajustes_apertura.inicio", rutaAjustesinflacion.Apertura.Inicio)
        .state("index.ajustes_apertura.editar", rutaAjustesinflacion.Apertura.Edit)
        //6. UTILITARIOS > CIERRE APERTURA DEL AÑO
        .state("index.utilitarios_cierreapertura", rutaUtilitarios.Cierreaperturaaño.Main)
        .state("index.utilitarios_cierreapertura.inicio", rutaUtilitarios.Cierreaperturaaño.Inicio)
        .state("index.utilitarios_cierreapertura.editar", rutaUtilitarios.Cierreaperturaaño.Edit)
        //6. UTILITARIOS > IMPORTACION DE INFORMACION
        .state("index.utilitarios_importacioninformacion", rutaUtilitarios.Importacioninformacion.Main)
        .state("index.utilitarios_importacioninformacion.inicio", rutaUtilitarios.Importacioninformacion.Inicio)
        .state("index.utilitarios_importacioninformacion.editar", rutaUtilitarios.Importacioninformacion.Edit)
        //6. UTILITARIOS > MAYORIZACION
        .state("index.utilitarios_mayorizacion", rutaUtilitarios.Mayorizacion.Main)
        .state("index.utilitarios_mayorizacion.inicio", rutaUtilitarios.Mayorizacion.Inicio)
        .state("index.utilitarios_mayorizacion.editar", rutaUtilitarios.Mayorizacion.Edit)
        //7. REPORTES IFRS > BALANCE DE COMPROBACION ANALITICO IFRS
        .state("index.reportesifrs_balancecomprobacion", rutaReporteifrs.Balancecomprobacionanalitico.Main)
        .state("index.reportesifrs_balancecomprobacion.inicio", rutaReporteifrs.Balancecomprobacionanalitico.Inicio)
        .state("index.reportesifrs_balancecomprobacion.editar", rutaReporteifrs.Balancecomprobacionanalitico.Edit)
        //7. REPORTES IFRS > BALANCE GENERAL IFRS
        .state("index.reportesifrs_balancegeneral", rutaReporteifrs.Balancegeneralifrs.Main)
        .state("index.reportesifrs_balancegeneral.inicio", rutaReporteifrs.Balancegeneralifrs.Inicio)
        .state("index.reportesifrs_balancegeneral.editar", rutaReporteifrs.Balancegeneralifrs.Edit)
        //7. REPORTES IFRS > ESTADO DE RESULTADOS IFRS
        .state("index.reportesifrs_estadoresultados", rutaReporteifrs.Estadoresultadosifrs.Main)
        .state("index.reportesifrs_estadoresultados.inicio", rutaReporteifrs.Estadoresultadosifrs.Inicio)
        .state("index.reportesifrs_estadoresultados.editar", rutaReporteifrs.Estadoresultadosifrs.Edit)
        //7. REPORTES IFRS > GANANCIA Y PERDIDAS IFRS
        .state("index.reportesifrs_gananciaperdidas", rutaReporteifrs.Gananciayperdidas.Main)
        .state("index.reportesifrs_gananciaperdidas.inicio", rutaReporteifrs.Gananciayperdidas.Inicio)
        .state("index.reportesifrs_gananciaperdidas.editar", rutaReporteifrs.Gananciayperdidas.Edit)
        //7. REPORTES IFRS > LIBRO MAYOR IFRS
        .state("index.reportesifrs_libromayor", rutaReporteifrs.Libromayor.Main)
        .state("index.reportesifrs_libromayor.inicio", rutaReporteifrs.Libromayor.Inicio)
        .state("index.reportesifrs_libromayor.editar", rutaReporteifrs.Libromayor.Edit)
        //CAJA Y BANCOS
        //1. CONFIGURACION > ANALISIS DE CUENTAS CORRIENTES
        .state("index.conf_analisiscuenta", rConf.analisiscuenta.main)
        .state("index.conf_analisiscuenta.ini", rConf.analisiscuenta.ini)
        .state("index.conf_analisiscuenta.edit", rConf.analisiscuenta.edit)
        //2. CONFIGURACION > CHEQUES
        .state("index.conf_cheques", rConf.cheques.main)
        .state("index.conf_cheques.ini", rConf.cheques.ini)
        .state("index.conf_cheques.edit", rConf.cheques.edit)
        //3. CONFIGURACION > CUENTAS
        .state("index.conf_cuentas", rConf.cuentas.main)
        .state("index.conf_cuentas.ini", rConf.cuentas.ini)
        .state("index.conf_cuentas.edit", rConf.cuentas.edit)
        //4. CONFIGURACION > EMPRESAS
        .state("index.config_empresas", rConf.empresas.main)
        .state("index.config_empresas.ini", rConf.empresas.ini)
        .state("index.config_empresas.edit", rConf.empresas.edit)
        //5. CONFIGURACION > LIBROS AUXILIARES
        .state("index.config_librosauxiliares", rConf.librosauxiliares.main)
        .state("index.config_librosauxiliares.ini", rConf.librosauxiliares.ini)
        .state("index.config_librosauxiliares.edit", rConf.librosauxiliares.edit)
        //6. CONFIGURACION > MANTENIMIENTO CONCEPTO COMPROBANTE
        .state("index.config_mantcomprobantes", rConf.mantcomprobantes.main)
        .state("index.config_mantcomprobantes.ini", rConf.mantcomprobantes.ini)
        .state("index.config_mantcomprobantes.edit", rConf.mantcomprobantes.edit)
        //7. CONFIGURACION > PERIODO
        .state("index.config_periodo", rConf.periodos.main)
        .state("index.config_periodo.ini", rConf.periodos.ini)
        .state("index.config_periodo.edit", rConf.periodos.edit)
        //8. CONFIGURACION > TIPO DE ANALISIS
        .state("index.config_tipoanalisis", rConf.tipoanalisis.main)
        .state("index.config_tipoanalisis.ini", rConf.tipoanalisis.ini)
        .state("index.config_tipoanalisis.edit", rConf.tipoanalisis.edit)
        //9. CONFIGURACION > TIPO DE DOCUMENTO
        .state("index.config_tipodocumento", rConf.tipodocumento.main)
        .state("index.config_tipodocumento.ini", rConf.tipodocumento.ini)
        .state("index.config_tipodocumento.edit", rConf.tipodocumento.edit)
        //10. CONFIGURACION > XEROX MANT. AREAS
        .state("index.config_xeroxarea", rConf.xeroxareas.main)
        .state("index.config_xeroxarea.ini", rConf.xeroxareas.ini)
        .state("index.config_xeroxarea.edit", rConf.xeroxareas.edit)
        //11. CONFIGURACION > XEROX MANT. CATEGORIAS
        .state("index.config_xeroxcategorias", rConf.xeroxcategorias.main)
        .state("index.config_xeroxcategorias.ini", rConf.xeroxcategorias.ini)
        .state("index.config_xeroxcategorias.edit", rConf.xeroxcategorias.edit)
        //12. CONFIGURACION > XEROX MANT. COMBINACIONES
        .state("index.config_xeroxcombinaciones", rConf.xeroxcombinaciones.main)
        .state("index.config_xeroxcombinaciones.ini", rConf.xeroxcombinaciones.ini)
        .state("index.config_xeroxcombinaciones.edit", rConf.xeroxcombinaciones.edit)
        //13. CONFIGURACION > XEROX MANT. FIRMANTES
        .state("index.config_xeroxfirmante", rConf.xeroxfirmantes.main)
        .state("index.config_xeroxfirmante.ini", rConf.xeroxfirmantes.ini)
        .state("index.config_xeroxfirmante.edit", rConf.xeroxfirmantes.edit)
        //14. CONFIGURACION > XEROX MANT. RESTRICCIONES
        .state("index.config_xeroxrestricciones", rConf.xeroxrestricciones.main)
        .state("index.config_xeroxrestricciones.ini", rConf.xeroxrestricciones.ini)
        .state("index.config_xeroxrestricciones.edit", rConf.xeroxrestricciones.edit)
        //15. CONFIGURACION > XEROX MANT. TIPO DE FIRMANTES
        .state("index.config_xeroxtipofirmantes", rConf.xeroxmanttipofirmantes.main)
        .state("index.config_xeroxtipofirmantes.ini", rConf.xeroxmanttipofirmantes.ini)
        .state("index.config_xeroxtipofirmantes.edit", rConf.xeroxmanttipofirmantes.edit)
        //16. CONFIGURACION > XEROX MANT. TIPO DE OPERACION
        .state("index.config_xeroxtipooperacion", rConf.xeroxtipooperacion.main)
        .state("index.config_xeroxtipooperacion.ini", rConf.xeroxtipooperacion.ini)
        .state("index.config_xeroxtipooperacion.edit", rConf.xeroxtipooperacion.edit)
        //1. OPERACIONES > ANULACION DE CHEQUES CONTABILIZADOS
        .state("index.opera_anulacioncheques", rOpe.anulacioncheques.main)
        .state("index.opera_anulacioncheques.ini", rOpe.anulacioncheques.ini)
        .state("index.opera_anulacioncheques.edit", rOpe.anulacioncheques.edit)
        //2. OPERACIONES > ANULACION MASIVA DE CHEQUES
        .state("index.opera_anulacionmasiva", rOpe.anulacionmasiva.main)
        .state("index.opera_anulacionmasiva.ini", rOpe.anulacionmasiva.ini)
        .state("index.opera_anulacionmasiva.edit", rOpe.anulacionmasiva.edit)
        //3. OPERACIONES > CONCILIACION BANCARIA
        .state("index.opera_conciliacionbancaria", rOpe.conciliacionbancaria.main)
        .state("index.opera_conciliacionbancaria.ini", rOpe.conciliacionbancaria.ini)
        .state("index.opera_conciliacionbancaria.edit", rOpe.conciliacionbancaria.edit)
        //4. OPERACIONES > CONSULTA E IMPRESION DE CHEQUES
        .state("index.opera_consultacheques", rOpe.consultacheques.main)
        .state("index.opera_consultacheques.ini", rOpe.consultacheques.ini)
        .state("index.opera_consultacheques.edit", rOpe.consultacheques.edit)
        //5. OPERACIONES > EMISION DE CHEQUES
        .state("index.opera_emisioncheques", rOpe.emisioncheques.main)
        .state("index.opera_emisioncheques.ini", rOpe.emisioncheques.ini)
        .state("index.opera_emisioncheques.edit", rOpe.emisioncheques.edit)
        //6. OPERACIONES > ENVIA COMPROBANTE RETENCION-SUNAT
        .state("index.opera_comprobanteretencion", rOpe.comprobanteretencion.main)
        .state("index.opera_comprobanteretencion.ini", rOpe.comprobanteretencion.ini)
        .state("index.opera_comprobanteretencion.edit", rOpe.comprobanteretencion.edit)
        //7. OPERACIONES > IMPRESION DE COMPROBANTES
        .state("index.opera_impresioncomprobante", rOpe.impresioncomprobante.main)
        .state("index.opera_impresioncomprobante.ini", rOpe.impresioncomprobante.ini)
        .state("index.opera_impresioncomprobante.edit", rOpe.impresioncomprobante.edit)
        //8. OPERACIONES > LIBERACION DE CHEQUES
        .state("index.opera_liberacioncheques", rOpe.liberacioncheques.main)
        .state("index.opera_liberacioncheques.ini", rOpe.liberacioncheques.ini)
        .state("index.opera_liberacioncheques.edit", rOpe.liberacioncheques.edit)
        //9. OPERACIONES > REGISTRO MOVIMIENTO
        .state("index.opera_registromovimiento", rOpe.registromovimiento.main)
        .state("index.opera_registromovimiento.ini", rOpe.registromovimiento.ini)
        .state("index.opera_registromovimiento.edit", rOpe.registromovimiento.edit)
        //1. REPORTES > ANALISIS DE CUENTAS
        .state("index.report_analisiscuenta", rRep.analisiscuenta.main)
        .state("index.report_analisiscuenta.ini", rRep.analisiscuenta.ini)
        .state("index.report_analisiscuenta.edit", rRep.analisiscuenta.edit)
        //1. UTILITARIOS > TRANSFERENCIA A CONTABILIDAD
        .state("index.util_transferenciacontabilidad", rUtil.tranferenciacontabilidad.main)
        .state("index.util_transferenciacontabilidad.ini", rUtil.tranferenciacontabilidad.ini)
        .state("index.util_transferenciacontabilidad.edit", rUtil.tranferenciacontabilidad.edit);

    $httpProvider.interceptors.push(function ($q, $location, $window) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    config.headers.Authorization = "Bearer " + $window.localStorage.token;
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path("/signin");
                }
                return $q.reject(response);
            }
        };
    });
});

app.run(function ($rootScope, $interval) {
    var getReloj = function () {
        $rootScope.fecha = moment().format("MMMM Do YYYY, h:mm:ss a");
    };
    $interval(getReloj, 1000);
});
