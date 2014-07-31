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
            this.incidente.Cliente.FechaNacimiento = new Date(this.incidente.Cliente.FechaNacimiento);
            this.incidente.Cliente.FechaNacimiento = this.incidente.Cliente.FechaNacimiento.format("m/d/Y");
            this.incidente.Vehiculo.FechaInicioVigenciaP = new Date(this.incidente.Vehiculo.FechaInicioVigenciaP);
            this.incidente.Vehiculo.FechaInicioVigenciaP = this.incidente.Vehiculo.FechaInicioVigenciaP.format("m/d/Y");
            this.incidente.Vehiculo.FechaFinVigenciaP = new Date(this.incidente.Vehiculo.FechaFinVigenciaP);
            this.incidente.Vehiculo.FechaFinVigenciaP = this.incidente.Vehiculo.FechaFinVigenciaP.format("m/d/Y");
            this.incidente.FechaIncidente = new Date(this.incidente.FechaIncidente);
            this.incidente.FechaIncidente = this.incidente.FechaIncidente.format("m/d/Y");
            alert(JSON.stringify(incidentes));
            this.incidente = {};
        };
        this.getDatosCliente = function(){
        	this.incidente.Cliente = retornoDummy.Cliente;
        	this.incidente.Vehiculo = retornoDummy.Vehiculo;
        	if(this.incidente.Cliente.Tipo == "Afiliado")
        	{
        		this.incidente.Cliente.Tipo = 1;
        	}
        	else if(this.incidente.Cliente.Tipo == "Asegurado")
        	{
        		this.incidente.Cliente.Tipo = 2;
        	}
        	if(this.incidente.Vehiculo.Tipo == "Automovil")
        	{
        		this.incidente.Vehiculo.Tipo = 2;
        	}
        	if(this.incidente.Vehiculo.Tipo == "Campero")
        	{
        		this.incidente.Vehiculo.Tipo = 1;
        	}
        	if(this.incidente.Vehiculo.Tipo == "Moto")
        	{
        		this.incidente.Vehiculo.Tipo = 3;
        	}
        	this.incidente.Cliente.FechaNacimiento = new Date(retornoDummy.Cliente.FechaNacimiento);
        	this.incidente.Vehiculo.FechaInicioVigenciaP = new Date(retornoDummy.Vehiculo.FechaInicioVigenciaP);
        	this.incidente.Vehiculo.FechaFinVigenciaP = new Date(retornoDummy.Vehiculo.FechaFinVigenciaP);
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

    app.controller("TipoDocumentoController", function($http)
    {
    	
        //aqui se debe consumir el servicio de tipos de documento
        this.tiposDocumento = tiposDocumentoDummy;
    });
    app.controller("MotivoIncidenteController", function($http)
    {
        //aqui se debe consumir el servicio de motivos de incidente
        this.motivosIncidente = motivosIncidentesDummy;
    });
    app.controller("TipoVehiculoController", function($http)
    {
        //aqui se debe consumir el servicio de tipo de vehiculo            
        this.tiposVehiculo = tiposVehiculoDummy;
    });
    app.controller("TipoAfiliacionController", function($http)
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
        {
            "Codigo": "C",
            "TipoDoc": "Cedula de Ciudadania"
        },
        {
            "Codigo": "T",
            "TipoDoc": "Tarjeta de Identidad"
        },
        {
            "Codigo": "CE",
            "TipoDoc": "Cedula de Extranjeria"
        },
        {
            "Codigo": "P",
            "TipoDoc": "Pasaporte"
        },
        {
            "Codigo": "R",
            "TipoDoc": "Registro Civil"
        }
    ];
    var tiposAfiliacionDummy = [
        {id: 1, name: "Afiliado"}, {id: 2, name: "Asegurado"}
    ];
    var tiposVehiculoDummy = [{id: 1, name: "Campero"}, {id: 2, name: "Automóvil"}, {id: 3, name: "Moto"}];
    var motivosIncidentesDummy= 
   [
        {
            "Codigo": "1",
            "Texto": "Exceso de velocidad"
        },
        {
            "Codigo": "2",
            "Texto": "Imprudencia del conductor"
        },
        {
            "Codigo": "3",
            "Texto": "Imprudencia del peatón"
        },
        {
            "Codigo": "4",
            "Texto": "Ebriedad del conductor"
        },
        {
            "Codigo": "5",
            "Texto": "Imprudencia del pasajero"
        },
        {
            "Codigo": "6",
            "Texto": "Exceso de carga"
        },
        {
            "Codigo": "7",
            "Texto": "Desacato a las señales de tránsito"
        },
        {
            "Codigo": "8",
            "Texto": "Falla mecánica"
        },
        {
            "Codigo": "9",
            "Texto": "Falta de luces, mal estado de las vías, mala señalización y otros"
        }
    ]
;
var retornoDummy = {
    "Cliente": {
        "TipoDocumento": "C",
        "NumeroDocumento": 1234567890,
        "PrimerNombre": "Daniel",
        "SegundoNombre": "Alexander",
        "PrimerApellido": "Arango",
        "SegundoApellido": "Arboleda",
        "Tipo": "Afiliado",
        "FechaNacimiento": "9/20/1991",
        "FechaExpDoc": "20/10/2009",
    },
    "Vehiculo": {
        "Tipo": "Automovil",
        "Referencia": "Referencia",
        "NumeroPoliza": 123456,
        "FechaInicioVigenciaP": "01/01/2014",
        "FechaFinVigenciaP": "01/01/2015"
    }
};
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
