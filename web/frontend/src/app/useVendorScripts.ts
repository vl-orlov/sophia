import { useEffect } from 'react';

let vendorScriptsRequested = false;

/**
 * Carga los scripts del diseño original de sophia-tech-corp.vercel.app
 * (vendoreados tal cual en public/vendor/ — ver README) contra el DOM que
 * React ya montó.
 *
 * script.js fue escrito para un HTML estático: usa
 * `document.addEventListener('DOMContentLoaded', ...)` y un
 * `window.addEventListener('load', ...)` asumiendo que todavía no dispararon.
 * Acá siempre se inyecta después de que React ya montó el árbol completo
 * (ese evento del documento real ya pasó hace rato), así que mientras carga
 * interceptamos esas dos suscripciones puntuales y ejecutamos el callback
 * al toque — el resto de document/window.addEventListener sigue intacto.
 * Los módulos de three.js (earth-hero.js, tr-*.js) no necesitan este parche:
 * ya vienen con un chequeo de `document.readyState` propio.
 */
export function useVendorScripts() {
  useEffect(() => {
    if (vendorScriptsRequested) return;
    vendorScriptsRequested = true;

    const originalDocAdd = document.addEventListener.bind(document);
    const originalWinAdd = window.addEventListener.bind(window);

    document.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: unknown) => {
      if (type === 'DOMContentLoaded') {
        typeof listener === 'function' ? listener(new Event(type)) : listener.handleEvent(new Event(type));
        return;
      }
      return originalDocAdd(type, listener as EventListener, options as AddEventListenerOptions);
    }) as typeof document.addEventListener;

    window.addEventListener = ((type: string, listener: EventListenerOrEventListenerObject, options?: unknown) => {
      if (type === 'load') {
        typeof listener === 'function' ? listener(new Event(type)) : listener.handleEvent(new Event(type));
        return;
      }
      return originalWinAdd(type, listener as EventListener, options as AddEventListenerOptions);
    }) as typeof window.addEventListener;

    function restore() {
      document.addEventListener = originalDocAdd;
      window.addEventListener = originalWinAdd;
    }

    function loadScript(src: string, type?: string): Promise<void> {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        if (type) script.type = type;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
        document.body.appendChild(script);
      });
    }

    loadScript('/vendor/script.js')
      .then(restore)
      .then(() =>
        Promise.all([
          loadScript('/vendor/earth-hero.js', 'module'),
          loadScript('/vendor/tr-pcb.js', 'module'),
          loadScript('/vendor/tr-arm.js', 'module'),
          loadScript('/vendor/tr-planet.js', 'module'),
          loadScript('/vendor/tr-hud.js', 'module'),
        ])
      )
      .catch((err) => {
        restore();
        console.error('[sophia] error cargando vendor scripts:', err);
      });
  }, []);
}
