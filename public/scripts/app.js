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
            const likes = response.likes;
            $(`#${resourceId}-likes-counter`).text(`${likes} likes`);
          },
        });
        break;

      default:
        break;
    }
  });
})();
