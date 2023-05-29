import { useState } from "react"; // Import the useState hook from React
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from react-router-dom
import "../styles/home.css"; // Import the CSS styles

const Home = () => {
  const [inputUrl, setInputUrl] = useState(""); // Declare and initialize the inputUrl state variable using useState hook
  const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    navigate(`/${inputUrl}`); // Navigate to the specified URL path with the value of inputUrl
  };
  return (
    <div className="home">
      <div className="home-header">
        <h1>cl1ip.net - The Internet Clipboard</h1>
      </div>
      <div className="home-content-container">
        <div className="home-content">
          <p>
            Cl1iP.NET is the internet clipboard. The easiest way to send data
            between internet connected devices. Just pick any URL that start
            with cl1ip.net and put in data. Then on any other device enter in
            the same URL.
            <h3>Detailed instructions:</h3>
            <div className="instructions">
              <p>
                1. Enter in a URL that starts with cl1ip.net. Example
                cl1ip.net/uqzsserenndwl
              </p>{" "}
              <p>2. Paste in anything you want. </p>
              <p>
                3. On another computer enter the same URL and get your stuff.{" "}
              </p>{" "}
              <p>4. Have a nice day. </p>
            </div>
            <p>You can also create and view cl1ips via the API.</p>
            <br />
            <p>
              The cl1ip is destroyed as soon as it is read after the selected
              destroy time.
            </p>{" "}
          </p>
        </div>
        <div className="home-content-link">
          {/* Form for entering URL */}
          <form onSubmit={onSubmit}>
            <label>cl1ip.net/</label>
            <input
              type="text"
              value={inputUrl}
              name="inputUrl"
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <input type="submit" value="Go" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
