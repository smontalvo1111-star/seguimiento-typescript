Proyectos TypeScript
Conversión de 4 ejercicios de JavaScript a TypeScript con tipado estricto.
Contenido

biblioteca.ts - Sistema de gestión de multas por retraso en devolución de libros
burgerpalace.ts - Sistema de pedidos para una hamburguesería
lavanderia.ts - Sistema de alquiler de lavadoras con descuentos
parquifacil.ts - Sistema de gestión de parqueadero con múltiples tarifas

Cambios de JavaScript a TypeScript
Se convirtieron los 4 archivos JavaScript originales a TypeScript agregando:

Tipado explícito en todas las variables
Tipos en parámetros de funciones
Tipos de retorno en funciones
Interfaces para estructurar datos (donde aplica)
Importación correcta de módulos con import

Requisitos

Node.js v14+
npm v6+

Instalación
bashnpm install
Esto instala:

typescript
@types/node

Cómo ejecutar
Compilar todos los archivos:
bashnpx tsc
Ejecutar un archivo específico:
bashnode biblioteca.js
node burgerpalace.js
node lavanderia.js
node parquifacil.js
Estructura del Proyecto
typescript-proyectos/
├── biblioteca.ts
├── burgerpalace.ts
├── lavanderia.ts
├── parquifacil.ts
├── tsconfig.json
├── package.json
├── .gitignore
└── README.md
Notas

Los archivos .js se generan automáticamente al compilar
La carpeta node_modules no se sube al repositorio
Todos los cambios en .ts requieren recompilar con npx tsc 🎉