const menuItems = document.querySelectorAll('.menu-item');
const pageTitle = document.getElementById('page-title');
const contentArea = document.getElementById('content-area');

const pages = {
  dashboard: {
    title: 'Dashboard',
    content: `
      <div class="dashboard-stats">
        <div class="stat-box"><div class="stat-label">Surat Masuk</div><div class="stat-value">12</div></div>
        <div class="stat-box"><div class="stat-label">Surat Keluar</div><div class="stat-value">7</div></div>
        <div class="stat-box"><div class="stat-label">Disposisi</div><div class="stat-value">4</div></div>
      </div>
      <div style="max-width:340px;margin:24px auto 0 auto;background:#fff;padding:18px 12px 8px 12px;border-radius:12px;box-shadow:0 2px 12px #e5e7eb;">
        <canvas id="pie-dashboard" width="320" height="220"></canvas>
      </div>
      <p style="text-align:center;">Info grafis proporsi surat</p>
      <p>Selamat datang di aplikasi persuratan. Silakan pilih menu di samping untuk mengelola surat.</p>
    `
  },
  masuk: {
    title: 'Surat Masuk',
    content: `
      <button class="btn-action" id="btn-tambah-surat" style="margin-bottom:12px;"><i class="fa fa-plus"></i> Tambah Surat Masuk</button>
      <table class="table">
        <thead><tr><th>No</th><th>Nomor Surat</th><th>Pengirim</th><th>Tanggal</th><th>Perihal</th><th>Aksi</th></tr></thead>
        <tbody>
          <tr>
            <td>1</td><td>001/SM/2025</td><td>Dinas Pendidikan</td><td>01-10-2025</td><td>Undangan Rapat</td>
            <td>
              <button class="btn-table" title="Edit"><i class="fa fa-edit"></i></button>
              <button class="btn-table btn-danger" title="Hapus"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
          <tr>
            <td>2</td><td>002/SM/2025</td><td>Kecamatan</td><td>05-10-2025</td><td>Permohonan Data</td>
            <td>
              <button class="btn-table" title="Edit"><i class="fa fa-edit"></i></button>
              <button class="btn-table btn-danger" title="Hapus"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    `
  },
  keluar: {
    title: 'Surat Keluar',
    content: `
      <button class="btn-action" id="btn-tambah-surat-keluar" style="margin-bottom:12px;"><i class="fa fa-plus"></i> Tambah Surat Keluar</button>
      <table class="table">
        <thead><tr><th>No</th><th>Nomor Surat</th><th>Tujuan</th><th>Tanggal</th><th>Perihal</th><th>Aksi</th></tr></thead>
        <tbody>
          <tr>
            <td>1</td><td>001/SK/2025</td><td>Dinas Kesehatan</td><td>03-10-2025</td><td>Permohonan Bantuan</td>
            <td>
              <button class="btn-table" title="Edit"><i class="fa fa-edit"></i></button>
              <button class="btn-table btn-danger" title="Hapus"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    `
  },
  disposisi: {
    title: 'Disposisi Surat',
    content: `
      <table class="table">
        <thead><tr><th>No</th><th>Nomor Surat</th><th>Disposisi Kepada</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>001/SM/2025</td><td>Sekretaris</td><td>Selesai</td></tr>
          <tr><td>2</td><td>002/SM/2025</td><td>Kabid Umum</td><td>Proses</td></tr>
        </tbody>
      </table>
    `
  }
};

function setPage(menu) {
  menuItems.forEach(item => item.classList.remove('active'));
  document.querySelector(`.menu-item[data-menu="${menu}"]`).classList.add('active');
  pageTitle.textContent = pages[menu].title;
  contentArea.innerHTML = pages[menu].content;
}

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    setPage(item.getAttribute('data-menu'));
  });
});

// Auth button logic
const authBtn = document.getElementById('auth-btn');

function isLoggedIn() {
  return localStorage.getItem('persuratan_login') === 'true';
}

function updateAuthBtn() {
  if (isLoggedIn()) {
    authBtn.style.display = '';
    authBtn.textContent = '';
    authBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
  } else {
    authBtn.style.display = 'none';
  }
}

authBtn.addEventListener('click', function() {
  if (isLoggedIn()) {
    localStorage.removeItem('persuratan_login');
    window.location.href = 'login.html';
  }
});

// Cek status login saat load halaman
if (!isLoggedIn()) {
  window.location.href = 'login.html';
}

updateAuthBtn();

// Set default page
setPage('dashboard');

// Tambahkan style tombol aksi jika belum ada
document.head.insertAdjacentHTML('beforeend', `
<style>
.btn-action {
  background: linear-gradient(180deg,#4f46e5,#4338ca);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-action i { font-size: 1.1em; }
.btn-table {
  background: #eef2ff;
  color: #4f46e5;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  margin: 0 2px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-table:hover { background: #d1d5fa; }
.btn-table.btn-danger { background: #fee2e2; color: #ef4444; }
.btn-table.btn-danger:hover { background: #fecaca; }
</style>
`);

// Tambahkan Chart.js CDN jika belum ada
if (!document.getElementById('chartjs-cdn')) {
  const script = document.createElement('script');
  script.id = 'chartjs-cdn';
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  document.head.appendChild(script);
}

// Render pie chart saat dashboard aktif
document.addEventListener('click', function(e) {
  if (e.target.matches('.menu-item[data-menu="dashboard"]')) {
    setTimeout(renderDashboardPie, 100);
  }
});
function renderDashboardPie() {
  if (typeof Chart === 'undefined') return setTimeout(renderDashboardPie, 100);
  const ctx = document.getElementById('pie-dashboard');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Surat Masuk', 'Surat Keluar', 'Disposisi'],
      datasets: [{
        data: [12, 7, 4],
        backgroundColor: ['#4f46e5', '#22d3ee', '#f59e42'],
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 14 } } }
      }
    }
  });
}
// Render pie chart saat pertama kali load dashboard
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(renderDashboardPie, 200);
});

function showTambahSuratMasukForm() {
  // Modal form HTML
  const modal = document.createElement('div');
  modal.className = 'modal-surat';
  modal.innerHTML = `
    <div class="modal-surat-backdrop"></div>
    <div class="modal-surat-content">
      <h3>Tambah Surat Masuk</h3>
      <form id="form-surat-masuk" autocomplete="off">
        <label>Nomor Surat<br><input type="text" name="nomor" required></label>
        <label>Pengirim<br><input type="text" name="pengirim" required></label>
        <label>Tanggal<br><input type="date" name="tanggal" required></label>
        <label>Perihal<br><input type="text" name="perihal" required></label>
        <div class="modal-surat-actions">
          <button type="submit" class="btn-action">Simpan</button>
          <button type="button" class="btn-action btn-cancel">Batal</button>
        </div>
        <div class="modal-surat-status" style="margin-top:10px;color:#4f46e5;"></div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  // Close modal
  modal.querySelector('.btn-cancel').onclick = () => modal.remove();
  modal.querySelector('.modal-surat-backdrop').onclick = () => modal.remove();
  // Submit handler (Google Sheets integration)
  modal.querySelector('#form-surat-masuk').onsubmit = async function(e) {
    e.preventDefault();
    const status = modal.querySelector('.modal-surat-status');
    status.textContent = 'Menyimpan...';
    const data = {
      nomor: this.nomor.value,
      pengirim: this.pengirim.value,
      tanggal: this.tanggal.value,
      perihal: this.perihal.value
    };
    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbwC-7fU3MvVb_wOkETNFBy-pI8sOx8B9_tufmFuft6QN3W8P1XIKkSakiiXRSFGVQ'/exec, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if(result.result === 'success') {
        status.style.color = '#16a34a';
        status.textContent = 'Data berhasil disimpan ke Google Sheets!';
        setTimeout(() => modal.remove(), 1200);
      } else {
        status.style.color = '#ef4444';
        status.textContent = 'Gagal menyimpan data!';
      }
    } catch(err) {
      status.style.color = '#ef4444';
      status.textContent = 'Gagal terhubung ke server!';
    }
  };
}

function showTambahSuratKeluarForm() {
  // Modal form HTML
  const modal = document.createElement('div');
  modal.className = 'modal-surat';
  modal.innerHTML = `
    <div class="modal-surat-backdrop"></div>
    <div class="modal-surat-content">
      <h3>Tambah Surat Keluar</h3>
      <form id="form-surat-keluar" autocomplete="off">
        <label>Nomor Surat<br><input type="text" name="nomor" required></label>
        <label>Tujuan<br><input type="text" name="tujuan" required></label>
        <label>Tanggal<br><input type="date" name="tanggal" required></label>
        <label>Perihal<br><input type="text" name="perihal" required></label>
        <div class="modal-surat-actions">
          <button type="submit" class="btn-action">Simpan</button>
          <button type="button" class="btn-action btn-cancel">Batal</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  // Close modal
  modal.querySelector('.btn-cancel').onclick = () => modal.remove();
  modal.querySelector('.modal-surat-backdrop').onclick = () => modal.remove();
  // Submit handler (demo only)
  modal.querySelector('#form-surat-keluar').onsubmit = function(e) {
    e.preventDefault();
    alert('Data surat keluar berhasil disimpan! (Demo)');
    modal.remove();
  };
}

// Event delegation for dynamic content
contentArea.addEventListener('click', function(e) {
  if (e.target && (e.target.id === 'btn-tambah-surat' || e.target.closest('#btn-tambah-surat'))) {
    showTambahSuratMasukForm();
  }
  if (e.target && (e.target.id === 'btn-tambah-surat-keluar' || e.target.closest('#btn-tambah-surat-keluar'))) {
    showTambahSuratKeluarForm();
  }
});

// Tambahkan style modal jika belum ada
if (!document.getElementById('modal-surat-style')) {
  document.head.insertAdjacentHTML('beforeend', `
  <style id="modal-surat-style">
    .modal-surat {position:fixed;z-index:1000;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;}
    .modal-surat-backdrop {position:absolute;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.25);}
    .modal-surat-content {position:relative;background:#fff;padding:28px 22px 18px 22px;border-radius:12px;box-shadow:0 8px 32px rgba(17,24,39,0.13);min-width:270px;max-width:96vw;width:350px;z-index:2;}
    .modal-surat-content h3 {margin-top:0;margin-bottom:18px;font-size:1.2rem;color:#4f46e5;}
    .modal-surat-content label {display:block;margin-bottom:12px;font-size:1rem;color:#222;}
    .modal-surat-content input[type="text"], .modal-surat-content input[type="date"] {width:100%;padding:9px 10px;border-radius:7px;border:1px solid #e6e9ef;font-size:1rem;margin-top:4px;box-sizing:border-box;}
    .modal-surat-actions {display:flex;gap:10px;justify-content:flex-end;margin-top:18px;}
    .modal-surat .btn-action {min-width:80px;}
    @media (max-width:480px) {.modal-surat-content{padding:14px 4vw 10px 4vw;width:98vw;}}
  </style>
  `);
}


