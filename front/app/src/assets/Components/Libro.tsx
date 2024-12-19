import { useEffect, useState } from "react";

export default function Libro({ nombre = "", image_url = "", doc_url = "" }) {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const IMG_URL = "https://appccvalledupar.co/timeit/BibliotecaVirtual/imagen/";
  const URL = "https://appccvalledupar.co/timeit/BibliotecaVirtual/libros/";
  let complete_doc_url;
  let complete_image_url;
  //------------------------------------------------------------------------------
  if (doc_url.includes("http")) {
    complete_doc_url = doc_url.replace("http", "https");
  } else {
    complete_doc_url = URL + doc_url;
  }
  if (image_url.includes("http")) {
    complete_image_url = image_url.replace("http", "https");
  } else {
    complete_image_url = IMG_URL + image_url;
  }
  // ---------------------------------------------------------------------------------
  useEffect(() => {
    setImageSrc(complete_image_url)
  }, [complete_image_url])
  //----------------------------------------------------------------------------------
  return (
    <span className="text-center borde-libro">
      <a href={complete_doc_url} target="_blank">
        <img className="foto_libro" src={imageSrc?.toString()} />
      </a>
      <h3 className="nombreLibro">{nombre}</h3>
    </span>
  );
}
