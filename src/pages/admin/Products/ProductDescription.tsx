/* eslint-disable react-hooks/exhaustive-deps */
// import axios from "axios"
import { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsArrowLeft, BsArrowRight, BsCamera, BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import AdminTitleBar from "../../../components/admin/Titlebar/TitleBar";
import ErrorModal from "../../../modals/Error";
import formatCurrency from "../../../utilities/FormatCurrency";
import "./Product.css";
import { useAdminContext } from "../../../contexts/AdminContext";
import { productDescriptionProps } from "../../../types/contexts";
import isString from "../../../utilities/isString";

interface SortCategoryProps {
  desc: productDescriptionProps;
}

function SortCategory({ desc }: SortCategoryProps) {
  const {
    imageUrl,
    description,
    currency,
    price,
    amount,
    productCode,
    code,
    productCategoryCode,
    multipartFile,
    productSize,
  } = desc;
  return (
    <tr>
      <td className="product-order">
        <img title="Product Description Image" src={imageUrl} alt="product" />
        <div>
          <p title="Description">{description}</p>
        </div>
      </td>
      <td className="TotalAmount" title="Currency">
        {currency}
      </td>
      <td className="TotalAmount" title="Price">
        {formatCurrency(price)}
      </td>
      <td className="TotalAmount" title="Amount">
        {formatCurrency(amount)}
      </td>
      <td className="orderID" title="Product Code">
        {productCode}
      </td>
      <td className="orderID" title="Code">
        {code}
      </td>
      <td className="orderID" title="Product Category Code">
        {productCategoryCode}
      </td>
      <td className="TotalOrder" title="Product Size">
        {productSize}
      </td>
      <td className="TotalOrder" title="Multi Part File">
        {multipartFile}
      </td>

      <td style={{ display: "flex", border: "0" }}>
        <button className="product-edit" title="Update Photo">
          <i className="bx bx-photo-album"></i>
        </button>
        <button className="product-edit" title="Update Video">
          <i className="bx bx-video-recording"></i>
        </button>
        <button className="product-edit" title="Delete Description">
          <i className="bx bx-trash" />
        </button>
      </td>
    </tr>
  );
}

export default function ProductDescription() {
  // ** Offcanvas states
  const [show, setShow] = useState(false);

  // ** FIle input states
  const [fileInput, setFileInput] = useState<File[] | undefined>([]);

  // State to capture error
  const [error, setError] = useState("");
  const [ProdCatCode, setProductCatCode] = useState<string>("");

  // ** Initiate Refs
  const descriptionRefer = useRef<null | HTMLInputElement>(null);
  const prodCodeRefer = useRef<null | HTMLInputElement>(null);
  const priceRefer = useRef<null | HTMLInputElement>(null);
  const amountRefer = useRef<null | HTMLInputElement>(null);
  const recentRefer = useRef<null | HTMLInputElement>(null);
  const locationRefer = useRef<null | HTMLInputElement>(null);
  const codeRefer = useRef<null | HTMLInputElement>(null);
  const currencyRefer = useRef<null | HTMLInputElement>(null);
  const sizeRefer = useRef<null | HTMLInputElement>(null);

  // ** Welcome context contextValues
  const {
    productImgs,
    setProductImgs,
    productDescription,
    setProductDescription,
    productCategories,
    token,
  } = useAdminContext();

  // ** Functions to toggle offcanvas on and off
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get the product category code array from the product categories
  const productCatCodeArray = productCategories.map((cat) => cat.id);

  // Get files from system
  function getFiles(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    // Select the file input
    const fileElem = document.getElementById("selectFile") as HTMLInputElement;

    if (fileElem) {
      fileElem.click();
    }
  }

  // Handle onchange to preview image before upload
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const selectedFiles: string[] = [];
    const targetFiles = e.target?.files;

    // Convert `FileList` into a `File[]`
    const targetFilesObject = targetFiles ? [...targetFiles] : null;
    setFileInput((prev) => {
      if (prev && targetFilesObject) {
        return targetFilesObject;
      }
    });

    if (targetFilesObject) {
      targetFilesObject.map((file) => {
        return selectedFiles.push(URL.createObjectURL(file));
      });
    }

    setProductImgs(selectedFiles);
  }

  // ** Get all product description response from server
  async function getAllProductDescriptions() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      pageSize: 10,
      pageNo: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `${
        import.meta.env.VITE_BASEURL
      }/api/v1/productdescription/admin/all/page`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setProductDescription(result.productDescriptionDtoList))
      .catch((error) => console.log("error", error));
  }

  // Handle submit form for add description
  async function handleAddDescription(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Get the form element
    const form = document.getElementById("addProductForm") as HTMLFormElement;
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);

    const formdata = new FormData();

    if (fileInput) {
      fileInput.forEach((img, idx) =>
        formdata.append("files", img, fileInput[idx].name)
      );
    }

    // Logic to manouvre type error
    // (Argument of type 'string | undefined' is not assignable to parameter of type 'string | Blob')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    


    formdata.append(
      "amount",
      isString(amountRefer.current?.value.toUpperCase())
    );
    formdata.append(
      "description",
      isString(descriptionRefer.current?.value.toUpperCase())
    );
    formdata.append("currency", isString(currencyRefer.current?.value.toUpperCase()));
    formdata.append("productCode", isString(prodCodeRefer.current?.value.toUpperCase()));
    formdata.append("code", isString(codeRefer.current?.value.toUpperCase()));
    formdata.append(
      "productCategoryCode",
      ProdCatCode.toString().toUpperCase()
    );
    formdata.append("productSize", isString(sizeRefer.current?.value.toUpperCase()));
    formdata.append("price", isString(priceRefer.current?.value.toUpperCase()));
    formdata.append("recent", isString(recentRefer.current?.value.toUpperCase()));
    formdata.append("location", isString(locationRefer.current?.value.toUpperCase()));

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/productdescription/upload/photo`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.responseDto.code === "dkss") {
          form.reset();
          setProductImgs([]);
        } else {
          setError(result.responseDto.message);
        }
      })
      .catch(() => setError("Cannot connect to server"));
  }

  // ** Delete a product description

  useEffect(() => {
    getAllProductDescriptions();
  }, [productDescription]);

  return (
    <main className="admin-main">
      <Sidebar active="product" />

      <div className="admin-detail">
        <AdminTitleBar />

        <div className="products-wrapper">
          <div className="products-search-sort shadow-sm">
            <button className="add-product" onClick={handleShow}>
              <i className="bx bx-plus-circle"></i>
              <p>Add Description</p>
            </button>

            <div className="search-products">
              <div className="sort-wrapper">
                <p>Display</p>
                <select id="sortCategories">
                  <option value="ALL">ALL</option>
                  <option value="SOME">SOME</option>
                  <option value="HOW">HOW</option>
                </select>
                <p>description</p>
              </div>
            </div>
          </div>

          <div className="products-table">
            <table>
              <thead>
                <tr className="header-row">
                  <th>Files</th>
                  <th>Currency</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Product Code</th>
                  <th>Code</th>
                  <th>Product Category Code</th>
                  <th>Product Size</th>
                  <th>Recent</th>
                  <th>Multi Part File</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {productDescription.map((desc) => (
                  <SortCategory key={desc.id} desc={desc} />
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

      {/* Offcanvas form for adding product category */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="addProduct-wrapper"
      >
        <Offcanvas.Header closeButton className="overflow-hidden">
          <Offcanvas.Title className="addProductTitle">
            <i className="bx bx-chevron-left bx-md" />
            <p>Add a New Description</p>
            <div></div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="addProduct-body">
          <div id="imgList" className="imgList">
            {productImgs.length < 4 && productImgs.length > 0 ? (
              productImgs.map((img, idx) => (
                <img
                  className="addImage-img"
                  key={idx}
                  src={img}
                  alt={`img-${productImgs[idx]}`}
                />
              ))
            ) : (
              <img
                className="addImage-img"
                src="/images/Admin/product-img.png"
                alt="product-img"
              />
            )}
          </div>

          <form id="addProductForm" onSubmit={handleAddDescription}>
            <div className="addProduct-name">
              <div className="admin_input_group">
                <label htmlFor="prod_description" className="overflow-hidden">
                  Description
                </label>
                <input
                  ref={descriptionRefer}
                  id="prod_description"
                  type="text"
                />
              </div>

              <div className="admin_input_group">
                <label htmlFor="prodCode" className="overflow-hidden">
                  Product Code
                </label>
                <input ref={prodCodeRefer} id="prodCode" type="text" />
              </div>

              <input
                type="file"
                id="selectFile"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                hidden
              />

              <button className="addImage-btn" onClick={getFiles}>
                <BsCamera className="addImage-icon" />
                <p>Click to upload multiple images of the product</p>
              </button>
            </div>

            <div className="addProduct-price">
              <div>
                <label htmlFor="prod_price">Price</label>
                <input ref={priceRefer} id="prod_price" type="number" />
              </div>
              <div>
                <label htmlFor="prod_amount">Amount</label>
                <input ref={amountRefer} id="prod_amount" type="number" />
              </div>
            </div>

            <div className="addProduct-price">
              <div>
                <label htmlFor="prod_recent">Recent</label>
                <input ref={recentRefer} id="prod_recent" type="text" />
              </div>
              <div>
                <label htmlFor="prod_location">Location</label>
                <input ref={locationRefer} id="prod_location" type="text" />
              </div>
            </div>

            <div className="addProduct-price">
              <div>
                <label htmlFor="prod_code">Code</label>
                <input ref={codeRefer} id="prod_code" type="text" />
              </div>
              <div className="addProduct-category">
                <label htmlFor="prod_cat_code">Product Category Code</label>
                <select
                  value={ProdCatCode}
                  onChange={(e) => setProductCatCode(e.target.value)}
                  id="prod_cat_code"
                >
                  {productCatCodeArray.map((code) => (
                    <option key={code} value={code.toString()}>{code}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="addProduct-price">
              <div>
                <label htmlFor="prod_currency">Currency</label>
                <input ref={currencyRefer} id="prod_currency" type="text" />
              </div>
              <div>
                <label htmlFor="prod_size">Size</label>
                <input ref={sizeRefer} id="prod_size" type="text" />
              </div>
            </div>

            <button className="uploadProduct overflow-hidden">
              <BsUpload /> Add Product
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
    </main>
  );
}
