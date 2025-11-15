import React from "react";
import "../css/MovieModal.css";

export default function MovieModal({ open, onClose, videoKey, title }) {
  if (!open) return null;
  const src = videoKey ? `https://www.youtube.com/embed/${videoKey}?autoplay=1` : null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {src ? (
          <iframe
            title={title || "Trailer"}
            width="100%"
            height="480"
            src={src}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="no-video">Trailer not available</div>
        )}
      </div>
    </div>
  );
}