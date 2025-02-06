const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/truyen-moi-cap-nhat", async (req, res) => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
    await page.goto("https://nettruyenrr.com/", { waitUntil: "networkidle2" });

    let truyen = await page.evaluate(() => {
        let result = [];
        document.querySelectorAll(".item > figure > a").forEach(a => {
            result.push({
                title: a.getAttribute("title"),
                link: "https://nettruyenrr.com" + a.getAttribute("href"),
                img: a.querySelector("img").getAttribute("src")
            });
        });
        return result;
    });

    await browser.close();
    res.json(truyen);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
