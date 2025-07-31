function toggle_theme_dark() {
    document.body.className = 'dark-theme';
}

function toggle_theme_light() {
    document.body.className = 'light-theme';
}

function toggle_theme() {

}

window.addEventListener("DOMContentLoaded", (event) => {
    var el = document.getElementById("toggle_theme_dark-button");
    if (el) {
        el.addEventListener('click', toggle_theme_dark );
    }

    var el = document.getElementById("toggle_theme_light-button");
    if (el) {
        el.addEventListener('click', toggle_theme_light );
    }
});
