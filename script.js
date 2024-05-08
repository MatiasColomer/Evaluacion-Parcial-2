function validarFormulario() {
  var patente = document.getElementById("patente").value;
  var modelo = document.getElementById("modelo").value;
  var marca = document.getElementById("marca").value;
  var anio = document.getElementById("anio").value;

  if (patente === "" || modelo === "" || marca === "" || anio === "") {
    alert("Por favor completa todos los campos");
    return false;
  }

  return true;
}

function guardarAuto() {
  if (validarFormulario()) {
    var patente = document.getElementById("patente").value;
    var modelo = document.getElementById("modelo").value;
    var marca = document.getElementById("marca").value;
    var anio = document.getElementById("anio").value;

    var auto = {
      patente: patente,
      modelo: modelo,
      marca: marca,
      anio: anio
    };

    var listaAutos = JSON.parse(localStorage.getItem("listaAutos")) || [];
    listaAutos.push(auto);
    localStorage.setItem("listaAutos", JSON.stringify(listaAutos));
    mostrarAutos();
  }
}

function mostrarAutos() {
  var listaAutos = JSON.parse(localStorage.getItem("listaAutos")) || [];
  var listaAutosHTML = "";

  listaAutos.forEach(function(auto, index) {
    listaAutosHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
            Automóvil ${index + 1}: ${auto.modelo} ${auto.marca} (${auto.anio})
          </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#listaAutos">
          <div class="accordion-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Patente: ${auto.patente}</li>
              <li class="list-group-item">Modelo: ${auto.modelo}</li>
              <li class="list-group-item">Marca: ${auto.marca}</li>
              <li class="list-group-item">Año: ${auto.anio}</li>
            </ul>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("listaAutos").innerHTML = `
    <div class="accordion" id="listaAutos">
      ${listaAutosHTML}
    </div>
  `;
}

mostrarAutos();

document.getElementById("formularioAuto").addEventListener("submit", function(event) {
  event.preventDefault();
  guardarAuto();
  document.getElementById("formularioAuto").reset();
});