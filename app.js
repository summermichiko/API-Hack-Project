$(document).ready(function() {

	$("input").focus();

	var min = '';
	var url = '';

	instagram = {
		clientID: "f1f6e2a78172440683a3c9eadc7d361c",
		apiHost: "https://api.instagram.com"
	};

	function loadInstagramPhotos() {
		tag = $("input").val();
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			cache: false,
			url: instagram.apiHost + "/v1/tags/" + tag + "/media/recent/?client_id=" + instagram.clientID + "&count=3",
			data: {"client_id": instagram.clientID, "max_tag_id": min},
			success: function(pic) {
				min = pic.pagination.next_max_tag_id;
				url = pic.pagination.next_url;
				//$('.button').addClass("active");
				for (var i = 0; i < pic.data.length; i++) { // data is the array we get back
					likes = pic.data[i].likes.count; //the number of likes for that picture (likes and count is from instagram)
					console.log(likes);
					link = pic.data[i].link;
					urlsrc = pic.data[i].images.thumbnail.url;
					$("#output").append("<div id='outputpic'><a target='_blank' href='" + link + "'><div id='stardiv'><div id='likesdiv'></div></div><img src='" + urlsrc + "'></img></div>");
				}
	        }      // <img src='star-icon.png' class='staricon'>
	    });
	}

	$("#morepictures").on("click", function() {
		loadInstagramPhotos();
	});

	$("#clearpictures").on("click", function() {
		$("#output").empty();
		$("input").val('');
		$("input").focus();
	});

	$("input").on("click focusin", function() {
		this.value = '';
	});

	var timerId;
	$("input").keyup(function() {
		clearTimeout(timerId);
		timerId = setTimeout(function() {loadInstagramPhotos(); }, 500);
	});

});





