var calculadora={
    pantalla: "",
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
            tecla[i].onmouseup = function (e) {
                this.procesarTecla(e.currentTarget.id)
            }
        }
    },
    procesarTecla(id) {
        // procesar la tecla segun el valor que tenga
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
            case 'suma':
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
            default:
                this.procesarNumero(id)
                break
        }
        document.getElementById('display').value = pantalla
    },
    procesarOn() {

    },
    procesarSigno() {

    },
    procesarRaiz() {

    },
    procesarMenos() {

    },
    procesarPor() {

    },
    procesarSuma() {

    },
    procesarDividido() {

    },
    procesarPunto() {

    },
    procesarIgual() {

    },
    procesarNumero(id) {
        if (this.pantalla == 0){
            this.pantalla = id;
        }
    }
}


calculadora.inicializar();