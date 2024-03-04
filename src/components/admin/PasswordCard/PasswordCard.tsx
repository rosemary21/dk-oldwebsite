import "../BasicInformation/BasicInformation.css";

export default function PasswordCard({ active }: { active: string }) {
  return (
    <form
      style={{ display: active === "password" ? "block" : "none" }}
      className="basicInformationWrapper"
    >
      <h2 className="settings_title">Change your password</h2>
      <div id="liner"></div>

      <div className="mt-5 d-flex align-items-center gap-3 w-75">
        <label htmlFor="currentPassword" className="settings_label w-50">
          Current password
        </label>
        <input
          className="settings_input w-50"
          type="text"
          id="currentPassword"
          placeholder="Enter current password"
          required
        />
      </div>

      <div className="mt-3 d-flex align-items-center gap-3 w-75">
        <label htmlFor="newPassword" className="settings_label w-50">
          New password
        </label>
        <input
          className="settings_input w-50"
          type="password"
          id="newPassword"
          placeholder="Enter new password"
          required
        />
      </div>

      <div className="mt-3 d-flex align-items-center gap-3 w-75">
        <label htmlFor="confirmPassword" className="settings_label w-50">
          Confirm new password
        </label>
        <input
          className="settings_input w-50"
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          required
        />
      </div>

      

      <div className="mt-4 w-100 d-flex justify-content-end">
        <button className="setting_submit_btn">Save changes</button>
      </div>
    </form>
  );
}
