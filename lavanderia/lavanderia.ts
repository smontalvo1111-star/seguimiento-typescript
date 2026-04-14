// LAVANDERÍA EXPRESS - Alquiler de Lavadoras
// Costo por hora: $5.000 COP
// Descuento: 30% si horas > 12

const costoPorHora: number = 5000;
const horasDescuento: number = 12;
const porcentajeDescuento: number = 0.30;

// Variables principales
let acumuladorIngresos: number = 0;
let contadorDescuentos: number = 0;

// Interfaz para tipificar los clientes
interface Cliente {
  nombre: string;
  horas: number;
}

// Datos de prueba - clientes a registrar
const clientes: Cliente[] = [
  { nombre: "Pepito Perez", horas: 15 },
  { nombre: "Keidrensor Yumairis", horas: 10 },
  { nombre: "Elva Ginon", horas: 14 },
  { nombre: "Elver Gon", horas: 8 },
  { nombre: "Santos Borré", horas: 20 }
];

const cantidadClientes: number = clientes.length;

console.log("\n========== LAVANDERÍA EXPRESS ==========\n");

// Ciclo para cada cliente
for (let i = 0; i < cantidadClientes; i++) {
  // Obtener datos del cliente
  const nombreCliente: string = clientes[i].nombre;
  const horasAlquiler: number = clientes[i].horas;

  // Calcular costo total
  const costoTotal: number = horasAlquiler * costoPorHora;

  // Aplicar descuento si aplica
  let descuento: number = 0;
  let totalPagar: number = costoTotal;

  if (horasAlquiler > horasDescuento) {
    descuento = costoTotal * porcentajeDescuento;
    totalPagar = costoTotal - descuento;
    contadorDescuentos++;
  }

  // Usar operador ternario para el mensaje de descuento
  const mensajeDescuento: string = horasAlquiler > horasDescuento ? "CON DESCUENTO" : "SIN DESCUENTO";

  // Mostrar información del cliente
  console.log(`--- CLIENTE ${i + 1}: ${nombreCliente} ---`);
  console.log(`Horas alquiladas: ${horasAlquiler}`);
  console.log(`Subtotal: $${costoTotal.toLocaleString('es-CO')}`);
  
  if (descuento > 0) {
    console.log(`Descuento (30%): $${descuento.toLocaleString('es-CO')}`);
  }
  
  console.log(`— ${mensajeDescuento}`);
  console.log(`Total a pagar: $${totalPagar.toLocaleString('es-CO')}\n`);

  // Acumular ingreso
  acumuladorIngresos += totalPagar;
}

// Mostrar resumen del día
console.log("=== RESUMEN DEL DÍA ===");
console.log(`Clientes atendidos: ${cantidadClientes}`);
console.log(`Ingreso total: $${acumuladorIngresos.toLocaleString('es-CO')}`);
console.log(`Clientes con descuento: ${contadorDescuentos}`);
