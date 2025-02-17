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
        { dosyaYolu: 'metin/kemikler.txt', hedefId: 'kemikler' },
        { dosyaYolu: 'metin/kaslar.txt', hedefId: 'kaslar' },
        { dosyaYolu: 'metin/haraket.txt', hedefId: 'haraket' },
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
                        description: 'Toraksın ön görünümü. Gerçek, yalancı ve yüzen kostalar',
                        detay: 'Üstteki yedi kosta, kıkırdaklarının doğrudan sternuma bağlı olması nedeniyle gerçek kostalar olarak adlandırılır. Diğerleri (I-XII kostalar) ise, kıkırdaklarının diğer kostaların kıkırdakları aracılığıyla sternuma bağlanması nedeniyle yalancı kosta olarak bilinir. Son iki kosta (XI ve XII) ise sternuma hiç bağlanmadığından yüzen kostalar adını alır. Diğer sınıflandırmalarda kostalar, tipik ve atipik olarak alt gruplara ayrılır. Tipik kostalar (III-IX kostalar) ortak özellikler taşır ve bu durum, pozisyonlarının belirlenmesini zorlaştırır (örneğin, VI ve VII kostaların ayırt edilmesi gibi). Buna karşılık, atipik kostalar nispeten kolaylıkla tanımlanabilir.',
                        image: 'resim/costa1.jpg'
                    },
                    'Şekil 2': {
                        description: 'Sağ ve sol tipik kostanın VII torasik vertebra ile birlikte üstten görünümü',
                        detay: '',
                        image: 'resim/costa2.jpg',
                        description1: 'Tipik (7.) kostanın oblik görünümü.',
                        detay1: '',
                        image1: 'resim/costa3.jpg',
                        description2: 'Tipik bir kosta ile torasik vertebra arasındaki ilişkiler.',
                        detay2: '',
                        image2: 'resim/costa4.jpg'
                    },
                    'Şekil 3': {
                        description: 'metin/modal/peto.txt',
                        detay: '',
                        image: 'resim/costa3.jpg'
                    },
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
                        formattedLine = formattedLine.replace(regex, `<a href="#" class="keyword" data-description="${data.description}" data-description1="${data.description1}" data-description2="${data.description2}" data-detay="${data.detay}" data-detay1="${data.detay1}" data-detay2="${data.detay2}" data-image="${data.image || ''}" data-image1="${data.image1 || ''}" data-image2="${data.image2 || ''}" data-isFile="${data.isFile || false}">${keyword}</a>`);
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
                                    document.getElementById('modal-text1').innerHTML = formattedFileData;
                                    document.getElementById('modal-detay1').innerHTML = formattedFileData;
                                    document.getElementById('modal-image1').src = '';
                                    document.getElementById('modal-text2').innerHTML = formattedFileData;
                                    document.getElementById('modal-detay2').innerHTML = formattedFileData;
                                    document.getElementById('modal-image2').src = '';
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
                            const description1 = this.getAttribute('data-description1');
                            const detay1 = this.getAttribute('data-detay1');
                            const image1 = this.getAttribute('data-image1');
                            document.getElementById('modal-text1').textContent = description1;
                            document.getElementById('modal-detay1').textContent = detay1;
                            document.getElementById('modal-image1').src = image1;
                            const description2 = this.getAttribute('data-description2');
                            const detay2 = this.getAttribute('data-detay2');
                            const image2 = this.getAttribute('data-image2');
                            document.getElementById('modal-text2').textContent = description2;
                            document.getElementById('modal-detay2').textContent = detay2;
                            document.getElementById('modal-image2').src = image2;
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
