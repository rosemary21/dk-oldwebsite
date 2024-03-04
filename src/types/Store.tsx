export interface UserLoginResponseProps {
  responseDto: {
    code: string;
    message: string;
  };
  token: string;
  emailAddress: string;
}

export interface InitialiseCardResponse {
    responseDto: {
        code: string,
        message: string
    },
    initializeTransactionResponse: {
        status: boolean,
        message: string,
        email: string,
        data: {
            amount: number,
            currency: string,
            transaction_date: string,
            metadata: null,
            id: null,
            status: null,
            access_code: string,
            reference: string,
            domain: string,
            gateway_response: string,
            message: string,
            channel: string,
            ip_address: string,
            authorization_url: string,
            fees: null,
            plan: null,
            paid_at: null,
            requested_amount: null,
            created_at: null,
            history: null,
            authorization: null,
            customer: null
        }
    },
    paystackVerifyTransactionResponse: null
}

export interface InitializeCardProp {
    access_code: string,
    reference: string,
    authorization_url: string,
  }



export interface allbrandsProps {
  id: number;
  name: string;
  price: number;
  itemImage: string[];
  description: string;
  stockQuantity: number;
  size: number;
  prevLink: string;
  rating: number;
  productDescription: string;
  keyIngredient: string;
  howToApply: string;
}