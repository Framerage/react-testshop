import React from 'react'
type ModalOrder={
    opened:boolean;
}
const CreatingOrder:React.FC<ModalOrder> = ({opened}) => {
return (
    <div className={`overlay ${opened ? 'overlayVisible' : ''}`}>
      <div className={`drawer`}>
        <h2 style={{ marginBottom: "30px" }}>
          Package
        </h2>
        </div>
        </div>
);
};
export default CreatingOrder;