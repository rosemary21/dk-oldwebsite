import { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import AdminTitleBar from "../../../components/admin/Titlebar/TitleBar";
import "./Settings.css";
import BasicInformation from "../../../components/admin/BasicInformation/BasicInformation";
import PasswordCard from "../../../components/admin/PasswordCard/PasswordCard";
import DeleteTeamCard from "../../../components/admin/DeleteTeamMember/DeleteTeamMember";
import InviteTeamCard from "../../../components/admin/InviteTeamMember/InviteTeamMember";

export default function Settings() {
  const [activeSettings, setActiveSettings] = useState("basicInformation");
  return (
    <main className="admin-main">
      <Sidebar active="settings" />

      <div className="admin-detail">
        <AdminTitleBar />

        <div className="d-flex w-100 h-100 align-items-start justify-content-between gap-2">
          <div className="settings_tab">
            {/* Basic information */}
            <button
              className={
                activeSettings == "basicInformation"
                  ? "settings_tab_btn"
                  : "settings_tab_btn"
              }
              style={{
                color:
                  activeSettings === "basicInformation"
                    ? "var(--pink)"
                    : "#081735",
              }}
              onClick={() => setActiveSettings("basicInformation")}
            >
              <span
                className={
                  activeSettings == "basicInformation"
                    ? "active_settings"
                    : "inactive_settings"
                }
              />
              <i className="bx bx-user"></i>
              Basic information
            </button>

            {/* Password */}
            <button
              className={
                activeSettings == "password"
                  ? "settings_tab_btn"
                  : "settings_tab_btn"
              }
              style={{
                color:
                  activeSettings === "password" ? "var(--pink)" : "#081735",
              }}
              onClick={() => setActiveSettings("password")}
            >
              <span
                className={
                  activeSettings == "password"
                    ? "active_settings"
                    : "inactive_settings"
                }
              />
              <i className="bx bx-lock-alt"></i>
              Password
            </button>

            {/* Invite Team */}
            <button
              className={
                activeSettings == "inviteTeam"
                  ? "settings_tab_btn"
                  : "settings_tab_btn"
              }
              style={{
                color:
                  activeSettings === "inviteTeam" ? "var(--pink)" : "#081735",
              }}
              onClick={() => setActiveSettings("inviteTeam")}
            >
              <span
                className={
                  activeSettings == "inviteTeam"
                    ? "active_settings"
                    : "inactive_settings"
                }
              />
              <i className="bx bxl-microsoft-teams"></i>
              Invite Team
            </button>

            {/* Delete Team */}
            <button
              className={
                activeSettings == "deleteTeam"
                  ? "settings_tab_btn"
                  : "settings_tab_btn"
              }
              style={{
                color:
                  activeSettings === "deleteTeam" ? "var(--pink)" : "#081735",
              }}
              onClick={() => setActiveSettings("deleteTeam")}
            >
              <span
                className={
                  activeSettings == "deleteTeam"
                    ? "active_settings"
                    : "inactive_settings"
                }
              />
              <i className="bx bx-trash"></i>
              Delete Team
            </button>
          </div>

          <div className="settings_display_tab">
            <BasicInformation active={activeSettings} />
            <PasswordCard active={activeSettings} />
            <DeleteTeamCard active={activeSettings} />
            <InviteTeamCard active={activeSettings} />
          </div>
        </div>
      </div>
    </main>
  );
}
