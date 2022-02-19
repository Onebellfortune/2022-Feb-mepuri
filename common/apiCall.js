function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        success: function (res) {
            console.log(res);
        },
        error: function () {},
        complete: function () {},
    });
}