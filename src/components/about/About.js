import "./About.css";
import imga from "../../assets/img/Mario and Adrian A.jpg";
import imgb from "../../assets/img/Mario and Adrian b.jpg";

const About = () => {
  return (
    <section className="about-container">
      <article className="about">
        <article className="about-text">
          <div id="text-limiter">
            <h1>Little Lemon</h1>
            <h2>Chicago</h2>
            <p>
            Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. 
            Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, 
            quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. 
            È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci 
            sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di 
            caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più 
            recentemente da software di impaginazione come Aldus PageMaker, che 
            includeva versioni del Lorem Ipsum.
            </p>
          </div>
        </article>
        <div className="about-images">
          <img id="img-a" src={imga} alt="About" />
          <img id="img-b" src={imgb} alt="About" />
        </div>
      </article>
    </section>
  );
};

export default About;
