import "./cv.css"
import { AISummarizer } from "@/components/ai-summarizer"

export default function Page() {
  return (
    <>
      <header className="header">
        <img
          className="foto-profil"
          src="/foto-profil.jpg"
          alt="Foto profil"
          width={120}
          height={120}
        />
        <div className="identitas">
          <h1 className="nama">Mahdi Ghani Afriza</h1>
          <ul className="kontak">
            <li><a href="mailto:ramaghani0513@gmail.com">ramaghani0513@gmail.com</a></li>
            <li>+62 851-5959-0509</li>
            <li><a href="https://linkedin.com/in/mahdi-ghani-afriza" target="_blank" rel="noreferrer">linkedin.com/in/mahdi-ghani-afriza</a></li>
            <li><a href="https://github.com/afrzghani" target="_blank" rel="noreferrer">github.com/afrzghani</a></li>
          </ul>
        </div>
      </header>

      <main className="container">
        <section>
          <h2>Tentang Saya</h2>
          <p>
            Saya Mahdi Ghani Afriza, mahasiswa Teknik Informatika semester 3 di Universitas Negeri Surabaya. Saya antusias di pengembangan web (frontend) dan UI/UX design.
          </p>
        </section>

        <section>
          <h2>Pengalaman Kerja</h2>
          <div className="card">
            <h3>Graphic Designer</h3>
            <span>PT Varia Usaha Fabrikasi | Apr 2023 - Des 2023</span>
            <ul>
              <li>Mengembangkan branding dan identitas perusahaan</li>
              <li>Presentasi profil perusahaan untuk lebih dari 10 proposal klien</li>
              <li>Menyelesaikan 3 proyek desain besar</li>
              <li>Mendesain konten digital & meningkatkan website/sosmed</li>
              <li>Mendokumentasikan acara & membuat aset visual</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Pendidikan</h2>
          <div className="card">
            <h3>S1 Teknik Informatika</h3>
            <span>Universitas Negeri Surabaya, 2024 - Sekarang</span>
            <ul>
              <li>Projek: Web tiket bioskop (Django)</li>
              <li>Projek: Desain UI/UX aplikasi tiket pendaki</li>
            </ul>
          </div>
          <div className="card">
            <h3>Desain Komunikasi Visual</h3>
            <span>SMK Negeri 1 Cerme Gresik, 2021 - 2024</span>
            <ul>
              <li>Projek: Promosi wisata "Bandar Grisse"</li>
              <li>Aktivitas: Tim Jurnalistik SMKN 1 Cerme</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Organisasi</h2>
          <div className="card">
            <h3>Staff Komunikasi & Informasi</h3>
            <span>Himpunan Mahasiswa TI, 2024 - Sekarang</span>
            <ul>
              <li>Desain & produksi materi promosi digital</li>
              <li>Mengelola media sosial & interaksi audiens</li>
            </ul>
          </div>
          <div className="card">
            <h3>Sekretaris & Bendahara</h3>
            <span>LPM Digitivs, 2024 - Sekarang</span>
            <ul>
              <li>Administrasi & keuangan organisasi</li>
              <li>Koordinasi acara & aktivitas organisasi</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Keahlian</h2>
          <ul className="tags">
            <li>HTML5</li>
            <li>CSS</li>
            <li>JavaScript/TypeScript</li>
            <li>React/Next.js</li>
            <li>Aksesibilitas</li>
            <li>Performance</li>
          </ul>
        </section>
      </main>

      <section className="ai">
        <h2>Ringkas CV Secara Otomatis</h2>
        <p>Tekan tombol di bawah untuk menghasilkan ringkasan singkat CV ini.</p>
        <AISummarizer targetSelector=".container" />
        <p className="note">Catatan: ringkasan AI dapat mengandung kekeliruan. Periksa kembali sebelum digunakan.</p>
      </section>
    </>
  )
}