/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar/Sidebar';
import AdminTitleBar from '../../../components/admin/Titlebar/TitleBar';
import { useAdminContext } from '../../../contexts/AdminContext';
import Spinner from '../../../utilities/Spinner';
import ErrorModal from '../../../modals/Error';
import { adminCustomerProps } from '../../../types/contexts';

type customerCardProps = {
  customer: adminCustomerProps;
  handleDeleteCustomer: (email: string) => void 
};

const CustomerCard = ({
  customer,
  handleDeleteCustomer,
}: customerCardProps) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    userType,
    userName,
    phoneNumber,
  } = customer;
  return (
    <tr>
      <td title="First Name">{firstName}</td>
      <td title="Last Name">{lastName}</td>
      <td title="Email">{email}</td>
      <td title="Password">{password}</td>
      <td title="Confirm Password">{confirmPassword}</td>
      <td title="User Type">{userType}</td>
      <td title="User Name">{userName}</td>
      <td title="Phone Number">{phoneNumber}</td>
      <td style={{ display: "flex" }}>
        <button
          title="Delete Customer"
          onClick={() => handleDeleteCustomer(email)}
          className="product-edit"
        >
          <i className="bx bx-trash" />
        </button>
      </td>
    </tr>
  );
};

const AdminCustomers = () => {
  // Product category sort state
  const [selectValue, setSelectValue] = useState("ALL");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Welcome context contextValues
  const { customers, setCustomers, token } = useAdminContext()

  // ** Get unique values for userType from customer array
  const userTypeArray = Array.from(new Set(customers.map(customer => customer.userType)))

  // On change select value
  const filteredArray = customers.filter(customer => customer.userType.toLowerCase() === selectValue.toLowerCase())

  // ================ GET ALL ADMIN CUSTOMER =====================
  async function getAdminCustomers() {
    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    await fetch(
      `${import.meta.env.VITE_BASEURL}/api/v1/user/all`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.responseDto.code === "dkss") {
          setCustomers(result.userDtoList)
        } else {
          setError(result.responseDto.message)
        }
      })
      .catch(() => setError("Cannot connect to server"));
  }

  // =============== DELETE ADMIN CUSTOMER =================
  async function handleDeleteCustomer(email: string) {

    // Get the customer to be deleted
    const customerToBeDeleted = customers.filter(cus => cus.email === email)[0]
    setIsLoading(true)

    const myHeaders = new Headers();
    myHeaders.append("apiKey", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "firstName": customerToBeDeleted.firstName,
      "lastName": customerToBeDeleted.lastName,
      "email": customerToBeDeleted.email,
      "passwordhash": customerToBeDeleted.password,
      "userName": customerToBeDeleted.userName
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(`${import.meta.env.VITE_BASEURL}/api/v1/user/delete`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.responseDto.code === "dkss") {
          setIsLoading(false)
        } else {
          setIsLoading(false)
          setError(result.responseDto.message)
        }
      })
      .catch(() => setError('Cannot connect to server'));
  }


  useEffect(() => {
    getAdminCustomers()
  }, [customers])

  // ** Add customer handler function
  return (
    <main className='admin-main'>
      <Sidebar active="customers" />

      <div className='admin-detail'>
        <AdminTitleBar />

        <div className='products-wrapper'>
          <div className="products-search-sort">
            <div className='search-products'>
              <div className='sort-wrapper'>
                <p>Display</p>
                <select id="sortCategories" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                  <option value="ALL">ALL</option>
                  {userTypeArray.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <p>users</p>
              </div>
            </div>
          </div>


          <div className="products-table">
            <table>
              <thead>
                <tr className='header-row'>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>ConfirmPassword</th>
                  <th>User Types</th>
                  <th>User Name</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {selectValue.toLowerCase() === "all"
                  ? (customers.map(customer => (<CustomerCard
                    key={customer.id}
                    customer={customer}
                    handleDeleteCustomer={handleDeleteCustomer}
                  />)))

                  : (filteredArray.map(customer => (<CustomerCard
                    key={customer.id}
                    customer={customer}
                    handleDeleteCustomer={handleDeleteCustomer}
                  />)))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      
      {error && <ErrorModal errorMsg={error} callbackFunction={setError} />}
      {isLoading && <Spinner animationType='grow' />}
    </main>
  )
}

export default AdminCustomers;