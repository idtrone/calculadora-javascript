var calculadora={
    //inicializar variables
    resultado : "",
    
    signoAnterior : "",
    ultimoNumero : "",
    ultimoSigno : "",
    nuevaOperacion : true,
    dobleIgual : false,
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
            case 'on':
                pantalla = this.procesarOn()
                break
            case 'sign':
                pantalla = this.procesarSigno()
                break
            case 'raiz':
                pantalla = this.procesarRaiz()
                break
            case 'menos':
                pantalla = this.procesarMenos()
                break
            case 'por':
                pantalla = this.procesarPor()
                break
            case 'mas':
                pantalla = this.procesarSuma()
                break
            case 'dividido':
                pantalla = this.procesarDividido()
                break
            case 'punto':
                pantalla = this.procesarPunto()
                break
            case 'igual':
                pantalla = this.procesarIgual()
                break
            case '0':
                pantalla = this.procesarCero()
                break
            default:
                pantalla = this.procesarNumero(id)
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

    procesarSigno: function(a) {
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

    procesarPunto: function(a) {
        if(!a.includes('.'))
            if(a == '0')
                a = '0.'
            else
                a = a + '.'
        return a
    },

    procesarOperacionAnterior() {
        /*===procesa una operacion anterior no existe===*/
        if (this.signoAnterior==""){
            if (this.resultadoAnterior=="")
                // asignar la nueva operacion
                this.resultadoAnterior = this.pantalla
        }
        else{
            // procesar la anterior operacion y luego asignar la nueva operacion

        }
        this.ultimoNumero = this.pantalla
        // limpiar pantalla
        this.pantalla = ""
        this.nuevaOperacion = true
        this.dobleIgual = false
        
    },

    procesarIgual: function() {
        if (!this.dobleIgual){
            this.procesarOperacionAnterior()
            this.ultimoSigno = this.signoAnterior
            this.signoAnterior = ""
        }
        else{
            if (this.resultadoAnterior != ""){
                if (this.ultimoSigno != ""){
                    this.signoAnterior = this.ultimoSigno
                    this.pantalla = this.ultimoNumero
                    this.procesarOperacionAnterior()
                }
            }
        }
        this.dobleIgual = true;
        // flag de operacion
        this.pantalla = this.resultadoAnterior
        this.nuevaOperacion = false
    },

    procesarNumero: function(numero) {
        if (this.nuevaOperacion){
            if (this.pantalla == '0')
                this.pantalla = numero;
            else{
                // restriccion de 8 digitos
                this.procesarIngresoDigitos(numero)
            }
        }
        else{
            this.pantalla = numero
            this.resultadoAnterior = ""
            this.nuevaOperacion = true;
        }
    },

    procesarCero: function() {
        if (this.pantalla !='0')
            this.procesarIngresoDigitos('0')
    },

    procesarIngresoDigitos(numero){
        // limita a 8 el numero de digitos desde los botones de la calculadora
        var punto = this.pantalla.includes('.')?1:0,
            signo = this.pantalla.includes('-')?1:0
        if (this.pantalla.length < 8 + signo + punto)
            this.pantalla = this.pantalla + numero
    },

    restricionDigitos(){
        // limita siempre a 8 digitos si contenido de la pantalla tiene mas de 8 digitos
        var punto = this.pantalla.includes('.')?1:0,
            signo = this.pantalla.includes('-')?1:0
        if (this.pantalla.length - (punto + signo) > 8)
            this.pantalla = this.pantalla.substr(0, 8+ punto + signo)
    }
}


calculadora.inicializar();