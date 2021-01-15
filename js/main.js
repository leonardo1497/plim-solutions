jQuery(document).ready(function($) {
    var windowHeight = $(window).height();
    var navHeight = $("#nav_main").height()+16;
    var homeHeight = windowHeight-navHeight;
    $('#home').css('height',homeHeight);
    $('body').css('padding-top',navHeight)
    $('body').css('scroll-padding-top',navHeight)

    $('html').css('scroll-padding-top',navHeight-1)
    $('#services').css('min-height',homeHeight)
    $('#about-us').css('min-height',homeHeight)
    $('#contact-us').css('min-height',homeHeight)

    // Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		
		var name = $("input[name='name']").val().trim();
		var email = $("input[name='email']").val().trim();
		var subject = $("input[name='subject']").val().trim();
		var message = $("textarea[name='message']").val().trim();
		
		if(name != "" && email != "" && subject != "" && message != ""){
    		$.ajax({
    			url: "https://plim-solutions.com/phpmailer/sendemail.php",
    			dataType: 'JSON',
    			data: {name : name, email : email, subject: subject, message: message}, // The form with the file    inputs.
    			type: 'POST',
    			success: function(response) {
    			    if(response.result){
                        $("input[name='name']").val("")
                        $("input[name='email']").val("")
                        $("input[name='subject']").val("")
                        $("textarea[name='message']").val("")
                        form_status.html('<p class="text-success" style="font-weight:bold">Gracias por contactarnos. Le responderemos tan rápido como sea posible.</p>').delay(4000).fadeOut();
    			    }else{
    			        form.prepend(form_status.html('<p class="text-danger" style="font-weight:bold">'+response.message+'</p>').delay(4000).fadeOut());
    			    }
                },
    			beforeSend: function(){
    				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> El correo se está enviando...</p>').fadeIn() );
    			}
    		})
		}else{
		    form.prepend(form_status.html('<p class="text-danger" style="font-weight:bold">Datos incorrectos, intente de nuevo.</p>').delay(4000).fadeOut());
		}
	});
}); // end del document.ready