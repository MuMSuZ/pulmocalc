document.addEventListener('DOMContentLoaded', function() {
    // Akordeon
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
        { dosyaYolu: 'metin/toraks.txt', hedefId: 'toraks' },
        { dosyaYolu: 'metin/koahyuku.txt', hedefId: 'koahyuku' },
        { dosyaYolu: 'metin/patogenez.txt', hedefId: 'patogenez' },
        {dosyaYolu: 'metin/patobiyoloji.txt', hedefId: 'patobiyoloji'}
    ];

    function txtDosyasiniYukle(dosyaYolu, hedefId) {
        fetch(dosyaYolu)
            .then(response => response.text())
            .then(data => {
                const metinAlani = document.getElementById(hedefId);
                const lines = data.split('\n');

                // Anahtar kelimeler ve ilgili açıklamalar
                const keywordData = {
                    'Şekil 1': {
                        description: 'Toraksın ön görünümü. Gerçek, yalancı ve yüzen kaburgalar.',
                        detay: 'Üstteki yedi kaburga, kıkırdaklarının doğrudan sternuma bağlı olması nedeniyle gerçek kaburgalar olarak adlandırılır. Diğerleri (I-XII kaburgalar) ise, kıkırdaklarının diğer kaburgaların kıkırdakları aracılığıyla sternuma bağlanması nedeniyle yalancı kaburgalar olarak bilinir. Son iki kaburga (XI ve XII) ise sternuma hiç bağlanmadığından yüzen kaburgalar adını alır. Diğer sınıflandırmalarda kaburgalar, tipik ve atipik olarak alt gruplara ayrılır. Tipik kaburgalar (III-IX kaburgalar) ortak özellikler taşır ve bu durum, pozisyonlarının belirlenmesini zorlaştırır (örneğin, VI ve VII kaburgaların ayırt edilmesi gibi). Buna karşılık, atipik kaburgalar nispeten kolaylıkla tanımlanabilir.',
                        image: 'resim/costa1.jpg'
                    },
                    'Fletcher ve Peto modeli': {
                        description: 'metin/modal/peto.txt',
                        isFile: true
                    },
                    'şüphe indeksi': {
                        description: 'metin/modal/supheindeksi.txt',
                        isFile: true
                    }
                };

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
                        let regex = new RegExp(`${keyword}`, 'gu');
                        formattedLine = formattedLine.replace(regex, `<a href="#" class="keyword" data-description="${data.description}" data-detay="${data.detay}"  data-image="${data.image || ''}" data-isFile="${data.isFile || false}">${keyword}</a>`);
                    }

                    metinAlani.innerHTML += formattedLine + '<br>';
                });

                // Tıklama olaylarını ayarla
                document.querySelectorAll('.keyword').forEach(element => {
                    element.addEventListener('click', function(event) {
                        event.preventDefault();
                        const isFile = this.getAttribute('data-isFile') === 'true';
                        if (isFile) {
                            const filePath = this.getAttribute('data-description');
                            fetch(filePath)
                                .then(response => response.text())
                                .then(fileData => {
                                    let formattedFileData = fileData
                                        .replace(/<bold>(.*?)<\/bold>/g, '<span class="bold">$1</span>')
                                        .replace(/<italic>(.*?)<\/italic>/g, '<span class="italic">$1</span>')
                                        .replace(/<indent>(.*?)<\/indent>/g, '<span class="indent">$1</span>')
                                        .replace(/<indented-bolum>(.*?)<\/indented-bolum>/g, '<span class="indented-bolum">$1</span>')
                                        .replace(/<margin-top>(.*?)<\/margin-top>/g, '<div class="margin-top">$1</div>')
                                        .replace(/<margin-bottom>(.*?)<\/margin-bottom>/g, '<div class="margin-bottom">$1</div>')
                                        .replace(/<chamois>(.*?)<\/chamois>/g, '<span class="chamois">$1</span>')
                                        .replace(/<redorange>(.*?)<\/redorange>/g, '<span class="redorange">$1</span>')
                                        .replace(/<coralblue>(.*?)<\/coralblue>/g, '<span class="coralblue">$1</span>');
                                    document.getElementById('modal-text').innerHTML = formattedFileData;
                                    document.getElementById('modal-detay').innerHTML = formattedFileData;
                                    document.getElementById('modal-image').src = '';
                                    document.getElementById('myModal').style.display = "block";
                                })
                                .catch(error => console.error('Hata:', error));
                        } else {
                            const description = this.getAttribute('data-description');
                            const detay = this.getAttribute('data-detay');
                            const image = this.getAttribute('data-image');
                            document.getElementById('modal-text').textContent = description;
                            document.getElementById('modal-detay').textContent = detay;
                            document.getElementById('modal-image').src = image;
                            document.getElementById('myModal').style.display = "block";
                        }
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
            })
            .catch(error => console.error('Hata:', error));
    }

    // Resmi txt dosyasına ekleme. txt dosya yolu [image]resim/costa1.jpg[/image]
    // function txtDosyasiniYukle(dosyaYolu, hedefId) {
       // fetch(dosyaYolu)
         //   .then(response => response.text())
           // .then(data => {
             //   const metinAlani = document.getElementById(hedefId);
    
                // Resim etiketlerini algılamak için düzenleme yap
               // let contentHTML = data.replace(/\[image\](.*?)\[\/image\]/g, '<img src="$1" class="txt-image">');
    
                //metinAlani.innerHTML = contentHTML;
           // });
    //}    

    function tumDosyalariYukle() {
        dosyaListesi.forEach(dosya => {
            txtDosyasiniYukle(dosya.dosyaYolu, dosya.hedefId);
        });
    }

    window.onload = tumDosyalariYukle;
});
