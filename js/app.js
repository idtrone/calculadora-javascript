var calculadora={
    pantalla: "0",
    numeroAnterior: "0",
    signoAnterior: "",
    resultado: 0,
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
        document.getElementById('display').innerHTML = this.restricionDigitos(this.pantalla)
    },
    procesarOn: function() {
        this.pantalla = '0'
    },
    procesarSigno: function() {
        if(this.pantalla !=0)
            if (this.pantalla.includes('-'))
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
    procesarIgual: function() {

    },
    procesarNumero: function(numero) {
        if (this.pantalla == '0')
            this.pantalla = numero;
        else{
            // restriccion de 8 digitos
            this.procesarIngresoDigitos(numero)
        }
    },
    procesarCero: function() {
        if (this.pantalla !='0')
            this.procesarIngresoDigitos('0')
    },
    procesarIngresoDigitos(numero){
        // limita a 8 el numero de digitos desde los botones de la calculadora
        if (this.pantalla.length < 8)
            this.pantalla = this.pantalla + numero
    },
    restricionDigitos(numero){
        // limita siempre a 8 digitos si contenido de la pantalla tiene mas de 8 digitos
        if (this.pantalla.length > 8)
            this.pantalla = this.pantalla.substr(0, 8)
    },
    procesarSignoAnterior() {
        /*===procesa una operacion anterior si existe===*/
        if (this.signoAnterior==""){
            // asignar la nueva operacion
            this.numeroAnterior = this.pantalla
        }
        else{
            // procesar la anterior operacion y luego asignar la nueva operacion
            switch (this.signoAnterior) {
                case "mas": this.resultado = parseFloat(this.signoAnterior) + parseFloat(this.pantalla)
                    this.signoAnterior = signoActual
                    break
                case "menos": this.resultado = parseFloat(this.signoAnterior) - parseFloat(this.pantalla)
                    this.signoAnterior = signoActual
                    break
                case "por": this.resultado = parseFloat(this.signoAnterior) * parseFloat(this.pantalla)
                    this.signoAnterior = signoActual
                    break
                case "dividido": this.resultado = parseFloat(this.signoAnterior) / parseFloat(this.pantalla)
                    this.signoAnterior = signoActual
                    break
            }
        }
        // limpiar pantalla
        this.pantalla = ""
    }
}


calculadora.inicializar();