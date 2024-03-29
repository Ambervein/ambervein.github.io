(function() {

// GLOBALS =======================================================================================================================================

const DESIGNS = [
	
	{
		title: "Mailifier.io",
		subtitle: "Dashboard design/coding/programming for email verification company",
		type: "web-design / coding / react js",
		URL_preview: "assets/images/designs/14_small.jpg",
		URL_large: "assets/images/designs/14_big.jpg"
	},
	{
		title: "Mailifier.io",
		subtitle: "Landing page design/coding for email verification company",
		type: "web-design / coding",
		URL_preview: "assets/images/designs/13_small.jpg",
		URL_large: "assets/images/designs/13_big.jpg",
		demo: "https://mailifier.io/"
	},
	{
		title: "Nordstal",
		subtitle: "Landing page design for steel company",
		type: "web-design",
		URL_preview: "assets/images/designs/12_small.jpg",
		URL_large: "assets/images/designs/12_big.jpg"
	},
	{
		title: "Art Wood Design",
		subtitle: "Landing page design/coding for custom wood furniture company",
		type: "web-design / coding",
		URL_preview: "assets/images/designs/11_small.jpg",
		URL_large: "assets/images/designs/11_big.jpg",
		demo: "assets/projects/AWD/index.html"
	},
	{
		title: "Profitape",
		subtitle: "<q>Classic</q> online store design for Profitape company",
		type: "web-design",
		URL_preview: "assets/images/designs/10_small.jpg",
		URL_large: "assets/images/designs/10_big.jpg"
	},
	{
		title: "Art Wood Design",
		subtitle: "Logo and business card design for custom wood furniture company",
		type: "graphic design",
		URL_preview: "assets/images/designs/1_small.jpg",
		URL_large: "assets/images/designs/1_big.jpg"
	},
	{
		title: "Sushi Weka",
		subtitle: "Logo and business card design for sushi delivery company",
		type: "graphic design",
		URL_preview: "assets/images/designs/2_small.jpg",
		URL_large: "assets/images/designs/2_big.jpg"
	},
	{
		title: "Amarant Labs",
		subtitle: "Logo and business card design for medical equipment supplier",
		type: "graphic design",
		URL_preview: "assets/images/designs/3_small.jpg",
		URL_large: "assets/images/designs/3_big.jpg"
	},
	{
		title: "Roster",
		subtitle: "Logo and business card design for Roster web-studio",
		type: "graphic design",
		URL_preview: "assets/images/designs/4_small.jpg",
		URL_large: "assets/images/designs/4_big.jpg"
	},
	{
		title: "Brondomus",
		subtitle: "Logo and business card design for cottage building company",
		type: "graphic design",
		URL_preview: "assets/images/designs/5_small.jpg",
		URL_large: "assets/images/designs/5_big.jpg"
	},
	{
		title: "BookMark",
		subtitle: "Logo and business card design for digital art agency",
		type: "graphic design",
		URL_preview: "assets/images/designs/6_small.jpg",
		URL_large: "assets/images/designs/6_big.jpg"
	},
	{
		title: "D.Art",
		subtitle: "Logo and business card design for digital art agency",
		type: "graphic design",
		URL_preview: "assets/images/designs/7_small.jpg",
		URL_large: "assets/images/designs/7_big.jpg"
	},
	{
		title: "Mramore",
		subtitle: "Logo and business card design for solid marble decor company",
		type: "graphic design",
		URL_preview: "assets/images/designs/8_small.jpg",
		URL_large: "assets/images/designs/8_big.jpg"
	},
	{
		title: "Grand Tours",
		subtitle: "Logo and business card design for travel company",
		type: "graphic design",
		URL_preview: "assets/images/designs/9_small.jpg",
		URL_large: "assets/images/designs/9_big.jpg"
	}
];

let placeholder = "assets/images/designs/placeholder.png";

// grabbing gallery containers
let gallery_container = document.getElementById("designs_gallery"); // div for gallery snapshots

// appending popup template
let modal_popup = document.createElement('div');
	modal_popup.id = "modals-container";
	document.body.insertBefore(modal_popup, document.body.lastChild);

// number of currently opened image
let pic_number = 0;

// END OF GLOBALS ================================================================================================================================

// call modal with enlarged image
function modal_bg() {

	pic_number = this.dataset.pic;
	pic_url = this.dataset.url;
	pic_url_large = this.dataset.url_large;

	let placeholder_url = placeholder;

	document.getElementsByClassName("modal")[0].scrollTop = 0;

	let modal_inner_div = document.getElementById("modal_inner_div");
	let modal_image = document.getElementById("modal_image");

	modal_image.src = "";

	modal_image.style.display = "none";

	if (pic_url_large == 'null' || pic_url_large == 'undefined' || pic_url_large === "") 
		{	modal_image.src = placeholder_url;	}
	else 
		{	modal_image.src = pic_url_large;	}

	modal_image.style.display = "flex";

	// counter "pic XX of XX"
	let img_total = gallery_container.getElementsByTagName("label").length;
	var curr_img = parseInt(pic_number, 10);
	img_curr(curr_img, img_total);

	// push to global scope number of currently opened image
	return pic_number;
}

// previews constructor
function previews_build() {

	// hiding gallery container while snapshots appending to avoid extra repaint-reflow issues
	gallery_container.style.display = "none";

	// removing previously generated previews
	while (gallery_container.firstChild) { 
		gallery_container.firstChild.remove();
	}

	let img_amount = DESIGNS.length;

	for (i = 0; i < img_amount; i++) {

		// gallery previews
		let card = document.createElement('label');
			card.htmlFor = "modal";
			card.className = "card";
			card.dataset.url = DESIGNS[i].URL_preview;
			card.dataset.url_large = DESIGNS[i].URL_large;
			card.dataset.pic = i;
			card.addEventListener("click", modal_bg);

		let card_img = document.createElement('div');
			card_img.className = "card-img";
			let img_url = "url(" + DESIGNS[i].URL_preview + ")";
			
			let placeholder_url = "url(" + placeholder + ")";
			if (DESIGNS[i].URL_preview == null || DESIGNS[i].URL_preview == undefined || DESIGNS[i].URL_preview === "")
				{card_img.style.backgroundImage = placeholder_url;}
			else
				{card_img.style.backgroundImage = img_url;}

		let card_desc = document.createElement('div');
			card_desc.className = "card-desc";

		let card_title = document.createElement('H3');
		card_title.innerHTML = DESIGNS[i].title;

		let card_subtitle = document.createElement('p');
		card_subtitle.innerHTML = DESIGNS[i].subtitle;

		let card_type = document.createElement('p');
		card_type.className = "card-type";
		card_type.innerHTML = DESIGNS[i].type;

		let card_link = document.createElement('a');
		card_link.innerHTML = "Live demo";
		card_link.target = "_blank";
		card_link.href = DESIGNS[i].demo;

		card_desc.appendChild(card_title);
		card_desc.appendChild(card_subtitle);
		if(DESIGNS[i].demo !== undefined) {card_desc.appendChild(card_link);}
		card_desc.appendChild(card_type);

		card.appendChild(card_img);
		card.appendChild(card_desc);

		gallery_container.appendChild(card);
	}

	// show container back
	gallery_container.style.display = "grid";

}


// gallery modals body constructor
function modal_build() {

	let modal_input = document.createElement('input');
	modal_input.type = "checkbox";
	modal_input.id = "modal";
	modal_input.className = "modal-state";
	//modal_input.addEventListener('change', scrollToggle);

	let modal_div = document.createElement('div');
	modal_div.className = "modal";

		let label_bg = document.createElement('label');
		label_bg.htmlFor = "modal";
		label_bg.className = "modal__bg";

			let modal_inner = document.createElement('div');
			modal_inner.className = "modal__inner";
			modal_inner.id = "modal_inner_div";
			
				let nav_left_button = document.createElement('div');
				nav_left_button.id = "nav_left";
				nav_left_button.className = "modal-nav";
				nav_left_button.innerHTML = "<svg class='icon'><use xlink:href='#back'></use></svg>";

				let nav_right_button = document.createElement('div');
				nav_right_button.id = "nav_right";
				nav_right_button.className = "modal-nav";
				nav_right_button.innerHTML = "<svg class='icon'><use xlink:href='#next'></use></svg>";

				let modal_image = document.createElement('img');
				modal_image.className = "modal-image";
				modal_image.id = "modal_image";

				let modal_image_container = document.createElement('div');
				modal_image_container.className = "modal-image-container";

				let modal_inner_counter = document.createElement('div');
				modal_inner_counter.className = "modal__inner__counter";
				modal_inner_counter.id = "modal_inner_counter_div";
				modal_inner_counter.innerHTML = "xx из xx";
		
	let modals_container = document.getElementById("modals-container");


	modals_container.appendChild(modal_input);
	modals_container.appendChild(modal_div);
	modal_div.appendChild(label_bg);
	label_bg.appendChild(modal_inner);
	
	modal_inner.appendChild(nav_left_button);
	modal_inner.appendChild(modal_image_container);

		modal_image_container.appendChild(modal_image);
		modal_image_container.appendChild(modal_inner_counter);
	
	modal_inner.appendChild(nav_right_button);

	modal_inner.addEventListener('click', function(evt) { evt.preventDefault(); evt.stopPropagation();}, false);

	let left = document.getElementById("nav_left");
	let right = document.getElementById("nav_right");

	left.addEventListener('click', modal_left_nav);
	right.addEventListener('click', modal_right_nav);

	let modal_inner_div = document.getElementById("modal_inner_div");

	return modal_inner_div;

}

// counter "XX image from XX"
function img_curr(a,b) {

		let pic_current = a + 1;
		let img_count = b;

		let href_link = '"'+DESIGNS[pic_current-1].URL_large+'"';
		let _blank = '"'+'_blank'+'"';

		document.getElementById("modal_inner_counter_div").innerHTML = pic_current + "  /  " + img_count + "<br> - <br>" + DESIGNS[pic_current-1].subtitle + "<br> <span onclick='window.open("+href_link+","+_blank+");'>Full size image</span>";
}

// gallery navigation
function keyboard_control() {

	document.addEventListener("keydown", function(e) {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;
	

	if(e.keyCode === 27 && document.getElementById("modal").checked == true) { document.getElementById("modal").click(); pic_number = 0; return pic_number;}

	// getting number of current image from data-pic, using it as index in images[] collection 
	// and sending data-url of prev/next element in collection as arg to bg_change()

	let modal_image = document.getElementById("modal_image");

	if(e.keyCode === 39 && pic_number < img_counter-1) {
		++pic_number;
		img_curr(pic_number, img_counter);
		modal_image.src = "";
		bg_change(images[pic_number].dataset.url_large);}

	if(e.keyCode === 37 && pic_number > 0) {
		--pic_number;
		img_curr(pic_number, img_counter);
		modal_image.src = "";
		bg_change(images[pic_number].dataset.url_large);}

	});
	
}


function modal_right_nav() {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;

	let modal_image = document.getElementById("modal_image");

		if(pic_number < img_counter-1) {
			++pic_number;
			img_curr(pic_number, img_counter);
			modal_image.src = "";
			bg_change(images[pic_number].dataset.url_large);}

}

function modal_left_nav() {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;

	let modal_image = document.getElementById("modal_image");

	if(modal.checked == true) {
		
		if(pic_number > 0) {
			--pic_number;
			img_curr(pic_number, img_counter);
			modal_image.src = "";
			bg_change(images[pic_number].dataset.url_large);}

	}

}


// changing large image in modal to new image with recieved url
function bg_change(pic_url) {
	let url = pic_url;
	let placeholder_url = placeholder;

	let modal_image = document.getElementById("modal_image");
	
	modal_image.style.display = "none";

	if (pic_url == 'null' || pic_url == 'undefined' || pic_url === "") {	modal_image.src = placeholder_url;	}
	else {	modal_image.src = url;	}	

	modal_image.style.display = "flex";
	
	document.getElementsByClassName("modal")[0].scrollTop = 0;
}


modal_build(); // append modal template
keyboard_control(); // adding keyboard navigation
setTimeout(previews_build, 500);

})();

