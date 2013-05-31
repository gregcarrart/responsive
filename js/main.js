(function () {
        
    // Create mobile element
    var mobile = document.createElement('div');
    mobile.className = 'nav-mobile';
    document.querySelector('.nav').appendChild(mobile);

    $('.nav-mobile').click(function() {
    	$('.nav-list').toggle('blind', 500);
    	return false;
    });

})(jQuery);