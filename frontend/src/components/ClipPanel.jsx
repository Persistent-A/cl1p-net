import { useState, useEffect } from "react";
import {
  useParams,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import axios from "axios";
import "../styles/clipPanel.css";
const ClipPanel = () => {
  const { url } = useParams();
  const [clipExpire, setClipExpire] = useState();
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
          setClipExpire(new Date(response.data.expiresAt));
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

  const calculateRemainingTime = () => {
    if (!clipExpire) return 0;
    const remainingTime = clipExpire.getTime() - Date.now();
    const remainingMinutes = Math.ceil(remainingTime / 60000);
    return remainingMinutes;
  };

  return (
    <div className="clip-panel-container">
      <div className="clip-panel">
        {showLink ? (
          <>
            <Link to="http://localhost:3000/">
              <h4 className="clip-panel-title">
                cl1p.net-The internet clipboard
              </h4>
            </Link>
            <p>The cl1p has been created.</p>
            <p className="clip-panel-title">
              On any other computer or smart-phone enter in
              http://localhost:3000/{url} to get your stuff.
            </p>
          </>
        ) : showContent ? (
          <>
            <Link to="http://localhost:3000/">
              <h4 className="clip-panel-title">
                cl1p.net-The internet clipboard
              </h4>
            </Link>
            <p>
              Here is your stuff. This cl1p will be deleted in{" "}
              {calculateRemainingTime()} minutes. Thanks for using cl1p. Tell
              your friends! <button onClick={handleCopyClick}>Copy</button>
            </p>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="clip-panel-textarea"
              rows={27}
              cols={113}
            />
          </>
        ) : (
          <div>
            <Link to="http://localhost:3000/">
              <h4 className="clip-panel-title">
                cl1p.net-The internet clipboard
              </h4>
            </Link>

            <p>Paste in anything you want</p>

            <button onClick={handleCreateClick} className="clip-panel-button">
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
              className="clip-panel-textarea"
              rows={28}
              cols={113}
            />
            <div>
              <button onClick={handleCreateClick} className="clip-panel-button">
                Create cl1p
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClipPanel;
