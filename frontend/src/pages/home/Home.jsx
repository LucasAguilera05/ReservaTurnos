import { Button, Col, Form, Row } from "react-bootstrap";
import "./Home.css";
import home from "../../assets/home.png";
import logo from "../../assets/logo1.png";
import FormLogin from "./FormLogin";

const Home = () => {
  return (
    <>
      <div className="container-fluid">
        <article id="contenedorPadre" >
          <div id="cajaRoja" >
           <FormLogin></FormLogin>
          </div>
        </article>
        <Row>
          <Col xs={12} lg={6}>
            {" "}
            <div className="parrafo">
              <div>
                <h1 className="tituloHome display-2 text-center text-light parrafo">
                  Bienvenidos a SGC
                </h1>
                <h2 className="text-center text-light tituloSecundario parrafo">
                  Sistema de Gestión de Citas
                </h2>
                <h3 className="text-center text-light tituloSecundario parrafo">
                  Grupo 1 - Diseño de Sistemas 2024
                </h3>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6} className="bgRosa">
            <div>
              <h1 className="tituloHome display-2 text-center text-light parrafo">
                Bienvenidos a SGE
              </h1>
              <h2 className="text-center text-light tituloSecundario parrafo">
                Sistema de Gestión de Citas
              </h2>
              <h5 className="text-center text-light tituloSecundario parrafo mt-4">
              Grupo 1 - Diseño de Sistemas 2024
              </h5>
            </div>
            <div id="caja-2">
              <h4 className="novedades mb-3">
                &copy; Todos los derechos <br /> reservados <br />
              </h4>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Home;
