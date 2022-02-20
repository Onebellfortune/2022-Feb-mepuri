function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        success: function (res) {
            console.log(res);
            return res;
        },
        error: function () {},
        complete: function () {},
    });
}