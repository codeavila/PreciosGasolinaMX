class API{

    async obtenerDatos(){

        const numDeRespuestas = 1000;
        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${numDeRespuestas}`);

        const respuestaJson = await datos.json();

        return{
            respuestaJson
        }
    }
}