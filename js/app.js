var calculadora={
    //inicializar variables
    pantalla : "0",
    resultadoAnterior : "",
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
        // procesar la tecla segun esu valor
        switch (id) {
            case 'on':
                this.procesarOn()
                break
            case 'sign':
                this.procesarSigno()
                break
            case 'raiz':
                this.procesarRaiz()
                break
            case 'menos':
                this.procesarMenos()
                break
            case 'por':
                this.procesarPor()
                break
            case 'mas':
                this.procesarSuma()
                break
            case 'dividido':
                this.procesarDividido()
                break
            case 'punto':
                this.procesarPunto()
                break
            case 'igual':
                this.procesarIgual()
                break
            case '0':
                this.procesarCero()
                break
            default:
                this.procesarNumero(id)
                break
        }
        this.restricionDigitos()
        document.getElementById('display').innerHTML = this.pantalla
    },

    procesarOn: function() {
        this.pantalla = '0'
        this.signoAnterior = ""
        this.resultadoAnterior = ""
        this.nuevaOperacion = true
    },

    procesarSigno: function() {
        if(this.pantalla !=0)
            if (String(this.pantalla).includes('-'))
                this.pantalla = this.pantalla.replace('-','')
            else
                this.pantalla = '-' + this.pantalla
    },

    procesarRaiz: function() {

    },

    procesarMenos: function() {
        this.procesarSignoAnterior()
        this.signoAnterior = "-"
    },

    procesarPor: function() {
        this.procesarSignoAnterior()
        this.signoAnterior = "*"
    },

    procesarSuma: function() {
        this.procesarSignoAnterior()
        this.signoAnterior = "+"
    },

    procesarDividido: function() {
        this.procesarSignoAnterior()
        this.signoAnterior = "/"
    },

    procesarPunto: function() {
        if(!this.pantalla.includes('.'))
            if(this.pantalla == '0')
                this.pantalla = '0.'
            else
                this.pantalla = this.pantalla + '.'
    },

    procesarSignoAnterior() {
        /*===procesa una operacion anterior no existe===*/
        if (this.signoAnterior==""){
            if (this.resultadoAnterior=="")
                // asignar la nueva operacion
                this.resultadoAnterior = this.pantalla
        }
        else{
            // procesar la anterior operacion y luego asignar la nueva operacion
            switch (this.signoAnterior) {
                case "+": this.resultadoAnterior = String(parseFloat(this.resultadoAnterior) + parseFloat(this.pantalla))
                    break
                case "-": this.resultadoAnterior = String(parseFloat(this.resultadoAnterior) - parseFloat(this.pantalla))
                    break
                case "*": this.resultadoAnterior = String(parseFloat(this.resultadoAnterior) * parseFloat(this.pantalla))
                    break
                case "/": this.resultadoAnterior = String(parseFloat(this.resultadoAnterior) / parseFloat(this.pantalla))
                    break
            }
        }
        this.ultimoNumero = this.pantalla
        // limpiar pantalla
        this.pantalla = ""
        this.nuevaOperacion = true
        this.dobleIgual = false
        
    },

    procesarIgual: function() {
        if (!this.dobleIgual){
            this.procesarSignoAnterior()
            this.ultimoSigno = this.signoAnterior
            this.signoAnterior = ""
        }
        else{
            if (this.resultadoAnterior != ""){
                if (this.ultimoSigno != ""){
                    this.signoAnterior = this.ultimoSigno
                    this.pantalla = this.ultimoNumero
                    this.procesarSignoAnterior()
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