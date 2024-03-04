import "../BasicInformation/BasicInformation.css";

export default function DeleteTeamCard({ active }: { active: string }) {
  return (
    <form
      style={{ display: active === "deleteTeam" ? "block" : "none" }}
      className="basicInformationWrapper"
    >
      <h2 className="settings_title">Delete Team</h2>
      <div id="liner"></div>

      <p className="delete_team_warning w-75 mt-4">
        When you delete a team member, access to this dashboard account
        services, and we permanently deleted.
      </p>

      <div className="mt-5 d-flex align-items-center gap-3 w-75">
        <label htmlFor="deleteEmail" className="settings_label w-50">
          Email address
        </label>
        <input
          className="settings_input w-50"
          type="text"
          id="deleteEmail"
          placeholder="Email address"
          required
        />
      </div>

      <div className="mt-4 d-flex align-items-center gap-3 w-75">
        <input
          className="settings_checkb0x"
          type="checkbox"
          id="emailCheckbox"
          required
        />
        <label htmlFor="emailCheckbox" className="settings_label w-75">
          Confirm that I want to delete this account.
        </label>
      </div>

      <div className="mt-4 w-100 d-flex justify-content-end">
        <button className="setting_submit_btn">Delete</button>
      </div>
    </form>
  );
}
