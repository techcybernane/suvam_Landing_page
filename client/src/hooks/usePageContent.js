import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export function usePageContent(slug) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPage(null);
    setError(null);

    api
      .get(`/content/pages/${slug}`)
      .then(({ data }) => !cancelled && setPage(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { page, loading, error };
}
