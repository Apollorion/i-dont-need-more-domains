import './App.css';
import github from "./github.png";
const images = importAllImages(require.context('./memes', false, /\.(png|jpe?g|svg)$/));
const domainDetails = getDomainDetails();
console.log(domainDetails);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={getImage()} className="App-logo" alt="meme" />
        <div>
          {Object.keys(images).map((image, index) => {
              return <span className={"link"} key={index}><a href={`http://${image}.${domainDetails.tld}.io`}>{image}</a> {index === Object.keys(images).length -1 ? "" : " | "} </span>
          })}
        </div>
          <br/>
          <a href={"https://github.com/Apollorion/i-dont-need-more-domains"}><img src={github} /></a>
      </header>
    </div>
  );
}

function getDomainDetails(){
    const domain = window.location.host.split(".");
    console.log(domain);
    return {
        "subdomain": domain.length > 2 && domain[0] !== "www" ? domain[0] : "root",
        "tld": domain.length > 2 ? domain[1] : domain[0]
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
        rv[keys[i]] = values[i].default;
    }
    return rv;
}

export default App;
