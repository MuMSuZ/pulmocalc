document.addEventListener('DOMContentLoaded', function() {
        // akordiyon
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
                        .replace(/<coralblue>(.*?)<\/coralblue>/g, '<span class="coralblue">$1</span>')
                        .replace(/\bŞekil\b/g, '<a href="mumsuz.github.oi/pulmocalc">Şekil 1.1</a>');
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