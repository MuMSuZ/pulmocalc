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
                if (panel.id === 'tanim' && !panel.innerHTML) {
                    loadContent('tanim.txt', panel); // İçeriği yüklemek için panel id'sini kontrol edin
                }
                if (panel.id === 'yuk' && !panel.innerHTML) {
                    loadContent('yuk.txt', panel);
                }
                if (panel.id === 'patogenez' && !panel.innerHTML) {
                    loadContent('patogenez.txt', panel)
                }
                var arrow = this.querySelector(".arrow");
                if (arrow.style.transform === "rotate(90deg)") {
                    arrow.style.transform = "rotate(0deg)";
                } else {
                    arrow.style.transform = "rotate(90deg)";
                }
            
            });
        }

        function loadContent(url, element) {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    // Metni HTML olarak biçimlendirin
                    const formattedText = data
                        .split(/\n\s*\n/) // Paragrafları ayırmak için boş satırlara göre böl
                        .map(paragraph => {
                            // Girintili ve kalın metinleri kontrol et
                            const lines = paragraph.split('\n').map(line => {
                                // Girintili satırları kontrol et
                                if (line.includes('*')) {
                                    const parts = line.split('*').map((part, index) => {
                                        if (index % 2 === 1) { // Tek indeksler girintili kısımlar olacak
                                            return `<span class="indented">${part.trim()}</span>`;
                                        }
                                        return part;
                                    });
                                    line = parts.join('');
                                }
                                // Kalın metinleri kontrol et
                                if (line.includes('**')) {
                                    const parts = line.split('**').map((part, index) => {
                                        if (index % 2 === 1) { // Tek indeksler kalın kısımlar olacak
                                            return `<strong>${part.trim()}</strong>`;
                                        }
                                        return part;
                                    });
                                    line = parts.join('');
                                }
                                return line;
                            });
                            return `<p>${lines.join('<br>')}</p>`;
                        })
                        .join('');
                    element.innerHTML = formattedText;
                })
                .catch(error => {
                    console.error('Error loading content:', error);
                    element.innerHTML = 'İçerik yüklenemedi.';
                });
        }