/* 
    Nota: Service Worker al ser un worker no puede hacer uso del DOM. 
*/
const nombreCache = 'ap-v7';
//vamos a cachear el contenido de la pagina/
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
    
];

//evento install el cual detecta cuando se instala el service worker
self.addEventListener('install', e => {
    console.log('Instalando el service worker');
    e.waitUntil( //el metodo waitUntil va a esperar a que se cumpla todo lo del codigo que tengamos dentro del bloque
        caches.open(nombreCache)
            .then(cache => {
                console.log('Cacheando...');
                cache.addAll(archivos)
            })
    );  
    
});

//evento para activar el service worker
self.addEventListener('activate', e =>{
    console.log('Service worker Activado');

    e.waitUntil(
        caches.keys()
            .then(keys=>{
                return Promise.all(
                    keys.filter(key => key !== nombreCache)
                        .map(key => caches.delete(key))//borra los demas
                )
            })
    )
});
 
//eventos fetch para descargar archivos estaticos
self.addEventListener('fetch', e =>{
    console.log('fetch...', e ) ;
    e.respondWith(
        caches.match(e.request)
        .then(cacheResponse => (cacheResponse ? cacheResponse : caches.match('/error.html')))
    )
});