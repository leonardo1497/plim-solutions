jQuery(function($) {
    var windowHeight = $(window).height();
    var navHeight = $("#nav_main").height()+16;
    var homeHeight = windowHeight-navHeight;
    $('#home').css('height',homeHeight);
    $('body').css('padding-top',navHeight)
    $('body').css('scroll-padding-top',navHeight+1)

    $('html').css('scroll-padding-top',navHeight-1)
    $('#about-us').css('min-height',homeHeight)
    $('#contact-us').css('min-height',homeHeight)

    // Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: "http://plim-solutions.com/phpmailer/sendemail.php",
			dataType: 'JSON',
			data: {name : $("input[name='name']").val(), email : $("input[name='email']").val(), subject: $("input[name='subject']").val(), message: $("textarea[name='message']").val()}, // The form with the file    inputs.
			type: 'POST',
			success: function(response) {
                $("input[name='name']").val("")
                $("input[name='email']").val("")
                $("input[name='subject']").val("")
                $("textarea[name='message']").val("")
            },
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> El correo se está enviando...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success" style="font-weight:bold">Gracias por contactarnos. Le responderemos tan rápido como sea posible.</p>').delay(4000).fadeOut();
		});
	});
});