//SWIPER
const slider = document.querySelector('.advan-swiper');
const slider2 = document.querySelector('.product-swiper');
const slider3 = document.querySelector('.fran-swiper');

	var mySwiper = new Swiper(slider, {
			// Optional parameters
			autoplay: {
				delay: 5000,
			},
			fadeEffect: {
				crossFade: true
			},
			effect: 'fade',
			loop: true,
			slidesPerView: 1,

				// Navigation arrows
				navigation: {
					nextEl: '.advan-swiper__button-next',
					prevEl: '.advan-swiper__button-prev',
			},

				// If we need pagination
    			pagination: {
        			el: '.advan-swiper-pagination',
    			},
		});

	var mySwiper = new Swiper(slider2, {
			// Optional parameters
			autoplay: {
				delay: 5000,
			},
			fadeEffect: {
				crossFade: true
			},
			effect: 'fade',
			loop: true,
			slidesPerView: 1,

				// Navigation arrows
				navigation: {
					nextEl: '.product-swiper__button-next',
					prevEl: '.product-swiper__button-prev',
			},

				// If we need pagination
    			pagination: {
        			el: '.product-swiper-pagination',
    		},
		});

	var mySwiper = new Swiper(slider3, {
			// Optional parameters
			autoplay: {
				delay: 5000,
			},
			fadeEffect: {
				crossFade: true
			},
			effect: 'fade',
			loop: true,
			slidesPerView: 1,

				// Navigation arrows
				navigation: {
					nextEl: '.fran-swiper__button-next',
					prevEl: '.fran-swiper__button-prev',
			},

				// If we need pagination
    			pagination: {
        			el: '.fran-swiper-pagination',
    		},

	});

//MODALS
const btns = document.querySelectorAll('.modal-open-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const thanksPopup = document.querySelector('.thanks-popup');

btns.forEach((el) => {

	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		disableScroll();

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

modalOverlay.addEventListener('click', (e) => {
	if (e.target == modalOverlay) {
		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});
		thanksPopup.classList.remove('thanks-popup--visible')
		enableScroll();
	}
});

const modalClose = document.querySelectorAll('.modal__close');

modalClose.forEach((el) => {
	el.addEventListener('click', (e) => {
		modalOverlay.classList.remove('modal-overlay--visible');
		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		thanksPopup.classList.remove('thanks-popup--visible');
		});

		enableScroll();
	});
});

//SCROLL OFF
const body = document.body;

let padding = window.innerWidth - document.body.offsetWidth + 'px';

let disableScroll = function () {
	let pagePosition = window.scrollY;
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
	document.body.style.paddingRight = padding;
}

let enableScroll = function () {
	let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	window.scroll({
		top: pagePosition,
		left: 0
	});
	document.body.removeAttribute('data-position');
	document.body.style.paddingRight = 0;
}

//MASK
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask ('+7 (999) 999-99-99');
im.mask(selector);

//VALIDATION
let validateForms = function(selector, rules, successModal, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
		submitHandler: function(form) {
			let formData = new FormData(form);
			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log('Отправлено');
						modals.forEach((el) => {
							el.classList.remove('modal--visible');
						thanksPopup.classList.add('thanks-popup--visible');
						});
					}
				}
			}

			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);

			form.reset();
		}
	});
}

validateForms('.modal__form', { tel: {required: true} }, '.thanks-popup', 'send goal');

//BURGER
const burger = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__contacts');
const headerLink = document.querySelectorAll('.header-contacts__link');

burger.addEventListener('click', function(){

	burger.classList.toggle('active');
	headerNav.classList.toggle('active');
	body.classList.toggle('lock');

});

headerLink.forEach((el) => {
	el.addEventListener('click', (e) => {
		headerNav.classList.remove('active');
		burger.classList.remove('active');
		body.classList.remove('lock');

	});
});

//ANIMATION
AOS.init({
  offset: 100,
  duration: 800,
  easing: 'ease-in-quad',
});

