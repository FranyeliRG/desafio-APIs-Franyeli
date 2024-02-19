const input = document.querySelector("input");
const monedaSelected = document.getElementById("monedaSelected")
const btn = document.querySelector("button");
const span = document.querySelector("#span");

let miGrafico = null

const getMonedas = async () => {
    try {
        const response = await fetch(`https://mindicador.cl/api/${monedaSelected.value}`);
        const monedas = await response.json()
        return monedas
    } catch (error) {
        alert('Ups tenemos un problema, intenta mas tarde')
    }
}

const renderCalculo = async () => {
    const monedas = await getMonedas()
    const calcular = parseInt(input.value) / monedas.serie[0].valor
    span.innerHTML = `${calcular.toFixed(2)} ${monedaSelected.value}`
}

  const objetoDeConfiguracion = (monedas) => {
    const config = {
      type: 'line',
      data: {
        labels: monedas.serie.slice(0, 10).map((moneda) => {
          return new Date(moneda.fecha).toLocaleDateString('en-Gb')
        }),
          datasets: [{
            label: 'Historial Últimos 10 días',
            backgroundColor: 'white',
            data: monedas.serie.slice(0, 10).map((moneda) => {
              return moneda.valor
            })
          }]
        }
      }
      return config
    }

  const imprimirObjetoGrafica = async () => {
    const monedas = await getMonedas()
    const config = objetoDeConfiguracion(monedas)
    const myChart = document.getElementById('myChart')
    miGrafico = new Chart(myChart, config)
  }

  const destruirGrafico = () => {
    if(miGrafico != null){
      miGrafico.destroy()
    }
  }

  const main = async () => {
    renderCalculo()
    imprimirObjetoGrafica()
    destruirGrafico()
}

  btn.addEventListener("click", () => {
      main();
    })




