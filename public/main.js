
var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  fetch('details', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'It is now',
      'detail': 'edited'
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
     window.location.reload(true)
  })
})

del.addEventListener('click', function () {
  fetch('details', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'ForDeletion'
    })
  }).then(function (response) {
    window.location.reload(true)
  })
})