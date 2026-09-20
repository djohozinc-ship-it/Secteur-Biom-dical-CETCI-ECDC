import { useEffect, useState } from 'react';

export function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  useEffect(() => setPage(1), [items.length]);
  return { page, setPage, pages, slice: items.slice((page - 1) * perPage, page * perPage) };
}
