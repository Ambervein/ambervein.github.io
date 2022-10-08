(function() {
// SMOOTHSCROLL
$('.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});

// MOBILE MENU HANDLER
let myMenu = document.querySelector(".menu");
let oppMenu = document.querySelector(".menu-icon");
myMenu.addEventListener("transitionend", OnTransitionEnd, false);
oppMenu.addEventListener("click", toggleClassMenu, false);
myMenu.addEventListener("click", toggleClassMenu, false);

function toggleClassMenu() {
	myMenu.classList.add("menu-animatable");	
	if(!myMenu.classList.contains("menu-visible")) {		
		myMenu.classList.add("menu-visible");
	} else {
		myMenu.classList.remove('menu-visible');		
	}	
}

function OnTransitionEnd() {myMenu.classList.remove("menu-animatable");}

// FORM VALIDATION

// --- Globals ---

// Submit button lock / Отключение кнопки отправки, пока все не проверится
let submit_button = document.getElementById('submit_order');
submit_button.disabled = true;
	
// Validation success flags / Флаги проверок полей
let name_valid = false;
let tel_valid = false;
let cap_valid = false;

// KeyUp listeners for instant validation / Листнеры полей
document.getElementById("name").addEventListener("keyup", name_validator);
document.getElementById("tel").addEventListener("keyup", tel_validator);
document.getElementById("sum").addEventListener("keyup", cap_validator);

// --- End of Globals ---

// Captcha / Капча
function Captcha() {

	let a = Math.floor(Math.random() * 10);
	let b = Math.floor(Math.random() * 10);
	let sum = a + b;

	let capcha = document.createElement("capcha");
	capcha.className = "capcha";
	capcha.innerHTML = "Введите сумму чисел:&nbsp;&nbsp;&nbsp;<span id='a'>" + a + "</span> + <span id='b'>" + b + "</span>";
	document.getElementById("cap_container").appendChild(capcha);

}

Captcha();

// Validators
function name_validator() {
	
	let name = document.getElementById("name");
	let name_alert = document.getElementById("name_alert");
	let name_value = name.value;
	let check = /^[А-Яа-яіїІЇA-za-z _]{1,35}$/;

	if (!check.test(name.value) || name_value.length < 7) {name_alert.dataset.toggle = "enabled"; name_valid = false;}
	else {name_alert.dataset.toggle = "disabled"; name_valid = true;};

	check_counter();
	
}

function tel_validator() {

	let tel = document.getElementById("tel");
	let tel_alert = document.getElementById("tel_alert");
	let tel_value = tel.value;
	let tel_check = /^[0-9]{1,20}$/;

	if (!tel_check.test(tel.value) || tel_value.length < 4) {tel_alert.dataset.toggle = "enabled"; tel_valid = false;}
	else {tel_alert.dataset.toggle = "disabled"; tel_valid = true;};

	check_counter();

}

function cap_validator() {

	let sum_value = document.getElementById("sum");
	let a = document.getElementById("a").innerHTML;
	let b = document.getElementById("b").innerHTML;
	
	let sum = parseInt(a, 10) + parseInt(b, 10);

	if (sum_value.value == sum) {cap_valid = true;}
	else {cap_valid = false;};

	check_counter();

}

// Success flags checkout
function check_counter() {

	if(!name_valid == true || !tel_valid == true || !cap_valid == true) {submit_button.disabled = true;} 
	else {submit_button.disabled = false;};

}

// GALLERY

let gallery_container_tables = document.getElementById("gallery-container-tables");
let gallery_container_loft_tables = document.getElementById("gallery-container-loft-tables");
let modals_container = document.getElementById("modals-container");
let pic_number = 0;

const URLS = [1,2,3,4,5,6,7,8,9,10,11,12];

const gallery_1 = [1,6];
const gallery_2 = [6,12];

function modal_bg() {

	let modal_inner = modal_build();
	pic_number = this.dataset.pic;
	pic_breakpoint = this.dataset.breakpoint;
	modal_inner.style.backgroundImage = "url(img/" + URLS[this.dataset.pic] +".jpg)";

	return pic_number;
}

function previews_build() {

//снапшоты первого раздела
for (i = 0; i < 6; i++) {

	// gallery items previews
	let label = document.createElement('label');
	label.htmlFor = "modal";
	label.dataset.pic = i;
	label.addEventListener("click", modal_bg);

	let gallery_item = document.createElement('div');
	gallery_item.className = "gallery-item ";
	gallery_item.style.backgroundImage = "url(img/" + URLS[i] +".jpg)";

	let gallery_item_cover = document.createElement('div');
	gallery_item_cover.className = "gallery-item-cover";
	gallery_item_cover.innerHTML = "<p>Показать</p>";

	gallery_container_tables.appendChild(label);
	label.appendChild(gallery_item);
	gallery_item.appendChild(gallery_item_cover); 

}

//снапшоты второго раздела
for (i = 6; i < 12; i++) {

	// gallery items previews
	let label = document.createElement('label');
	label.htmlFor = "modal";
	label.dataset.pic = i;
	label.addEventListener("click", modal_bg);

	let gallery_item = document.createElement('div');
	gallery_item.className = "gallery-item ";
	gallery_item.style.backgroundImage = "url(img/" + URLS[i] +".jpg)";

	let gallery_item_cover = document.createElement('div');
	gallery_item_cover.className = "gallery-item-cover";
	gallery_item_cover.innerHTML = "<p>Показать</p>";

	gallery_container_loft_tables.appendChild(label);
	label.appendChild(gallery_item);
	gallery_item.appendChild(gallery_item_cover); 

}

/*
// marking first and last gallery snapshots
let snapshotList = gallery_container_tables.getElementsByTagName('LABEL');
snapshotList[0].dataset.breakpoint = true;
snapshotList[snapshotList.length-1].dataset.breakpoint = true;
*/

}


// gallery modals body constructor

function modal_build() {

	let modal_input = document.createElement('input');
	modal_input.type = "checkbox";
	modal_input.id = "modal";
	modal_input.className = "modal-state";

	let modal_div = document.createElement('div');
	modal_div.className = "modal";

	let label_bg = document.createElement('label');
	label_bg.htmlFor = "modal";
	label_bg.className = "modal__bg";

	let modal_inner = document.createElement('div');
	modal_inner.className = "modal__inner";
	modal_inner.id = "modal_inner_div";
	modal_inner.innerHTML = "<p id='nav_left' class='modal-nav'><i class='fa fa-angle-left' aria-hidden='true'></i></p> <p id='nav_right' class='modal-nav'><i class='fa fa-angle-right' aria-hidden='true'></i></p>";
		
	modals_container.appendChild(modal_input);
	modals_container.appendChild(modal_div);
	modal_div.appendChild(label_bg);
	label_bg.appendChild(modal_inner);

	modal_inner.addEventListener('click', function(evt) { evt.preventDefault();}, false);

	let left = document.getElementById("nav_left");
	let right = document.getElementById("nav_right");

	left.addEventListener('click', modal_left_nav);
	right.addEventListener('click', modal_right_nav);

	let modal_inner_div = document.getElementById("modal_inner_div");

	return modal_inner_div;

}


// gallery sections hiding
// находит все блоки с классом .gallery-container и переключает им display в none

function gallery_hide() {

	let galleryList = document.querySelectorAll('div.gallery-container');
	
	for (i = 0; i < galleryList.length; i++)
	{galleryList[i].style.display="none";}

}


// gallery sections list show binded container with snapshots
// находит все радиоинпуты заголовков разделов галереи с классом .gallery-section-title и соответствующие им блоки разделов с классом .gallery-container 
// и переключает выбранному разделу display в flex

function gallery() {

	document.getElementById("gallery-menu").addEventListener("click", gallery);

	let galleryList = document.querySelectorAll('div.gallery-container');
	let gallerySectionsList = document.querySelectorAll('input.gallery-section-title');

	var flag = false;
	var i = 0;

	while (flag == false) {
		if(gallerySectionsList[i].checked == true) {gallery_hide(); galleryList[i].style.display="flex"; flag = true;} i++;
	}

}


function keyboard_control() {

	document.addEventListener("keydown", function(e) {
	
	if(e.keyCode === 27 && modal.checked == true) { modal_to_close.click();}

	if(document.getElementById("gallery-menu-1").checked == true) {

	if(e.keyCode === 39 && pic_number < 5) {
		++pic_number;
		bg_change(pic_number);}

	if(e.keyCode === 37 && pic_number > 0) {
		--pic_number;
		bg_change(pic_number);}
	}

	if(document.getElementById("gallery-menu-2").checked == true) {

	if(e.keyCode === 39 && pic_number < 11) {
		++pic_number;
		bg_change(pic_number);}

	if(e.keyCode === 37 && pic_number > 6) {
		--pic_number;
		bg_change(pic_number);}
	}

	});

}

function modal_right_nav() {

	if(document.getElementById("gallery-menu-1").checked == true) {

	if(pic_number > gallery_1[0]-1 && pic_number < gallery_1[1]) {
		++pic_number;
		bg_change(pic_number);
	}}

	if(document.getElementById("gallery-menu-2").checked == true) {

	if(pic_number > gallery_2[0]-1 && pic_number < gallery_2[1]) {
		++pic_number;
		bg_change(pic_number);
	}}

}

function modal_left_nav() {

	if(document.getElementById("gallery-menu-1").checked == true) {

	if(pic_number > gallery_1[0] && pic_number < gallery_1[1]+1) {
		--pic_number;
		bg_change(pic_number);
	}}

	if(document.getElementById("gallery-menu-2").checked == true) {

	if(pic_number > gallery_2[0] && pic_number < gallery_2[1]+1) {
		--pic_number;
		bg_change(pic_number);
	}}

}

function bg_change(pic_number) {
	modal_picture.style.backgroundImage = "url(img/" + (URLS[pic_number]) +".jpg)";
}

previews_build(); // previews generation
modal_build(); // append modal template
gallery_hide(); // hiding all preview containers
gallery(); // switching gallery sections

let modal_picture = document.getElementById("modal_inner_div");
let modal_to_close = document.getElementById("modal");

keyboard_control(); // adding keyboard navigation

})();