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
// BURGER PALACE - Sistema de Pedidos
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let totalCuenta = 0;
let totalCombos = 0;
let contadorCombo1 = 0;
let contadorCombo2 = 0;
let contadorCombo3 = 0;
function mostrarMenu() {
    console.log('\n====== BURGER PALACE ======');
    console.log('1. Sencilla — $15.000');
    console.log('2. La poderosa — $22.000');
    console.log('3. Engorda huesos — $35.000');
    console.log('4. Finalizar pedido\n');
}
function procesarPedido(opcion, cantidad) {
    let precioCombo = 0;
    let nombreCombo = '';
    if (opcion === 1) {
        precioCombo = 15000;
        nombreCombo = 'Sencilla';
        contadorCombo1 += cantidad;
    }
    else if (opcion === 2) {
        precioCombo = 22000;
        nombreCombo = 'La poderosa';
        contadorCombo2 += cantidad;
    }
    else if (opcion === 3) {
        precioCombo = 35000;
        nombreCombo = 'Engorda huesos';
        contadorCombo3 += cantidad;
    }
    const subtotal = precioCombo * cantidad;
    totalCuenta += subtotal;
    totalCombos += cantidad;
    console.log(`Combo: ${nombreCombo}`);
    console.log(`Cantidad: ${cantidad}`);
    console.log(`Subtotal: $${subtotal.toLocaleString()}`);
    console.log(`Total acumulado: $${totalCuenta.toLocaleString()}`);
}
function mostrarResumen() {
    console.log('\n=== CUENTA FINAL ===');
    console.log(`Combos Sencilla: ${contadorCombo1}`);
    console.log(`Combos La poderosa: ${contadorCombo2}`);
    console.log(`Combos Engorda huesos: ${contadorCombo3}`);
    console.log(`Total combos: ${totalCombos}`);
    console.log(`TOTAL A PAGAR: $${totalCuenta.toLocaleString()}`);
    rl.close();
}
function solicitarPedido() {
    mostrarMenu();
    rl.question('Seleccione combo: ', (respuesta) => {
        const opcion = parseInt(respuesta);
        if (opcion === 4) {
            mostrarResumen();
            return;
        }
        if (opcion < 1 || opcion > 3) {
            console.log('Opción no válida');
            solicitarPedido();
            return;
        }
        rl.question('Cantidad: ', (respuestaCantidad) => {
            const cantidad = parseInt(respuestaCantidad);
            if (cantidad > 0) {
                procesarPedido(opcion, cantidad);
            }
            solicitarPedido();
        });
    });
}
solicitarPedido();
