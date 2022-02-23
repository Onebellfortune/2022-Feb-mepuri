export function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        success: function (res) {
            return res;
        },
        error: function () {},
        complete: function () {},
    });
}