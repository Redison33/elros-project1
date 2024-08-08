window.addEventListener('DOMContentLoaded', () => {
    ////////////////////////////////////////////////////////////////
    const scrollButton = document.querySelector('.button-overlay');
    let timeout = null;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollTop >= (documentHeight - windowHeight) / 2) {
            // scrollButton.style.display = 'block';
            scrollButton.style.transform = 'rotate(90deg)';

            // Сбрасываем таймер
            clearTimeout(timeout);

            // Устанавливаем таймер на скрытие кнопки
            timeout = setTimeout(() => {
                scrollButton.style.transform = 'rotate(90deg) translateY(200px)';
            }, 2000);
        } else {
            scrollButton.style.transform = 'rotate(90deg) translateY(200px)';
        }
    }
    window.addEventListener('scroll', handleScroll);
    ////////////////////////////////////////////////////////////////

    if (new Date().getHours() >= 5 && new Date().getHours() < 17) {
        document.querySelector('.header').classList.add('header-day');
    } else {
        document.querySelector('.header').classList.add('header-night');
    }
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
    Fancybox.bind('[data-fancybox]', {
        // Your custom options
    });
    const catalogSwiper1 = new Swiper('.catalog__swiper-1', {
        direction: 'horizontal',
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 160,
        centeredSlides: true,
        // loop: true,
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
                updateZoom(1);
            },
            transitionEnd: function () {
                updateZoom(1);
            },
        },
    });
    const catalogSwiper2 = new Swiper('.catalog__swiper-2', {
        direction: 'horizontal',
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 160,
        centeredSlides: true,
        // loop: true,
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
                updateZoom(2);
            },
            transitionEnd: function () {
                updateZoom(2);
            },
        },
    });
    function updateZoom(number) {
        $(`.catalog__swiper-${number} .swiper-slide img`).removeAttr('data-fancybox');
        $(`.catalog__swiper-${number} .swiper-slide-active img`).attr('data-fancybox', '');
    }
    Fancybox.bind('[data-fancybox]', {});

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
    const designSwiper = new Swiper('.design__swiper', {
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
            800: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            },
        },
    });
    // ymaps.ready(init);
    // function init() {
    //     // Создание карты.
    //     var myMap = new ymaps.Map(
    //         'map',
    //         {
    //             center: [56.229065, 40.806625],
    //             zoom: 9,
    //             controls: [],
    //         },
    //         { suppressMapOpenBlock: true },
    //     );

    //     let myPlacemark = new ymaps.Placemark([56.190702, 40.911506], {
    //         balloonContent: 'Адрес: Владимирская область, Камешковский район, деревня Пенкино',
    //     });

    //     myPlacemark.events.add('click', function (e) {
    //         var placemark = e.get('target');
    //         myMap.balloon.open(placemark.geometry.getCoordinates(), {
    //             contentHeader: 'Информация',
    //             contentBody: placemark.properties.get('balloonContent'),
    //         });
    //     });

    //     myMap.geoObjects.add(myPlacemark);
    // }

    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9,
            // Добавим кнопку для построения маршрутов на карту.
            controls: ['routeButtonControl'],
        });

        var control = myMap.controls.get('routeButtonControl');

        // Зададим координаты пункта отправления с помощью геолокации.
        control.routePanel.geolocate('from');

        // Откроем панель для построения маршрутов.
        control.state.set('expanded', true);

        // Подпишемся на событие успешного запроса маршрута.
        control.routePanel.getRouteAsync().then(function (route) {
            route.model.events.add('requestsuccess', function () {
                // Установим координаты точки "Куда" (например, Золотые Ворота во Владимире).
                control.routePanel.state.set({
                    toEnabled: true,
                    to: 'Владимирская область, Камешковский район, деревня Пенкино',
                });
            });
        });
    });
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
        } else if (inputPhone.value === '' || inputPhone.value.length !== 16) {
            event.preventDefault();
            errorText2.classList.add('error-text--active');
        } else if (inputName.value === '') {
            event.preventDefault();
            errorText1.classList.add('error-text--active');
        } else {
            errorText1.classList.remove('error-text--active');
            errorText2.classList.remove('error-text--active');
        }
    });
    inputName.addEventListener('input', () => {
        errorText1.classList.remove('error-text--active');
    });
    inputPhone.addEventListener('input', () => {
        errorText2.classList.remove('error-text--active');
    });
    for (let i = 0; i < document.querySelectorAll('.catalog__tab').length; i++) {
        let tab = document.querySelectorAll('.catalog__tab')[i];
        let tabContent = document.querySelectorAll('.catalog__swiper')[i];
        tab.addEventListener('click', (event) => {
            for (let i = 0; i < document.querySelectorAll('.catalog__tab').length; i++) {
                document.querySelectorAll('.catalog__tab')[i].classList.remove('catalog__tab--active');
                document.querySelectorAll('.catalog__swiper')[i].classList.remove('swiper--active');
            }
            tab.classList.add('catalog__tab--active');
            tabContent.classList.add('swiper--active');
        });
    }
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
    for (const button of document.querySelectorAll('.header__button')) {
        button.addEventListener('click', () => {
            document.querySelector('.feedback').scrollIntoView({ behavior: 'smooth' });
        });
    }
    document.querySelector('.move-to-feedback').addEventListener('click', () => {
        document.querySelector('.feedback').scrollIntoView({ behavior: 'smooth' });
    });
    for (const button of document.querySelectorAll('.slide__button')) {
        button.addEventListener('click', () => {
            document.querySelector('.feedback').scrollIntoView({ behavior: 'smooth' });
        });
    }
    for (const tab of document.querySelectorAll('.homeForFamily__tab')) {
        tab.classList.remove('homeForFamily__tab-active');
        tab.addEventListener('click', () => {
            tab.classList.add('homeForFamily__tab-active');
        });
    }
    for (let i = 0; i < document.querySelectorAll('.homeForFamily__tab').length; i++) {
        let tab = document.querySelectorAll('.homeForFamily__tab')[i];
        const size = ['66-5', '82-55', '86-2', '101-63', '104-5', '119-83', '121', '121-5', '122-53', '146-6'];
        // tab.classList.remove('homeForFamily__tab-active');
        // document.querySelector('.homeForFamily__map').classList.remove(`homeForFamily__map-${i}`);
        tab.addEventListener('click', () => {
            for (let i = 0; i < document.querySelectorAll('.homeForFamily__tab').length; i++) {
                document.querySelectorAll('.homeForFamily__tab')[i].classList.remove('homeForFamily__tab-active');
                document.querySelector('.homeForFamily__map').classList.remove(`homeForFamily__map-${size[i]}`);
            }
            tab.classList.add('homeForFamily__tab-active');
            document.querySelector('.homeForFamily__map').classList.add(`homeForFamily__map-${size[i]}`);
        });
    }
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
