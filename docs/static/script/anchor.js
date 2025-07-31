function anchor_handler(t) {
    navigator.clipboard.writeText(t.href);

    if (window.location.hash == '') {
        window.location.hash = "#" + t.href.split('#')[1]
    }
}

function anchor_cleanup() {
    const old_poss = window.scrollY;

    history.scrollRestoration = 'auto';
    window.location.hash = '';

    // 1. Удаляем якорь из URL
    const cleanUrl = window.location.href.split('#')[0];
    window.history.replaceState(null, null, cleanUrl);

    // 2. Обрабатываем ВСЕ элементы с подсветкой
    document.querySelectorAll('.content-base.target-highlight').forEach(el => {
        // Сохраняем текущий цвет ДО изменений
        const bgColor = getComputedStyle(el).backgroundColor;

        // Удаляем класс подсветки
        el.classList.remove('target-highlight');

        // Удаляем инлайн-стиль только если цвет совпадает с нашим
        el.style.removeProperty('background-color');
    });

    // 3. Принудительный рефлоу для сброса :target
    document.body.getBoundingClientRect();

    window.scrollTo(0, old_poss);
}

function anchor_show() {
    if (window.location.hash != '') {
        anchors = document.getElementsByClassName("content-anchor-block")
        for (let i = 0; i < anchors.length; i++) {
            anchors[i].style.display = "flex"
        }
    }
}

function anchor_hide() {
    if (window.location.hash == '') {
        anchors = document.getElementsByClassName("content-anchor-block")
        for (let i = 0; i < anchors.length; i++) {
            anchors[i].style.display = "none"
        }
    }
}

// Функция для прокрутки с учетом заголовка
async function scrollToAdjustedAnchor(targetId) {
    if (!targetId) {
        return;
    }
    const element = document.querySelector(targetId);
    if (!element) {
        return;
    }

    const header = document.querySelector('#container-top'); // Замените на ваш селектор

    const offset = header ? header.offsetHeight : 0;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const toScroll = elementPosition - offset;

    // Прокручиваем к элементу с отступом
    window.scrollTo({
        top: toScroll,
        behavior: 'smooth'
    });
}

// Обработчик для всех якорных ссылок
document.addEventListener('click', function (e) {
    if (window.location.hash != '') {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            // Обновляем URL с помощью hash вместо pushState
            window.location.hash = targetId;

            // Принудительно применяем стиль :target
            document.querySelectorAll('.content-base').forEach(el => {
                el.classList.remove('target-highlight');
            });

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.classList.add('target-highlight');
            }
            scrollToAdjustedAnchor(targetId);
        }
    }
});

// Обработка навигации по истории
window.addEventListener('popstate', function () {
    if (window.location.hash != '') {
        anchor_show();
        scrollToAdjustedAnchor(window.location.hash);
    }else{
        anchor_hide();
    }
});

// Обработка при загрузке страницы
window.addEventListener('load', function () {
    if (window.location.hash != '') {
        anchor_show();
        history.scrollRestoration = 'manual';
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            targetElement.classList.add('target-highlight');
        }
        scrollToAdjustedAnchor(window.location.hash);
    }
}, false);
