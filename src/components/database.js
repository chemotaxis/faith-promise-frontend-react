/**
 * The "App" page and the "Display" page communicate through the browser's web
 * storage.  This file consolidates the internals for updating and passing
 * shared state between the pages.
 */

export const store = localStorage;
export const keys = Object.freeze({
  'displayTotal': 'displayTotal',
  'title': 'title',
  'fireworks': 'fireworks',
})

export const get = {
    fireworks: () => store.getItem(keys.fireworks) === 'true'? true: false,
}
