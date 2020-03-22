var calculadora={
    //inicializar variables
    resultado : "",
    ultimoNumero : "",

    // signoAnterior : "",
    // ultimoSigno : "",
    // nuevaOperacion : true,
    // dobleIgual : false,

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
                pantalla = this.asignarOperacion()
                break
            case 'menos':
                pantalla = this.asignarOperacion()
                break
            case 'por':
                pantalla = this.asignarOperacion()
                break
            case 'mas':
                pantalla = this.asignarOperacion()
                break
            case 'dividido':
                pantalla = this.asignarOperacion()
                break
            case '0':
                pantalla = this.agregarDigito(this.ultimoNumero, '0')
                break
            default:
                pantalla = this.agregarDigito(this.ultimoNumero, id)
                break
        }
        pantalla = this.restricionDigitos(pantalla)
        document.getElementById('display').innerHTML = pantalla
    },

    procesarOn: function() {        
        // this.signoAnterior = ""
        // this.resultadoAnterior = ""
        // this.nuevaOperacion = true
        return '0'
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
        return String(parseFloat(a) / parseFloat(b))
    },

    division: function(a, b) {
        return String(parseFloat(a) / parseFloat(b))
    },

    agregarPunto: function() {
        var a = this.ultimoNumero
        if(!a.includes('.'))
            if(a == '0')
                a = '0.'
            else
                a = a + '.'
        return a
    },

    agregarSigno: function() {
        var a = this.ultimoNumero
        if (a == "")
            a = '0'
        else
            // devuelve un signo positivo o negativo de la pantalla
        if(a !='0')
            if (String(a).includes('-'))
                a = a.replace('-','')
            else
                a = '-' + a
        return a
    },

    agregarDigito: function(numero, digito) {
        if (numero != '0'){
            var punto = numero.includes('.')?1:0,
                signo = numero.includes('-')?1:0
            if (numero.length < 8 + signo + punto)
                numero = numero + digito
        }
        return numero
    },

    restrigirDigitos(numero, longitud){
        var punto = this.pantalla.includes('.')?1:0,
            signo = this.pantalla.includes('-')?1:0
        if (numero.length - (punto + signo) > longitud)
            numero = numero.substr(0, longitud + punto + signo)
        return numero
    },

    procesarIgual: function() {

    },

    asignarOperacion: function () {

    }

}

calculadora.inicializar();