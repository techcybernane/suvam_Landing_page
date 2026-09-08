import { useEffect, useState } from "react";
import { api } from "../lib/api.js";

export function useSiteData() {
  const [content, setContent] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [contentRes, faqsRes] = await Promise.all([
          api.get("/content"),
          api.get("/faqs"),
        ]);
        if (cancelled) return;
        setContent(contentRes.data);
        setFaqs(faqsRes.data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { content, faqs, loading, error };
}
