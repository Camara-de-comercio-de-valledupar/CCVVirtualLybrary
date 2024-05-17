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
