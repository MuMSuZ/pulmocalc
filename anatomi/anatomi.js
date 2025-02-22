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
                        image: 'resim/costa2.jpg'
                    },
                    'Şekil 3': {
                        description: 'Tipik (7.) kostanın oblik görünümü',
                        detay: '',
                        image: 'resim/costa3.jpg'
                    },
                    'Şekil 4': {
                        description: 'Tipik bir kosta ile torasik vertebra arasındaki ilişkiler',
                        detay: 'Her tipik kostanın başı iki torasik vertebra ile eklemleşir ve kostal tüberkülün eklem yüzü alt vertebranın transvers prosesi ile eklemleşir.',
                        image: 'resim/costa4.jpg'
                    },
                    'Şekil 5': {
                        description: 'Tipik kostanın arkadan görünümü',
                        detay: 'İki komşu vertebra ile eklemleşen kosta başındaki iki eklem yüzeyine ve vertebra diskine bakan eklemler arası tepeye dikkat edin.',
                        image: 'resim/costa5.jpg'
                    },
                    'Şekil 7': {
                        description: 'I ve II kostanın üstten görünümü',
                        detay: 'Her iki kosta da atipiktir: birinci kosta kısa ve düzdür ve sadece bir torasik vertebra ile eklemlendiği için başında interartiküler krest yoktur. Ancak ikinci kosta, serratus anterior kasının tutunması için belirgin yuvarlak tüberositeye sahiptir',
                        image: 'resim/costa6.jpg'
                    },
                    'Şekil 8': {
                        description: 'En alttaki iki kostanın dorsal görünümü',
                        detay: 'Her ikisi de boyun, kostal tüberkül ve kostal tüberkülün artiküler fasetinden yoksun oldukları için atipiktir. Ayrıca, XI ve XII kostanın başı, karşılık gelen tek vertebra ile eklemleşmesi nedeniyle eklemler arası tepeye sahip değildir',
                        image: 'resim/costa7.jpg'
                    },
                    "Şekil 6": {
                        description: "I kostanın oluşturduğu eklemler",
                        detay: "Kosta başı eklemi, kosta başı ile bir veya iki vertebra gövdesinin kostal faseti arasında yer alır. Öte yandan, kostotransvers eklem, kostal tüberkülün eklem yüzeyi ile transvers prosesin kostal faseti arasındadır",
                        image: "resim/eklem1.png"
                    },
                    "Şekil 9": {
                        description: "Sternumun frontal ve anterior oblik görünümü",
                        detay: "",
                        image: "resim/sternum.jpg"
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
                        formattedLine = formattedLine.replace(regex, `<a href="#" class="keyword" data-description="${data.description}" data-detay="${data.detay}" data-image="${data.image || ''}" data-isFile="${data.isFile || false}">${keyword}</a>`);
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

function goBack() {
    window.history.back();
}
