/**
 * 
 */
(function() {
    var app = angular.module('autos', []);
    //controller para los tab
    app.controller("PanelController", function() {
        this.tab = 1;
        this.selectTab = function(setTab) {
            this.tab = setTab;
        };
        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        };
    });
    app.controller("IncidenteController", function()
    {
        this.incidente = {};
        this.addIncidente = function(){
            //aqui se debe consumir el servicio para almacenar los incidentes
            incidentes.push(this.incidente);
            alert(JSON.stringify(incidentes));
            this.incidente = {};
        };
    });
    app.controller("TipoDocumentoController", function()
    {
        //aqui se debe consumir el servicio de tipos de documento
        this.tiposDocumento = tiposDocumentoDummy;
    });
    app.controller("TipoVehiculoController", function()
    {
        //aqui se debe consumir el servicio de tipo de vehiculo            
        this.tiposVehiculo = tiposVehiculoDummy;
    });
    app.controller("TipoAfiliacionController", function()
    {
        //aqui se debe consumir el servicio de tipos de clientes
        this.tiposAfiliacion = tiposAfiliacionDummy;
    });
 
    //Ejemplos del JSON esperado por el FrontEnd
    var incidentes = [];
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
