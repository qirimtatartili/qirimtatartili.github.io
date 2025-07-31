function compare(text, other) {
    return text.toUpperCase().indexOf(other.toUpperCase()) !== -1;
}

function filter(event) {
    filter_text = document.getElementById('filter-search-line').textContent;
    el_byTN = document.getElementsByTagName("section");
    for (let i = 0; i < el_byTN.length; i++) {
        text = el_byTN[i].textContent;
        if (compare(text, filter_text)) {
            el_byTN[i].style.display = "";
        } else {
            el_byTN[i].style.display = "none";
        }
    }
}

function clear(event) {
    document.getElementById('filter-search-line').textContent = "";
    filter();
}

window.addEventListener("DOMContentLoaded", (event) => {
    var el = document.getElementById("filter-search-line");
    if (el) {
        el.addEventListener('input', filter);
    }

    var el = document.getElementById("filter-clear-button");
    if (el) {
        el.addEventListener('click', clear);
    }
});
