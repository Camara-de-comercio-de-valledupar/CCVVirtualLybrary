import { get } from "../api/http";
import { DocumentConvert, DocumentResponse } from "../models/document";

export async function fetchDocuments(data: {
  query: string;
  page: number;
  count: number;
}): Promise<DocumentResponse | undefined> {
  const res = await get("documents", {
    query: data.query,
    page: data.page,
    size: data.count,
  });
  if (res != undefined) {
    const documentResponse: DocumentResponse =
      DocumentConvert.toDocumentResponse(res);
    return documentResponse;
  }
  return undefined;
}


// Función para almacenar en caché la respuesta
export function cacheResponse(
  key: string,
  data: DocumentResponse
): void {
  const cachedData = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(key, JSON.stringify(cachedData));
}

// Función para consultar la caché
export function getCachedResponse(key: string): DocumentResponse | undefined {
  const cachedData = localStorage.getItem(key);

  if (!cachedData) return undefined;

  const parsedData = JSON.parse(cachedData) as {
    timestamp: number;
    data: DocumentResponse;
  };

  // Opcional: valida si la caché expiró (ejemplo: 5 minutos = 300000 ms)
  const CACHE_EXPIRATION_TIME = 300000;
  if (Date.now() - parsedData.timestamp > CACHE_EXPIRATION_TIME) {
    localStorage.removeItem(key); // Limpia la caché si expiró
    return undefined;
  }

  return parsedData.data;
}

// Modifica la función fetchDocuments para usar caché
export async function fetchDocumentsWithCache(data: {
  query: string;
  page: number;
  count: number;
}): Promise<DocumentResponse | undefined> {
  const cacheKey = `documents_${data.query}_${data.page}_${data.count}`;

  // Busca en la caché
  const cachedResponse = getCachedResponse(cacheKey);
  if (cachedResponse) {
    console.log("Respuesta obtenida de la caché");
    return cachedResponse;
  }

  // Si no hay caché, realiza la solicitud
  const response = await fetchDocuments(data);

  if (response) {
    cacheResponse(cacheKey, response); // Guarda en caché
  }

  return response;
}
