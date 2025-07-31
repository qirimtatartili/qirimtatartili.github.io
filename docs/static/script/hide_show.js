function set_state(elements, state) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = state;
    }
}

function change_state(idstore, force) {
    store = document.getElementById(idstore);

    state = ''
    if (force == null) {
        var state = store.dataset.state;
        if (state == "" || state == "none") {
            state = "flex";
        } else {
            state = "none";
        }
    } else {
        state = force;
    }

    store.dataset.state = state;
    return state;
}

function hide_show_by_id(idname, idstore, force = null) {
    elements = [document.getElementById(idname)]
    state = change_state(idstore, force);
    set_state(elements, state)
}

function hide_show_by_class(classname, idstore, force = null) {
    elements = document.getElementsByClassName(classname);
    state = change_state(idstore, force);
    set_state(elements, state)
}

function hide_show_by_atribut(attribute, value, idstore, force = null) {
    selector = 'div[' + attribute + '=\"' + value + '\"]'
    elements = document.querySelectorAll(selector);
    state = change_state(idstore, force);
    set_state(elements, state)
}
