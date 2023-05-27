import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClipPanel = () => {
  const { url } = useParams();
  const [content, setContent] = useState("");
  const [clipTimeOut, setclipTimeOut] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const fetchClip = async () => {
      await axios
        .get(`http://localhost:8000/${url}`)
        .then((response) => {
          // This code will be executed in case of already existing content on the URL
          setContent(response.data.content);
          setShowContent(true);
        })
        .catch((error) => {
          setShowContent(false);
        });
    };

    fetchClip();
  }, [url]);

  const handleCreateClick = async () => {
    const userData = {
      urlExtension: url,
      content: content,
      expiresIn: clipTimeOut,
    };
    axios
      .post(`http://localhost:8000/${url}`, userData)
      .then((response) => setShowLink(true));
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="clip-panel">
      {showLink ? (
        <h1 className="clip-panel__title">cl1ip.net/{url}</h1>
      ) : showContent ? (
        <>
          <h1 className="clip-panel__title">cl1ip.net/{url}</h1>
          <button onClick={handleCopyClick}>Copy</button>
          <p className="clip-panel__message">{content}</p>
        </>
      ) : (
        <>
          <h1 className="clip-panel__title">cl1p.net/{url}</h1>
          <button onClick={handleCreateClick} className="clip-panel__button">
            Create cl1p
          </button>
          <select
            onChange={(e) => {
              setclipTimeOut(e.target.value);
              console.log(e);
              console.log(clipTimeOut);
            }}
          >
            <option value="1">Destroy Clip in 1 minute</option>
            <option value="30">Destroy clip in 30 minutes</option>
            <option value="45">Destroy clip in 45 minutes</option>
          </select>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content..."
            className="clip-panel__textarea"
          />
        </>
      )}
    </div>
  );
};

export default ClipPanel;
