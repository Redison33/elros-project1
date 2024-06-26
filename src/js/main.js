window.addEventListener('DOMContentLoaded', () => {
    IMask(document.getElementById('inputPhone'), {
        mask: '+{7}(000)000-00-00',
    });
    const aboutSwiper = new Swiper('.about__swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 150,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    // Fancybox.bind('[data-fancybox]', {
    //     // Your custom options
    // });
    const catalogSwiper = new Swiper('.catalog__swiper', {
        direction: 'horizontal',
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 160,
        centeredSlides: true,
        loop: true,
        initialSlide: 1,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1600: {
                slidesPerView: 3,
            },
            960: {
                slidesPerView: 2,
            },
            319: {
                slidesPerView: 1,
            },
        },
        on: {
            slideChange: function () {
                updateZoom();
            },
            transitionEnd: function () {
                updateZoom();
            },
        },
    });
    function updateZoom() {
        // Удаляем зум со всех слайдов
        $('.swiper-slide .slide__imgs span .main-img').parent().trigger('zoom.destroy');
        $('.swiper-slide .slide__imgs .imgs__wrap div .minor-img').parent().trigger('zoom.destroy');
        $('.swiper-slide .slide__imgs .imgs__wrap span img').parent().trigger('zoom.destroy');

        // Включаем зум на активном слайде
        $('.swiper-slide-active .slide__imgs span .main-img').css('display', 'block').parent().zoom();
        $('.swiper-slide-active .slide__imgs .imgs__wrap div .minor-img').css('display', 'block').parent().zoom();
        $('.swiper-slide-active .slide__imgs .imgs__wrap span img').css('display', 'block').parent().zoom();
        let test = document.querySelector('.catalog__swiper').querySelector('.swiper-slide-active').querySelectorAll('[data-fancybox]');
        Fancybox.fromNodes(Array.from(test), {
            // Your custom options
        });
    }

    const buildingSwiper = new Swiper('.building__swiper', {
        direction: 'horizontal',
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 40,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1600: {
                slidesPerView: 3,
            },
            700: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            },
        },
    });
    ymaps.ready(init);
    function init() {
        // Создание карты.
        var myMap = new ymaps.Map(
            'map',
            {
                center: [56.229065, 40.806625],
                zoom: 9,
                controls: [],
            },
            { suppressMapOpenBlock: true },
        );

        let myPlacemark = new ymaps.Placemark([56.190702, 40.911506], {
            balloonContent: 'Адрес: Владимирская область, Камешковский район, деревня Пенкино',
        });

        myPlacemark.events.add('click', function (e) {
            var placemark = e.get('target');
            myMap.balloon.open(placemark.geometry.getCoordinates(), {
                contentHeader: 'Информация',
                contentBody: placemark.properties.get('balloonContent'),
            });
        });

        myMap.geoObjects.add(myPlacemark);
    }

    let burger = document.querySelector('.burger');
    let burgerMenu = document.querySelector('.header__nav');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        burgerMenu.classList.toggle('header__nav--active');
    });

    let form = document.querySelector('.feedback__form');
    let inputName = document.querySelector('#inputName');
    let inputPhone = document.querySelector('#inputPhone');
    let errorText1 = document.querySelector('.error-text-1');
    let errorText2 = document.querySelector('.error-text-2');

    form.addEventListener('submit', (event) => {
        if (inputName.value === '' && (inputPhone.value === '' || inputPhone.value.length !== 16)) {
            event.preventDefault();
            errorText1.classList.add('error-text--active');
            errorText2.classList.add('error-text--active');
            setTimeout(() => {
                errorText1.classList.remove('error-text--active');
            }, 5000);
            setTimeout(() => {
                errorText2.classList.remove('error-text--active');
            }, 5000);
        } else if (inputPhone.value === '' || inputPhone.value.length !== 16) {
            event.preventDefault();
            errorText2.classList.add('error-text--active');
            setTimeout(() => {
                errorText2.classList.remove('error-text--active');
            }, 5000);
        } else if (inputName.value === '') {
            event.preventDefault();
            errorText1.classList.add('error-text--active');
            setTimeout(() => {
                errorText1.classList.remove('error-text--active');
            }, 5000);
        } else {
            errorText1.classList.remove('error-text--active');
            errorText2.classList.remove('error-text--active');
        }
    });

    let tabs = document.querySelector('.catalog__tabs');
    let tab = document.querySelectorAll('.catalog__tab');
    let tabContent = document.querySelectorAll('.catalog__swiper');

    tabs.addEventListener('click', (event) => {
        for (let i = 0; i < tab.length; i++) {
            tab[i].classList.remove('catalog__tab--active');
            tabContent[i].classList.remove('swiper--active');
            if (event.target == tab[i]) {
                tabContent[i].classList.add('swiper--active');
            }
        }
        event.target.classList.add('catalog__tab--active');
    });
    let btnScroll1 = document.querySelector('.about__button');
    let btnScroll2 = document.querySelector('.characteristics__button');
    btnScroll1.addEventListener('click', () => {
        document.querySelector('.feedback').scrollIntoView({ behavior: 'smooth' });
    });
    btnScroll2.addEventListener('click', () => {
        document.querySelector('.feedback').scrollIntoView({ behavior: 'smooth' });
    });

    let btnNav1 = document.querySelector('.header__item-1');
    let btnNav2 = document.querySelector('.header__item-2');
    let btnNav3 = document.querySelector('.header__item-3');
    let btnNav4 = document.querySelector('.header__item-4');
    let btnNav5 = document.querySelector('.footer__item-1');
    let btnNav6 = document.querySelector('.footer__item-2');
    let btnNav7 = document.querySelector('.footer__item-3');
    let btnNav8 = document.querySelector('.footer__item-4');
    btnNav1.addEventListener('click', () => {
        document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav2.addEventListener('click', () => {
        document.querySelector('#map').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav3.addEventListener('click', () => {
        document.querySelector('.catalog').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav4.addEventListener('click', () => {
        document.querySelector('.homeForFamily').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav5.addEventListener('click', () => {
        document.querySelector('.about').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav6.addEventListener('click', () => {
        document.querySelector('#map').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav7.addEventListener('click', () => {
        document.querySelector('.catalog').scrollIntoView({ behavior: 'smooth' });
    });
    btnNav8.addEventListener('click', () => {
        document.querySelector('.homeForFamily').scrollIntoView({ behavior: 'smooth' });
    });

    (function (m, e, t, r, i, k, a) {
        m[i] =
            m[i] ||
            function () {
                (m[i].a = m[i].a || []).push(arguments);
            };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
                return;
            }
        }
        (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]), (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(97400384, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
    });
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({ id: '3519281', type: 'pageView', start: new Date().getTime() });
    (function (d, w, id) {
        if (d.getElementById(id)) return;
        var ts = d.createElement('script');
        ts.type = 'text/javascript';
        ts.async = true;
        ts.id = id;
        ts.src = 'https://top-fwz1.mail.ru/js/code.js';
        var f = function () {
            var s = d.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ts, s);
        };
        if (w.opera == '[object Opera]') {
            d.addEventListener('DOMContentLoaded', f, false);
        } else {
            f();
        }
    })(document, window, 'tmr-code');
});
$(function () {
    $(document).ready(function () {
        let catalogTab = document.querySelectorAll('.catalog__tab');
        catalogTab[1].addEventListener('click', () => {
            $('.swiper-slide-active .slide__imgs span .main-img').css('display', 'block').parent().zoom();
            $('.swiper-slide-active .slide__imgs .imgs__wrap div .minor-img').css('display', 'block').parent().zoom();
            $('.swiper-slide-active .slide__imgs .imgs__wrap span img').css('display', 'block').parent().zoom();
        });
    });
});
