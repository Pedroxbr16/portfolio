import React, { useState, useRef } from "react";
import "../assets/css/Ferramentas.css";
import Navbar from "../component/Navbar";

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

// Loader preguiçoso do ffmpeg.wasm (API nova: FFmpeg + @ffmpeg/util)
let ffmpegInstance = null;
let fetchFileRef = null;

async function loadFFmpeg() {
  if (!ffmpegInstance) {
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    const { fetchFile } = await import("@ffmpeg/util");

    ffmpegInstance = new FFmpeg();
    fetchFileRef = fetchFile;

    await ffmpegInstance.load();
  }
  return { ffmpeg: ffmpegInstance, fetchFile: fetchFileRef };
}

// Loader preguiçoso do Whisper (Transformers.js)
let asrPipeline = null;

async function loadWhisper() {
  if (!asrPipeline) {
    try {
      const { pipeline } = await import("@xenova/transformers");
      asrPipeline = await pipeline(
        "automatic-speech-recognition",
        "Xenova/whisper-tiny" // pode trocar por whisper-tiny.en se quiser
      );
    } catch (err) {
      console.warn("Falha ao carregar modelo Whisper:", err);
      // erro específico pra tratar no handler
      throw new Error("WHISPER_LOAD_FAILED");
    }
  }
  return asrPipeline;
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

  // CONVERSOR DE VÍDEO / ÁUDIO
  const [mediaInputFile, setMediaInputFile] = useState(null);
  const [mediaTarget, setMediaTarget] = useState("mp3"); // formato de saída
  const [mediaDownloadURL, setMediaDownloadURL] = useState("");
  const [mediaStatus, setMediaStatus] = useState("");

  // CONVERSOR DE ARQUIVOS (IMAGENS -> PDF)
  const [pdfImages, setPdfImages] = useState([]); // File[]
  const [pdfDownloadURL, setPdfDownloadURL] = useState("");

  // TRANSCRIÇÃO DE ÁUDIO
  const [audioInputFile, setAudioInputFile] = useState(null);
  const [audioTranscript, setAudioTranscript] = useState("");
  const [audioStatus, setAudioStatus] = useState("");

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

  // ========== FUNÇÕES: CONVERSOR VÍDEO / ÁUDIO (FFmpeg API NOVA) ==========

  function handleMediaFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaInputFile(file);
    setMediaDownloadURL("");
    setMediaStatus(`Arquivo selecionado: ${file.name}`);
  }

  function getMimeFromTarget(ext) {
    switch (ext) {
      case "mp3":
        return "audio/mpeg";
      case "mp4":
        return "video/mp4";
      case "webm":
        return "video/webm";
      case "mkv":
        return "video/x-matroska";
      default:
        return "application/octet-stream";
    }
  }

  async function handleMediaConvert() {
    if (!mediaInputFile) {
      alert("Escolha um arquivo de vídeo ou áudio primeiro.");
      return;
    }

    try {
      setMediaStatus("Carregando ffmpeg (pode demorar alguns segundos)...");
      const { ffmpeg, fetchFile } = await loadFFmpeg();

      setMediaStatus("Convertendo arquivo... (não feche a aba)");

      const inputExt =
        mediaInputFile.name.split(".").pop()?.toLowerCase() || "mp4";
      const inputName = `input.${inputExt}`;
      const outputName = `output.${mediaTarget}`;

      // escreve o arquivo no FS virtual
      await ffmpeg.writeFile(inputName, await fetchFile(mediaInputFile));

      if (mediaTarget === "mp3") {
        // extrai só o áudio
        await ffmpeg.exec([
          "-i",
          inputName,
          "-vn",
          "-acodec",
          "libmp3lame",
          "-q:a",
          "2",
          outputName,
        ]);
      } else {
        // vídeo -> outro vídeo
        await ffmpeg.exec([
          "-i",
          inputName,
          "-c:v",
          "libx264",
          "-c:a",
          "aac",
          outputName,
        ]);
      }

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], {
        type: getMimeFromTarget(mediaTarget),
      });
      const url = URL.createObjectURL(blob);
      setMediaDownloadURL(url);
      setMediaStatus("Conversão concluída!");

      // limpa FS virtual
      try {
        await ffmpeg.deleteFile(inputName);
        await ffmpeg.deleteFile(outputName);
      } catch (_) {}
    } catch (err) {
      console.error(err);
      setMediaStatus("Erro na conversão. Veja o console para detalhes.");
      alert("Falha ao converter arquivo. Tente outro formato ou arquivo.");
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

    try {
      const { jsPDF } = await import("jspdf"); // lazy import

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      for (let i = 0; i < pdfImages.length; i++) {
        const file = pdfImages[i];
        const dataURL = await fileToDataURL(file);

        const imgEl = await loadImage(dataURL);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const { drawW, drawH, offsetX, offsetY } = fitContain(
          imgEl.width,
          imgEl.height,
          pageWidth,
          pageHeight
        );

        pdf.addImage(
          dataURL,
          "PNG", // aceita PNG/JPEG
          offsetX,
          offsetY,
          drawW,
          drawH
        );

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

  // ========== FUNÇÕES: TRANSCRIÇÃO DE ÁUDIO ==========

  function handleAudioFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioInputFile(file);
    setAudioTranscript("");
    setAudioStatus(`Arquivo selecionado: ${file.name}`);
  }

  async function handleTranscribeAudio() {
    if (!audioInputFile) {
      alert("Escolha um arquivo de áudio primeiro.");
      return;
    }

    try {
      setAudioStatus(
        "Carregando modelo de transcrição (pode demorar um pouco na primeira vez)..."
      );

      let transcriber;
      try {
        transcriber = await loadWhisper();
      } catch (e) {
        if (e.message === "WHISPER_LOAD_FAILED") {
          setAudioStatus(
            "Não consegui baixar o modelo de transcrição. " +
              "Provavelmente a rede está bloqueando o acesso ao Hugging Face."
          );
          alert(
            "Recurso de transcrição indisponível nesse ambiente (falha ao baixar o modelo)."
          );
          return;
        }
        throw e;
      }

      setAudioStatus("Transcrevendo áudio...");

      const url = URL.createObjectURL(audioInputFile);

      const result = await transcriber(url, {
        task: "transcribe",
        // language: "pt", // se quiser forçar português
      });

      setAudioTranscript(result.text || "");
      setAudioStatus("Transcrição concluída!");
    } catch (err) {
      console.error(err);
      setAudioStatus("Erro na transcrição.");
      alert("Falha ao transcrever áudio. Veja o console para detalhes.");
    }
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
              Reduz o tamanho do arquivo usando qualidade menor (JPEG). Ótimo
              pra mandar imagem mais leve.
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

          {/* ================= CONVERSOR DE VÍDEO / ÁUDIO ================= */}
          <section className="f-card">
            <h2 className="f-card-title">Conversor de Vídeo & Áudio (beta)</h2>
            <p className="f-card-desc">
              Converta um vídeo do seu computador para outros formatos
              (MP3, MP4, MKV, WEBM). Tudo no navegador — pode demorar um pouco
              em arquivos grandes.
            </p>

            <label className="f-label">
              Escolher arquivo de vídeo/áudio:
              <input
                type="file"
                accept="video/*,audio/*"
                onChange={handleMediaFileChange}
                className="f-input-file"
              />
            </label>

            <label className="f-label">
              Formato de saída:
              <select
                className="f-select"
                value={mediaTarget}
                onChange={(e) => setMediaTarget(e.target.value)}
              >
                <option value="mp3">MP3 (só áudio)</option>
                <option value="mp4">MP4</option>
                <option value="mkv">MKV</option>
                <option value="webm">WEBM</option>
              </select>
            </label>

            <button className="f-btn" onClick={handleMediaConvert}>
              Converter vídeo/áudio
            </button>

            {mediaStatus && (
              <p className="f-preview-label" style={{ marginTop: "8px" }}>
                {mediaStatus}
              </p>
            )}

            {mediaDownloadURL && (
              <div className="f-download-block">
                <p className="f-preview-label">Arquivo convertido</p>
                <a
                  className="f-download-link"
                  href={mediaDownloadURL}
                  download={`convertido.${mediaTarget}`}
                >
                  Baixar convertido
                </a>
              </div>
            )}
          </section>

          {/* ================= TRANSCRIÇÃO DE ÁUDIO ================= */}
          <section className="f-card">
            <h2 className="f-card-title">Transcrever Áudio (beta)</h2>
            <p className="f-card-desc">
              Envie um arquivo de áudio (MP3, WAV, etc.) e gere o texto usando
              Whisper rodando direto no navegador.
            </p>

            <label className="f-label">
              Escolher arquivo de áudio:
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                className="f-input-file"
              />
            </label>

            <button className="f-btn" onClick={handleTranscribeAudio}>
              Transcrever áudio
            </button>

            {audioStatus && (
              <p className="f-preview-label" style={{ marginTop: "8px" }}>
                {audioStatus}
              </p>
            )}

            {audioTranscript && (
              <div className="f-preview-block">
                <p className="f-preview-label">Transcrição</p>
                <textarea
                  className="f-input-text"
                  style={{ minHeight: "150px", width: "100%" }}
                  value={audioTranscript}
                  onChange={(e) => setAudioTranscript(e.target.value)}
                />
              </div>
            )}
          </section>

          {/* ================= ENCURTADOR ================= */}
          <section className="f-card">
            <h2 className="f-card-title">Encurtador de Link</h2>
            <p className="f-card-desc">
              Gera um link curto fake localmente (sem backend). Só pra
              compartilhar.
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
