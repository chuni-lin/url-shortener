$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Define elements
const link = document.querySelector('#link')
const copyBtn = document.querySelector('#copyBtn')

// Event listener
copyBtn.addEventListener('click', copyLink)
copyBtn.addEventListener('mouseout', resetTooltip)

// Define function
function copyLink() {
  // copy
  const el = document.createElement('input')
  el.value = link.href
  el.setAttribute('readonly', '')
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  // change tooltip
  changeTooltip()
}

function changeTooltip() {
  copyBtn.dataset.originalTitle = `Copied: ${link.href}`
  $('[data-toggle="tooltip"]').tooltip('hide')
  $('[data-toggle="tooltip"]').tooltip('show')
}

function resetTooltip() {
  copyBtn.dataset.originalTitle = 'Copy to clipboard'
}
