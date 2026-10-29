# EstigiaGaming - Proyecto Frontend React (Evaluación Parcial 2 - DSY1104)

Tienda online de hardware y periféricos gamer desarrollada con **React**, **Next.js**, **Bootstrap 5**, persistencia CRUD con **LocalStorage / JSON Server** y pruebas unitarias con **Jasmine y Karma**.

## Requisitos e Instalación

1. Clonar o descomprimir el proyecto e instalar las dependencias:
```bash
npm install
```
2. Iniciar el servidor de desarrollo Frontend (Puerto 3000):
```bash
npm run dev
```
3. Iniciar la API simulada con db.json en una segunda terminal (Puerto 4000):
```bash
npx json-server db.json -p 4000
```
4. Ejecutar las 10 pruebas unitarias y generar el reporte de cobertura con Jasmine y Karma:
```bash
npm test
```