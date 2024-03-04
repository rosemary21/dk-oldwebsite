import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

export default function NoPropertyAlert() {
  return (
    <Alert variant="danger" className="w-100">
      <Alert.Heading className="overflow-hidden">
        Property not found
      </Alert.Heading>
      <p>
        We apologize, but we couldn't find any properties in the specified
        location. Consider exploring other nearby locations for available properties.
      </p>
      <hr />
      <p className="mb-2">
        If you have any further questions or need assistance, feel free to reach
        out to our support team.
      </p>
      <Link to="/contact-us"><Button variant="danger">Contact Us</Button></Link> 
    </Alert>
  );
}

