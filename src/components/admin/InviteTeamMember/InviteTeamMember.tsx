import "../BasicInformation/BasicInformation.css";

export default function InviteTeamCard({ active }: { active: string }) {
  return (
    <form
      style={{ display: active === "inviteTeam" ? "block" : "none" }}
      className="basicInformationWrapper"
    >
      <h2 className="settings_title">Invite Team</h2>
      <div id="liner"></div>

      <p className="delete_team_warning w-75 mt-4">
        Enter team member’s email to invite
      </p>

      <div className="mt-5 d-flex align-items-center gap-3 w-75">
        <label htmlFor="inviteEmail" className="settings_label w-50">
          Email address
        </label>
        <input
          className="settings_input w-50"
          type="text"
          id="inviteEmail"
          placeholder="Email address"
          required
        />
      </div>

      <div className="mt-4 w-100 d-flex justify-content-end">
        <button className="setting_submit_btn">Invite</button>
      </div>
    </form>
  );
}
