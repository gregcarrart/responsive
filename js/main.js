(function($){

	var isModal = true;

    // Create mobile element
    var mobile = document.createElement('div');
    mobile.className = 'nav-mobile';
    document.querySelector('.nav').appendChild(mobile);

    $('.nav-mobile').click(function() {
    	$('.nav-list').toggle('blind', 500);
    	return false;
    });

    function init() {
    	getData();
    	events();
    }

    function getData() {
    	$.ajax({
        type: 'GET',
        url: 'json/items.json',
        dataType: 'json',
        success: function(data) {
            setData(data);
            console.log(data);  
        }
      });
    }

    function setData(data) {
    	$.each(data.items, function(i, obj){
        var itemTitle, itemImg, itemDesc;
        
	    var itemTitle      = obj.title,
	        itemImg        = obj.image,
	        itemShortDesc  = obj.shortDesc,
	        itemLongDesc   = obj.longDesc,
	        itemUrl    	   = obj.url,
	        itemClient     = obj.client,
	        itemSkills     = obj.skills;

	        if (isModal) {
        		items = "<div class='item' full-title='" + itemTitle + "' data-url='" + itemUrl + "' full-img='" + itemImg + "' long-desc='" + itemLongDesc + "' client-name='" + itemClient + "' skills='" + itemSkills + "'><div class='meta'><div class='title'>" + itemTitle + "</div><div class='snippet'>" + itemShortDesc + "</div></div><div class='image-container'><img class='hero-image' src=" + itemImg + " /></div>"
        	} else  {
        		items = "<div class='item'><div class='meta'><div class='title'>" + itemTitle + "</div><div class='snippet'>" + itemShortDesc + "</div></div><div class='image-container'><img class='hero-image' src=" + itemImg + " /></div>"

        	}

        	$('.content-inner').append(items);
        });
    }

    function events() {
    	$(window).scroll(function(){
			var $this = $(this),
				  top = $this.scrollTop();
		});

    	if (isModal === true) {
			$('.item').live('click', function() {
				var $this = $(this),
					fullTitle = $this.attr('full-title'),
					fullImg   = $this.attr('full-img'),
					longDesc  = $this.attr('long-desc'),
					url       = $this.attr('data-url')
					client    = $this.attr('client-name'),
					skills    = $this.attr('skills');

				openModalHandler(fullTitle, url, fullImg, longDesc, client, skills);
			});

			$('#overlay').on('click', function() {
				closeModalHandler();
			});
	 	 }
    }

    function openModalHandler(fullTitle, url, fullImg, longDesc, client, skills) {
    	var scrollTop = $(window).scrollTop();
    	$('#modal').css('top', scrollTop);

    	$('#loader').show();

    	$('#overlay').fadeIn(100, function() {
			$('#modal').fadeIn(200);
		});

		$('#modal').find('#modalImage').append("<img class='modal-img' style='display:none;' src=" + fullImg + " alt='image' />");
		$('#modal').find('#modalTitle').append('<span>' + fullTitle + '</span>');
		$('#modal').find('#caption').append('<span>' + longDesc + '</span>');
		$('#modal').find('#url').append('<a href=' + url + ' target="_blank">' + url + '</a>');
		$('#modal').find('#clients').append('<span>' + client + '</span>');
		$('#modal').find('#skills').append('<span>' + skills + '</span>');

		$('#modal').find('.modal-img').load(function() {
			setContent();
		});
    }

    function closeModalHandler() {
    	$('#modal').fadeOut(300, function() {
			$('#overlay').fadeOut(100);
			$('#modalTitle').find('span').remove();
			$('#url').find('a').remove();
			$('#modalImage').find('img').remove();
			$('#caption').find('span').remove();
			$('#clients').find('span').remove();
			$('#skills').find('span').remove();
			$('#loader').show();
		});
    }

    function setContent() {
    	$('#loader').hide();
		$('.modal-img').show();
    } 

    init();

})(jQuery);