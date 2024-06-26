document.addEventListener('DOMContentLoaded', function() {
    // Akordiyon
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

    // .txt dosya tanımlama
    const dosyaListesi = [
        { dosyaYolu: 'metin/koahnedir.txt', hedefId: 'koahnedir', modal: false },
        { dosyaYolu: 'metin/koahyuku.txt', hedefId: 'koahyuku', modal: false },
        { dosyaYolu: 'metin/patogenez.txt', hedefId: 'patogenez', modal: false },
        { dosyaYolu: 'metin/supheindeksi.txt', modal: true } // modal: true olarak belirttik
    ];

    const keywordData = {
        'Şekil 1.1': {
            description: 'Şekil 1.1',
            image: 'resim/sekil11.png'
        },
        'Fletcher': {
            description: 'ne olduğunu yaz'
        },
        'Peto': {
            description: 'ne olduğunu yaz'
        },
        'şüphe indeksinin korunması': {
            descriptionFile: 'metin/supheindeksi.txt'
        }
        // Diğer kelimeler ve açıklamaları buraya ekleyebilirsiniz
    };

    // Anahtar kelimeler için açıklama dosyalarını yükle
    async function yukleKeywordData() {
        for (let keyword in keywordData) {
            if (keywordData[keyword].descriptionFile) {
                const response = await fetch(keywordData[keyword].descriptionFile);
                let data = await response.text();

                // Biçimlendirme işlemleri
                data = data
                    .replace(/<bold>(.*?)<\/bold>/g, '<span class="bold">$1</span>')
                    .replace(/<italic>(.*?)<\/italic>/g, '<span class="italic">$1</span>')
                    .replace(/<indent>(.*?)<\/indent>/g, '<span class="indent">$1</span>')
                    .replace(/<indented-bolum>(.*?)<\/indented-bolum>/g, '<span class="indented-bolum">$1</span>')
                    .replace(/<margin-top>(.*?)<\/margin-top>/g, '<div class="margin-top">$1</div>')
                    .replace(/<margin-bottom>(.*?)<\/margin-bottom>/g, '<div class="margin-bottom">$1</div>')
                    .replace(/<chamois>(.*?)<\/chamois>/g, '<span class="chamois">$1</span>')
                    .replace(/<redorange>(.*?)<\/redorange>/g, '<span class="redorange">$1</span>')
                    .replace(/<coralblue>(.*?)<\/coralblue>/g, '<span class="coralblue">$1</span>');

                keywordData[keyword].description = data;
            }
        }
    }

    async function txtDosyasiniYukle(dosyaYolu, hedefId, modal) {
        try {
            const response = await fetch(dosyaYolu);
            const data = await response.text();

            if (modal) {
                // Modal için olan metinleri keywordData'ya ekle
                for (let keyword in keywordData) {
                    if (keywordData[keyword].descriptionFile === dosyaYolu) {
                        keywordData[keyword].description = data;
                    }
                }
            } else {
                const metinAlani = document.getElementById(hedefId);
                const lines = data.split('\n');

                await yukleKeywordData();

                lines.forEach(line => {
                    let formattedLine = line
                        .replace(/<bold>(.*?)<\/bold>/g, '<span class="bold">$1</span>')
                        .replace(/<italic>(.*?)<\/italic>/g, '<span class="italic">$1</span>')
                        .replace(/<indent>(.*?)<\/indent>/g, '<span class="indent">$1</span>')
                        .replace(/<indented-bolum>(.*?)<\/indented-bolum>/g, '<span class="indented-bolum">$1</span>')
                        .replace(/<margin-top>(.*?)<\/margin-top>/g, '<div class="margin-top">$1</div>')
                        .replace(/<margin-bottom>(.*?)<\/margin-bottom>/g, '<div class="margin-bottom">$1</div>')
                        .replace(/<chamois>(.*?)<\/chamois>/g, '<span class="chamois">$1</span>')
                        .replace(/<redorange>(.*?)<\/redorange>/g, '<span class="redorange">$1</span>')
                        .replace(/<coralblue>(.*?)<\/coralblue>/g, '<span class="coralblue">$1</span>');

                    // Her anahtar kelime için metni kontrol et ve etiket ekle
                    for (let [keyword, data] of Object.entries(keywordData)) {
                        // Değişiklik yapıldı: Regex tanımı güncellendi
                        let regex = new RegExp(`(${keyword})`, 'g');
                        formattedLine = formattedLine.replace(regex, `<a href="#" class="keyword" data-description="${data.description}" data-image="${data.image || ''}">${keyword}</a>`);
                    }

                    // Değişiklik yapıldı: Burada `<br>` etiketi ile satır sonu ekliyoruz
                    metinAlani.innerHTML += formattedLine + '<br>';
                });

                // Tıklama olaylarını ayarla
                document.querySelectorAll('.keyword').forEach(element => {
                    element.addEventListener('click', function(event) {
                        event.preventDefault();
                        const description = this.getAttribute('data-description');
                        const image = this.getAttribute('data-image');
                        document.getElementById('modal-text').innerHTML = description; // innerHTML kullanarak biçimlendirmeleri uygular
                        if (image) {
                            document.getElementById('modal-image').src = image;
                            document.getElementById('modal-image').style.display = 'block';
                        } else {
                            document.getElementById('modal-image').style.display = 'none';
                        }
                        document.getElementById('myModal').style.display = "block";
                    });
                });

                // Modal kapatma düğmesi
                document.querySelector('.close').addEventListener('click', function() {
                    document.getElementById('myModal').style.display = "none";
                });

                // Modal dışına tıklanırsa kapatma
                window.addEventListener('click', function(event) {
                    if (event.target == document.getElementById('myModal')) {
                        document.getElementById('myModal').style.display = "none";
                    }
                });
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    }

    function tumDosyalariYukle() {
        dosyaListesi.forEach(dosya => {
            txtDosyasiniYukle(dosya.dosyaYolu, dosya.hedefId, dosya.modal);
        });
    }

    window.onload = tumDosyalariYukle;
});
