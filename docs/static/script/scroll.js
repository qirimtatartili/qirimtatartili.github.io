function scroll_to(id) {
    if (id.indexOf("top") != (-1)) {
        window.scroll({ top: 0, behavior: 'smooth' });;
    }
    if (id.indexOf("bot") != (-1)) {
        window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' });;
    }
}
