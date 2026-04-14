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
const pregunta = (texto) => new Promise(resolve => rl.question(texto, resolve));
const PRESTAMO_DIAS = 7;
const MULTA_DIARIA = 1500;
const MULTA_ADICIONAL = 10000;
async function programa() {
    let totalLibros = 0;
    let librosRetraso = 0;
    let librosPuntuales = 0;
    let totalMultas = 0;
    const cantidadUsuarios = parseInt(await pregunta('¿Cuántos usuarios devuelven libros hoy? '));
    console.log('\n');
    for (let u = 1; u <= cantidadUsuarios; u++) {
        const nombreUsuario = await pregunta(`Usuario ${u} - Nombre completo: `);
        let cantidadLibros = parseInt(await pregunta(`Usuario ${u} - ¿Cuántos libros devuelve? (máx. 3): `));
        while (cantidadLibros < 1 || cantidadLibros > 3) {
            cantidadLibros = parseInt(await pregunta('Número inválido. Ingresa entre 1 y 3: '));
        }
        let multaUsuario = 0;
        console.log(`\n--- USUARIO ${u}: ${nombreUsuario} ---`);
        console.log(`Libros devueltos: ${cantidadLibros}`);
        for (let libro = 1; libro <= cantidadLibros; libro++) {
            const diasPrestamo = parseInt(await pregunta(`  Días que tuvo el libro ${libro}: `));
            let diasRetraso = 0;
            if (diasPrestamo > PRESTAMO_DIAS) {
                diasRetraso = diasPrestamo - PRESTAMO_DIAS;
            }
            let multaLibro = 0;
            if (diasRetraso === 0) {
                multaLibro = 0;
            }
            else if (diasRetraso <= 15) {
                multaLibro = diasRetraso * MULTA_DIARIA;
            }
            else {
                multaLibro = (diasRetraso * MULTA_DIARIA) + MULTA_ADICIONAL;
            }
            multaUsuario += multaLibro;
            totalLibros++;
            if (diasRetraso > 0) {
                librosRetraso++;
            }
            else {
                librosPuntuales++;
            }
            let infoRetraso = '';
            if (diasRetraso === 0) {
                infoRetraso = 'Sin retraso';
            }
            else {
                infoRetraso = diasRetraso + ' días de retraso';
            }
            console.log(`  Libro ${libro}: ${diasPrestamo} días — ${infoRetraso} — Multa: $${multaLibro.toLocaleString('es-CO')}`);
        }
        totalMultas += multaUsuario;
        const estado = (multaUsuario === 0) ? 'PUNTUAL' : 'CON RETRASO';
        console.log(`  Multa total usuario: $${multaUsuario.toLocaleString('es-CO')} — ${estado}`);
    }
    console.log('\n\n=== RESUMEN BIBLIOTECH ===');
    console.log(`Usuarios atendidos : ${cantidadUsuarios}`);
    console.log(`Total libros       : ${totalLibros}`);
    console.log(`Libros puntuales   : ${librosPuntuales}`);
    console.log(`Libros con retraso : ${librosRetraso}`);
    console.log(`MULTAS RECAUDADAS  : $${totalMultas.toLocaleString('es-CO')}`);
    rl.close();
}
programa();
