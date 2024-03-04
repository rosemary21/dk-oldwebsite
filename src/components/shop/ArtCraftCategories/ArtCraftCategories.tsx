import { HashLink } from 'react-router-hash-link'
import mobileView from '../../../utilities/mobileView'
import { Col, Row } from 'react-bootstrap'

export default function ArtCraftCategories() {
  return (
      <section>
          <h1 className="page-title">Select from our Amazing categories</h1>
          <span className="page-desc">
              We delight in handcrafted designs and lovely painting that will
              beautify your interiors
          </span>

          <Row xs={2} md={2} lg={2} className="art-img-card-container">
              <Col>
                  <div className="art-img-card-left">
                      <h1>HandCrafted Art Decoration</h1>
                      <div className="art-img-card-left-group">
                          <p className={mobileView() ? "w-100" : "w-50"}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                              nunc nisl eu consectetur. Mi massa elementum odio eu viverra
                              amet.
                          </p>
                          <HashLink to="/hand-craft">
                              <button className="card-btn">
                                  <i className="bx bx-right-arrow-alt" />
                              </button>
                          </HashLink>
                      </div>
                  </div>
              </Col>

              <Col>
                  <div className="art-img-card-right art-img-card-left">
                      <h1>Paintings and Drawings</h1>
                      <div className="art-img-card-left-group">
                          <p className={mobileView() ? "w-100" : "w-50"}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                              nunc nisl eu consectetur. Mi massa elementum odio eu viverra
                              amet.
                          </p>
                          <HashLink to="/wall-painting">
                              <button className="card-btn">
                                  <i className="bx bx-right-arrow-alt" />
                              </button>
                          </HashLink>
                      </div>
                  </div>
              </Col>
          </Row>
      </section>
  )
}
