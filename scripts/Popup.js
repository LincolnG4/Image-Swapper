"use strict";

function save() {
    var urlInputs = document.querySelectorAll(".urlInput");
    var urls = Array.from(urlInputs).map(input => input.value);

    chrome.storage.local.set({
        enabled: document.getElementById("enabled").checked,
        url: urls
    }, function() {
        document.getElementById("submit").value = "Saved";
    });
}

function addUrlInput() {
    var urlInputsContainer = document.getElementById("urlInputs");
    var newUrlInput = document.createElement("input");
    newUrlInput.className = "urlInput";
    newUrlInput.type = "url";
    newUrlInput.placeholder = "https://example.com/image.png";
    urlInputsContainer.appendChild(newUrlInput);
}

function removeLastUrlInput() {
    const urlInputsContainer = document.getElementById('urlInputs');
    const urlInputs = document.querySelectorAll('.urlInput');
    if (urlInputs.length > 1) {
      const lastUrlInput = urlInputs[urlInputs.length - 1];
      urlInputsContainer.removeChild(lastUrlInput);
    }
}

function restore() {
    chrome.storage.local.get({
        enabled: false,
        url: [""]
    }, function(items) {
        document.getElementById("enabled").checked = items.enabled;

        // Remove all existing URL inputs
        var urlInputsContainer = document.getElementById("urlInputs");
        urlInputsContainer.innerHTML = "";

        // Add URL inputs based on stored values
        items.url.forEach(url => {
            var newUrlInput = document.createElement("input");
            newUrlInput.className = "urlInput";
            newUrlInput.type = "url";
            newUrlInput.value = url;
            urlInputsContainer.appendChild(newUrlInput);
        });
    });
}

function changed() {
    document.getElementById("submit").value = "Save";
 
}

function enter(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        save();
    }
}

document.addEventListener("DOMContentLoaded", restore);
document.getElementById("submit").addEventListener("click", save);
document.getElementById("enabled").addEventListener("click", changed);
document.getElementById("addUrl").addEventListener("click", addUrlInput);
document.addEventListener("input", changed);
document.addEventListener("keydown", enter);
document.getElementById('removeUrl').addEventListener("click", removeLastUrlInput);