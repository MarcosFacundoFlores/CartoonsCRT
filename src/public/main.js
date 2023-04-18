$(document).ready(function () {
  $(".subfolder").click(function () {
    var folder = $(this).data("folder");
    console.log(folder);
    $.get("/play", { folder: folder });
  });

  $('#randomButton').click(function (){
    $.get("/play-random");
  })
});
