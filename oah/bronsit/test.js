// akordiyon 
document.addEventListener('DOMContentLoaded', function() {
    const acc = document.getElementsByClassName('accordion');
    
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    }
});

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

// .txt dosya tanımlama
const dosyaListesi = [
    { dosyaYolu: 'konu.txt', hedefId: 'konu' },
    { dosyaYolu: 'konu2.txt', hedefId: 'konu2' },
    { dosyaYolu: 'konu3.txt', hedefId: 'konu3' }
];

function txtDosyasiniYukle(dosyaYolu, hedefId) {
    fetch(dosyaYolu)
        .then(response => response.text())
        .then(data => {
            const metinAlani = document.getElementById(hedefId);
            const lines = data.split('\n');
            lines.forEach(line => {
                let formattedLine = line
                    .replace(/<bold>(.*?)<\/bold>/g, '<span class="bold">$1</span>')
                    .replace(/<italic>(.*?)<\/italic>/g, '<span class="italic">$1</span>')
                    .replace(/<indent>(.*?)<\/indent>/g, '<span class="indent">$1</span>')
                    .replace(/<margin-top>(.*?)<\/margin-top>/g, '<div class="margin-top">$1</div>')
                    .replace(/<margin-bottom>(.*?)<\/margin-bottom>/g, '<div class="margin-bottom">$1</div>')
                    .replace(/<red>(.*?)<\/red>/g, '<span class="red">$1</span>')
                    .replace(/<blue>(.*?)<\/blue>/g, '<span class="blue">$1</span>')
                    .replace(/<green>(.*?)<\/green>/g, '<span class="green">$1</span>')
                    .replace(/<yellow>(.*?)<\/yellow>/g, '<span class="yellow">$1</span>')
                    .replace(/<purple>(.*?)<\/purple>/g, '<span class="purple">$1</span>')
                    .replace(/<chamois>(.*?)<\/chamois>/g, '<span class="chamois">$1</span>')
                    .replace(/<redorange>(.*?)<\/redorange>/g, '<span class="redorange">$1</span>');
                metinAlani.innerHTML += formattedLine + '<br>';
            });
        })
        .catch(error => console.error('Hata:', error));
}

function tumDosyalariYukle() {
    dosyaListesi.forEach(dosya => {
        txtDosyasiniYukle(dosya.dosyaYolu, dosya.hedefId);
    });
}

window.onload = tumDosyalariYukle;