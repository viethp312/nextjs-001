import { api } from "@/lib/api";
import type { Album, GetAlbumDetailOptions, GetAlbumsOptions, UpdateAlbumsOptions } from "@/modules/albums/types";

export function getAlbums(options: GetAlbumsOptions) {
  return api
    .get<Album[]>("/albums", {
      searchParams: options.params,
    })
    .json();
}

export function getAlbumDetail(options: GetAlbumDetailOptions) {
  return api
    .get<Album>(`/albums/${options.id}`, {
      searchParams: options.params,
      cache: "force-cache",
    })
    .json();
}

export function deleteAlbum(id: number) {
  return api.delete<Album>(`/albums/${id}`).json();
}

export function updateAlbum(options: UpdateAlbumsOptions) {
  return api
    .put<Album>(`/albums/${options.id}`, {
      json: options.body,
    })
    .json();
}
