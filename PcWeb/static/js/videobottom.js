/*
	2016-01-18 dhjo
*/

$(document).ready(function(){
	$('.nextClick').animateSprite({fps: 25});
    video.on('ended',function(){
    	if($('.nextClick').hasClass('active')){
        }else{
	        $('.nextClick').show();
	        $('.nextClick').animateSprite('frame',0);
	        $('.nextClick').animateSprite('restart');
        }
    });
});

