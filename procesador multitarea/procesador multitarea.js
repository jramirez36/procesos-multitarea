class Administracion 
{
    constructor(tabla) 
    {
        this._tabla = tabla;
        this._contador = 300;
        this._listaProcesos;
        this._inicio;
        this.sumador = 0;
        this.contadorEspera  = 0;
        this.contadorvacio = 0
        this.contadorCompletados = 0;
    }
    iniciar() 
    {   
        this._listaProcesos = new lista();
        let aux = this._listaProcesos;
        let aux2 = this._listaProcesos;
        let probabilidad = new Probabilidades();
        for(var i = 0; i < 300; i++)
        {
            console.log("ciclo numero: " + (i+1))
            if(i === 0)
            {
                aux._cantidadTareas = probabilidad.cantidadTareas;
                this.sumador = this.sumador + aux._cantidadTareas;
                aux._siguiente = new lista();
                this._inicio = aux;
            }

            if(this.contadorEspera  >= 1)
            {
                aux2 = aux2._siguiente;
            }

            if(probabilidad.probabilidadNuevoProceso === 1)
            {
                this.contadorEspera  = this.contadorEspera  + 1;
                aux._siguiente = new lista();
                aux._siguiente._cantidadTareas = probabilidad.cantidadTareas;
                this.sumador = this.sumador + aux._siguiente._cantidadTareas;
                aux._siguiente._siguiente = this._inicio;
                console.log("el siguiente proceso tiene: " + aux._siguiente._cantidadTareas + " tareas");
                aux = aux._siguiente;
            }

            if(aux2._siguiente._cantidadTareas <= 0 && this.contadorEspera  >= 1)
            {
                this.contadorCompletados++;
                            aux2._siguiente = aux2._siguiente._siguiente;
                this.contadorEspera --;
            }

            if(aux2._cantidadTareas <= 0 && this.contadorEspera  === 0)
            {
                this.contadorvacio++;
            }
            this.proceso(aux2);
        }
    }
    proceso(aux2)
    {
        this.impresion(aux2);
        this.sumador = this.sumador-1;
        aux2._cantidadTareas = aux2._cantidadTareas-1;
    }
    impresion(aux2) 
    {
        console.log("procesos faltantes al proceso actual: " + aux2._cantidadTareas);
        console.log("Procesos en cola: " + this.contadorEspera  + " Suma de tareas totales faltantes: " + this.sumador);
        console.log("Cantidad de veces que a estado vacio: " + this.contadorvacio);
        console.log("Procesos completados: " + this.contadorCompletados);
    }
}
        class lista
        {
            constructor(siguiente = null, anterior = null)
            {
                this._cantidadTareas;
            }
            get cantidadTareas()
            {
                return this._cantidadTareas;
            }
        }
        //impreciones
        class Probabilidades
        {
            constructor()
            {
            }
            get probabilidadNuevoProceso()
            {
                let probabilidad = Math.trunc(Math.random() * 100 + 1);

                if(probabilidad <= 39)
                {
                    probabilidad = 1;
                }
                return probabilidad;
            }
            get cantidadTareas()
            {
                let cantidad = Math.trunc(Math.random() * 10 + 4);
                return cantidad;
            }
        }
//botones
var simulacion = new Administracion(document.querySelector('#tablasimulacion'));
document.querySelector('#iniciar').addEventListener('click', () => {
    simulacion.iniciar();
});