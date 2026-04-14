// BURGER PALACE - Sistema de Pedidos
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let totalCuenta: number = 0;
let totalCombos: number = 0;
let contadorCombo1: number = 0;
let contadorCombo2: number = 0;
let contadorCombo3: number = 0;

function mostrarMenu(): void {
  console.log('\n====== BURGER PALACE ======');
  console.log('1. Sencilla — $15.000');
  console.log('2. La poderosa — $22.000');
  console.log('3. Engorda huesos — $35.000');
  console.log('4. Finalizar pedido\n');
}

function procesarPedido(opcion: number, cantidad: number): void {
  let precioCombo: number = 0;
  let nombreCombo: string = '';

  if (opcion === 1) {
    precioCombo = 15000;
    nombreCombo = 'Sencilla';
    contadorCombo1 += cantidad;
  } else if (opcion === 2) {
    precioCombo = 22000;
    nombreCombo = 'La poderosa';
    contadorCombo2 += cantidad;
  } else if (opcion === 3) {
    precioCombo = 35000;
    nombreCombo = 'Engorda huesos';
    contadorCombo3 += cantidad;
  }

  const subtotal: number = precioCombo * cantidad;
  totalCuenta += subtotal;
  totalCombos += cantidad;

  console.log(`Combo: ${nombreCombo}`);
  console.log(`Cantidad: ${cantidad}`);
  console.log(`Subtotal: $${subtotal.toLocaleString()}`);
  console.log(`Total acumulado: $${totalCuenta.toLocaleString()}`);
}

function mostrarResumen(): void {
  console.log('\n=== CUENTA FINAL ===');
  console.log(`Combos Sencilla: ${contadorCombo1}`);
  console.log(`Combos La poderosa: ${contadorCombo2}`);
  console.log(`Combos Engorda huesos: ${contadorCombo3}`);
  console.log(`Total combos: ${totalCombos}`);
  console.log(`TOTAL A PAGAR: $${totalCuenta.toLocaleString()}`);
  rl.close();
}

function solicitarPedido(): void {
  mostrarMenu();
  rl.question('Seleccione combo: ', (respuesta: string) => {
    const opcion: number = parseInt(respuesta);

    if (opcion === 4) {
      mostrarResumen();
      return;
    }

    if (opcion < 1 || opcion > 3) {
      console.log('Opción no válida');
      solicitarPedido();
      return;
    }

    rl.question('Cantidad: ', (respuestaCantidad: string) => {
      const cantidad: number = parseInt(respuestaCantidad);
      if (cantidad > 0) {
        procesarPedido(opcion, cantidad);
      }
      solicitarPedido();
    });
  });
}

solicitarPedido();
