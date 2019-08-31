/**
 * Simple Gallery 
 * @version 1.3.4
 * @author Ambervein <flexer2117@gmail.com>
 * @license The MIT License (MIT)
 * @todo getting folder listing dinamically
 * @todo standartize CSS 
 */

(function() {

// GLOBALS =======================================================================================================================================

// sections list
const gallery_sections = ['Столы с полимерной заливкой','Столы в стиле лофт','Стулья в стиле лофт','Стеллажи в стиле лофт','Разделочные доски'];

// URLs list
const URL = [
				["img/tables/1.jpg","img/tables/2.jpg","img/tables/3.jpg","img/tables/4.jpg","img/tables/5.jpg","img/tables/6.jpg","img/tables/7.jpg","img/tables/8.jpg","img/tables/9.jpg","img/tables/10.jpg","img/tables/11.jpg","img/tables/12.jpg","img/tables/13.jpg","img/tables/14.jpg","img/tables/15.jpg","img/tables/16.jpg","img/tables/17.jpg","img/tables/18.jpg","img/tables/19.jpg","img/tables/20.jpg"],
				["img/loft_tables/1.jpg","img/loft_tables/2.jpg","img/loft_tables/3.jpg","img/loft_tables/4.jpg","img/loft_tables/5.jpg","img/loft_tables/6.jpg","img/loft_tables/7.jpg","img/loft_tables/8.jpg"],
				["img/loft_chairs/1.jpg","img/loft_chairs/2.jpg","img/loft_chairs/3.jpg","img/loft_chairs/4.jpg","img/loft_chairs/5.jpg","img/loft_chairs/6.jpg","img/loft_chairs/7.jpg","img/loft_chairs/8.jpg"],
				["img/loft/1.jpg","img/loft/2.jpg","img/loft/3.jpg","img/loft/4.jpg","img/loft/5.jpg","img/loft/6.jpg","img/loft/7.jpg","img/loft/8.jpg","img/loft/9.jpg","img/loft/10.jpg"],
				["img/desks/1.jpg","img/desks/2.jpg","img/desks/3.jpg","img/desks/4.jpg","img/desks/5.jpg","img/desks/6.jpg","img/desks/7.jpg"]
			];

// grabbing gallery containers
let gallery_menu_container = document.getElementById("gallery-menu"); // div for gallery menu
let gallery_container = document.getElementById("gallery-container"); // div for gallery snapshots

// appending popup template
let modal_popup = document.createElement('div');
	modal_popup.id = "modals-container";
	document.body.insertBefore(modal_popup, document.body.lastChild);

// number of currently opened image
let pic_number = 0;

// END OF GLOBALS ================================================================================================================================

function menu_build() {

	let gallery_sections_count = gallery_sections.length;

	for(i = 0; i < gallery_sections_count; i++) {

	// gal menu item container
	let gallery_menu_item = document.createElement('div');
		gallery_menu_item.className = "gallery-menu-item";

	// gal menu item radio
	let gallery_menu_item_radio = document.createElement('input');
		gallery_menu_item_radio.setAttribute('type',"radio");
  		gallery_menu_item_radio.setAttribute('name',"gallery-menu");
  		gallery_menu_item_radio.className = "gallery-section-title";
  		gallery_menu_item_radio.id = "gallery-menu-" + (i+1);

	// gal menu item label
	let gallery_menu_item_label = document.createElement('label');
		gallery_menu_item_label.htmlFor = "gallery-menu-" + (i+1);
		gallery_menu_item_label.innerHTML = gallery_sections[i];
		gallery_menu_item_label.dataset.section = (i+1);
		gallery_menu_item_label.addEventListener("click", previews_build);

	gallery_menu_container.appendChild(gallery_menu_item);
	gallery_menu_item.appendChild(gallery_menu_item_radio);
	gallery_menu_item.appendChild(gallery_menu_item_label);

	}

	// section shown by default
	document.querySelector('label[for="gallery-menu-1"]').click();

}

// call modal with enlarged image
function modal_bg() {

	pic_number = this.dataset.pic;
	pic_url = this.dataset.url;

	let modal_inner_div = document.getElementById("modal_inner_div");
	modal_inner_div.style.backgroundImage = "url(" + pic_url + ")";

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
		gallery_container.firstChild.remove()
	}

	// taking section number and comparing with corresponding sub-array with images URLs
	let section_counter = this.dataset.section;
	let img_amount = URL[section_counter-1].length;

	for (i = 0; i < img_amount; i++) {

		// gallery previews
		let label = document.createElement('label');
		label.htmlFor = "modal";
		label.className = "gallery-item";
		let img_url = "url(" + URL[section_counter-1][i]; + ")";
		label.style.backgroundImage = img_url;
		label.dataset.url = URL[section_counter-1][i];
		label.dataset.pic = i;
		label.addEventListener("click", modal_bg);

		gallery_container.appendChild(label);
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
	modal_input.addEventListener('change', scrollToggle);

	let modal_div = document.createElement('div');
	modal_div.className = "modal";

	let label_bg = document.createElement('label');
	label_bg.htmlFor = "modal";
	label_bg.className = "modal__bg";

	let modal_inner = document.createElement('div');
	modal_inner.className = "modal__inner";
	modal_inner.id = "modal_inner_div";
	modal_inner.innerHTML = "<div id='nav_left' class='modal-nav'><svg class='icon'> <use xlink:href='#back'></use></svg></div> <div id='nav_right' class='modal-nav'><svg class='icon'><use xlink:href='#next'></use></svg></div>";
	
	let modal_inner_counter = document.createElement('div');
	modal_inner_counter.className = "modal__inner__counter";
	modal_inner_counter.id = "modal_inner_counter_div";
	modal_inner_counter.innerHTML = "xx из xx";
		
	let modals_container = document.getElementById("modals-container");

	modals_container.appendChild(modal_input);
	modals_container.appendChild(modal_div);
	modal_div.appendChild(label_bg);
	label_bg.appendChild(modal_inner);
	modal_div.appendChild(modal_inner_counter);

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
		document.getElementById("modal_inner_counter_div").innerHTML = pic_current + "  из  " + img_count;
}

// gallery navigation
function keyboard_control() {

	document.addEventListener("keydown", function(e) {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;
	

	if(e.keyCode === 27) { document.getElementById("modal").click(); pic_number = 0; return pic_number;}

	// getting number of current image from data-pic, using it as index in images[] collection 
	// and sending data-url of prev/next element in collection as arg to bg_change()

	if(e.keyCode === 39 && pic_number < img_counter-1) {
		++pic_number;
		img_curr(pic_number, img_counter);
		bg_change(images[pic_number].dataset.url);}

	if(e.keyCode === 37 && pic_number > 0) {
		--pic_number;
		img_curr(pic_number, img_counter);
		bg_change(images[pic_number].dataset.url);}

	

	});
	
}


function modal_right_nav() {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;

	

		if(pic_number < img_counter-1) {
			++pic_number;
			img_curr(pic_number, img_counter);
			bg_change(images[pic_number].dataset.url);}

	

}

function modal_left_nav() {

	// getting current images in gal container
	let images  = gallery_container.getElementsByTagName("label");
	let img_counter = gallery_container.getElementsByTagName("label").length;

	if(modal.checked == true) {
		
		if(pic_number > 0) {
			--pic_number;
			img_curr(pic_number, img_counter);
			bg_change(images[pic_number].dataset.url);}

	}

}


// changing large image in modal to new image with recieved url
function bg_change(pic_url) {
	let url = "url(" + pic_url + ")";
	document.getElementById("modal_inner_div").style.backgroundImage = url;
}

// disable page scroll while modal is opened
function scrollToggle() {
	
	if(this.checked == true) { document.body.style.overflow = "hidden"; }
	else { document.body.style.overflow = ""; };

}

menu_build(); //append gallery menu
modal_build(); // append modal template
keyboard_control(); // adding keyboard navigation


})();

