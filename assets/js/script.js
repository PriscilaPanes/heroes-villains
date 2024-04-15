function cargarGrafico(datos = [], name) {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `Estadísticas de poder para ${name}`,
            fontFamily:"Anton",
            padding: 15,
            margin: 15,
            
        },
        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: datos
        }]
    });
    chart.render();
};

function obtenerData(id) {
    let url = "https://www.superheroapi.com/api.php/4905856019427443/" + id;

    $.ajax(url)
        .done(function (datos) {
            let { powerstats } = datos;
            let dataPoints = [];
            for (const [key, value] of Object.entries(powerstats)) {
                //{label: "texto", y: 50}
                let dato = {
                    label: key,
                    y: value
                }
                dataPoints.push(dato);
            }
            cargarGrafico(dataPoints, datos.name);
            cargarCard(datos);
        })
        .fail(function () {
            alert("error");
        });
}
$("form").on("submit", function (event) {

    event.preventDefault();
    const id = $("#formSuperhero").val()
    if(isNaN(id) || id<1 || id>732){
        alert("Personaje no encontrado,Ingrese un número entre 1 y 732")
    }
    else{
    obtenerData(id);}


});

function cargarCard(superhero) {
    $("#cardContainer").html(
        `<div class="card border-warning mb-3 overflow-scroll" style="height: 370px; width: 100%;">
        <div class="row g-0">
          <div class="col-md-4 ">
            <img src="${superhero.image.url}" class="img-fluid rounded-start h-100 object-fit-cover" alt="imagen heroe">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${superhero.name}</h5>
              <h6 class="card-subtitle">${superhero.biography["full-name"]}</h6>
              <p class="card-text">Alias: ${superhero.biography["aliases"]} </p>
              <p class="card-text">Primera aparición: ${superhero.biography["first-appearance"]} </p>
              <p class="card-text">Publicado por: ${superhero.biography["publisher"]} </p>
              <p class="card-text">Ocupación: ${superhero.work["occupation"]} </p>
              <p class="card-text">Conexiones: ${superhero.connections["group-affiliation"]} </p>
            </div>
          </div>
        </div>
      </div>`
    )
}
