import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, Copy, Check } from "lucide-react";
import { api } from "../../lib/api.js";

export default function MediaLibrary() {
  const [items, setItems] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const fileRef = useRef(null);

  const load = () => api.get("/media").then(({ data }) => setItems(data));

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      await api.post("/media", formData, { headers: { "Content-Type": "multipart/form-data" } });
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this file? This can't be undone.")) return;
    await api.delete(`/media/${id}`);
    load();
  };

  const copyUrl = (item) => {
    navigator.clipboard.writeText(window.location.origin + item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Media Library</h1>
          <p className="mt-1 text-sm text-ink-soft">Upload and manage images used across the site.</p>
        </div>
        <label className="btn-primary cursor-pointer">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Image"}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onUpload} disabled={uploading} />
        </label>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

      {items.length === 0 ? (
        <div className="admin-card mt-8 flex flex-col items-center justify-center gap-2 py-16 text-center">
          <Upload className="h-8 w-8 text-ink-soft" />
          <p className="text-sm font-medium text-ink">No media uploaded yet</p>
          <p className="text-xs text-ink-soft">PNG, JPG, WEBP, GIF or SVG — up to 8MB.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
              <div className="aspect-square bg-cream">
                <img src={item.url} alt={item.alt} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-medium text-ink" title={item.originalName}>
                  {item.originalName}
                </p>
                <p className="text-[11px] text-ink-soft">{(item.size / 1024).toFixed(0)} KB</p>
                <div className="mt-2 flex gap-1.5">
                  <button
                    onClick={() => copyUrl(item)}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-line py-1.5 text-[11px] font-semibold text-ink-soft hover:bg-cream"
                  >
                    {copiedId === item.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedId === item.id ? "Copied" : "Copy URL"}
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded-lg border border-line p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
