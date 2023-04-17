$(document).ready(function() {
    var folder = "DARIA"; // Default subfolder
    $(".subfolder").click(function() {
      folder = $(this).data("folder");
      console.log(folder)
    });
    $("#playButton").click(function() {
        $.get('/play', {folder: folder});
    });
  });