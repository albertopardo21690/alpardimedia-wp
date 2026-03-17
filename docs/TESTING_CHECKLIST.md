# Checklist de Testing Manual — Alpardimedia WP

## Auth
- [ ] Registro con datos válidos → token recibido, redirige al dashboard
- [ ] Registro con email duplicado → error "El email ya está registrado"
- [ ] Registro con contraseña < 8 chars → error de validación
- [ ] Login correcto → token guardado, dashboard carga
- [ ] Login con contraseña incorrecta → "Credenciales incorrectas"
- [ ] Acceder a /dashboard sin token → redirige a /login
- [ ] Cerrar sesión → redirige a /login, localStorage limpio

## Dashboard
- [ ] Carga proyectos del usuario autenticado
- [ ] Stats muestran totales correctos
- [ ] Búsqueda filtra proyectos en tiempo real
- [ ] Filtro por estado funciona correctamente
- [ ] Paginación funciona con más de 6 proyectos
- [ ] Botón "Nuevo proyecto" redirige a /projects/install
- [ ] Menú de opciones muestra Gestionar, wp-admin, Eliminar
- [ ] Modal de confirmación aparece al eliminar
- [ ] Métricas se cargan en proyectos instalados
- [ ] Responsive en móvil — sidebar se abre/cierra con botón menú

## Formulario de Instalación
- [ ] Auto-relleno de dbName y siteName al escribir nombre
- [ ] Validación BD en tiempo real — muestra estado conexión
- [ ] Generador de contraseña — crea contraseña y copia al portapapeles
- [ ] Vista previa wp-config.php se carga correctamente
- [ ] Selección de plugins populares funciona
- [ ] Guardar borrador persiste datos al recargar
- [ ] Resumen muestra todos los datos correctamente
- [ ] Progreso visual muestra pasos durante instalación
- [ ] Instalación completa → pantalla de éxito con links
- [ ] Links wp-admin y ver sitio funcionan

## Panel de Gestión
- [ ] Estado del WordPress instalado visible
- [ ] Métricas (posts, páginas, comentarios, tema) se cargan
- [ ] Tab Páginas — lista páginas del WP
- [ ] Tab Páginas — crear nueva página funciona
- [ ] Tab Plugins — lista plugins instalados
- [ ] Tab Plugins — activar/desactivar plugin funciona
- [ ] Tab Plugins — instalar nuevo plugin funciona
- [ ] Tab Temas — lista temas instalados
- [ ] Tab Temas — activar tema funciona
- [ ] Tab Usuarios — lista usuarios del WP
- [ ] Tab Usuarios — crear nuevo usuario funciona
- [ ] Botón wp-admin abre panel en nueva pestaña
- [ ] Responsive en móvil — tabs se desplazan horizontalmente

## Backend / API
- [ ] Health check responde OK
- [ ] Rate limit auth — bloquea tras 10 intentos
- [ ] Rate limit API — bloquea tras 100 requests/min
- [ ] Rate limit instalación — bloquea tras 5 instalaciones/hora
- [ ] Errores de validación devuelven campos específicos
- [ ] Rutas inexistentes devuelven 404
- [ ] Logs se escriben en /backend/logs/
- [ ] error.log registra errores 500
- [ ] combined.log registra todas las requests

## Flujo Completo End-to-End
- [ ] Registro → Login → Dashboard → Nuevo proyecto → Instalar WP → Panel gestión → wp-admin
- [ ] Todo el flujo funciona sin errores en desktop
- [ ] Todo el flujo funciona sin errores en móvil (responsive)
