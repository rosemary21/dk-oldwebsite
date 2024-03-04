import Table from "react-bootstrap/Table";

export default function BookingTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Budget</th>
          <th>Size</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Confidential</td>
          <td>
            1200 m<sup>2</sup>
          </td>
          <td>Office</td>
        </tr>
        <tr>
          <th>Status</th>
          <th>Location</th>
          <th>Flat</th>
        </tr>
        <tr>
          <td>Done</td>
          <td>Lagos, Nigeria</td>
          <td>8 Room</td>
        </tr>
      </tbody>
    </Table>
  );
}
