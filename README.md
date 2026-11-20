# Síntomas Asociados a Rinosinusitis Crónica SNOT-22

Test de resultado rinosinusual para evaluación clínica y seguimiento.

## Referencia Científica
> Soto-Tirado S, Villatoro-Rodríguez SN, Salgado TM, Londoño-Martínez LP, Ariza de la Ossa BD, Bedoya-Gutiérrez JD. Cross-cultural validation of the SNOT-22 questionnaire in the Colombian population. *Braz J Otorhinolaryngol.* 2026 May-Jun;92(3):101801. doi: 10.1016/j.bjorl.2026.101801. Epub 2026 Mar 19. PMID: 41855679; PMCID: PMC13019075.

---

## Desarrollo local

```bash
npm install
npm run dev
```

---

## Guía de publicación en GitHub + Firebase Hosting (`snot22-colombia`)

### 1. Subir el proyecto a GitHub
1. Crea un repositorio vacío en [github.com](https://github.com) llamado **`snot22-colombia`** (sin marcar README ni .gitignore).
2. En la carpeta de este proyecto ejecuta:
   ```bash
   git init -b main
   git add .
   git commit -m "Versión inicial SNOT-22 Colombia"
   git remote add origin https://github.com/TU-USUARIO/snot22-colombia.git
   git push -u origin main
   ```

### 2. Conectar y desplegar en Firebase Hosting (Gratis)
1. Crea un proyecto en [console.firebase.google.com](https://console.firebase.google.com) (ej. `snot22-colombia`).
2. Instala Firebase CLI e inicia sesión:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
3. Inicializa Firebase Hosting y vincúlalo a tu repositorio de GitHub:
   ```bash
   firebase init hosting
   ```
   - Selecciona **Use an existing project** y elige `snot22-colombia`.
   - *What do you want to use as your public directory?* -> **`dist`**
   - *Configure as a single-page app?* -> **`y`**
   - *Set up automatic builds and deploys with GitHub?* -> **`y`** (y selecciona `TU-USUARIO/snot22-colombia`).
4. Para desplegar manualmente la primera vez (o cuando quieras):
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

Una vez desplegado, la aplicación quedará disponible en `https://snot22-colombia.web.app` y abrirá directamente en cualquier dispositivo (Safari, iPhone, WhatsApp, Android, PC) sin bloqueos de cookies.
