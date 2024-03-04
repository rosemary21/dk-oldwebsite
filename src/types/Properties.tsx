import { imgListProps } from "./contexts";

export interface NoOfPropertiesByCatProp {
  PROLAN: number;
  PROSHO: number;
  PROAPA: number;
}


export interface PropertyResponseProps {
  id: number;
  amount: number;
  description: string;
  currency: string;
  imageUrl: string;
  productCode: string;
  code: string;
  location: string;
  productCategoryCode: string;
  recent: string;
  multipartFile: string;
  productCodeList: string;
  productSize: string;
  price: number;
  multipartFileList: string;
  imagesList: imgListProps[];
}

export interface TotalNoOfPropertiesResponseProps {
  responseDto: {
    code: string;
    message: string;
  };
  productDescriptionDtoList: PropertyResponseProps[];
  productDescriptionDto: PropertyResponseProps;
  values: NoOfPropertiesByCatProp;
}

export interface checkoutResponse {
  code: string,
  responseDto: {
    code: string;
    message: string;
  };
  deliverydto: {
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    state: string;
    city: string;
    userName: string;
    localGovernment: string;
    feeDto: {
      localGovArea: string;
      doorDeliveryFee: string;
      deliveryPeriod: string;
    };
  };
}