(function() {
  $(".like-btn").on("click", function(event) {
    event.preventDefault();

    const resource = $(this).data("likeable-type");
    const resourceId = $(this).data("id");

    switch (resource) {
      case "comment":
        $.ajax({
          url: `/comments/${resourceId}/like`,
          type: "POST",
          success: function(response) {
            console.log(response);
          },
        });
        break;

      default:
        break;
    }
  });
})();
