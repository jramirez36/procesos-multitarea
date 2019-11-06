class Administracion 
{
    constructor(tabla) 
    {
        this._tabla = tabla;
        this._contador = 300;
        this._listaProcesos;
        this._inicio;
    }
    iniciar() 
    {   
        this._listaProcesos = new lista();
        let aux = this._listaProcesos;
        let aux2 = this._listaProcesos;
        let probabilidad = new Probabilidades();
        let contadorEspera = 0;
        let contadorvacio = 0;
        let contadorCompletados = 0;
        let sumador = 0;
        for(var i = 0; i < 300; i++)
        {
            console.log("ciclo numero: " + (i+1))
            if(i === 0)
            {
                aux._cantidadTareas = probabilidad.cantidadTareas;
                aux._siguiente = new lista();
                this._inicio = aux;
            }

            if(contadorEspera >= 1)
            {
                aux2 = aux2._siguiente;
            }

            if(probabilidad.probabilidadNuevoProceso === 1)
            {
                contadorEspera = contadorEspera + 1;
                aux._siguiente = new lista();
                aux._siguiente._cantidadTareas = probabilidad.cantidadTareas;
                sumador = sumador + aux._siguiente._cantidadTareas;
                aux._siguiente._siguiente = this._inicio;
                console.log("el siguiente proceso tiene: " + aux._siguiente._cantidadTareas + " tareas");
                aux = aux._siguiente;
            }

            if(aux2._siguiente._cantidadTareas <= 0 && contadorEspera >= 1)
            {
                contadorCompletados++;
                            aux2._siguiente = aux2._siguiente._siguiente;
                contadorEspera--;
            }

            if(aux2._cantidadTareas <= 0 && contadorEspera === 0)
            {
                contadorvacio++;
            }
            this.proceso(contadorEspera, aux2, contadorvacio, contadorCompletados, sumador);
        }
    }
    proceso(contadorEspera, aux2, contadorvacio, contadorCompletados, sumador)
    {
        let aux3 = aux2;
        sumador = sumador + aux3._cantidadTareas;
        this.impresion(contadorEspera, aux2, contadorvacio, contadorCompletados, sumador);
        aux2._cantidadTareas = aux2._cantidadTareas-1;
            for(let i = 0; i < contadorEspera; i++)
            {
                aux3 = aux3._siguiente;
            }
    }
    impresion(contadorEspera, aux2, contadorvacio, contadorCompletados, sumador) 
    {
        console.log("procesos faltantes al proceso actual: " + aux2._cantidadTareas);
        console.log("Procesos en cola: " + contadorEspera + " Suma de tareas totales faltantes: " + sumador);
        console.log("Cantidad de veces que a estado vacio: " + contadorvacio);
        console.log("Procesos completados: " + contadorCompletados);
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