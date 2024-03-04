import { AiOutlineCloudDownload } from 'react-icons/ai'
import Data from "../../../Data.json"
import DashboardBarChart from '../../../components/admin/BarChart/BarChart'
import DateSelect from "../../../components/admin/DateSelect/DateSelect"
import GrowthBarChart from '../../../components/admin/GrowthBarChart/GrowthBarChart'
import Sidebar from '../../../components/admin/Sidebar/Sidebar'
import AdminTitleBar from '../../../components/admin/Titlebar/TitleBar'
import formatCurrency from "../../../utilities/FormatCurrency"
import "./dashboard.css"


export default function Dashboard() {

    // Get recent customer details from JSON data
    const recentChart = Data.adminPage.recentCustomers


    return (
        <main className='admin-main'>
            <Sidebar active={"dashboard"} />

            <div className='admin-detail'>
                <AdminTitleBar />

                {/* Analytics Chart */}
                <div className='admin-analytics'>
                    <div>
                        total balance
                        <span>
                            <h4>{formatCurrency(12426000)}</h4>
                            <p>+36% <i className='bx bx-up-arrow-alt' /></p>
                        </span>
                    </div>

                    <div>
                        total sales
                        <span>
                            <h4>{formatCurrency(12426000)}</h4>
                            <p>+36% <i className='bx bx-up-arrow-alt' /></p>
                        </span>
                    </div>

                    <div>
                        number of products
                        <span>
                            <h4>500</h4>
                        </span>
                    </div>

                    <div>
                        total profit
                        <span>
                            <h4>{formatCurrency(12426000)}</h4>
                        </span>
                    </div>
                </div>

                <div className='analytics-charts'>
                    <div className='sales-orders-chart'>
                        <div className='sales-summary'>
                            <div className='sales-summary-title'>
                                <h5>Sales Summary</h5>
                                <button><p>Download report</p> <AiOutlineCloudDownload className="download" /></button>
                            </div>

                            <div className='sales-summary-calender'>
                                <div className='date-picker'>
                                    <p>Showing for:</p>
                                    <DateSelect />
                                </div>
                                <div className='chart-key'>
                                    <span><div className='art-key' /> Art</span>
                                    <span><div className='fashion-key' /> Fashion</span>
                                </div>
                            </div>

                            <div className='sales-summary-chart'>
                                <DashboardBarChart />
                            </div>
                        </div>

                        <div className='recent-order'>
                            <h2>Recent Orders</h2>
                            <table>
                                <thead>
                                    <tr className='header-row'>
                                        <th><input type="checkbox" /></th>
                                        <th>Order ID</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Total Order</th>
                                        <th>Total Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td className='orderID'>#BM9708</td>
                                        <td className='product-order'>
                                            <img src="/images/Admin/product-pic.png" alt="product" />
                                            <p>Bean Bag Chair</p>
                                        </td>
                                        <td className='Price'>456</td>
                                        <td className='TotalOrder'>456</td>
                                        <td className='TotalAmount'>{formatCurrency(2906625)}</td>
                                        <td><i className="bx bx-dots-horizontal-rounded" /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td className='orderID'>#BM9708</td>
                                        <td className='product-order'>
                                            <img src="/images/Admin/product-pic.png" alt="product" />
                                            <p>Bean Bag Chair</p>
                                        </td>
                                        <td className='Price'>456</td>
                                        <td className='TotalOrder'>456</td>
                                        <td className='TotalAmount'>{formatCurrency(2906625)}</td>
                                        <td><i className="bx bx-dots-horizontal-rounded" /></td>
                                    </tr>

                                    <tr>
                                        <td><input type="checkbox" /></td>
                                        <td className='orderID'>#BM9708</td>
                                        <td className='product-order'>
                                            <img src="/images/Admin/product-pic.png" alt="product" />
                                            <p>Bean Bag Chair</p>
                                        </td>
                                        <td className='Price'>456</td>
                                        <td className='TotalOrder'>456</td>
                                        <td className='TotalAmount'>{formatCurrency(2906625)}</td>
                                        <td><i className="bx bx-dots-horizontal-rounded" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='customers-chart'>
                        <div className='total-customer'>
                            <div className='total-customer-top'>
                                <div className='total-detail'>
                                    <img src="/images/Admin/dashboard-detail-icon.png" alt="dashboard-detail-icon" />
                                </div>

                                <div className='customer-count'>
                                    <p>Total Customer</p>
                                    <h3>10k</h3>
                                    <small>Last update yesterday</small>
                                </div>

                                <div className='percentage-growth'>
                                    <p className='growth'><span><i className="bx bx-up-arrow-alt" />53%</span> Growth</p>
                                    <span className='growth-tag'>This week</span>
                                </div>
                            </div>

                            <div className='total-customer-bottom'>
                                <GrowthBarChart />
                            </div>
                        </div>

                        <div className='recent-customers'>
                            <h2>Recent Customers</h2>
                            <p>Lorem ipsum dolor sit ametis.</p>

                            <div className='recent-customers-chart'>
                                {recentChart.map(data => (
                                    <div className='customers-chart-data' key={data.id}>
                                        <div className='img-email-name'>
                                            <img src={data.image} alt={data.name} />
                                            
                                            <div>
                                                <h4>{data.name}</h4>
                                                <p>{data.email}</p>
                                            </div>
                                        </div>

                                        <div className='price-location'>
                                            <h4>{data.price}</h4>
                                            <p>{data.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className='see-all-customer'><p>See All customers</p> <i className="bx bx-chevron-right" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
