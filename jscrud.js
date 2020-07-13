var data,
  status = 0,
  checking = 0;
$(function () {
  $("#showbtn").click(Viewing);
  $(hittingAPI);
});

function hittingAPI() {
  //Here we will do AJAX call to the API.
  //We can use Get or Ajax but Ajax have a good feature that it will use the same syntax for all type of calls.
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function (response) {
      data = response;
    },
  });
}

function Viewing() {
  console.log("Now lets show some data");
  if (checking == 0) {
    $("#showbtn").html("Hide Recipes");
    $("#result").empty();
    for (var i = 0; i < data.length; i++) {
      $("#result").append("<div><h3>" + data[i].title + "</h3></div>");
      $("#result").append(
        `<div><p>${data[i].body}<button class="btn btn-danger btn-sm float-right">Delete</button></p></div>`
      );
    }
    status = 1;
    checking = 10;
    return;
  }
  if (status == 0) {
    $("#showbtn").html("Hide Recipes");
    document.getElementById("result").style.display = "block";
    status = 1;
  } else if (status == 1) {
    $("#showbtn").html("Show Recipes");
    document.getElementById("result").style.display = "none";
    status = 0;
  }
}
