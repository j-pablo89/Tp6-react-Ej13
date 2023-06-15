import React, { useState } from "react";

function Formulario() {
  const [ciudad, setCiudad] = useState("");
  const [pais, setPais] = useState("");
  const [clima, setClima] = useState("");
  const [error, setError] = useState("");

  const consultarClima = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=e390f792134a23fc14737a1cea983c03`
      );

      if (response.ok) {
        const datosClima = await response.json();
        const temperatura = datosClima.main.temp;
        const descripcion = datosClima.weather[0].description;
        setClima(`La temperatura en ${ciudad}, ${pais} es de ${temperatura} grados Celsius. ${descripcion}`);
        setError("");
      } else {
        setError("No se encontraron datos de la ciudad ingresada.");
        setClima("");
      }
    } catch (error) {
      console.error("Error al consultar el clima:", error);
      setError("Ocurrió un error al consultar el clima.");
      setClima("");
    }
  };

  return (
    <div>
      <h1>Consulta de Clima</h1>
      <div>
        <label htmlFor="ciudad">Ciudad:</label>
        <input
          type="text"
          id="ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="pais">País:</label>
        <input
          type="text"
          id="pais"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
        />
      </div>
      <button onClick={consultarClima}>Consultar</button>
      {error && <p>{error}</p>}
      {clima && <p>{clima}</p>}
    </div>
  );
}

export default Formulario;
