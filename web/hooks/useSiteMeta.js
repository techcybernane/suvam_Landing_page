import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export function useSiteMeta() {
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/content/meta")
      .then(({ data }) => !cancelled && setMeta(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  return { meta, error };
}
