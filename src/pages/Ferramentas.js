import React, { useState, useRef } from "react";
import "../assets/css/Ferramentas.css";
import Navbar from "../component/Navbar"

// util pra gerar slug curtinho tipo encurtador
function gerarSlugCurto() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export default function Ferramentas() {
  // ========== ESTADOS GERAIS ==========

  // COMPRESSOR
  const [compressInputFile, setCompressInputFile] = useState(null);
  const [compressQualidade, setCompressQualidade] = useState(0.7); // 0-1
  const [compressPreviewURL, setCompressPreviewURL] = useState("");
  const [compressDownloadURL, setCompressDownloadURL] = useState("");
  const [compressInfo, setCompressInfo] = useState(null);
  const compressCanvasRef = useRef(null);

  // CONVERSOR DE IMAGEM
  const [convertInputFile, setConvertInputFile] = useState(null);
  const [convertTipoSaida, setConvertTipoSaida] = useState("image/png");
  const [convertPreviewURL, setConvertPreviewURL] = useState("");
  const [convertDownloadURL, setConvertDownloadURL] = useState("");
  const convertCanvasRef = useRef(null);

  // ENCURTADOR
  const [urlOriginal, setUrlOriginal] = useState("");
  const [urlEncurtada, setUrlEncurtada] = useState("");

  // ==== NOVO CONVERSOR DE ARQUIVOS ====
  // Imagens -> PDF
  const [pdfImages, setPdfImages] = useState([]); // File[]
  const [pdfDownloadURL, setPdfDownloadURL] = useState("");

  // ========== FUNÇÕES: COMPRESSOR ==========
  function handleCompressFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCompressInputFile(file);
    setCompressDownloadURL("");
    setCompressPreviewURL(URL.createObjectURL(file));
    setCompressInfo({
      nome: file.name,
      tamanhoKB: (file.size / 1024).toFixed(1),
      tipo: file.type || "desconhecido",
    });
  }

  function handleCompress() {
    if (!compressInputFile) return;

    const img = new Image();
    img.src = URL.createObjectURL(compressInputFile);
    img.onload = () => {
      const canvas = compressCanvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setCompressDownloadURL(url);

          setCompressInfo((old) => ({
            ...old,
            tamanhoComprimidoKB: (blob.size / 1024).toFixed(1),
            tipoFinal: blob.type,
          }));
        },
        "image/jpeg",
        parseFloat(compressQualidade)
      );
    };
  }

  // ========== FUNÇÕES: CONVERSOR DE IMAGEM ==========
  function handleConvertFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setConvertInputFile(file);
    setConvertPreviewURL(URL.createObjectURL(file));
    setConvertDownloadURL("");
  }

  function handleConverter() {
    if (!convertInputFile) return;

    const img = new Image();
    img.src = URL.createObjectURL(convertInputFile);
    img.onload = () => {
      const canvas = convertCanvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setConvertDownloadURL(url);
        },
        convertTipoSaida,
        0.92
      );
    };
  }

  // ========== FUNÇÕES: ENCURTADOR ==========
  function handleEncurtar() {
    if (!urlOriginal.trim()) return;

    try {
      let finalUrl = urlOriginal.trim();
      if (
        !finalUrl.startsWith("http://") &&
        !finalUrl.startsWith("https://")
      ) {
        finalUrl = "https://" + finalUrl;
      }
      new URL(finalUrl); // valida

      const slug = gerarSlugCurto();
      const curtinha = window.location.origin + "/r/" + slug;

      setUrlEncurtada({
        curta: curtinha,
        original: finalUrl,
        slug,
      });
    } catch (err) {
      alert("URL inválida.");
    }
  }

  // ========== FUNÇÕES: CONVERSOR DE ARQUIVOS (IMAGEM -> PDF) ==========
  function handlePdfImagesChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setPdfImages(files);
    setPdfDownloadURL("");
  }

  async function gerarPDF() {
    if (pdfImages.length === 0) return;

    // vamos montar PDF manualmente usando canvas + jsPDF-like approach.
    // em vez de puxar lib externa grande agora, vamos usar uma lib leve inline.
    // truque: gerar um PDF "na unha" em base64 dá trabalho demais,
    // então vamos usar jsPDF diretamente (é pequeno o bastante pro front).
    //
    // => você precisa instalar jsPDF:
    //    npm install jspdf
    //
    // e importar aqui:
    //    import { jsPDF } from "jspdf"
    //
    // Como não temos import aqui em cima ainda, vou simular abaixo
    // e deixar o código pronto. Você só precisa:
    // 1. npm i jspdf
    // 2. descomentar import no topo.

    try {
      const { jsPDF } = await import("jspdf"); // lazy import

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      for (let i = 0; i < pdfImages.length; i++) {
        const file = pdfImages[i];
        // carrega img
        const dataURL = await fileToDataURL(file);

        // cria um elemento img pra medir proporção
        const imgEl = await loadImage(dataURL);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // vamos caber a imagem na página mantendo proporção
        const { drawW, drawH, offsetX, offsetY } = fitContain(
          imgEl.width,
          imgEl.height,
          pageWidth,
          pageHeight
        );

        // desenha
        pdf.addImage(
          dataURL,
          "PNG", // jsPDF aceita PNG/JPEG; se vier JPG ainda funciona como 'JPEG'
          offsetX,
          offsetY,
          drawW,
          drawH
        );

        // se ainda tem próxima página, adiciona
        if (i < pdfImages.length - 1) {
          pdf.addPage();
        }
      }

      const blob = pdf.output("blob");
      const blobURL = URL.createObjectURL(blob);
      setPdfDownloadURL(blobURL);
    } catch (err) {
      console.error("Erro gerando PDF", err);
      alert(
        "Falha ao gerar PDF. Verifica se você instalou jspdf: npm install jspdf"
      );
    }
  }

  // helpers pro PDF
  function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = reject;
      fr.readAsDataURL(file);
    });
  }

  function loadImage(dataURL) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = dataURL;
    });
  }

  function fitContain(srcW, srcH, maxW, maxH) {
    const ratio = Math.min(maxW / srcW, maxH / srcH);
    const drawW = srcW * ratio;
    const drawH = srcH * ratio;
    const offsetX = (maxW - drawW) / 2;
    const offsetY = (maxH - drawH) / 2;
    return { drawW, drawH, offsetX, offsetY };
  }

  // ========== RENDER ==========
  return (
    <div className="ferramentas-page">
      <Navbar showLinks={false} variant="hub" />
      <div className="container">
      <h1 className="f-title">Ferramentas</h1>
      <p className="f-subtitle">
        Tudo roda no seu navegador. Nada é enviado pra servidor.
      </p>

      <div className="f-grid">
        {/* ================= COMPRESSOR ================= */}
        <section className="f-card">
          <h2 className="f-card-title">Compressor de Imagem</h2>
          <p className="f-card-desc">
            Reduz o tamanho do arquivo usando qualidade menor (JPEG). Ótimo pra
            mandar imagem mais leve.
          </p>

          <label className="f-label">
            Escolher imagem:
            <input
              type="file"
              accept="image/*"
              onChange={handleCompressFileChange}
              className="f-input-file"
            />
          </label>

          <label className="f-label-inline">
            Qualidade:
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={compressQualidade}
              onChange={(e) => setCompressQualidade(e.target.value)}
            />
            <span>{Math.round(compressQualidade * 100)}%</span>
          </label>

          <button className="f-btn" onClick={handleCompress}>
            Comprimir
          </button>

          {compressInfo && (
            <div className="f-info">
              <div>
                <strong>Arquivo:</strong> {compressInfo.nome || "—"}
              </div>
              <div>
                <strong>Original:</strong>{" "}
                {compressInfo.tamanhoKB
                  ? `${compressInfo.tamanhoKB} KB`
                  : "—"}
              </div>
              {compressInfo.tamanhoComprimidoKB && (
                <div>
                  <strong>Comprimido:</strong>{" "}
                  {compressInfo.tamanhoComprimidoKB} KB
                </div>
              )}
            </div>
          )}

          {compressPreviewURL && (
            <div className="f-preview-block">
              <p className="f-preview-label">Preview Original</p>
              <img
                src={compressPreviewURL}
                alt="preview original"
                className="f-preview-img"
              />
            </div>
          )}

          {compressDownloadURL && (
            <div className="f-download-block">
              <p className="f-preview-label">Download Comprimido</p>
              <a
                className="f-download-link"
                href={compressDownloadURL}
                download={"comprimido.jpg"}
              >
                Baixar imagem comprimida
              </a>
            </div>
          )}

          {/* canvas offscreen pro compressor */}
          <canvas
            ref={compressCanvasRef}
            style={{ display: "none" }}
          ></canvas>
        </section>

        {/* ================= CONVERSOR DE IMAGEM ================= */}
        <section className="f-card">
          <h2 className="f-card-title">Conversor de Imagem</h2>
          <p className="f-card-desc">
            Converte entre formatos comuns (PNG, JPG, WEBP...).
          </p>

          <label className="f-label">
            Escolher imagem:
            <input
              type="file"
              accept="image/*"
              onChange={handleConvertFileChange}
              className="f-input-file"
            />
          </label>

          <label className="f-label">
            Formato de saída:
            <select
              className="f-select"
              value={convertTipoSaida}
              onChange={(e) => setConvertTipoSaida(e.target.value)}
            >
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPG</option>
              <option value="image/webp">WEBP</option>
            </select>
          </label>

          <button className="f-btn" onClick={handleConverter}>
            Converter
          </button>

          {convertPreviewURL && (
            <div className="f-preview-block">
              <p className="f-preview-label">Preview Original</p>
              <img
                src={convertPreviewURL}
                alt="preview original"
                className="f-preview-img"
              />
            </div>
          )}

          {convertDownloadURL && (
            <div className="f-download-block">
              <p className="f-preview-label">Arquivo Convertido</p>
              <a
                className="f-download-link"
                href={convertDownloadURL}
                download={`convertido.${convertTipoSaida.split("/").pop()}`}
              >
                Baixar convertido
              </a>
            </div>
          )}

          {/* canvas offscreen pro conversor */}
          <canvas
            ref={convertCanvasRef}
            style={{ display: "none" }}
          ></canvas>
        </section>

        {/* ================= ENCURTADOR ================= */}
        <section className="f-card">
          <h2 className="f-card-title">Encurtador de Link</h2>
          <p className="f-card-desc">
            Gera um link curto fake localmente (sem backend). Só pra compartilhar.
          </p>

          <label className="f-label">
            URL original:
            <input
              className="f-input-text"
              type="text"
              placeholder="https://exemplo.com/alguma/coisa"
              value={urlOriginal}
              onChange={(e) => setUrlOriginal(e.target.value)}
            />
          </label>

          <button className="f-btn" onClick={handleEncurtar}>
            Encurtar
          </button>

          {urlEncurtada && (
            <div className="f-info">
              <div>
                <strong>Original:</strong>{" "}
                <a
                  className="f-link"
                  href={urlEncurtada.original}
                  target="_blank"
                  rel="noreferrer"
                >
                  {urlEncurtada.original}
                </a>
              </div>
              <div>
                <strong>Curta:</strong>{" "}
                <a
                  className="f-link f-link-short"
                  href={urlEncurtada.original}
                  target="_blank"
                  rel="noreferrer"
                >
                  {urlEncurtada.curta}
                </a>
              </div>
            </div>
          )}
        </section>

        {/* ================= CONVERSOR DE ARQUIVOS (IMAGEM -> PDF) ================= */}
        <section className="f-card">
          <h2 className="f-card-title">Conversor de Arquivos</h2>
          <p className="f-card-desc">
            Junte várias imagens (PNG/JPG/WebP) e gere um único PDF. Tudo
            local, sem enviar nada pra servidor.
          </p>

          <label className="f-label">
            Escolher imagens:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePdfImagesChange}
              className="f-input-file"
            />
          </label>

          <button className="f-btn" onClick={gerarPDF}>
            Gerar PDF
          </button>

          {pdfImages.length > 0 && (
            <div className="f-info">
              <div>
                <strong>Imagens selecionadas:</strong>{" "}
                {pdfImages.map((f) => f.name).join(", ")}
              </div>
            </div>
          )}

          {pdfDownloadURL && (
            <div className="f-download-block">
              <p className="f-preview-label">PDF Gerado</p>
              <a
                className="f-download-link"
                href={pdfDownloadURL}
                download="imagens.pdf"
              >
                Baixar PDF
              </a>
            </div>
          )}


        </section>
      </div>
      </div>
    </div>
  );
}
