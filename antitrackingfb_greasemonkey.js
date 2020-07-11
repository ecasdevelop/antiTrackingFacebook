// ==UserScript==
// @name     antiTrackingFacebook
// @version  1
// @grant    none
// @require https://code.jquery.com/jquery-3.5.1.min.js
// @run-at      document-end
// ==/UserScript==

//Parece funcionar con firefox en linux pero no con firefox en android

var urlActual=window.location.href;
if(urlActual.includes('facebook.com'))
{
  //
  function eliminarTracking(elementoDOM,atributo,e)
  {
      var direccionURL=$(elementoDOM).attr(atributo);
      //alert('url:'+direccionURL); //Descomentar linea de codigo para ver detalles 
      var modificada=direccionURL
      .replace('https://l.facebook.com/l.php?u=','')
      .replace('https://lm.facebook.com/l.php?u=','')
      .replace(/%3A/g,':')
      .replace(/%2F/g,'/')
      .replace(/fbclid/g,'alvfb')
      .replace(/%3F/g,'?')
      .replace(/%3D/g,'=')
      ;
      //alert('Modificada:'+modificada); //Descomentar linea de codigo para ver detalles 
      e.preventDefault();
      window.open(modificada,'_blank');
    	
  }
  
  
  function esEnlaceInterno(e, etiqueta)
  {
    	var direccion =etiqueta.attr('href');
      if(direccion==='#'|| direccion.startsWith('/')|| direccion.startsWith('https://www.facebook.com'))
        return true;
    	return false;
  }
  
  function validarEnlaces(e,etiqueta){
      if(esEnlaceInterno(e,etiqueta))
        ;
      else
      	eliminarTracking(etiqueta,'href',e);
  }
  
	//carga la primera vez  
  $('a').on('click',function(e){
    	validarEnlaces(e, $(this));
  });
  
  //carga cada que se hace scroll
  $(window).scroll(function(){
    $('a').off('click');
    $('a').on('click',function(e){
      validarEnlaces(e,$(this));
    });
  });
}
//Fuentes: 
//https://stackoverflow.com/questions/26268816/how-to-get-a-greasemonkey-script-to-run-both-at-run-at-document-start-and-at-r
//https://stackoverflow.com/questions/859024/how-can-i-use-jquery-in-greasemonkey



