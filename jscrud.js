var data,
  status = 0,
  checking = 0;

$(function () {
  //$("#showbtn").click(Viewing);
  $(hittingAPI);
  $("#result").on("click", ".btn-danger", deleting); //This will get the reference of that Button only
  $("#addbtn").click(valuesfetch); //Now we can either create a new function that gets the values from the form and send it to
  //that method and other way is to get them in that method itself.
  $("#result").on("click", ".btn-info", Update);
  $("#UpdateBtn").click(Changer);
  //Now here we pass a Function that sends an Ajax call to the Server to update the specific record with
  //the values given in that Modal.
});

function hittingAPI() {
  //Here we will do AJAX call to the API.
  //We can use Get or Ajax but Ajax have a good feature that it will use the same syntax for all type of calls.
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    success: function (response) {
      data = response;
      $("#result").empty();
      for (var i = 0; i < data.length; i++) {
        $("#result").append(
          `<div class = "recipe" data-id = ${data[i]._id}><h3>${data[i].title}</h3><p><button class="btn btn-danger btn-sm">Delete</button> <button class="btn btn-info btn-sm ">Edit</button>${data[i].body} </p></div>`
        );
      }
    },
    error: function (response) {
      //Usually we use Custom error handling rather than simply placing the response error it has obtained.
      console.log(response);
      $("#result").empty();
      $("#result").html("An Error Occurred during Loading Recipes. ");
    },
  });
}

/*function Viewing() {
  console.log("Now lets show some data");
  if (checking == 0) {
    $("#showbtn").html("Hide Recipes");
    $("#result").empty();
    for (var i = 0; i < data.length; i++) {
      $("#result").append(
        `<div class = "recipe" data-id = ${data[i]._id}><h3>${data[i].title}</h3><p><button class="btn btn-danger btn-sm">Delete</button> <button class="btn btn-info btn-sm ">Edit</button>${data[i].body} </p></div>`
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
}*/

function deleting() {
  var edel = $(this); //This 'this' keyword will now take only that button which is clicked.
  //Keep in mind that only its Reference is obtained. But we want to get to that div Element which is
  //Possessing all that paragraph as well as ID because we want to delete that div whose id is matched.
  //So for that we have to get to that parent Div and get Its ID and give it to the DELETE Ajax command to delete it.
  console.log(edel);
  var parentDiv = edel.closest(".recipe"); //This Line means that the reference button will now go up and find that
  //tag whose class is 'recipe' and also present in its ancestors.
  console.log(parentDiv);
  //Now we have reached that Parent Div that possesses that button. So lets now get its ID
  let id = parentDiv.attr("data-id");
  //Now this says that taking that Parent Div and take its Attribute of 'data-id' And thats how we can get the
  //ID of the recipe of which button was clicked.
  console.log(id);
  //Now we are left with only one thing and that is to delete that recipe whose ID is fetched.

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id, //We are appending ID here to tell that which ID
    //is to be deleted and it is also the demand of our required API.
    method: "DELETE", //This will simply hit that above url with the embedded link and will delete it
    success: function () {
      //Now as our query is resolved and it means that the Data is deleted.
      //But that Deletion is done on Server only the client is observing the previous Page.
      // So lets call the review function again in this function so that our page is reloaded and
      //we see the same values that are on Server in which that Recipe is deleted.
      hittingAPI();
    },
    error: function () {},
  });
}

//What we really want is that on clicking Add Button, we should get values from the Form and provided to this Function below
function addrecipe(title, body) {
  //In here we provide with the Parameters because POST Method requires some data to be sent wit it.
  //Here we again make an Ajax call but this time with POST Method.
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title: title, body: body },
    //Here we simply give the data and it will automatically match it with the API Parameters
    //and when the name of the API names and our variables are same, we can simply give the single values and it will be used
    //Here we dont need to modify or to do anything but it will create its own way and we obtain the new Record
    //So what we only need is to reload our page and to make the data visible again by simply
    //Hitting the API again with GET Request to have our data on path.
    success: function (response) {
      console.log(response);
      hittingAPI();
      $("#newrecipe").val("");
      $("#body").val("");
    },
  });
}

function valuesfetch() {
  var titl = $("#newrecipe").val();
  var bod = $("#body").val();
  addrecipe(titl, bod);
}

function Update() {
  //$("#Updater").modal("show");
  //Now we simply open this modal and Update the value by getting its ID.
  var upd = $(this);
  console.log(upd);
  var parentDiv = upd.closest(".recipe");
  console.log(parentDiv);
  let id = parentDiv.attr("data-id");
  console.log(id);
  //Before Actually we could change the values of the title and body, we firstly need to fill up these form
  //inputs with the values already Present on the Server.
  //So firstly, we need a GET Request that fetches the single record with that id and give us those values.
  //So first define that Get Request.
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function (
    response
  ) {
    //console.log(response._id);
    //console.log(response.title);
    //console.log(response.body);
    $("#updateid").val(response._id);
    $("#updatertitle").val(response.title);
    $("#updaterbody").val(response.body);
    //The Above Commands will first fill up that Form.
    //And we will open that form Later so that the user may not wait fot it.
    $("#Updater").modal("show");
  });
}

function Changer() {
  var id = $("#updateid").val();
  var title = $("#updatertitle").val();
  var body = $("#updaterbody").val();

  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "PUT",
    data: { title, body },
    success: function (response) {
      console.log(response); //Here only the single and Updated Record is Returned.
      hittingAPI();
      $("#Updater").modal("hide");
      //Now after Completing our Updation, we simply close our Modal rather than User itself closes it
    },
  });
}
