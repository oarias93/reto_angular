# Prueba Técnica Frontend

Interfaz web simple que consuma una API pública (JSONPlaceholder) para mostrar posts y sus detalles.

---

## **Características**
- Listado de posts
- Vista detallada de cada post
- Manejo de estados (loading, error)
- Diseño responsive con SCSS  
- Pruebas unitarias

---

## **Tecnologías Utilizadas**
- Angular 19
- TypeScript
- RxJS
- SCSS
- Karma/Jasmine (testing)

---

## **Requisitos previos**
- Instalacion Node JS
- Instalacion Angular 19
  
---

## **Instalación y ejecución**
```bash
# Clonar el repositorio en tu equipo local
git clone https://github.com/oarias93/reto_angular.git

# Entrar a la carpeta
cd pruebaTecnica-app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve

# Abrir en el navegador
http://localhost:4200
```

---

## **Descripción del proyecto y arquitectura**
Aplicación frontend desarrollada con Angular 19 que consume la API pública JSONPlaceholder para mostrar un listado de posts y sus detalles. El proyecto demuestra:

- Consumo de API REST con HttpClient
- Navegación entre vistas (listado / detalle)
- Manejo de estados (carga, error)
- Implementación de pruebas unitarias (servicio y componente de lista)

## **Arquitectura**
src/
├── app/
│   ├── core/
│   │   ├── services/         -> Lógica de conexión a API
│   │   └── models/           -> Interfaces
│   ├── features/
│   │   └── posts/
│   │       ├── post-list/    -> Lista de posts
│   │       └── post-detail/  -> Detalle de post
│   └── app.config.ts         -> Configuracion  General
│   └── app.routes.ts         -> Rutas (Standalone)

---

## **Decisiones Técnicas**
- **Angular o Vue**: Aunque el reto mencionaba Vue, elegi hacer la prueba en angular por mi experiencia y por la robustez del mismo, al igual que vue maneja TypeScript, y con esto evidencia el manejo del mismo, el cual resaltaron es de vital importancia para el proceso de selección.
- **Servicios y modelos separados**: Nos permiten mantener una separación clara entre lógica de negocio y componentes visuales.
- **Manejo de errores**: Cada componente muestra loading, errores o estado vacío según corresponda.
- **Pruebas unitarias**: alidan el comportamiento de los servicios y componentes con gran cobertura del desarrollo en general
- **Estructura HMTL y SCSS**: SCSS en lugar de CSS plano, para mantener estilos organizados y adaptables con media queries. Adicional maquetacion con uso de clases basadas en metodologia BEM para darle mayor claridad, interfaz sencilla pero bonita y agradable a la vist del usuario

---

## **Pruebas unitarias**
El proyecto tiene cobertura ≥ 60% como se solicita en el reto. Se validan:

- Servicio de conexión (PostService)
- Componente de listado (PostListComponent)
 
**Ejecutar tests:**
```bash
cd pruebaTecnica-app
ng test
```

**Ver cobertura:**
```bash
cd pruebaTecnica-app
ng test --code-coverage
```

---

### Desarrollado por @oarias93 / www.linkedin.com/in/oscared1993
