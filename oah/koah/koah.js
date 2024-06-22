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

    

    // .txt dosya tanımlama
    const dosyaListesi = [
        { dosyaYolu: 'metin/koahnedir.txt', hedefId: 'koahnedir' },
        { dosyaYolu: 'metin/koahyuku.txt', hedefId: 'koahyuku' },
        { dosyaYolu: 'metin/patogenez.txt', hedefId: 'patogenez' }
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
                        .replace(/<indented-bolum>(.*?)<\/indented-bolum>/g, '<span class="indented-bolum">$1</span>')
                        .replace(/<margin-top>(.*?)<\/margin-top>/g, '<div class="margin-top">$1</div>')
                        .replace(/<margin-bottom>(.*?)<\/margin-bottom>/g, '<div class="margin-bottom">$1</div>')
                        .replace(/<red>(.*?)<\/red>/g, '<span class="red">$1</span>')
                        .replace(/<blue>(.*?)<\/blue>/g, '<span class="blue">$1</span>')
                        .replace(/<green>(.*?)<\/green>/g, '<span class="green">$1</span>')
                        .replace(/<yellow>(.*?)<\/yellow>/g, '<span class="yellow">$1</span>')
                        .replace(/<purple>(.*?)<\/purple>/g, '<span class="purple">$1</span>')
                        .replace(/<chamois>(.*?)<\/chamois>/g, '<span class="chamois">$1</span>')
                        .replace(/<redorange>(.*?)<\/redorange>/g, '<span class="redorange">$1</span>')
                        .replace(/<coralblue>(.*?)<\/coralblue>/g, '<span class="coralblue">$1</span>');
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
    

    document.addEventListener('DOMContentLoaded', () => {
        const wordInfoMap = {
            "Şekil 1.1": {
                text: "Şekil 1.1 önemli bir şekildir.",
                image: "sekil1.1.png"
            },
            "Peto": {
                text: "Peto modeli nedir"
            }
        };
    
        // Modal açma ve kapama işlemleri
        const modal = document.getElementById('myModal');
        const modalText = document.getElementById('modalText');
        const modalImage = document.getElementById('modalImage');
        const closeModal = document.querySelector('.close');
    
        closeModal.onclick = function() {
            modal.style.display = 'none';
        }
    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    
        // Kelimeleri işaretleme ve modal açma işlemi
        const contentElement = document.getElementById('content');
        let contentHTML = contentElement.innerHTML;
    
        Object.keys(wordInfoMap).forEach(word => {
            const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedWord, 'gu');
            contentHTML = contentHTML.replace(regex, `<a href="#" class="word-link" data-word="${word}">${word}</a>`);
        });
    
        contentElement.innerHTML = contentHTML;
    
        document.querySelectorAll('.word-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const word = event.target.getAttribute('data-word');
                const info = wordInfoMap[word];
                modalText.innerText = info.text;
                modalImage.src = info.image;
                modal.style.display = 'block';
            });
        });
    });
    