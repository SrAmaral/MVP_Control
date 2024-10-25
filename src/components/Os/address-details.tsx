type AddressType = {
  address: {
    streetType: string;
    street: string;
    number: string;
    complement: string;
    zipCode: string;
    neighborhood: string;
    city: string;
    state: string;
  };
};

const AddressComponent = ({ address }: AddressType) => {
  return (
    <div className="">
      {address?.streetType} {address?.street}, {address?.number} -{" "}
      {address?.complement} - cep: {address?.zipCode} - bairro:{" "}
      {address?.neighborhood} - {address?.city} - {address?.state}
    </div>
  );
};

export default AddressComponent;
