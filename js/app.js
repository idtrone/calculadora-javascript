var calculadora={
    pantalla: "0",
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
        document.getElementById('display').innerHTML = this.pantalla
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

    },
    procesarPor: function() {

    },
    procesarSuma: function() {

    },
    procesarDividido: function() {

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
            this.procesarDigitos(numero)
        }
    },
    procesarCero: function() {
        if (this.pantalla !='0')
            this.procesarDigitos('0')
    },
    procesarDigitos(numero){
        if (this.pantalla.length < 8)
            this.pantalla = this.pantalla + numero
    }

}


calculadora.inicializar();