function get_all_langs() {
    element_langs = document.getElementById("filter-langs");
    element_langs = element_langs.querySelectorAll('input[type="checkbox"]')
    const langs = []
    for (let i = 0; i < element_langs.length; i++) {
        langs.push(element_langs[i].id.replace('input-checkbox-', ''))
    }
    return langs
}

function get_ckd_langs() {
    element_langs = document.getElementById("filter-langs");
    element_langs = element_langs.querySelectorAll('input[type="checkbox"]')
    const langs = []
    for (let i = 0; i < element_langs.length; i++) {
        if (element_langs[i].checked === true) {
            langs.push(element_langs[i].id.replace('input-checkbox-', ''))
        }
    }
    return langs
}

function get_not_ckd_langs() {
    element_langs = document.getElementById("filter-langs");
    element_langs = element_langs.querySelectorAll('input[type="checkbox"]')
    const langs = []
    for (let i = 0; i < element_langs.length; i++) {
        if (element_langs[i].checked === false) {
            langs.push(element_langs[i].id.replace('input-checkbox-', ''))
        }
    }
    return langs
}

function show_lang() {
    langs = get_ckd_langs()
    for (let i = 0; i < langs.length; i++) {
        hide_show_by_atribut("lang", langs[i], "input-checkbox-" + langs[i], "flex");
    }
}

function hide_lang(langs) {
    langs = get_not_ckd_langs()
    for (let i = 0; i < langs.length; i++) {
        hide_show_by_atribut("lang", langs[i], "input-checkbox-" + langs[i], "none");
    }
}

function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

function filter_lang_handler(lang) {
    element_langs = document.getElementById("filter-langs");
    element_lang = document.getElementById("input-checkbox-" + lang);

    cheked_count = element_langs.querySelectorAll('input[type="checkbox"]:checked').length

    if (cheked_count >= 1) {
        element_langs.dataset.langCheked = "" + cheked_count + ""
    } else {
        element_langs.dataset.langCheked = "1"
        element_lang.checked = true;
    }

    if (element_lang.checked) {
        document.cookie = "lang_" + lang + "=true; path=/";
    } else {
        document.cookie = "lang_" + lang + "=false; path=/";
    }

    update_layout();
}

function filter_lang_cookies() {

    var keyValuePairs = document.cookie.split(';');
    for (var i = 0; i < keyValuePairs.length; i++) {
        const name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('=')).trim();
        const value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=') + 1).trim();

        console.log(name, value);

        const lang = name.replace("lang_", "")
        element_lang = document.getElementById("input-checkbox-" + lang);

        if (element_lang) {
            if (value == "true") {
                element_lang.checked = true;
            } else {
                element_lang.checked = false;
            }
        }
    }
    update_layout();
}

function update_layout() {
    const root = document.documentElement;
    var page_width = document.querySelector('.content-main').getBoundingClientRect().width;
    var single_width_min = parseInt(getComputedStyle(root).getPropertyValue('--subsection-single-width-min').replace("calc", "").replace("(", "").replace(")", ""));
    const emInPixels = parseFloat(getComputedStyle(root).fontSize);

    single_width_min = single_width_min * emInPixels;
    var sum_single_width_max = single_width_min * get_all_langs().length * 0.8
    var sum_single_width_min = single_width_min * get_ckd_langs().length

    show_lang();

    if (sum_single_width_max < page_width) {
        changeCSSStyle('#filter-langs', 'flex-direction', 'row');
    } else {
        changeCSSStyle('#filter-langs', 'flex-direction', 'column');
    }

    if (sum_single_width_min < page_width) {
        changeCSSStyle('.content-main', 'flex-direction', 'row');
        changeCSSStyle('.annotation-generic-none', 'display', 'flex');
        changeCSSStyle('.annotation-generic-main', 'display', 'flex');
    } else {
        changeCSSStyle('.content-main', 'flex-direction', 'column');
        changeCSSStyle('.annotation-generic-none', 'display', 'none');
        changeCSSStyle('.annotation-generic-main', 'display', 'block');
    }
    hide_lang();
}

document.addEventListener("DOMContentLoaded", filter_lang_cookies);
document.addEventListener('DOMContentLoaded', update_layout);
window.addEventListener('resize', update_layout);
