# CyberNet - Internet Prepago

Portal Cautivo personalizado para **pfSense**, desarrollado como proyecto universitario.

Simula la contratación de un plan de internet prepago: el usuario selecciona un plan, realiza un pago simulado, ingresa un voucher y obtiene acceso a la red.

## Características

- **100% frontend**: HTML5, CSS3 y JavaScript Vanilla.
- **Sin dependencias**: no usa React, Vue, Angular, Bootstrap, Tailwind, Node.js, bases de datos ni backend externo.
- **Integración nativa con pfSense**: utiliza las variables `$PORTAL_ACTION$`, `$PORTAL_REDIRURL$` y `$PORTAL_ZONE$`, y envía el voucher mediante `name="auth_voucher"`.
- **Diseño Cyberpunk empresarial**: fondo negro, acentos en amarillo `#F3E600` y cian `#55EAD4`, rojo `#C5003C` solo para advertencias.
- **Responsive**: mobile-first con CSS Grid y Flexbox.

## Planes disponibles

| Plan         | Duración | Precio (demostrativo) |
| ------------ | -------- | --------------------- |
| CYBER BASIC  | 30 min   | Q5                    |
| CYBER PLUS   | 60 min   | Q10                   |
| CYBER MAX    | 120 min  | Q15                   |

> Los precios son únicamente demostrativos. **No se procesa ningún pago real**, no se solicita tarjeta de crédito ni se conecta a ninguna API.

## Flujo de uso

1. El usuario se conecta a la red WiFi.
2. pfSense redirige al portal cautivo.
3. El usuario visualiza los tres planes disponibles.
4. Selecciona un plan → se abre un modal con:
   - Plan seleccionado
   - Precio
   - Duración
5. Presiona **SIMULAR PAGO**.
6. Tras ~1 segundo se muestra **PAGO APROBADO**.
7. Se muestra el formulario de voucher.
8. El usuario ingresa el voucher y presiona **ACTIVAR INTERNET**.
9. El formulario envía el voucher a pfSense (`auth_voucher`), que valida y concede el acceso.

Además, existe la sección **"¿Ya tienes un voucher?"** al final de la página, para ingresar el voucher directamente sin pasar por la selección de plan.

> El frontend **no valida** el voucher. La validación real la realiza pfSense.

## Estructura del proyecto

```
portal/
│
├── index.html             Página principal (versión multi-archivo)
├── portal-pfsense.html    Versión single-file (CSS + JS embebidos)
├── css/
│   ├── variables.css      Paleta y tokens de diseño (variables CSS)
│   ├── base.css           Reset y estilos base
│   └── portal.css         Layout y componentes
└── js/
    ├── app.js             Punto de entrada (composición)
    ├── PlanService.js     Datos y consulta de planes
    ├── PaymentSimulator.js Simulación de pago
    └── PortalView.js      Vista, eventos e interacción
```

## Arquitectura JavaScript

Aplica **SOLID** de forma sencilla, sin sobrearquitecturar:

- **`PlanService`** — Responsabilidad única de los datos: expone la lista de planes (`getAll`) y la búsqueda por id (`getById`).
- **`PaymentSimulator`** — Simula el procesamiento del pago. Devuelve una `Promise` que se resuelve en ~1 s con el resultado "PAGO APROBADO". No manipula el DOM.
- **`PortalView`** — Capa de presentación: renderiza las tarjetas, controla el modal, las etapas (resumen → aprobado → voucher) y los eventos del DOM mediante `addEventListener`.
- **`app.js`** — Composición raíz: instancia los servicios y la vista, y arranca la aplicación.

Cada módulo es una clase ES con una única responsabilidad. La comunicación entre capas se hace por inyección de dependencias en el constructor (la vista recibe el `PlanService` y el `PaymentSimulator`). No hay código global: en `index.html` se usan **módulos ES** (`type="module"`) y en `portal-pfsense.html` todo queda encapsulado en una **IIFE**.

## Requisitos

- Cualquier navegador moderno.
- Solo para servirlo localmente (opcional): **Python 3** o la extensión **Live Server** de VS Code.

## Cómo ejecutar el proyecto

### Opción A — Python (http.server)

Abre una terminal en la carpeta `Portal` y ejecuta:

```bash
# Python 3
python -m http.server 8000
```

Luego visita: **http://localhost:8000**

> Nota: los módulos ES de `index.html` requieren servirse por HTTP (no funcionan abriendo el archivo directamente con `file://`). `portal-pfsense.html`, en cambio, funciona en ambos casos.

### Opción B — Live Server (VS Code)

1. Instala la extensión **Live Server** de Ritwick Dey.
2. Abre la carpeta `Portal` en VS Code.
3. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
4. Se abrirá automáticamente en tu navegador (por defecto en `http://127.0.0.1:5500`).

## Despliegue en pfSense

1. Usa el archivo **`portal-pfsense.html`** (single-file), que incluye el CSS y el JavaScript necesarios embebidos.
2. Súbelo como página personalizada del Captive Portal en pfSense.
3. pfSense reemplazará automáticamente las variables del formulario:
   - `$PORTAL_ACTION$`
   - `$PORTAL_REDIRURL$`
   - `$PORTAL_ZONE$`
4. Configura pfSense en modo **Vouchers** para que valide los códigos `auth_voucher`.

> No modifiques los nombres de las variables ni el campo `name="auth_voucher"`; son los que espera el Captive Portal de pfSense.

## Notas importantes

- No se implementan pagos reales.
- No se almacena información financiera.
- No se agrega login adicional, registro, base de datos, JWT, backend ni APIs.
- La validación del voucher es responsabilidad exclusiva de pfSense.
