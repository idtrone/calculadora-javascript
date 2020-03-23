var calculadora={
    //inicializar variables
    resultado : "",
    primerNumero: "",
    ultimoNumero : "",
    ultimoSigno : "",

    igualFlag : false,
    signoFlag: false,
    inicioFlag: true,

    // signoAnterior : "",

    // nuevaOperacion : true,


    inicializar: function () {
        // metodo de escucha de los botones
        var tecla = document.getElementsByClassName('tecla')
        for (i in tecla){
            tecla[i].onmousedown = function (e) {
                e.currentTarget.style = 'padding: 1px'
            }
            tecla[i].onmouseup = function (e) {
                e.currentTarget.style = 'padding: 0'
            }
            tecla[i].onclick = function (e) {
                calculadora.procesarTecla(e.currentTarget.id)
            }
        }
    },

    procesarTecla: function(id) {
        var pantalla = "" 
        // procesar la tecla segun esu valor
        switch (id) {
            case 'sign':
                pantalla = this.agregarSigno()
                break
            case 'punto':
                pantalla = this.agregarPunto()
                break
            case 'on':
                pantalla = this.procesarOn()
                break
            case 'igual':
                pantalla = this.procesarIgual()
                break
            case 'raiz':

                break
            case 'menos':
                pantalla = this.asignarOperacion('-')
                break
            case 'por':
                pantalla = this.asignarOperacion('*')
                break
            case 'mas':
                pantalla = this.asignarOperacion('+')
                break
            case 'dividido':
                pantalla = this.asignarOperacion('/')
                break
            case '0':
                pantalla = this.agregarDigito(document.getElementById('display').innerHTML, '0')
                break
            default:
                pantalla = this.agregarDigito(document.getElementById('display').innerHTML, id)
                break
        }
        pantalla = this.restrigirDigitos(pantalla, 8)
        document.getElementById('display').innerHTML = pantalla
    },

    operacionBinaria(a, b, operacion){
        var resultado = '0'
        switch (operacion) {
            case "+": resultado = this.suma(a, b)
                break
            case "-": resultado = this.resta(a, b)
                break
            case "*": resultado = this.multiplicacion(a, b)
                break
            case "/": resultado = this.division(a, b)
                break
        }
        return resultado
    },

    raiz: function(a) {
        return String(Math.sqrt(parseFloat(a)))
    },

    resta: function(a, b) {
        return String(parseFloat(a) - parseFloat(b))
    },

    multiplicacion: function(a, b) {
        return String(parseFloat(a) * parseFloat(b))
    },

    suma: function(a, b) {
        return String(parseFloat(a) + parseFloat(b))
    },

    division: function(a, b) {
        return String(parseFloat(a) / parseFloat(b))
    },

    agregarPunto: function() {
        var a = document.getElementById('display').innerHTML
        if(!a.includes('.'))
            if(a == '0' || a=="")
                a = '0.'
            else
                a = a + '.'
        return a
    },

    agregarSigno: function() {
        var a = document.getElementById('display').innerHTML
        // devuelve un signo positivo o negativo de la pantalla
        if(a !='0' || a != '')
            if (String(a).includes('-'))
                a = a.replace('-','')
            else
                a = '-' + a
        return a
    },

    agregarDigito: function(numero, digito) {
        if(this.igualFlag){
            numero = digito
        }
        else {
            if (this.inicioFlag && digito != 0){
                this.inicioFlag = false;
                numero = digito
            }
            else{
                if (numero != '0'){
                    // var punto = numero.includes('.')?1:0,
                    //     signo = numero.includes('-')?1:0
                    numero = numero + digito
                }
            }
        }
        this.igualFlag = false
        return numero
    },

    restrigirDigitos(numero, longitud){
        var punto = numero.includes('.')?1:0,
            signo = numero.includes('-')?1:0
        if (numero.length - (punto + signo) > longitud)
            numero = numero.substr(0, longitud + punto + signo)
        return numero
    },

    procesarIgual: function() {
        var resultado = document.getElementById('display').innerHTML
        if (!this.igualFlag){
            //devuelve el operando 
            if (this.primerNumero != "" && this.ultimoSigno != ""){
                this.ultimoNumero = document.getElementById('display').innerHTML
                resultado = this.operacionBinaria(this.primerNumero,
                    this.ultimoNumero,
                    this.ultimoSigno)
                this.resultado = resultado
                this.igualFlag = true
                this.signoFlag = false
            }
        }
        else{
            if (this.ultimoSigno != "" && this.resultado != "" && this.ultimoNumero != ""){
                resultado = this.operacionBinaria(this.resultado, this.ultimoNumero, this.ultimoSigno)
                this.resultado = resultado
            }
        }
        return resultado
    },

    asignarOperacion: function (operacion) {
        if (!this.signoFlag){// si no hay operacion
            //capturar el numero de la pantalla
            this.primerNumero = document.getElementById('display').innerHTML
            //asignar la operacion
            this.ultimoSigno = operacion
        }
        else{ // si hay una operacion previa
            //capturar el numero de la pantalla
            this.ultimoNumero = document.getElementById('display').innerHTML
            var resultado = this.operacionBinaria(this.primerNumero,
                                                  this.ultimoNumero,
                                                  this.ultimoSigno)
            this.resultado = resultado
            this.primerNumero = resultado
            //asignar la operacion
            this.ultimoSigno = operacion
        }
        this.signoFlag = true
        this.igualFlag = false
        return ""
    },

    procesarOn: function() {
        this.resultado = ""
        this.primerNumero = ""
        this.ultimoNumero = ""
        this.ultimoSigno = ""

        this.igualFlag = false
        this.signoFlag = false
        this.inicioFlag = true
        return '0'
    }
}

calculadora.inicializar();