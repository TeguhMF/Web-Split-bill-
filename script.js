function calculateSplit() {
    const namesInput = document.getElementById("names").value.trim();
    const totalInput = parseFloat(document.getElementById("total").value);

    if (!namesInput || isNaN(totalInput) || totalInput <= 0) {
        document.getElementById("result").style.display = "none";
        return;
    }

    const names = namesInput.split(",").map(name => name.trim()).filter(name => name !== "");
    if (names.length === 0) {
        document.getElementById("result").style.display = "none";
        return;
    }

    const progressContainer = document.getElementById("progress-container");
    const progressBar = progressContainer.querySelector(".progress-bar");
    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    progressBar.style.animation = "none"; 
    void progressBar.offsetWidth; 
    progressBar.style.animation = "loadProgress 1s forwards";

    document.getElementById("result").style.display = "none";

    setTimeout(() => {
        const perPerson = totalInput / names.length;
        const resultList = document.getElementById("result-list");
        resultList.innerHTML = "";

        names.forEach(name => {
            const li = document.createElement("li");
            li.textContent = `${name} bayar Rp ${perPerson.toLocaleString("id-ID")}`;
            resultList.appendChild(li);
        });

        document.getElementById("result").style.display = "block";
        progressContainer.style.display = "none";

        localStorage.setItem("splitBillData", JSON.stringify({ names, total: totalInput }));
    }, 1000); 
}

function resetSplit() {
    document.getElementById("names").value = "";
    document.getElementById("total").value = "";
    document.getElementById("result-list").innerHTML = "";
    document.getElementById("result").style.display = "none";
    document.getElementById("progress-container").style.display = "none";
    localStorage.removeItem("splitBillData");
}

document.getElementById("names").addEventListener("input", calculateSplit);
document.getElementById("total").addEventListener("input", calculateSplit);

window.onload = function() {
    const savedData = JSON.parse(localStorage.getItem("splitBillData"));
    if (savedData) {
        document.getElementById("names").value = savedData.names.join(",");
        document.getElementById("total").value = savedData.total;
        calculateSplit();
    }
};
