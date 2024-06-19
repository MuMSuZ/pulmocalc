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
        { dosyaYolu: 'koahnedir.txt', hedefId: 'koahnedir' },
        { dosyaYolu: 'data/dosya2.txt', hedefId: 'metin-alani-2' },
        { dosyaYolu: 'data/dosya3.txt', hedefId: 'metin-alani-3' }
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
                        .replace(/<red>(.*?)<\/red>/g, '<span class="color-red">$1</span>')
                        .replace(/<blue>(.*?)<\/blue>/g, '<span class="color-blue">$1</span>')
                        .replace(/<green>(.*?)<\/green>/g, '<span class="color-green">$1</span>')
                        .replace(/<yellow>(.*?)<\/yellow>/g, '<span class="color-yellow">$1</span>')
                        .replace(/<purple>(.*?)<\/purple>/g, '<span class="color-purple">$1</span>');
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
    