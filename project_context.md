Desarrolla un Portal Cautivo personalizado para pfSense para un proyecto
universitario denominado:

CyberNet - Internet Prepago

Debe desarrollarse únicamente con:

HTML5
CSS3
JavaScript Vanilla

No utilizar:

React
Vue
Angular
Bootstrap
Tailwind
Node.js
bases de datos
backend externo

El portal será utilizado como página personalizada del Captive Portal de pfSense.

--------------------------------------------------
OBJETIVO
--------------------------------------------------

El usuario debe:

1. conectarse a una red WiFi;
2. ser redirigido al portal;
3. visualizar los planes disponibles;
4. seleccionar un plan;
5. simular un pago;
6. ingresar un voucher;
7. enviar el voucher a pfSense;
8. obtener acceso a Internet.

NO implementar pagos reales.

--------------------------------------------------
INTEGRACIÓN PFSENSE
--------------------------------------------------

El formulario final debe utilizar las variables de pfSense:

$PORTAL_ACTION$
$PORTAL_REDIRURL$
$PORTAL_ZONE$

El voucher debe enviarse mediante:

name="auth_voucher"

Estructura base:

<form method="post" action="$PORTAL_ACTION$">

    <input
        type="hidden"
        name="redirurl"
        value="$PORTAL_REDIRURL$">

    <input
        type="hidden"
        name="zone"
        value="$PORTAL_ZONE$">

    <input
        type="text"
        name="auth_voucher"
        id="voucher"
        required>

    <button
        type="submit"
        name="accept">
        ACTIVAR INTERNET
    </button>

</form>

No modificar los nombres de estas variables.

--------------------------------------------------
PLANES
--------------------------------------------------

Mostrar tres planes:

CYBER BASIC
30 minutos

CYBER PLUS
60 minutos

CYBER MAX
120 minutos

El precio únicamente será demostrativo.

Ejemplo:

Q5
Q10
Q15

Estos precios NO deben procesarse realmente.

--------------------------------------------------
SIMULACIÓN DE PAGO
--------------------------------------------------

Cuando el usuario seleccione un plan:

Mostrar una ventana/modal sencilla:

Plan seleccionado
Precio
Duración

Botón:

SIMULAR PAGO

Al presionarlo:

esperar aproximadamente 1 segundo;

mostrar:

PAGO APROBADO

y posteriormente mostrar el formulario de voucher.

No almacenar información financiera.

No solicitar tarjeta de crédito.

No conectarse a ninguna API.

--------------------------------------------------
DISEÑO
--------------------------------------------------

Estilo Cyberpunk empresarial.

Paleta obligatoria:

Amarillo Cyberpunk
#F3E600

Rojo Carmesí
#C5003C

Burdeos
#880425

Cian Neón
#55EAD4

Negro
#000000

Usar variables CSS.

Fondo principalmente negro.

Usar cian y amarillo para elementos activos.

Usar rojo únicamente para advertencias, errores y detalles.

El resultado debe ser tecnológico pero profesional.

No exagerar:

- glitch
- sombras
- parpadeos
- animaciones

--------------------------------------------------
INTERFAZ
--------------------------------------------------

Header:

CYBERNET

Subtitulo:

INTERNET PREPAGO

Texto:

Selecciona un plan y activa tu conexión.

Mostrar las tres tarjetas de planes.

Agregar una sección final:

¿Ya tienes un voucher?

con campo para ingresar directamente el voucher.

--------------------------------------------------
ARQUITECTURA JAVASCRIPT
--------------------------------------------------

Aplicar SOLID de forma sencilla.

No sobrearquitecturar.

Separar:

PlanService
PaymentSimulator
PortalView
App

Evitar código global.

No utilizar onclick="" directamente en HTML.

Utilizar addEventListener.

--------------------------------------------------
RESPONSIVE
--------------------------------------------------

Mobile First.

Debe visualizarse correctamente en:

teléfonos
tablets
laptops

Usar CSS Grid y Flexbox.

--------------------------------------------------
ESTRUCTURA
--------------------------------------------------

portal/
│
├── index.html
│
├── css/
│   ├── variables.css
│   ├── base.css
│   └── portal.css
│
└── js/
    ├── app.js
    ├── PlanService.js
    ├── PaymentSimulator.js
    └── PortalView.js

Si pfSense dificulta utilizar múltiples archivos,
crear también una versión:

portal-pfsense.html

que contenga el CSS y JavaScript necesario en el mismo archivo
para poder cargarlo directamente en pfSense.

--------------------------------------------------
IMPORTANTE
--------------------------------------------------

El frontend NO debe validar el voucher.

La validación real del voucher corresponde a pfSense.

JavaScript únicamente controla:

- selección visual del plan;
- modal;
- simulación de pago;
- interfaz.

No agregar:

- login adicional;
- registro de usuarios;
- base de datos;
- JWT;
- backend;
- Firebase;
- APIs;
- frameworks.

Generar todos los archivos completos.

Revisar que el formulario final sea compatible con el Captive Portal de pfSense.