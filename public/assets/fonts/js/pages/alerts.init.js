var alertPlaceholder = document.getElementById("liveAlertPlaceholder"),
  alertTrigger = document.getElementById("liveAlertBtn");
function alert(e, t) {
  var l = document.createElement("div");
  (l.innerHTML =
    '<div class="alert alert-' +
    t +
    ' alert-dismissible" role="alert">' +
    e +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'),
    alertPlaceholder.append(l);
}
alertTrigger &&
  alertTrigger.addEventListener("click", function () {
    alert("Nice, you triggered this alert message!", "success");
  });
