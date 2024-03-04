/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight, BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import AdminTitleBar from "../../../components/admin/Titlebar/TitleBar";
import { useAdminContext } from "../../../contexts/AdminContext";
import { stockProps } from "../../../types/contexts";
import "./stock.css";
import ErrorModal from "../../../modals/Error";
import Spinner from "../../../utilities/Spinner";

type StockCardProps = {
  stockObj: stockProps;
  handleUpdateShow: (id: string) => void;
};

const StockCard = ({ stockObj, handleUpdateShow }: StockCardProps) => {
  // Destructure values of stock
  const {
    productType,
    productDescription,
    productDescriptionCode,
    productCategoryCode,
    quantity,
    stockStatus,
    stockCode,
    dateTimeStock
  } = stockObj;
  return (
    <tr>
      <td title="Product Type">{productType}</td>
      <td title="Product Description">{productDescription}</td>
      <td title="Product Description Code">{productDescriptionCode}</td>
      <td title="Product Category Code">{productCategoryCode}</td>
      <td title="Quantity">{quantity}</td>
      <td title="Stock Status">{stockStatus}</td>
      <td title="Stock Code">{stockCode}</td>
      <td title="Date Time Stock">{dateTimeStock}</td>
      <td style={{ display: "flex", border: "0" }}>
        <button
          onClick={() => handleUpdateShow(stockCode)}
          className="product-edit"
          title="Update Stock"
        >
          <i className="bx bx-edit-alt" />
        </button>
        <button className="product-edit" title="Delete Stock">
          <i className="bx bx-trash" />
        </button>
      </td>
    </tr>
  );
};

const AdminStock = () => {
  // ** Offcanvas states
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  // State to capture loading spinner
  const [isLoading, setIsLoading] = useState(false);

  // State to capture error
  const [error, setError] = useState("");

  const [productCode, setProductCode] = useState("");
  const [productDescriptionRefer, setProductDescriptionRefer] = useState("");
  const [productDescriptionCodeRefer, setProductDescriptionCodeRefer] =
    useState("");
  const [productTypeRefer, setProductTypeRefer] = useState("");

  // Update stock ID state
  const [updateID, setUpdateID] = useState("");
  const [updateProdDesc, setUpdateProdDesc] = useState("");
  const [updateProdDescCode, setUpdateProdDescCode] = useState("");
  const [updateProdType, setUpdateProdType] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  // Initiate refs to get values
  const productCodeRefer = useRef<null | HTMLInputElement>(null);
  const quantityRefer = useRef<null | HTMLInputElement>(null);

  const updateQuantityRefer = useRef<null | HTMLInputElement>(null);

  // Welcome context values
  const { stockList, setStockList, productDescription, token } =
    useAdminContext();

  // ** Functions to toggle offcanvas on and off
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = (id: string) => {
    setUpdateShow(true);
    const stockObj = stockList.filter((list) => list.stockCode === id)[0];
    setUpdateID(id);
    setUpdateProdDesc(stockObj.productDescription);
    setUpdateProdDescCode(stockObj.productDescriptionCode);
    setUpdateProdType(stockObj.productType);
    setQuantity(stockObj.quantity);
    return;
  };

  // Fetch the product code
  const productCodeArray = productDescription.map((desc) => desc.productCode);

  // ================ GET ALL PRODUCT STOCK =====================
  async function getAllProductStock() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      pageSize: 100,
      pageNo: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/stock/all/page`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setStockList(result.stockDtoList))
      .catch(() => setError("Cannot connect to server"));
  }

  // Get values from product code to add Stock
  // Product code onchange handler function
  const handleAddStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCode(e.target.value);

    // Get the value of the product code
    const productCodeValue =
      typeof productCodeRefer.current?.value == "string" &&
      productCodeRefer.current.value;

    function getProductCodeStringVal() {
      if (productCodeValue) {
        return productCodeValue;
      }
    }

    const prod = productDescription.filter(
      (desc) =>
        desc.productCode.toLowerCase() ===
        getProductCodeStringVal()?.toLowerCase()
    )[0];

    setProductDescriptionRefer(prod.description);
    setProductDescriptionCodeRefer(prod.code);
    setProductTypeRefer("clothings");
  };

  // Add stock handler function
  const handleAddStock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");
    const form = document.getElementById("addStockForm") as HTMLFormElement;
    const raw = JSON.stringify({
      productDescriptionCode: productDescriptionCodeRefer,
      quantity: Number(quantityRefer.current?.value),
      productDescription: productDescriptionRefer,
      productCode: productCodeRefer.current?.value,
      productType: productTypeRefer,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    // Set is loading to true
    setIsLoading(true);

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/stock/add`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.responseDto.code === "dkss") {
          setIsLoading(false);
          form.reset();
        }
      })
      .catch(() => setError("Cannot connect to server"));
  };

  // Update Stock handler function
  const handleUpdateStock = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = document.getElementById("updateStockForm") as HTMLFormElement;
    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      productDescriptionCode: updateProdDescCode,
      quantity: quantity,
      productDescription: updateProdDesc,
      productType: updateProdType,
      stockCode: updateID,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/stock/update`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.responseDto.code === "dkss") {
          setIsLoading(false);
          form?.reset();
          handleUpdateClose();
        } else {
          setIsLoading(false);
          setError(result.responseDto.message);
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError("cannot connect to server");
      });
  };

  useEffect(() => {
    getAllProductStock();
  }, [stockList]);

  return (
    <main className="admin-main">
      '
      <Sidebar active="stock" />
      <div className="admin-detail">
        <AdminTitleBar />

        <div className="products-container">
          <div className="products-search-sort">
            <button className="add-product" onClick={handleShow}>
              <i className="bx bx-plus-circle"></i>
              <p>Add Stock</p>
            </button>

            <div className="search-products">
              <div className="sort-wrapper">
                <p>Display</p>
                <select id="sortCategories">
                  <option value="ALL">ALL</option>
                  <option value="WALL">WALL</option>
                  <option value="FASHION">FASHION</option>
                  <option value="KIDS">KIDS</option>
                  <option value="DREAM">DREAM</option>
                </select>
                <p>stock</p>
              </div>
            </div>
          </div>

          <div className="products-table">
            <table>
              <thead>
                <tr className="header-row">
                  <th style={{ fontSize: "12px" }}>Product Type</th>
                  <th style={{ fontSize: "12px" }}>Product Description</th>
                  <th style={{ fontSize: "12px" }}>Product Description Code</th>
                  <th style={{ fontSize: "12px" }}>Product Category Code</th>
                  <th style={{ fontSize: "12px" }}>Quantity</th>
                  <th style={{ fontSize: "12px" }}>Stock Status</th>
                  <th style={{ fontSize: "12px" }}>Stock Code</th>
                  <th style={{ fontSize: "12px" }}>Date</th>
                  <th style={{ fontSize: "12px" }}></th>
                </tr>
              </thead>

              <tbody className="stock-table-body">
                {stockList.map((stock) => (
                  <StockCard
                    key={stock.id}
                    stockObj={stock}
                    handleUpdateShow={handleUpdateShow}
                  />
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <Link to="#">
                <BsArrowRight /> Previous
              </Link>
              <Link to="#">1</Link>
              <Link to="#" className="active">
                2
              </Link>
              <Link to="#">3</Link>
              <Link to="#">4</Link>
              <Link to="#">5</Link>
              <Link to="#">6</Link>
              <Link to="#">7</Link>
              <Link to="#">8</Link>
              <Link to="#">9</Link>
              <Link to="#">10</Link>
              <Link to="#">
                Next <BsArrowLeft />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Offcanvas form for adding stock*/}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="addProduct-wrapper"
      >
        <Offcanvas.Header closeButton className="overflow-hidden">
          <Offcanvas.Title className="addProductTitle">
            <i className="bx bx-chevron-left bx-md" />
            <p>Add a New Stock</p>
            <div></div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="addProduct-body">
          <form id="addStockForm" onSubmit={handleAddStock}>
            <div className="addProduct-price">
              <div className="addProduct-category">
                <label htmlFor="stock_prod_cat_code">Product Code</label>
                <select
                  value={productCode}
                  id="stock_prod_cat_code"
                  onChange={(e) => {
                    setProductCode(e.target.value);
                  }}
                >
                  {productCodeArray.map((code, idx) => (
                    <option key={idx}>{code}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="stock_description_code"
                  className="overflow-hidden"
                >
                  Product Description Code
                </label>
                <input
                  value={productDescriptionCodeRefer}
                  onChange={(e) =>
                    setProductDescriptionCodeRefer(e.target.value)
                  }
                  id="stock_description_code"
                  type="text"
                  disabled
                />
              </div>
            </div>

            <div className="addProduct-price">
              <div>
                <label htmlFor="stock_description">Product Description</label>
                <input
                  value={productDescriptionRefer}
                  onChange={(e) => setProductDescriptionRefer(e.target.value)}
                  id="stock_description"
                  type="text"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="stock_type">Product Type</label>
                <input
                  value={productTypeRefer}
                  onChange={(e) => setProductDescriptionRefer(e.target.value)}
                  id="stock_type"
                  type="text"
                />
              </div>
            </div>

            <div className="addProduct-name">
              <div className="admin_input_group">
                <label htmlFor="stock_quantity">Quantity</label>
                <input
                  ref={quantityRefer}
                  id="stock_quantity"
                  type="number"
                />
              </div>
            </div>

            <button className="uploadProduct overflow-hidden">
              <BsUpload /> Add Stock
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      {/* Offcanvas form for updating stock */}
      <Offcanvas
        show={updateShow}
        onHide={handleUpdateClose}
        placement="end"
        className="addProduct-wrapper"
      >
        <Offcanvas.Header closeButton className="overflow-hidden">
          <Offcanvas.Title className="addProductTitle">
            <i className="bx bx-chevron-left bx-md" />
            <p>Update existing Stock</p>
            <div></div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="addProduct-body">
          <form id="updateStockForm" onSubmit={handleUpdateStock}>
            <div className="addProduct-price">
              <div className="addProduct-category">
                <label htmlFor="update_stock_prod_cat_code">Stock Code</label>
                <input
                  id="update_stock_prod_cat_code"
                  type="text"
                  value={updateID}
                  onChange={handleAddStockChange}
                  disabled
                />
              </div>

              <div>
                <label
                  htmlFor="update_stock_description_code"
                  className="overflow-hidden"
                >
                  Product Description Code
                </label>
                <input
                  id="update_stock_description_code"
                  value={updateProdDescCode}
                  onChange={(e) => setUpdateProdDescCode(e.target.value)}
                  type="text"
                  disabled
                />
              </div>
            </div>

            <div className="addProduct-price">
              <div>
                <label htmlFor="update_stock_description">
                  Product Description
                </label>
                <input
                  id="update_stock_description"
                  value={updateProdDesc}
                  onChange={(e) => setUpdateProdDesc(e.target.value)}
                  type="text"
                  disabled
                />
              </div>

              <div>
                <label htmlFor="update_stock_type">Product Type</label>
                <input
                  value={updateProdType}
                  onChange={(e) => setUpdateProdType(e.target.value)}
                  id="update_stock_type"
                  type="text"
                />
              </div>
            </div>

            <div className="addProduct-name">
              <div className="admin_input_group">
                <label htmlFor="update_stock_quantity">Quantity</label>
                <input
                  ref={updateQuantityRefer}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  id="update_stock_quantity"
                  type="number"
                />
              </div>
            </div>

            <button type="submit" className="uploadProduct overflow-hidden">
              <BsUpload /> Update Stock
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
      {isLoading && <Spinner animationType="grow" />}
    </main>
  );
};

export default AdminStock;
