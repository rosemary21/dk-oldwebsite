import "./BasicInformation.css";

export default function BasicInformation({ active }: { active: string }) {
  return (
    <form
      style={{ display: active === "basicInformation" ? "block" : "none" }}
      className="basicInformationWrapper"
    >
      <h2 className="settings_title">Basic Information</h2>
      <div id="liner"></div>

      <div className="mt-2 d-flex align-items-baseline gap-2 w-75">
        <div className="d-flex flex-column gap-1 w-100">
          <label className="settings_label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="settings_input"
            type="text"
            id="firstName"
            required
          />
        </div>
        <div className="d-flex flex-column gap-1 w-100">
          <label className="settings_label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="settings_input"
            type="text"
            id="lastName"
            required
          />
        </div>
      </div>

      <div className="mt-2 d-flex flex-column gap-1 w-75">
        <label htmlFor="emailAdd" className="settings_label">
          Email address
        </label>
        <input
          className="settings_input"
          type="password"
          id="emailAdd"
          required
        />
      </div>

      <div className="mt-2 d-flex flex-column gap-1 w-75">
        <label htmlFor="country" className="settings_label">
          Country/Region
        </label>
        <input className="settings_input" type="text" id="country" required />
      </div>

      <div className="mt-2 d-flex flex-column gap-1 w-75">
        <label htmlFor="StreetAddress" className="settings_label">
          Street address
        </label>
        <input className="settings_input" type="text" id="StreetAddress" />
      </div>

      <div className="mt-2 d-flex align-items-baseline gap-2 w-75">
        <div className="d-flex flex-column gap-1 w-100">
          <label className="settings_label" htmlFor="city">
            City
          </label>
          <input className="settings_input" type="text" id="city" />
        </div>
        <div className="d-flex flex-column gap-1 w-100">
          <label className="settings_label" htmlFor="stateProvince">
            State/Province
          </label>
          <input className="settings_input" type="text" id="stateProvince" />
        </div>
      </div>


      <div className="mt-2 d-flex flex-column gap-1 w-75">
        <label htmlFor="zipPostal" className="settings_label">
          Zip/Postal
        </label>
        <input className="settings_input" type="number" id="zipPostal" />
      </div>

      <div className="mt-4 w-100 d-flex justify-content-end">
        <button className="setting_submit_btn">Save changes</button>
      </div>
    </form>
  );
}
