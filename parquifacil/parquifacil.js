"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// contadores y acumuladores
let contMotos = 0;
let contCarros = 0;
let contCamionetas = 0;
let ingresoTotal = 0;
let sumaHoras = 0;
let totalVehiculos = 0;
function pregunta(text) {
    return new Promise(resolve => rl.question(text, answer => resolve(answer)));
}
async function main() {
    let opcionMenu = '';
    while (opcionMenu !== '2') {
        console.log('\n=== PARQUIFÁCIL ===');
        console.log('1. Registrar vehículo');
        console.log('2. Cerrar jornada');
        opcionMenu = await pregunta('Seleccione una opción: ');
        if (opcionMenu === '1') {
            let tipoVehiculo = await pregunta('Tipo (1=Moto 2=Carro 3=Camioneta): ');
            let horasPermanencia = parseFloat(await pregunta('Horas de permanencia: '));
            let tarifaHora = 0;
            if (tipoVehiculo === '1') {
                tarifaHora = 2000;
                contMotos++;
            }
            else if (tipoVehiculo === '2') {
                tarifaHora = 4000;
                contCarros++;
            }
            else if (tipoVehiculo === '3') {
                tarifaHora = 6000;
                contCamionetas++;
            }
            else {
                console.log('Tipo inválido, regresando al menú.');
                continue;
            }
            let costoTotal = tarifaHora * horasPermanencia;
            let descuento = 0;
            if (horasPermanencia > 8) {
                descuento = costoTotal * 0.20;
            }
            let totalPagar = costoTotal - descuento;
            let tipoTarifa = horasPermanencia > 8
                ? 'TARIFA DÍA COMPLETO (20% desc.)'
                : 'TARIFA POR HORAS';
            console.log('--- VEHÍCULO REGISTRADO ---');
            console.log(`Tipo: ${tipoVehiculo === '1' ? 'Moto' : tipoVehiculo === '2' ? 'Carro' : 'Camioneta'}`);
            console.log(`Horas: ${horasPermanencia}`);
            console.log(`Subtotal: $${costoTotal.toLocaleString()}`);
            if (descuento > 0)
                console.log(`Descuento (20%): $${descuento.toLocaleString()}`);
            console.log(`— ${tipoTarifa}`);
            console.log(`Total: $${totalPagar.toLocaleString()}`);
            // actualizar acumuladores
            ingresoTotal += totalPagar;
            sumaHoras += horasPermanencia;
            totalVehiculos++;
        }
        else if (opcionMenu === '2') {
            // salir del while y mostrar reporte
            break;
        }
        else {
            console.log('Opción no válida, intente nuevamente.');
        }
    }
    // cierre de jornada
    console.log('\n=== CIERRE DE JORNADA ===');
    console.log(`Motos: ${contMotos} | Carros: ${contCarros} | Camionetas: ${contCamionetas}`);
    console.log(`Total vehículos: ${totalVehiculos}`);
    console.log(`Ingreso total: $${ingresoTotal.toLocaleString()}`);
    let promedioHoras = totalVehiculos > 0 ? (sumaHoras / totalVehiculos) : 0;
    console.log(`Promedio permanencia: ${promedioHoras.toFixed(2)} horas`);
    rl.close();
}
main().catch(err => {
    console.error(err);
    rl.close();
});
