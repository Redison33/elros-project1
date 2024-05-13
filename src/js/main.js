window.addEventListener('DOMContentLoaded', () => {
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

    const catalogSwiper = new Swiper('.catalog__swiper', {
        direction: 'horizontal',
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 160,
        centeredSlides: true,
        loop: true,
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
            320: {
                slidesPerView: 1,
            },
        },
    });

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
                    to: 'Владимир, Дворянская улица, 1А',
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
        if (inputName.value === '' && inputPhone.value === '') {
            event.preventDefault();
            errorText1.classList.add('error-text--active');
            errorText2.classList.add('error-text--active');
            setTimeout(() => {
                errorText1.classList.remove('error-text--active');
            }, 5000);
            setTimeout(() => {
                errorText2.classList.remove('error-text--active');
            }, 5000);
        } else if (inputPhone.value === '') {
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
});
