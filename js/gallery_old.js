(function() {

// GLOBALS =======================================================================================================================================

// URLs list
const URL = ["assets/images/designs/1_small.png","assets/images/designs/2_small.png","assets/images/designs/3_small.png","assets/images/designs/4_small.png","assets/images/designs/5_small.png","assets/images/designs/6_small.png","assets/images/designs/7_small.png","assets/images/designs/8_small.png","assets/images/designs/9_small.png","assets/images/designs/10_small.png"];
const URL_large = ["assets/images/designs/1_big.png","assets/images/designs/2_big.png","assets/images/designs/3_big.png","assets/images/designs/4_big.png","assets/images/designs/5_big.png","assets/images/designs/6_big.png","assets/images/designs/7_big.png","assets/images/designs/8_big.png","assets/images/designs/9_big.png","assets/images/designs/10_big.png"];

let placeholder = "assets/images/designs/placeholder.png";

const Titles = ["Title 1","Title 2","Title 3","Title 4","Title 5","Title 6","Title 7","Title 8","Title 9","Title 10"];
const Subtitles = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat elit vel velit aliquet, sed auctor mi faucibus.","SubTitle 2","SubTitle 3","SubTitle 4","SubTitle 5","SubTitle 6","SubTitle 7","SubTitle 8","SubTitle 9","SubTitle 10"];
const Description = [];

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

	let placeholder_url = "url(" + placeholder + ")";

	/*

	if (pic_url_large == null || pic_url_large == undefined || pic_url_large === "") {	document.getElementById("modal_inner_div").style.backgroundImage = placeholder_url;	}
	else {	document.getElementById("modal_inner_div").style.backgroundImage = url;	}	

	*/

	document.getElementsByClassName("modal")[0].scrollTop = 0;

	// modifying snapshot url for using bigger image
	/*
	let insert = '_big';
	let position = '-4'
	let big_pic_url = [pic_url.slice(0, position), insert, pic_url.slice(position)].join('');
	*/

	let modal_inner_div = document.getElementById("modal_inner_div");

	if (pic_url_large == 'null' || pic_url_large == 'undefined' || pic_url_large === "") {	modal_inner_div.style.backgroundImage = placeholder_url;	}
	else {	modal_inner_div.style.backgroundImage = "url(" + pic_url_large + ")";	}

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

	let img_amount = URL.length;

	for (i = 0; i < img_amount; i++) {

		// gallery previews
		let card = document.createElement('label');
			card.htmlFor = "modal";
			card.className = "card";
			card.dataset.url = URL[i];
			card.dataset.url_large = URL_large[i];
			card.dataset.pic = i;
			card.addEventListener("click", modal_bg);

		let card_img = document.createElement('div');
			card_img.className = "card-img";
			let img_url = "url(" + URL[i] + ")";
			
			let placeholder_url = "url(" + placeholder + ")";
			if (URL[i] == null || URL[i] == undefined || URL[i] === "")
				{card_img.style.backgroundImage = placeholder_url;}
			else
				{card_img.style.backgroundImage = img_url;}

		let card_desc = document.createElement('div');
			card_desc.className = "card-desc";

		let card_title = document.createElement('H3');
		card_title.innerHTML = Titles[i];

		let card_subtitle = document.createElement('p');
		card_subtitle.innerHTML = Subtitles[i];

		card_desc.appendChild(card_title);
		card_desc.appendChild(card_subtitle);

		card.appendChild(card_img);
		card.appendChild(card_desc);

		gallery_container.appendChild(card);
	}

	// show container back
	gallery_container.style.display = "flex";

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
	label_bg.appendChild(modal_inner_counter);
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

		document.getElementById("modal_inner_counter_div").innerHTML = pic_current + "  /  " + img_count + "<br> - <br>" + Subtitles[pic_current-1];
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

	if(e.keyCode === 39 && pic_number < img_counter-1) {
		++pic_number;
		img_curr(pic_number, img_counter);
		bg_change(images[pic_number].dataset.url_large);}

	if(e.keyCode === 37 && pic_number > 0) {
		--pic_number;
		img_curr(pic_number, img_counter);
		bg_change(images[pic_number].dataset.url_large);}

	});
	
}


function modal_right_nav() {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;

		if(pic_number < img_counter-1) {
			++pic_number;
			img_curr(pic_number, img_counter);
			bg_change(images[pic_number].dataset.url_large);}

}

function modal_left_nav() {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;

	if(modal.checked == true) {
		
		if(pic_number > 0) {
			--pic_number;
			img_curr(pic_number, img_counter);
			bg_change(images[pic_number].dataset.url_large);}

	}

}


// changing large image in modal to new image with recieved url
function bg_change(pic_url) {
	let url = "url(" + pic_url + ")";
	let placeholder_url = "url(" + placeholder + ")";

	if (pic_url == 'null' || pic_url == 'undefined' || pic_url === "") {	document.getElementById("modal_inner_div").style.backgroundImage = placeholder_url;	}
	else {	document.getElementById("modal_inner_div").style.backgroundImage = url;	}	
	
	document.getElementsByClassName("modal")[0].scrollTop = 0;
}

// disable page scroll while modal is opened
/*
function scrollToggle() {
	
	if(this.checked == true) { document.body.style.overflow = "hidden"; }
	else { document.body.style.overflow = ""; };

}
*/

modal_build(); // append modal template
keyboard_control(); // adding keyboard navigation
previews_build();



(function projects_gallery() {

	let projects_container = document.getElementById("projects_gallery");
	const projects_URL = ["assets/images/projects/1_small.png","assets/images/projects/2_small.png","assets/images/projects/3_small.png","assets/images/projects/4_small.png","assets/images/projects/5_small.png","assets/images/projects/6_small.png","assets/images/projects/7_small.png","assets/images/projects/8_small.png","assets/images/projects/9_small.png","assets/images/projects/10_small.png"];
	const projects_titles = ["Title 1","Title 2","Title 3","Title 4","Title 5","Title 6","Title 7","Title 8","Title 9","Title 10"];
	const projects_subtitles = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat elit vel velit aliquet, sed auctor mi faucibus.","SubTitle 2","SubTitle 3","SubTitle 4","SubTitle 5","SubTitle 6","SubTitle 7","SubTitle 8","SubTitle 9","SubTitle 10"];
	const projects_links = ["#","#","#","#","#","#","#","#","#","#"];
	let projects_total = projects_titles.length;

	projects_container.style.display = "none";

	while (projects_container.firstChild) {	projects_container.firstChild.remove();	}

	for (i = 0; i < projects_total; i++) {

		let card = document.createElement('a');
			card.className = "card";
			card.href = projects_links[i];

		let card_img = document.createElement('div');
			card_img.className = "card-img";
			let img_url = "url(" + projects_URL[i]; + ")";
			card_img.style.backgroundImage = img_url;

		let card_desc = document.createElement('div');
			card_desc.className = "card-desc";

		let card_title = document.createElement('H3');
		card_title.innerHTML = projects_titles[i];

		let card_subtitle = document.createElement('p');
		card_subtitle.innerHTML = projects_subtitles[i];

		card_desc.appendChild(card_title);
		card_desc.appendChild(card_subtitle);

		card.appendChild(card_img);
		card.appendChild(card_desc);

		projects_container.appendChild(card);
	}

	projects_container.style.display = "flex";

}) ();

//projects_gallery();

})();

