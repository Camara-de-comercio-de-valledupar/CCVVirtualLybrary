import { useEffect, useState } from "react";
import "./App.css";
import Barra from "./assets/Components/Barra";
import BarraTitulo from "./assets/Components/BarraTitulo";
import Buscador from "./assets/Components/Buscador";
import Libro from "./assets/Components/Libro";
import ListaNumeros from "./assets/Components/Paginacion";
import { SubcategoryResponse } from "./models/category";
import { DocumentModel } from "./models/document";
import { fetchDocumentsWithCache } from "./services/documentService";

function App() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [docs, setDocs] = useState<DocumentModel[]>([]);
  const [pages, setPages] = useState(1);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState<
    SubcategoryResponse | undefined
  >();
  const [totalDocs, setTotalDocs] = useState<DocumentModel[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  // --------------------------------------------------------------

  // --------------------------------------------------------------
  const getDocuments = async () => {
    const res = await fetchDocumentsWithCache({
      count: 12,
      page: paginaActual,
      query: busqueda,
    });

    if (res != undefined) {
      setDocs(res.items);
      setPages(res.pages);
    }
  };

  const getAllDocuments = async () => {
    let n = 1;
    let total: DocumentModel[] = [];

    const res = await fetchDocumentsWithCache({
      count: 50,
      page: n,
      query: busqueda,
    });

    if (res != undefined) {
      const paginas = res.pages;
      total = total.concat(res.items);
      while (n < paginas) {
        n = n + 1;
        const res2 = await fetchDocumentsWithCache({
          count: 50,
          page: n,
          query: busqueda,
        });
        if (res2 != undefined) total = total.concat(res2.items);
      }
    }
    if (res != undefined) {
      console.log(total);
      setPages(Math.ceil(total.length / 16));
      setTotalDocs(total);
    }
  };

  useEffect(() => {
    setPaginaActual(1);
    getDocuments();
  }, [busqueda]);

  useEffect(() => {
    if (subcategoriaSeleccionada == undefined) {
      getDocuments();
    }
  }, [paginaActual]);

  useEffect(() => {
    getDocuments();
    getAllDocuments();
  }, []);

  const changeBusqueda = (busqueda: string) => {
    setBusqueda(busqueda);
  };

  const changeSubcategory = (subcategoria: SubcategoryResponse | undefined) => {
    setSubcategoriaSeleccionada(subcategoria);
  };

  const changePaginaActual = (actualPage: number) => {
    setPaginaActual(actualPage);
  };

  const capitalizar = (frase: string | undefined) => {
    let nuevaPalabra = "";
    let nuevaFrase = "";
    if (frase != undefined) {
      frase = frase.toLowerCase();
      const palabras = frase.split(" ");
      palabras.map((palabra) => {
        const letras = palabra.split("");
        letras[0] && letras[0].toUpperCase();
        for (let i = 0; i < palabra.length; i++) {
          nuevaPalabra = nuevaPalabra + letras[i];
        }
        nuevaFrase = nuevaFrase + nuevaPalabra + " ";
        nuevaPalabra = "";
      });
    }
    return nuevaFrase;
  };
  // --------------------------------------------------------------
  return (
    <div className="">
      <BarraTitulo />
      <Buscador sendBusqueda={changeBusqueda} />
      <Barra sendSubcat={changeSubcategory} capitalizar={capitalizar} />

      <div className="text-center fs-5 container p-3">
        En la Biblioteca Virtual de la Cámara de Comercio de Valledupar para el
        Valle del río Cesar puede encontrar material especializado de libre
        acceso y gratuito.
      </div>
      <div className="container d-flex flex-wrap justify-content-around pb-5">
        {subcategoriaSeleccionada
          ? totalDocs
            .filter(
              (doc: DocumentModel) =>
                doc.subcategory.id == subcategoriaSeleccionada.id
            )
            .map((e: DocumentModel, i: number) => (
              <Libro
                key={i}
                nombre={capitalizar(e.title)}
                doc_url={e.pdf}
                image_url={e.image}
              />
            ))
          : docs.map((e: DocumentModel, i: number) => (
            <Libro
              key={i}
              nombre={capitalizar(e.title)}
              doc_url={e.pdf}
              image_url={e.image}
            />
          ))}
      </div>
      <nav aria-label="Page navigation example">
        {subcategoriaSeleccionada ? (
          <p></p>
        ) : (
          <ListaNumeros
            cantidad={pages}
            paginaActual={paginaActual}
            cambiarPagina={changePaginaActual}
          />
        )}
      </nav>
    </div>
  );
}

export default App;
