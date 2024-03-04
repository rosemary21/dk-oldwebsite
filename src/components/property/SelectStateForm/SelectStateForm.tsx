/* eslint-disable @typescript-eslint/no-explicit-any */
import Form from "react-bootstrap/Form";

interface selectStateProps {
  className: string;
  state: string;
  setState: any;
}

export default function SelectStateForm({ className, state, setState }: selectStateProps) {
  return (
    <Form.Select
      aria-label="Default select example"
      className={className}
      onChange={(e) => setState(e.target.value)}
      value={state}
    >
      <option disabled value="">
        Select your state?
      </option>
      <option value="ABIA">ABIA</option>
      <option value="ABUJA FCT">ABUJA FCT</option>
      <option value="ADAMAWA">ADAMAWA</option>
      <option value="AKWA IBOM">AKWA IBOM</option>
      <option value="ANAMBRA">ANAMBRA</option>
      <option value="BAUCHI">BAUCHI</option>
      <option value="BAYELSA">BAYELSA</option>
      <option value="BENUE">BENUE</option>
      <option value="BORNO">BORNO</option>
      <option value="CROSS RIVER">CROSS RIVER</option>
      <option value="DELTA">DELTA</option>
      <option value="EBONYI">EBONYI</option>
      <option value="EDO">EDO</option>
      <option value="EKITI">EKITI</option>
      <option value="ENUGU">ENUGU</option>
      <option value="GOMBE">GOMBE</option>
      <option value="IMO">IMO</option>
      <option value="JIGAWA">JIGAWA</option>
      <option value="KADUNA">KADUNA</option>
      <option value="KANO">KANO</option>
      <option value="KATSINA">KATSINA</option>
      <option value="KEBBI">KEBBI</option>
      <option value="KOGI">KOGI</option>
      <option value="KWARA">KWARA</option>
      <option value="LAGOS">LAGOS</option>
      <option value="NASSARAWA">NASSARAWA</option>
      <option value="NIGER">NIGER</option>
      <option value="OGUN">OGUN</option>
      <option value="ONDO">ONDO</option>
      <option value="OSUN">OSUN</option>
      <option value="OYO">OYO</option>
      <option value="PLATEAU">PLATEAU</option>
      <option value="RIVERS">RIVERS</option>
      <option value="SOKOTO">SOKOTO</option>
      <option value="TARABA">TARABA</option>
      <option value="YOBE">YOBE</option>
      <option value="ZAMFARA">ZAMFARA</option>
    </Form.Select>
  );
}
