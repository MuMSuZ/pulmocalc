function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
    }
}
            

window.onload = function() {
    // Tüm panellerin gizli olmasını sağla
    const panels = document.querySelectorAll('.panel, .alt-panel');
    panels.forEach(panel => {
        panel.style.display = 'none';
    });
};

// .txt dosyasını okuma
fetch('metin/konu.txt')
.then(response => response.text())
.then(data => {
    // Değiştirmek istediğiniz kelimeleri ve ilgili metin ve resimleri burada belirtiyorsunuz
    const wordInfoMap = {
        "Şekil 1.1": {
            text: "Şekil 1.1",
            image: "resim/sekil11.png"
        }
    };
    
    // Link şablonu, kelimeye tıklandığında modal açmak için
    const linkTemplate = word => `<a href="#" class="word-link" data-word="${word}">${word}</a>`;

    // Her kelimeyi <a> etiketi ile değiştir
    let updatedData = data;
    Object.keys(wordInfoMap).forEach(word => {
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Özel karakterleri kaçırma
        const regex = new RegExp(`${escapedWord}`, 'gu');
        updatedData = updatedData.replace(regex, linkTemplate(word));
    });

    // Sonucu HTML'e ekle
    document.getElementById('konu').innerHTML = updatedData;

    // Tüm kelime bağlantılarına event listener ekle
    document.querySelectorAll('.word-link').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const word = event.target.getAttribute('data-word');
            const info = wordInfoMap[word];
            document.getElementById('modalText').innerText = info.text;
            document.getElementById('modalImage').src = info.image;
            document.getElementById('myModal').style.display = 'block';
        });
    });
})
.catch(error => console.error('Error:', error));

// Modal kapatma işlemleri
document.querySelector('.close').onclick = function() {
document.getElementById('myModal').style.display = 'none';
}
window.onclick = function(event) {
if (event.target == document.getElementById('myModal')) {
    document.getElementById('myModal').style.display = 'none';
}
}
