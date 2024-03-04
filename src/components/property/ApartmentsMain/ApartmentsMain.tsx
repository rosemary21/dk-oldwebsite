/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { usePropertyContext } from "../../../contexts/PropertyContext";
import "../../../pages/property/Apaprtments/Apartments.css";
import PropertyNavbar from "../PropertyNavbar/PropertyNavbar";
import SelectStateForm from "../SelectStateForm/SelectStateForm";

export default function ApartmentsMain({
  activeNavLink,
}: {
  activeNavLink: string;
}) {
  const { state, setState } = usePropertyContext();

  return (
    <main className="property-main">
      <PropertyNavbar activeLink={activeNavLink} />

      <div className="property-main-contents">
        <h1>Available Properties</h1>

        <SelectStateForm
          className="apartment-main-form"
          state={state}
          setState={setState}
        />

        <div className="property-filter">
          <div className="filter-header overflow-hidden">
            <p>Filter</p>
          </div>

          <div className="filter-values">
            <PriceTable />
          </div>
        </div>
      </div>
    </main>
  );
}

function PriceTable() {
  const { setPropertyPrice } = usePropertyContext();

  const inputs = document.querySelectorAll(
    ".price_inputs input"
  ) as NodeListOf<HTMLInputElement>;

  // Handler to ensure only one price is checked
  function checkOneBox(id: string) {
    const inputsArr = Array.from(inputs);

    // Check if any input is checked
    inputsArr.forEach((el) => el.checked && (el.checked = false));

    const checkedEl = document.getElementById(id) as HTMLInputElement;
    checkedEl.checked = true;
    setPropertyPrice(checkedEl.value);
  }

  useEffect(() => {
    const price = localStorage.getItem("propertyPrice");
    if (!price) setPropertyPrice("500000");
  }, []);

  return (
    <Table striped bordered className="mt-2 overflow-hidden filter_table">
      <thead>
        <tr>
          <th colSpan={4}>Prices</th>
        </tr>
      </thead>
      <tbody className="price_inputs">
        <tr>
          <td>
            <div>
              <input
                onClick={() => checkOneBox("500k_prop")}
                type="checkbox"
                value="500000"
                id="500k_prop"
              />
              <label htmlFor="500k_prop">500k</label>
            </div>
          </td>
          <td>
            <div>
              <input
                onClick={() => checkOneBox("1M_prop")}
                type="checkbox"
                value="1000000"
                id="1M_prop"
              />
              <label htmlFor="1M_prop">1M</label>
            </div>
          </td>
          <td>
            <div>
              <input
                onClick={() => checkOneBox("2.5M_prop")}
                type="checkbox"
                value="2500000"
                id="2.5M_prop"
              />
              <label htmlFor="2.5M_prop">2.5M</label>
            </div>
          </td>
          <td>
            <div>
              <input
                onClick={() => checkOneBox("5M_prop")}
                type="checkbox"
                value="5000000"
                id="5M_prop"
              />
              <label htmlFor="5M_prop">5M</label>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div>
              <input
                onClick={() => checkOneBox("7.5M_prop")}
                type="checkbox"
                value="7500000"
                id="7.5M_prop"
              />
              <label htmlFor="7.5M_prop">7.5M</label>
            </div>
          </td>

          <td>
            <div>
              <input
                onClick={() => checkOneBox("10M_prop")}
                type="checkbox"
                value="10000000"
                id="10M_prop"
              />
              <label htmlFor="10M_prop">10M</label>
            </div>
          </td>

          <td>
            <div>
              <input
                onClick={() => checkOneBox("15M_prop")}
                type="checkbox"
                value="15000000"
                id="15M_prop"
              />
              <label htmlFor="15M_prop">15M</label>
            </div>
          </td>

          <td>
            <div>
              <input
                onClick={() => checkOneBox("20M_prop")}
                type="checkbox"
                value="20000000"
                id="20M_prop"
              />
              <label htmlFor="20M_prop">20M</label>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}
