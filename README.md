# Zombie Defense Frontend

Frontend de la aplicación **Zombie Defense**, una herramienta para calcular estrategias óptimas de defensa contra zombis en función de balas y tiempo disponibles.

## Requisitos

- **Node.js** 18+ (recomendado 20+)
- **Yarn** 1.x (`packageManager` configurado en `package.json`)

## Instalación

```bash
# Instalar dependencias
yarn install
```

## Configuración

1. Copia el archivo de ejemplo de variables de entorno:

   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y define la API key:

   ```env
   X_API_KEY=tu-api-key-aqui
   ```

3. El script `sync-env.js` se ejecuta automáticamente antes de `start` y `build` y sincroniza `X_API_KEY` en `src/environments/environment.development.ts`.

4. **URL del API**: La URL base por defecto es `https://localhost:7192`. Puedes modificarla en:
   - `src/environments/environment.development.ts` (desarrollo)
   - `src/environments/environment.ts` (producción)

## Comandos

| Comando        | Descripción                                    |
|----------------|------------------------------------------------|
| `yarn start`   | Inicia el servidor de desarrollo en `http://localhost:4200` |
| `yarn build`   | Compila para producción (output en `dist/`)    |
| `yarn watch`   | Build en modo watch (desarrollo)               |
| `yarn test`    | Ejecuta tests unitarios (Vitest)               |

## Estructura del proyecto

```
src/
├── app/
│   ├── core/                    # Configuración global, API, interceptors
│   │   └── api/
│   ├── features/
│   │   └── defense-strategy/    # Feature: estrategia de defensa
│   │       ├── data/            # Servicios, modelos, mappers
│   │       └── ui/              # Componentes de la UI
│   ├── app.config.ts
│   └── app.routes.ts
├── environments/
└── styles.css
```

### Rutas

| Ruta                | Descripción                                      |
|---------------------|--------------------------------------------------|
| `/`                 | Redirige a `/defense-strategy`                   |
| `/defense-strategy` | Formulario de estrategia óptima + listado de simulaciones |

### APIs consumidas

- `GET /api/Defense/optimal-strategy?bullets=&secondsAvailable=` — Obtiene la estrategia óptima
- `GET /api/Simulations` — Lista de simulaciones previas

## Tecnologías

- **Angular 21** (standalone components, signals)
- **Tailwind CSS 4**
- **TypeScript 5.9**
- **RxJS**
- **Vitest** para pruebas unitarias

## Licencia

Privado.
