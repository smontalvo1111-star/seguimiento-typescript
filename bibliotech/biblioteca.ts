import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pregunta = (texto: string): Promise<string> => 
  new Promise(resolve => rl.question(texto, resolve));

const PRESTAMO_DIAS: number = 7;
const MULTA_DIARIA: number = 1500;
const MULTA_ADICIONAL: number = 10000;

async function programa(): Promise<void> {

  let totalLibros: number = 0;
  let librosRetraso: number = 0;
  let librosPuntuales: number = 0;
  let totalMultas: number = 0;

  const cantidadUsuarios: number = parseInt(await pregunta('¿Cuántos usuarios devuelven libros hoy? '));
  console.log('\n');

  for (let u = 1; u <= cantidadUsuarios; u++) {

    const nombreUsuario: string = await pregunta(`Usuario ${u} - Nombre completo: `);
    let cantidadLibros: number = parseInt(await pregunta(`Usuario ${u} - ¿Cuántos libros devuelve? (máx. 3): `));

    while (cantidadLibros < 1 || cantidadLibros > 3) {
      cantidadLibros = parseInt(await pregunta('Número inválido. Ingresa entre 1 y 3: '));
    }

    let multaUsuario: number = 0;

    console.log(`\n--- USUARIO ${u}: ${nombreUsuario} ---`);
    console.log(`Libros devueltos: ${cantidadLibros}`);

    for (let libro = 1; libro <= cantidadLibros; libro++) {

      const diasPrestamo: number = parseInt(await pregunta(`  Días que tuvo el libro ${libro}: `));
      let diasRetraso: number = 0;

      if (diasPrestamo > PRESTAMO_DIAS) {
        diasRetraso = diasPrestamo - PRESTAMO_DIAS;
      }

      let multaLibro: number = 0;

      if (diasRetraso === 0) {
        multaLibro = 0;
      } else if (diasRetraso <= 15) {
        multaLibro = diasRetraso * MULTA_DIARIA;
      } else {
        multaLibro = (diasRetraso * MULTA_DIARIA) + MULTA_ADICIONAL;
      }

      multaUsuario += multaLibro;
      totalLibros++;

      if (diasRetraso > 0) {
        librosRetraso++;
      } else {
        librosPuntuales++;
      }

      let infoRetraso: string = '';
      if (diasRetraso === 0) {
        infoRetraso = 'Sin retraso';
      } else {
        infoRetraso = diasRetraso + ' días de retraso';
      }

      console.log(`  Libro ${libro}: ${diasPrestamo} días — ${infoRetraso} — Multa: $${multaLibro.toLocaleString('es-CO')}`);
    }

    totalMultas += multaUsuario;

    const estado: string = (multaUsuario === 0) ? 'PUNTUAL' : 'CON RETRASO';
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
