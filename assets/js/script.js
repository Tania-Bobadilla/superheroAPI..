let btnBuscar = document.querySelector('#btnBuscar');
btnBuscar.addEventListener('click', function () {
    let txtIdentificador = document.querySelector('#txtIdentificador');
    if(validaNumerosIsNaN(txtIdentificador.value)){
        solicitud(txtIdentificador);
    }else{
        let divError = document.querySelector('#error');
        console.log(divError);     
    }
});

let txtIdentificador = document.querySelector('#txtIdentificador');
txtIdentificador.addEventListener('keypress', function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        let txtIdentificador = document.querySelector('#txtIdentificador');
        solicitud(txtIdentificador);
    }
});

function solicitud(txtIdentificador) {
    $.ajax({
        type: "get",
        url: `https://superheroapi.com/api.php/3f0fab8702a7e652ee57a01befa297e7/${txtIdentificador.value}`,
        dataType: "json",
        success: function (response) {
            if(validaRangoError(response)){
                crearGrafico(response);
                crearTarjeta(response); 
            }
        }
    });
}

function crearGrafico(response) {
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title: {
            text: response.name
        },
        data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "pie",
                dataPoints: [
                    { label: "Intelligence", y: response.powerstats.intelligence },
                    { label: "Strength", y: response.powerstats.strength },
                    { label: "Speed", y: response.powerstats.speed },
                    { label: "Durability", y: response.powerstats.durability },
                    { label: "Power", y: response.powerstats.power },
                    { label: "Combat", y: response.powerstats.combat }
                ]
            }
        ]
    });
    chart.render();
}

function crearTarjeta(response){
    let cardContainer = document.querySelector('#cardContainer');
    cardContainer.innerHTML = `<div class="card" style="width: 18rem;">
                                    <img src="${response.image.url}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${response.name}</h5>
                                        <p class="card-text">${response.biography['first-appearance']}</p>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">${response.biography.publisher}</li>
                                        <li class="list-group-item">${response.biography['full-name']}</li>
                                        <li class="list-group-item">${response.biography['alter-egos']}</li>
                                    </ul>
                                </div>`;
}

function validaNumerosIsNaN(valorCaja){
    if(isNaN(valorCaja)){
        return false;
    }
    return true;
}

function validaNumerosRegEx(valorCaja){
    let regex = new RegExp('^[0-9]{3}$');
    if(regex.test(valorCaja)){
        return true;
    }
    return false;
}

function validaRangoNumerico(valorCaja){
    if(valorCaja >= 1 && valorCaja <= 732){
        return true;
    }
    return false;
}

function validaRangoError(response){
    if(response.response === "success"){
        return true;
    }
    return false;
}

function validaVacio(valorCaja){
    if(valorCaja === ''){
        return false;
    }
    return true;
}