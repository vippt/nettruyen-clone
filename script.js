
async function loadTruyenMoi() {
    let proxyUrl = "https://small-sunset-5b12.xuongso1000nam.workers.dev/";

    let response = await fetch(proxyUrl);
    let text = await response.text();

    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");

    let truyenList = doc.querySelectorAll(".item > figure > a");

    let html = "";
    truyenList.forEach(truyen => {
        let title = truyen.getAttribute("title");
        let link = "https://nettruyenrr.com" + truyen.getAttribute("href");
        let img = truyen.querySelector("img").getAttribute("src");

        html += `<div>
            <img src="${img}" width="150" />
            <h3><a href="${link}" target="_blank">${title}</a></h3>
        </div>`;
    });

    document.getElementById("truyen-list").innerHTML = html;
}

// Gọi hàm khi tải trang
window.onload = loadTruyenMoi;
