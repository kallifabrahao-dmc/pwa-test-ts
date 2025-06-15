const dropdownRef = ref<HTMLElement | null>(null)
const aoPerderFoco = () => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    menuAberto.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', aoPerderFoco)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', aoPerderFoco)
})