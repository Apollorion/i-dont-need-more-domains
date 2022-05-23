import './App.css';
import github from "./github.png";
const domainDetails = getDomainDetails();

//TODO: this is a hacky work around because require.context is not available in jest. We should do this differently. Works for now though....
const images = process.env.ENVIRONMENT !== "test" ? importAllImages(require.context('./memes', false, /\.(png|jpe?g|svg)$/)) : {};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={getImage()} className="App-logo" alt="meme" />
        <div>
          {Object.keys(images).map((image, index) => {
              return <span className={"link"} key={index}><a href={`https://${image}.${domainDetails.tld}`}>{image}</a> {index === Object.keys(images).length -1 ? "" : " | "} </span>
          })}
        </div>
          <br/>
          <a href={"https://github.com/Apollorion/i-dont-need-more-domains"}><img src={github} alt={"github"} /></a>
      </header>
    </div>
  );
}

function getDomainDetails(){
    const domain = window.location.host.split(".");

    let subdomain = "root";
    if(domain.length > 2 && domain[0] !== "www" && domain[0] !== "stage"){
        subdomain = domain[0];
    }

    return {
        "subdomain": subdomain,
        "tld": process.env.REACT_APP_TLD ? process.env.REACT_APP_TLD : "i-dont-need-more-domains-dev.io:3000"
    };
}

// Determines which image to show based off subdomain.
function getImage(){
    if(domainDetails.subdomain !== "root" && domainDetails.subdomain !== "www"){
        // Show current subdomains image
        return images[domainDetails.subdomain];
    } else {
        // Get a random image
        return images[Object.keys(images)[Math.floor(Math.random() * Object.keys(images).length)]];
    }
}

// Creates an object with all the image names as their keys.
function importAllImages(r) {
    let keys = r.keys().map(x => x.split(".")[1].substring(1));
    let values = r.keys().map(r);

    let rv = {};
    for(let i in keys){
        rv[keys[i]] = values[i];
    }
    return rv;
}

export default App;
