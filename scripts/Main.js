"use strict";

var url = ["", "", "", "", "", ""];

function replace() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
		var validUrls = getElementsUrlNotNull(url)
        var randomIndex = randomPick(validUrls);
        var randomQueryParam = "?nocache=" + Math.random();
        images[i].src = validUrls[randomIndex] + randomQueryParam;
    }
}

function randomPick(arr) {
    return Math.floor(Math.random() * arr.length);
}

function getElementsUrlNotNull(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != "") {
            result.push(arr[i]);
        }
    }
    return result;
}

chrome.storage.local.get({
    enabled: false,
    url: ["", "", "", "", "", ""]
}, function(items) {
    if (items.enabled) {
        url = items.url;
        window.setInterval(replace, 2500);
        replace();
    }
});
