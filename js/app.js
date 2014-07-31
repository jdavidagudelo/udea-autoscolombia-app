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

//Código para formatear el campo de valor reparación de incidente como un valor monetario en pesos

app.controller('valorreparacionCtrl', function () {});

app.directive('realTimeCurrency', function ($filter, $locale) {
    var decimalSep = $locale.NUMBER_FORMATS.DECIMAL_SEP;
    var toNumberRegex = new RegExp('[^0-9\\' + decimalSep + ']', 'g');
    var trailingZerosRegex = new RegExp('\\' + decimalSep + '0+$');
    var filterFunc = function (value) {
        return $filter('currency')(value);
    };

    function getCaretPosition(input){
        if (!input) return 0;
        if (input.selectionStart !== undefined) {
            return input.selectionStart;
        } else if (document.selection) {
            input.focus();
            var selection = document.selection.createRange();
            selection.moveStart('character', input.value ? -input.value.length : 0);
            return selection.text.length;
        }
        return 0;
    }

    function setCaretPosition(input, pos){
        if (!input) return 0;
        if (input.offsetWidth === 0 || input.offsetHeight === 0) {
            return; //Manejo del input
        }
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(pos, pos);
        }
        else if (input.createTextRange) {
            //Separación de caracteres
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    
    function toNumber(currencyStr) {
        return parseFloat(currencyStr.replace(toNumberRegex, ''), 10);
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: function postLink(scope, elem, attrs, valorreparacionCtrl) {    
            valorreparacionCtrl.$formatters.push(filterFunc);
            valorreparacionCtrl.$parsers.push(function (newViewValue) {
                var oldModelValue = valorreparacionCtrl.$modelValue;
                var ModelValue = toNumber(newViewValue);
                valorreparacionCtrl.$viewValue = filterFunc(ModelValue);
                var pos = getCaretPosition(elem[0]);
                elem.val(valorreparacionCtrl.$viewValue);
                var newPos = pos + valorreparacionCtrl.$viewValue.length -
                                   newViewValue.length;
                if ((oldModelValue === undefined) || isNaN(oldModelValue)) {
                    newPos -= 3;
                }
                setCaretPosition(elem[0], newPos);
                return ModelValue;
            });
        }
    };
});


//termina cod

    app.controller("TipoDocumentoController", function()
    {
        //aqui se debe consumir el servicio de tipos de documento
        this.tiposDocumento = tiposDocumentoDummy;
    });

    app.controller("MotivoIncidenteController", function()
    {
        //aqui se debe consumir el servicio de motivos de incidente
        this.motivosIncidente = motivosIncidentesDummy;
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
        {id: "C", name: "Cedula"}, {id: "T", name: "Tarjeta de Identidad"}, {id: "R", name: "Registro Civil"}, {id: "P", name: "Pasaporte"}
    ];
    var tiposAfiliacionDummy = [
        {id: 1, name: "Afiliado"}, {id: 2, name: "Asegurado"}
    ];
    var tiposVehiculoDummy = [{id: 1, name: "Campero"}, {id: 2, name: "Automóvil"}, {id: 3, name: "Moto"}];
    var motivosIncidentesDummy= [{id:1, name:"Exceso de velocidad"}, {id:2, name:"Imprudencia del conductor"}, {id:3, name:"Imprudencia del peatón"}, {id:4, name:"Ebriedad del conductor"},
    {id:5, name:"Imprudencia del pasajero"}, {id:6, name:"Exceso de carga"}, {id:7, name:"Desacato a las señales de tránsito"}, {id:8, name:"Falla mecánica"}, {id:9, name:"Falta de luces, mal estado en las vías, mala señalización y otros."}];
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
