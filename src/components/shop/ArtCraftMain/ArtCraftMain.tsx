
export default function ArtCraftMain() {
  return (
      <main className="artCraft-main" id="main">
          <div className="art-main-left">
              <h1>
                  Find the best High
                  <br /> Quality outfit in one tap
              </h1>
              <span>
                  We have a wide range of products that serves various Demographic
                  <br /> groups and markets. Our product Range are Trendy and always
                  On point
              </span>
              <form id="art-work-search-form" className="rounded">
                  <div>
                      <i className="bx bx-search form-search-icon" />
                      <input
                          type="text"
                          placeholder="Try joggers, Polo, T-shirts etc..."
                          className="art-work-search-input"
                      />
                  </div>
                  <button>SEARCH NOW</button>
              </form>
          </div>

          <div className="art-main-right">
              <div className="art-main-right-img">
                  <img src="/images/beetle-king.png" alt="beetle-img" />
              </div>
              <h2>Beetle King Art Work</h2>
              <span>
                  Lorem ipsum dolor sit amet, consectetur
                  <br />
                  adipiscing elit. Erat eget etiam.
              </span>
              <button>Buy Now</button>
          </div>
      </main>
  )
}
