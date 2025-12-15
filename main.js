document.addEventListener("DOMContentLoaded", () => {
  // 1. Slider Logic
  const slideButtons = document.querySelectorAll(".next-slide");

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const currentSlide = button.closest(".slide");
      const nextSlideId = button.dataset.next;
      const nextSlide = document.getElementById(nextSlideId);

      if (currentSlide && nextSlide) {
        // Scroll to top of next slide
        nextSlide.scrollTop = 0;

        currentSlide.classList.remove("active");

        // Small delay to allow CSS transition
        setTimeout(() => {
          nextSlide.classList.add("active");
          // Trigger animation reset if needed
          const animatedElements = nextSlide.querySelectorAll(".fade-up");
          animatedElements.forEach((el) => {
            el.style.animation = "none";
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null;
          });
        }, 50);
      }
    });
  });

  // 2. Countdown Timer
  const countdownElement = document.getElementById("countdown");
  if (countdownElement) {
    // Tanggal acara: 3 Januari 2026, jam 11:00
    const eventDate = new Date("2026-01-03T11:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        countdownElement.innerHTML = "Alhamdulillah Acara Telah Selesai";
        // clearInterval(countdownInterval); // Optional: stop timer
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `
        <div style="display:flex; justify-content:center; gap:10px;">
          <div>${days}<br><span style="font-size:0.7rem; font-weight:400">Hari</span></div> :
          <div>${hours}<br><span style="font-size:0.7rem; font-weight:400">Jam</span></div> :
          <div>${minutes}<br><span style="font-size:0.7rem; font-weight:400">Menit</span></div> :
          <div>${seconds}<br><span style="font-size:0.7rem; font-weight:400">Detik</span></div>
        </div>
      `;
    };

    updateCountdown(); // Run immediately
    const countdownInterval = setInterval(updateCountdown, 1000);
  }

  // 3. Share to WhatsApp
  const shareButton = document.getElementById("share-whatsapp");
  if (shareButton) {
    shareButton.addEventListener("click", () => {
      const message = encodeURIComponent(
        `Bismillahirahmanirrahim\nAssalamu'alaikum Wr.Wb.\n\nDengan memohon Ridho dan Rahmat Allah SWT, kami bermaksud menyelenggarakan syukuran khitanan Putra kami:\n\n*Dema Hendra Al Faruq*\n\nYang Insya Allah akan diselenggarakan pada:\n*Hari:* Sabtu, 03 Januari 2026\n*Pukul:* 11.00 WIB s/d Selesai\n*Tempat:* KP. GEDONG RT.03/04 KEL. KEMIRIMUKA, KEC. BEJI DEPOK (Posyandu Jati RW 4)\n\nTiada yang dapat kami ucapkan selain ucapan terimakasih dari hati yang tulus apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a kepada Putra kami.\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh`
      );
      const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
      window.open(whatsappUrl, "_blank");
    });
  }
});

// 4. Copy to Clipboard Function (Global scope)
function copyToClipboard() {
  // Ambil nomor saja tanpa spasi
  const textToCopy = "042201036705507";

  // Gunakan API clipboard modern jika tersedia
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showToast();
      })
      .catch((err) => {
        console.error("Gagal menyalin: ", err);
        fallbackCopy(textToCopy);
      });
  } else {
    fallbackCopy(textToCopy);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand("copy");
    showToast();
  } catch (err) {
    console.error("Fallback copy failed", err);
    alert("Gagal menyalin otomatis. Silakan salin manual: 0422 0103 6705 507");
  }
  document.body.removeChild(textArea);
}

function showToast() {
  const toast = document.getElementById("copy-toast");
  toast.className = "show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
