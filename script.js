// Yükleniyor animasyonu
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
  }
});

// Sayfa açılırken fade-in efekti
document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  if (page) {
    setTimeout(() => {
      page.classList.add('loaded');
    }, 100);
  }
});

// Link tıklayınca fade-out yap, sonra yönlendir
document.querySelectorAll('a').forEach(link => {
  if (link.getAttribute('target') !== '_blank' && link.href && link.href.includes(location.hostname)) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.href;
      const page = document.querySelector('.page');
      if (page) {
        page.classList.remove('loaded');
        page.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      } else {
        window.location.href = href;
      }
    });
  }
});

// Tema değiştirme
const themeBtn = document.querySelector('.theme-toggle');
if (themeBtn) {
  themeBtn.onclick = () => {
    const current = document.body.dataset.theme;
    const next = current === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = next;
    localStorage.setItem('theme', next);
  };
}

// Sayfa açıldığında kaydedilmiş temayı yükle
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
});

// Hamburger Menü
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('nav.sidebar');
if (hamburger && sidebar) {
  hamburger.onclick = () => {
    sidebar.classList.toggle('active');
  };
}

// Boş alana tıklayınca sidebar kapansın
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('active');
  }
});

// Saat
setInterval(() => {
  const clock = document.getElementById('clock');
  if (clock) {
    clock.innerText = new Date().toLocaleTimeString();
  }
}, 1000);

// Giriş Yap (auth.html)
const authSubmit = document.getElementById('auth-submit');
if (authSubmit) {
  authSubmit.onclick = () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user && pass) {
      localStorage.setItem('user', user);
      alert('Giriş başarılı!');
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  };
}

// Cihaz Tara (devices.html)
const deviceScan = document.getElementById('device-scan');
if (deviceScan) {
  deviceScan.onclick = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
      document.getElementById('device-status').innerText = device.name || device.id;
    } catch (error) {
      alert('Bluetooth cihazı bulunamadı.');
    }
  };
}

// Senkronize Et (sync.html)
const syncNow = document.getElementById('sync-now');
if (syncNow) {
  syncNow.onclick = () => {
    const status = document.getElementById('sync-status');
    if (status) {
      status.innerText = 'Senkronize ediliyor...';
      setTimeout(() => {
        status.innerText = 'Senkronizasyon tamamlandı!';
      }, 2000);
    }
  };
}

// Acil Durum (emergency.html)
const emergencyMode = document.getElementById('emergency-mode');
if (emergencyMode) {
  emergencyMode.onclick = () => {
    alert('Acil durum modu aktif edildi!');
  };
}

// Tahmin Yap (prediction.html)
const makePrediction = document.getElementById('make-prediction');
if (makePrediction) {
  makePrediction.onclick = () => {
    document.getElementById('prediction').innerText = 'Tahmin: 120 mg/dL';
  };
}

// PDF Oluştur (reports.html)
const generatePdf = document.getElementById('generate-pdf');
if (generatePdf) {
  generatePdf.onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Diaen Haftalık Raporu', 10, 10);
    doc.save('rapor.pdf');
  };
}

// Takvime Ekle (calendar.html)
const addCalendar = document.getElementById('add-calendar');
if (addCalendar) {
  addCalendar.onclick = () => {
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Ölçüm Hatırlatma\nDTSTART:${new Date().toISOString().replace(/[-:]/g,'').split('.')[0]}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hatirlatici.ics';
    a.click();
  };
}

// Sesli Komut Başlat (voice.html)
const startVoice = document.getElementById('start-voice');
if (startVoice) {
  startVoice.onclick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.onresult = (e) => {
        document.getElementById('voice-result').innerText = 'Duyulan: ' + e.results[0][0].transcript;
      };
      recognition.start();
    } else {
      alert('Tarayıcınız ses tanımayı desteklemiyor.');
    }
  };
}

// Paylaşım (social.html)
const startShare = document.getElementById('start-share');
if (startShare) {
  startShare.onclick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Diaen - Diyabet Asistanı',
        text: 'Diaen uygulamasını keşfet!',
        url: window.location.href
      });
    } else {
      alert('Paylaşım desteklenmiyor.');
    }
  };
}

// Tema Renk Değiştir (themes.html)
const chooseTheme = document.getElementById('choose-theme');
if (chooseTheme) {
  chooseTheme.onclick = () => {
    const color = document.getElementById('theme-color').value;
    document.body.style.background = color;
  };
}

// Dil Seçimi (i18n.html)
const langButtons = document.querySelectorAll('.lang-btn');
if (langButtons.length > 0) {
  langButtons.forEach(btn => {
    btn.onclick = (e) => {
      const selectedLang = e.target.getAttribute('data-lang');
      alert('Seçilen Dil: ' + selectedLang);
    };
  });
}

// İçerik Yükleme (content.html)
const loadContent = document.getElementById('load-content');
if (loadContent) {
  loadContent.onclick = () => {
    const articles = [
      { title: 'Kan Şekeri Takibi' },
      { title: 'İnsülin ve Tip 1 Diyabet' },
      { title: 'Egzersiz ile Şeker Kontrolü' }
    ];
    const container = document.getElementById('articles');
    container.innerHTML = articles.map(article => `
      <div class="card">
        <h3>${article.title}</h3>
      </div>
    `).join('');
  };
}

// Destek Chat (support.html)
const sendMessage = document.getElementById('send-message');
if (sendMessage) {
  sendMessage.onclick = () => {
    const chatBox = document.getElementById('chat-box');
    const chatInput = document.getElementById('chat-input');
    if (chatInput.value.trim() !== '') {
      const p = document.createElement('p');
      p.textContent = chatInput.value;
      chatBox.appendChild(p);
      chatInput.value = '';
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  };
}
