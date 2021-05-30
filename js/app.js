if('serviceWorker' in navigator){
    /* 
        Para nosotros poder trabajar con paginas web progresivas, necesitamos registrar un service worker lo cual se realiza de la siguiente forma
    */
    navigator.serviceWorker.register('./sw.js')//sw.js es un fichero que creamos en la raiz de nuestro proyecto el cual llevará la configuracion del service worker
    .then(registrado => console.log('Se ah instalado correctamente el SW',registrado))
    .catch(error=> console.log('Fallo la instalacion',error))
}else{
    console.log('Service worker no soportados');
}