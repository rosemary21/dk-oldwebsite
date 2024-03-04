import { useState } from "react";
import CompleteReceiptCard from "../../../components/admin/CompleteReceiptCard/CompleteReceiptCard";
import PendingReceiptCard from "../../../components/admin/PendingReceiptCard/PendingReceiptCard";
import Sidebar from "../../../components/admin/Sidebar/Sidebar";
import AdminTitleBar from "../../../components/admin/Titlebar/TitleBar";
import "../Products/Product.css";
import "./Receipts.css";

export default function Receipts() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <main className="admin-main">
      <Sidebar active="receipts" />

      <div className="admin-detail">
        <AdminTitleBar />

        <h2 className="receipt-title">Receipt</h2>

        <div className="receipt-tabs">
            <button
            className={
              activeTab === "pending" ? "tab_btn active_tab" : "tab_btn"
            }
            onClick={() => setActiveTab("pending")}
          >
            Pending Reciept
          </button>
          
          <button
            className={
              activeTab === "completed" ? "tab_btn active_tab" : "tab_btn"
            }
            onClick={() => setActiveTab("completed")}
          >
            Completed Receipt
          </button>
          
          <button
            className={
              activeTab === "rejected" ? "tab_btn active_tab" : "tab_btn"
            }
            onClick={() => setActiveTab("rejected")}
          >
            Rejected Reciept
          </button>
        </div>

        <div className="display_tabs">
          <div
            style={{ display: activeTab === "pending" ? "block" : "none" }}
            className="display_tab"
          >
            <PendingReceiptCard />
          </div>

          <div
            style={{ display: activeTab === "completed" ? "block" : "none" }}
            className="display_tab"
          >
            <CompleteReceiptCard isRejected={false} reason="" />
          </div>

          <div
            style={{ display: activeTab === "rejected" ? "block" : "none" }}
            className="display_tab"
          >
            <CompleteReceiptCard isRejected reason="Money not confirmed" />
          </div>
        </div>
      </div>
    </main>
  );
}
