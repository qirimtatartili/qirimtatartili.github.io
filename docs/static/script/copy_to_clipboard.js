function copy_to_clipboard(id) {
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.textContent);
}
