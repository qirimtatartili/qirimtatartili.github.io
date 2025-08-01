function get_all_langs() {
    element_langs = document.getElementById("filter-langs");
    element_langs = element_langs.querySelectorAll('input[type="checkbox"]')
    const langs = []
    for (let i = 0; i < element_langs.length; i++) {
        langs.push(element_langs[i].id.replace('input-checkbox-', ''))
    }
    return langs
}

function get_chd_langs() {
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

function get_not_chd_langs() {
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
    langs = get_chd_langs()
    for (let i = 0; i < langs.length; i++) {
        hide_show_by_atribut("lang", langs[i], "input-checkbox-" + langs[i], "flex");
    }
}

function hide_lang(langs) {
    langs = get_not_chd_langs()
    for (let i = 0; i < langs.length; i++) {
        hide_show_by_atribut("lang", langs[i], "input-checkbox-" + langs[i], "none");
    }
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

    update_layout();
}

function update_layout() {
    const root = document.documentElement;
    var page_width = document.querySelector('.content-main').getBoundingClientRect().width;
    var single_width_min = parseInt(getComputedStyle(root).getPropertyValue('--subsection-single-width-min').replace("calc", "").replace("(", "").replace(")", ""));
    const emInPixels = parseFloat(getComputedStyle(root).fontSize);

    single_width_min = single_width_min * emInPixels;
    var sum_single_width_max = single_width_min * get_all_langs().length * 0.8
    var sum_single_width_min = single_width_min * get_chd_langs().length

    show_lang();

    if(sum_single_width_max < page_width){
        changeCSSStyle('#filter-langs', 'flex-direction', 'row');
    }else{
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

document.addEventListener('DOMContentLoaded', update_layout);
window.addEventListener('resize', update_layout);
