class UI {
    constructor() {

        //Instanciar API
        this.api = new API();

        //crear los markers con layerGroup
        this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    }

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
        .then(datos => {
            //console.log(datos);
            const resultado = datos.respuestaJson.results;

            //mostrar pines
            this.mostrarPInes(resultado);
        } )
    }

    mostrarPInes(datos){
        //Limpiar Markers
        this.markers.clearLayers();

        //Recorrer los establecimientos
        datos.forEach(dato => {
            const {latitude,longitude,calle,regular,premium} = dato;

            //Agregar POPUP
            const opcionesPopUp = L.popup().setContent(
                `   
                    <p<>Caññe: ${calle}</p>
                    <p><b>Regular:</b> $ ${regular}</p>
                    <p><b>Premium:</b> $ ${premium}</p>
                `
            );

            //Agregar el PIN
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);

    }

    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
        .then(datos => {
            const resultados = datos.respuestaJson.results;

            this.filtrarSugerencias(resultados,busqueda);
        })
    }

    filtrarSugerencias(resultado,busqueda){
        // filtrar con .filter
        const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1);
        //console.log(filtro);
        this.mostrarPInes(filtro);
    }
}