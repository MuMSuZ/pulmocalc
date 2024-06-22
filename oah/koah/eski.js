var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
                
                var arrow = this.querySelector(".arrow");
                if (arrow.style.transform === "rotate(90deg)") {
                    arrow.style.transform = "rotate(0deg)";
                } else {
                    arrow.style.transform = "rotate(90deg)";
                }
            
            });
        }


        // .txt dosyasını okuma
    fetch('metin/patogenez.txt')
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
        document.getElementById('content').innerHTML = updatedData;

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

// BAşka açılır pencere

document.addEventListener('DOMContentLoaded', () => {
    const wordInfoMap = {
        "Şekil 1.1": {
            text: "Şekil 1.1 önemli bir şekildir.",
            image: "resim/sekil11.png"
        },
        "Peto": {
            text: "Peto modeli nedir"
        }
    };

    const filesToFetch = [
        {id: 'patogenez', file: 'metin/patogenez.txt'}
    ];

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

    // Dosyaları yükleme ve işleme
    Promise.all(filesToFetch.map(fileInfo => fetch(fileInfo.file).then(response => response.text())))
        .then(filesContents => {
            filesContents.forEach((content, index) => {
                const fileInfo = filesToFetch[index];
                Object.keys(wordInfoMap).forEach(word => {
                    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(escapedWord, 'gu');
                    content = content.replace(regex, `<a href="#" class="word-link" data-word="${word}">${word}</a>`);
                });

                const contentElement = document.getElementById(fileInfo.id);
                contentElement.innerHTML = `<p>${content}</p>`;
            });

            document.querySelectorAll('.word-link').forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const word = event.target.getAttribute('data-word');
                    const info = wordInfoMap[word];
                    modalText.innerText = info.text;
                    if (info.image) {
                        modalImage.src = info.image;
                        modalImage.style.display = 'block';
                    } else {
                        modalImage.style.display = 'none';
                    }
                    modal.style.display = 'block';
                });
            });
        })
        .catch(error => console.error('Error:', error));
});

.replace(/\bŞekil\b/g, '<a href="mumsuz.github.oi/pulmocalc">Şekil 1.1</a>'); // Örnek bağlantı;