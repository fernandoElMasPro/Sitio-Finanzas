# EVOLVE — Avances Tecnológicos de la Humanidad

Sitio web interactivo sobre los hitos tecnológicos que transformaron a la humanidad, construido en HTML/CSS/JS puro.

## Estructura del proyecto

```
sitio-avances-tecnologicos/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos (variables de diseño al inicio del archivo)
├── js/
│   └── script.js       # Partículas de fondo, línea de tiempo interactiva, contadores animados
├── assets/
│   └── img/            # Imágenes del sitio
└── README.md
```

## Características interactivas

- **Fondo de partículas animadas** conectadas entre sí (canvas), en la parte de atrás de toda la página.
- **Línea de tiempo expandible**: cada hito se abre al hacer clic para mostrar más detalle.
- **Revelado al hacer scroll**: los hitos aparecen con una animación suave conforme bajas.
- **Contadores animados** en la sección de impacto, que suben desde 0 cuando entran en pantalla.
- Todo respeta `prefers-reduced-motion` para quienes prefieren menos animación.

## Cómo trabajarlo en equipo con Git

1. Clona el repositorio: `git clone <url-del-repo>`
2. Crea una rama por cada sección o funcionalidad: `git checkout -b nombre-de-la-rama`
3. Antes de empezar cada día: `git checkout main` y luego `git pull origin main`
4. Commits pequeños y descriptivos: `git commit -m "Agrega sección de fronteras"`
5. Sube tu rama y abre un Pull Request para revisar antes de fusionar a `main`.

## Cómo verlo localmente

Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code.

## Próximos pasos sugeridos

- Reemplazar los hitos de ejemplo por los que ustedes decidan destacar.
- Agregar imágenes o ilustraciones propias en `assets/img/`.
- Revisar las cifras de la sección "Impacto" y actualizarlas con fuentes que ustedes verifiquen.
