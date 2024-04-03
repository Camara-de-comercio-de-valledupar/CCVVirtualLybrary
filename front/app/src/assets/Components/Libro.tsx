export default function Libro({ nombre = "", image_url = "", doc_url = "" }) {
  const IMG_URL = "https://appccvalledupar.co/timeit/BibliotecaVirtual/imagen/";
  const URL = "https://appccvalledupar.co/timeit/BibliotecaVirtual/libros/";
  if (doc_url.includes("http")) {
    var complete_doc_url = doc_url.replace("http", "https");
  } else {
    var complete_doc_url = URL + doc_url;
  }
  if (image_url.includes("http")) {
    var complete_image_url = image_url.replace("http", "https");
  } else {
    var complete_image_url = IMG_URL + image_url;
  }

  return (
    <span className="col-3 text-center border border-primary border-2 rounded p-2 m-1">
      <a href={complete_doc_url} target="_blank">
        <img width="200px" className="foto_libro" src={complete_image_url} />
      </a>
      <h3 className="nombreLibro">{nombre}</h3>
    </span>
  );
}
