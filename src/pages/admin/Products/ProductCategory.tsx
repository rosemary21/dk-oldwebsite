/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsArrowLeft, BsArrowRight, BsUpload } from "react-icons/bs";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import AdminTitleBar from "../../../components/admin/Titlebar/TitleBar";
import {useAdminContext } from "../../../contexts/AdminContext";
import ErrorModal from "../../../modals/Error";
import { productCategoryProps } from "../../../types/contexts";
import Spinner from "../../../utilities/Spinner";
import "./Product.css";

interface SortCategoryProps {
  cat: productCategoryProps;
  deleteProductCategory: (id: number) => void;
  updateHandleShow: (id: string) => void;
}

function SortCategory({
  cat,
  deleteProductCategory,
  updateHandleShow,
}: SortCategoryProps) {
  return (
    <tr>
      <td title="Category" className="orderID">
        {cat.category}
      </td>
      <td title="Code" className="Price">
        {cat.code}
      </td>
      <td title="Product Code" className="TotalOrder">
        {cat.productCode}
      </td>
      <td>
        <button
          title="Edit Button"
          className="product-edit"
          onClick={() => updateHandleShow(cat.code)}
        >
          <i className="bx bx-edit-alt" />
        </button>{" "}
        <button
          title="Delete Button"
          className="product-edit"
          onClick={() => deleteProductCategory(cat.id)}
        >
          <i className="bx bx-trash" />
        </button>
      </td>
    </tr>
  );
}

export default function ProductCategory() {
  // ** States
  // ** Offcanvas states
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);

  // Product category sort state
  const [selectValue, setSelectValue] = useState("ALL");

  // Add product category error state
  const [codeError, setCodeError] = useState("");
  const [productCodeError, setProductCodeError] = useState("");

  // Update product category error state
  const [updateProductCodeError, setUpdateProductCodeError] = useState("");

  // Update product category ID state
  const [updateID, setUpdateID] = useState("");

  // State for login progress spinner
  const [isLoading, setIsLoading] = useState(false);

  // State for error
  const [Error, setError] = useState("");

  // Import values from admin context
  const { token, productCategories, setProductCategories } =
    useAdminContext();

  // Filter all product categories array according to selectValue
  const filteredProdCat =
    productCategories.length === 0
      ? null
      : productCategories.filter((cat) => cat.category === selectValue);

  // Get the unique categories
  const categoryArray = Array.from(
    new Set(productCategories.map((cat) => cat.category))
  );

  // ** initiate userefs
  const codeRef = useRef<null | HTMLInputElement>(null);
  const categoryRef = useRef<null | HTMLInputElement>(null);
  const productCodeRef = useRef<null | HTMLInputElement>(null);
  const updateCategoryRef = useRef<null | HTMLInputElement>(null);
  const updateProductCodeRef = useRef<null | HTMLInputElement>(null);

  // ** Functions to toggle offcanvas on and off
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateHandleClose = () => setUpdateShow(false);
  const updateHandleShow = (id: string) => {
    setUpdateID(id);
    setUpdateShow(true);
  };

  // ** Get all product category
  async function getProductCategories() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/productcategorycode/all`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setProductCategories(result.productCategoryDtoList))
      .catch(() => console.log("error"));
  }

  // ** Add product category
  async function addProductcategory(e: React.FormEvent<HTMLFormElement>) {
    // ** Prevent browser from refreshing
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // ** Get the form id
    const form = document.querySelector(
      "#addProductCategoryForm"
    ) as HTMLFormElement;

    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      category: categoryRef.current?.value.toUpperCase(),
      code: codeRef.current?.value.toUpperCase(),
      productCode: productCodeRef.current?.value.toUpperCase(),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/productcategorycode/add`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.responseDto.code === "dkss") {
          setIsLoading(false);
          const arr: productCategoryProps[] = [];
          arr.unshift(JSON.parse(raw));
          setProductCategories(arr);
          setCodeError("");
          setProductCodeError("");
          form.reset();
        } else if (
          result.responseDto.message.toLowerCase() ===
          "Product Category Already Exist".toLowerCase()
        ) {
          setIsLoading(false);
          setCodeError(result.responseDto.message);
        } else if (
          result.responseDto.message.toLowerCase() ===
          "Product Code Does Not Exist".toLowerCase()
        ) {
          setIsLoading(false);
          setProductCodeError(result.responseDto.message);
        } else {
          setIsLoading(false);
          setError(result.responseDto.message);
          setCodeError("");
          setProductCodeError("");
        }
      })
      .catch(() => setError("Cannot connect to server"));
  }

  // ** Delete product category
  async function deleteProductCategory(id: number) {
    // try {
    //     const prodDescToBeDeleted = productCategories.filter(cat => cat.id === id)[0]

    //     const myHeaders = new Headers();
    //     myHeaders.append("apiKey", apiKey);
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "category": prodDescToBeDeleted.category,
    //         "code": prodDescToBeDeleted.code,
    //         "productCode": prodDescToBeDeleted.productCode
    //     });

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     fetch(`${baseUrl}/api/v1/productcategorycode/delete`, requestOptions)
    //         .then(response => response.json())
    //         .then(result => console.log(result))
    //         .catch(error => console.log('error', error));
    // } catch (error) {
    //     console.log("cannot conect to server")
    // }

    console.log(id);
  }

  // ** Update product Category
  async function updateProductCategory(e: React.FormEvent<HTMLFormElement>) {
    // ** Prevent browser from refreshing
    e.preventDefault();
    setError("");

    // ** Get the form id
    const form = document.querySelector(
      "#updateProductCategoryForm"
    ) as HTMLFormElement;

    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      category: updateCategoryRef.current?.value.toUpperCase(),
      code: updateID.toUpperCase(),
      productCode: updateProductCodeRef.current?.value.toUpperCase(),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/productcategorycode/update`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.responseDto.code === "dkss") {
          setUpdateProductCodeError("");
          form.reset();
          updateHandleClose();
        } else if (
          result.responseDto.message.toLowerCase() ===
          "Product Code Does Not Exist".toLowerCase()
        ) {
          setUpdateProductCodeError(result.responseDto.message);
        } else {
          setError(result.responseDto.message);
          setUpdateProductCodeError("");
        }
      })
      .catch(() => setError("Cannot connect to server"));
  }

  useEffect(() => {
    getProductCategories();
  }, [productCategories]);
  return (
    <main className="admin-main">
      <Sidebar active="product" />

      <div className="admin-detail">
        <AdminTitleBar />

        <div className="products-wrapper">
          <div className="products-search-sort shadow-sm">
            <button className="add-product" onClick={handleShow}>
              <i className="bx bx-plus-circle"></i>
              <p>Add Categories</p>
            </button>

            <div className="search-products">
              <div className="sort-wrapper">
                <p>Display</p>
                <select
                  id="sortCategories"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                >
                  <option value="ALL">ALL</option>
                  {categoryArray.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <p>categories</p>
              </div>
            </div>
          </div>

          <div className="products-table">
            <table>
              <thead>
                <tr className="header-row">
                  <th>Category</th>
                  <th>Code</th>
                  <th>Product Code</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {selectValue.toLowerCase() === "all"
                  ? productCategories.map((cat, idx) => (
                      <SortCategory
                        key={idx}
                        cat={cat}
                        deleteProductCategory={deleteProductCategory}
                        updateHandleShow={updateHandleShow}
                      />
                    ))
                  : filteredProdCat?.map((cat, idx) => (
                      <SortCategory
                        key={idx}
                        cat={cat}
                        deleteProductCategory={deleteProductCategory}
                        updateHandleShow={updateHandleShow}
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
            <p>Add a New Category</p>
            <div></div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="addProduct-body">
          <form id="addProductCategoryForm" onSubmit={addProductcategory}>
            <div className="addProduct-category">
              <label className="overflow-hidden">Category</label>
              <input type="text" placeholder="Category" ref={categoryRef} />
            </div>

            <div className="addProduct-category">
              <label className="overflow-hidden">Code</label>
              <input type="text" placeholder="Code" ref={codeRef} />
            </div>
            <small style={{ color: "red", fontSize: "11px" }}>
              {codeError}
            </small>

            <div className="addProduct-category">
              <label className="overflow-hidden">Product Code</label>
              <input
                type="text"
                placeholder="Product Code"
                ref={productCodeRef}
              />
            </div>
            <small style={{ color: "red", fontSize: "11px" }}>
              {productCodeError}
            </small>

            <button className="uploadProduct overflow-hidden">
              <BsUpload /> Add Category
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Offcanvas for updating product */}
      <Offcanvas
        show={updateShow}
        onHide={updateHandleClose}
        placement="end"
        className="addProduct-wrapper"
      >
        <Offcanvas.Header closeButton className="overflow-hidden">
          <Offcanvas.Title className="addProductTitle">
            <i className="bx bx-chevron-left bx-md" />
            <p>Update a Category</p>
            <div></div>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="addProduct-body">
          <form id="updateProductCategoryForm" onSubmit={updateProductCategory}>
            <div className="addProduct-category">
              <label className="overflow-hidden">Category</label>
              <input
                type="text"
                placeholder="Category"
                ref={updateCategoryRef}
              />
            </div>

            <div className="addProduct-category">
              <label className="overflow-hidden">Code</label>
              <input
                type="text"
                placeholder="Code"
                value={updateID}
                onChange={(e) => setUpdateID(e.target.value)}
                disabled
              />
            </div>

            <div className="addProduct-category">
              <label className="overflow-hidden">Product Code</label>
              <input
                type="text"
                placeholder="Product Code"
                ref={updateProductCodeRef}
              />
            </div>
            <small style={{ color: "red", fontSize: "11px" }}>
              {updateProductCodeError}
            </small>

            <button className="uploadProduct overflow-hidden">
              <BsUpload /> Update Category
            </button>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
      {isLoading && Spinner({ animationType: "grow" })}
      {Error && <ErrorModal errorMsg={Error} callbackFunction={setError} />}
    </main>
  );
}
