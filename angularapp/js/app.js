/**
 * 
 */
(function() {
    var app = angular.module('autos', []);
    app.controller("StoreController", function() {
        this.products = phones;
    });
    app.controller("PanelController", function() {
        this.tab = 1;
        this.selectTab = function(setTab) {
            this.tab = setTab;
        };
        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });
    app.controller("TipoDocumentoController", function()
    {
        this.tiposDocumento = tiposDocumentoDummy;
    });
    app.controller("TipoVehiculoController", function()
    {
        this.tiposVehiculo = tiposVehiculoDummy;
    });
    app.controller("TipoAfiliacionController", function()
    {
        this.tiposAfiliacion = tiposAfiliacionDummy;
    });
    app.controller("ReviewController", function() {
        this.review = {};
        this.addReview = function(product)
        {
            this.review.createdOn = Date.now();
            product.reviews.push(this.review);
            this.review = {};
        };
    });
    app.directive('productTitle', function() {
        return {
            restrict: 'E',
            templateUrl: "product-title.html"
        };
    });
    var cliente = {
        tipoDocumento: {id: 1, name: "Cedula"},
        numeroDocumento: 1037524435,
        primerNombre: "Juan",
        segundoNombre: "David",
        primerApellido: "Agudelo",
        segundoApellido: "Alvarez",
        tipoCliente: {id: 1, name: "Afiliado"},
        fechaNacimiento: "12/03/1990"
    };
    var tiposDocumentoDummy = [
        {id: 1, name: "Cedula"}, {id: 2, name: "Tarjeta de Identidad"}, {id: 3, name: "Registro Civil"}, {id: 4, name: "Pasaporte"}
    ];
    var tiposAfiliacionDummy = [
        {id: 1, name: "Afiliado"}, {id: 2, name: "Asegurado"}
    ];
    var tiposVehiculoDummy = [{id: 1, name: "Campero"}, {id: 2, name: "Automóvil"}, {id: 3, name: "Moto"}];
    var vehiculo =
            {
                tipoVehivulo: {id: 1, name: "Campero"},
                referencia: "129992",
                numeroPoliza: 1666272,
                fechaInicioVigenciaPoliza: "12/03/2013",
                fechaFinVigenciaPoliza: "12/03/2017"
            };
    var incidente = {
        fechaIncidente: "12/03/2014",
        motivoIncidente: "Este es el motivo",
        descripcion: "Descripción del Incidente",
        valorAproximadoReparacion: "10000000",
        culpable: "SI",
        lugarIncidente: "calle abc #123",
        vehiculo: {
            tipoVehivulo: {id: 1, name: "Campero"},
            referencia: "129992",
            numeroPoliza: 1666272,
            fechaInicioVigenciaPoliza: "12/03/2013",
            fechaFinVigenciaPoliza: "12/03/2017"
        },
        cliente: {
            tipoDocumento: {id: 1, name: "Cedula"},
            numeroDocumento: 1037524435,
            primerNombre: "Juan",
            segundoNombre: "David",
            primerApellido: "Agudelo",
            segundoApellido: "Alvarez",
            tipoCliente: {id: 1, name: "Afiliado"},
            fechaNacimiento: "12/03/1990"
        }
    };
})();
