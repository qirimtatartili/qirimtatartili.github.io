/**
 * Изменяет CSS-правило в таблице стилей документа.
 * @param {string} selector - CSS-селектор (например: '.button', '#header')
 * @param {string} property - CSS-свойство (например: 'color', 'font-size')
 * @param {string} value - Новое значение свойства (например: 'red', '20px')
 */
function changeCSSStyle(selector, property, value) {
  document.querySelectorAll(selector).forEach(el => {
      el.classList.remove(property);
      el.style[property] = value;
  });
}
