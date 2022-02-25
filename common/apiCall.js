export function callAPI(url) {
    return $.ajax({
        url,
        type: "GET",
        async: false,
        timeout: 1000,
        success: function (res) {
            return res;
        },
        error: function (e) {
            console.log(e);
        },
        complete: function () {},
    });
}
