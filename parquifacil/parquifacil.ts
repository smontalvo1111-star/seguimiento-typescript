import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// contadores y acumuladores
let contMotos: number = 0;
let contCarros: number = 0;
let contCamionetas: number = 0;
let ingresoTotal: number = 0;
let sumaHoras: number = 0;
let totalVehiculos: number = 0;

function pregunta(text: string): Promise<string> {
  return new Promise(resolve => rl.question(text, answer => resolve(answer)));
}

async function main(): Promise<void> {
  let opcionMenu: string = '';

  while (opcionMenu !== '2') {
    console.log('\n=== PARQUIFÁCIL ===');
    console.log('1. Registrar vehículo');
    console.log('2. Cerrar jornada');
    opcionMenu = await pregunta('Seleccione una opción: ');

    if (opcionMenu === '1') {
      let tipoVehiculo: string = await pregunta('Tipo (1=Moto 2=Carro 3=Camioneta): ');
      let horasPermanencia: number = parseFloat(await pregunta('Horas de permanencia: '));

      let tarifaHora: number = 0;
      if (tipoVehiculo === '1') {
        tarifaHora = 2000;
        contMotos++;
      } else if (tipoVehiculo === '2') {
        tarifaHora = 4000;
        contCarros++;
      } else if (tipoVehiculo === '3') {
        tarifaHora = 6000;
        contCamionetas++;
      } else {
        console.log('Tipo inválido, regresando al menú.');
        continue;
      }

      let costoTotal: number = tarifaHora * horasPermanencia;
      let descuento: number = 0;
      if (horasPermanencia > 8) {
        descuento = costoTotal * 0.20;
      }
      let totalPagar: number = costoTotal - descuento;
      let tipoTarifa: string = horasPermanencia > 8
        ? 'TARIFA DÍA COMPLETO (20% desc.)'
        : 'TARIFA POR HORAS';

      console.log('--- VEHÍCULO REGISTRADO ---');
      console.log(`Tipo: ${tipoVehiculo === '1' ? 'Moto' : tipoVehiculo === '2' ? 'Carro' : 'Camioneta'}`);
      console.log(`Horas: ${horasPermanencia}`);
      console.log(`Subtotal: $${costoTotal.toLocaleString()}`);
      if (descuento > 0) console.log(`Descuento (20%): $${descuento.toLocaleString()}`);
      console.log(`— ${tipoTarifa}`);
      console.log(`Total: $${totalPagar.toLocaleString()}`);

      // actualizar acumuladores
      ingresoTotal += totalPagar;
      sumaHoras += horasPermanencia;
      totalVehiculos++;
    } else if (opcionMenu === '2') {
      // salir del while y mostrar reporte
      break;
    } else {
      console.log('Opción no válida, intente nuevamente.');
    }
  }

  // cierre de jornada
  console.log('\n=== CIERRE DE JORNADA ===');
  console.log(`Motos: ${contMotos} | Carros: ${contCarros} | Camionetas: ${contCamionetas}`);
  console.log(`Total vehículos: ${totalVehiculos}`);
  console.log(`Ingreso total: $${ingresoTotal.toLocaleString()}`);
  let promedioHoras: number = totalVehiculos > 0 ? (sumaHoras / totalVehiculos) : 0;
  console.log(`Promedio permanencia: ${promedioHoras.toFixed(2)} horas`);

  rl.close();
}

main().catch(err => {
  console.error(err);
  rl.close();
});
