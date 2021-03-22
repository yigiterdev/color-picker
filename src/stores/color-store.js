import { writable } from 'svelte/store'

const colorStore = writable([])
const addColor = (red, green, blue, name) => {
  colorStore.update((colors) => {
    colors.push({
      red,
      green,
      blue,
      name,
      isFavorite: false,
      id: Date.now(),
    })
    return colors
  })
}
const favoriteColor = (id, favorite) => {
  colorStore.update((colors) => {
    const colorIndex = colors.findIndex((c) => c.id === id)

    colors[colorIndex].isFavorite = favorite

    return colors
  })
}
const deleteColor = (id) => {
  colorStore.update((colors) => {
    return colors.filter((c) => c.id !== id)
  })
}

if (localStorage.getItem('colors')) {
  colorStore.set(JSON.parse(localStorage.getItem('colors')))
}
colorStore.subscribe((colors) => {
  localStorage.setItem('colors', JSON.stringify(colors))
})
export default {
  subscribe: colorStore.subscribe,
  addColor,
  favoriteColor,
  deleteColor,
}
