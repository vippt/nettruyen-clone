async function loadTruyenMoi() {
    let url = "https://nettruyenrr.com/";
    
    // Lấy HTML từ NetTruyenRR
    let response = await fetch(url);
    let text = await response.text();

    // Tạo một DOM ảo để xử lý HTML
    let parser = new DOMParser();
    let doc = parser.parseFromString(text, "text/html");

    // Lấy danh sách truyện mới cập nhật
    let truyenList = doc.querySelectorAll(".item > figure > a");

    let html = "";
    truyenList.forEach(truyen => {
        let title = truyen.getAttribute("title");
        let link = truyen.getAttribute("href");
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
