import "../../../pages/store/Fashion(Men)/Fashion.css"

export default function FashionMain() {
  return (
      <main className="main">
          <h1>
              Find the best High <br />
              Quality outfit in one tap
          </h1>
          <span>
              We have a wide range of products that serves various Demographic{" "}
              <br />
              groups and markets. Our product Range are Trendy and always On point
          </span>

          <form id="fashion-main-search-form" className="shadow-sm rounded">
              <div>
                  <i className="bx bx-search form-search-icon" />
                  <input
                      type="search"
                      placeholder="Try joggers, Polo, T-shirts etc..."
                      className="search-input"
                  />
              </div>
              <button>Search now</button>
          </form>
          <div className="fashion-achievements">
              <span>
                  <h1>38,942</h1>
                  Order Delivered
              </span>
              <span>
                  <h1>14,344</h1>
                  Registered Customers
              </span>
          </div>
      </main>
  )
}
