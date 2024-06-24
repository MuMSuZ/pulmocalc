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

                // Anahtar kelimeler ve ilgili açıklamalar
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
                'şüphe indeksinin': {
                    description: 'Şüphe indeksi, bir hastalık veya durumun teşhis edilme olasılığını değerlendirmek için kullanılan bir kavramdır. Klinik pratikte, belirli bir hastalığın varlığını veya yokluğunu düşündüren belirtiler, bulgular veya risk faktörlerine dayanarak bir hastalık için duyulan klinik şüphe derecesini ifade eder. Yüksek şüphe indeksi, bir hastalığın olasılığının yüksek olduğunu düşündüren durumlar için kullanılır ve genellikle daha ileri testler veya daha yakın takip gerektirir.',
                    description: 'Mukus hipersekresyonu için yüksek bir şüphe indeksinin korunması, KOAH gibi hastalıklarda mukus üretiminin arttığını ve bu durumun potansiyel komplikasyonlara yol açabileceğini sürekli olarak göz önünde bulundurmak anlamına gelir. Bu durum, klinisyenlerin mukus hipersekresyonunu tanımak ve yönetmek için daha dikkatli olmalarını gerektirir.',
                    description: 'Dikkatli İzlem: Hastaların solunum yollarında artmış mukus üretimi belirtileri gösterip göstermediğini yakından izlemek. Bu, sık sık öksürük, balgam çıkarma ve nefes darlığı gibi belirtileri değerlendirmek anlamına gelir.',
                    description: 'Erken Teşhis: Mukus hipersekresyonunu erken aşamalarda tanımak için gerekli tanısal testleri yapmak. Bu, hastalığın ilerlemesini önleyebilir ve uygun tedaviye erken başlanmasını sağlar.',
                    description: 'Önleyici Tedbirler: Mukus hipersekresyonunu azaltmaya yönelik önleyici tedbirler almak. Bu, inhaler tedaviler, mukolitik ilaçlar veya diğer tedavi yöntemlerini içerebilir.',
                    description: 'Komplikasyonların Yönetimi: Mukus hipersekresyonunun neden olabileceği komplikasyonları yönetmek. Bunlar arasında hava yolu tıkanıklıkları, enfeksiyonlar ve alevlenmeler yer alabilir.',
                    description: 'Kapsamlı Değerlendirme: Hastaların genel durumunu değerlendirerek, mukus hipersekresyonunun varlığını düşündüren tüm faktörleri dikkate almak. Bu, detaylı bir tıbbi öykü, fizik muayene ve gerektiğinde radyolojik ve laboratuvar testlerini içerir.',
                    description: 'Özetle, mukus hipersekresyonu için yüksek bir şüphe indeksinin korunması, bu durumun hastalarda oluşturabileceği olumsuz etkilerin erken dönemde tanınması ve uygun şekilde yönetilmesi için sürekli bir farkındalık ve dikkat gerektirir. Bu, hastaların yaşam kalitesini artırabilir ve hastalıkla ilişkili komplikasyonları azaltabilir.'
                }
                // Diğer kelimeler ve açıklamaları buraya ekleyebilirsiniz
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
                    formattedLine = formattedLine.replace(regex, `<a href="#" class="keyword" data-description="${data.description}" data-image="${data.image}">${keyword}</a>`);
                }

                    metinAlani.innerHTML += formattedLine + '<br>';
            });

            // Tıklama olaylarını ayarla
            document.querySelectorAll('.keyword').forEach(element => {
                element.addEventListener('click', function(event) {
                    event.preventDefault();
                    const description = this.getAttribute('data-description');
                    const image = this.getAttribute('data-image');
                    document.getElementById('modal-text').textContent = description;
                    document.getElementById('modal-image').src = image;
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
        })
        .catch(error => console.error('Hata:', error));
}

function tumDosyalariYukle() {
    dosyaListesi.forEach(dosya => {
        txtDosyasiniYukle(dosya.dosyaYolu, dosya.hedefId);
    });
}

window.onload = tumDosyalariYukle;


 //document.getElementById('modal-text').innerHTML = description; // innerHTML kullanarak biçimlendirmeleri uygular