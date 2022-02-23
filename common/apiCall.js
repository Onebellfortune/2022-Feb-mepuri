export function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        async: false,
        success: function (res) {
            return res;
        },
        error: function () {},
        complete: function () {},
    });
}
