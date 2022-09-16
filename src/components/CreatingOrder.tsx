import React, { useEffect, useState } from "react";
type ModalOrder = {
  opened: boolean;
  onStopCreating: Function;
  //onCreateOrder: Function;
  setFillingInfo: Function;
};
const CreatingOrder: React.FC<ModalOrder> = ({
  opened,
  onStopCreating,
  //onCreateOrder,
  setFillingInfo,
}) => {
  const [formPage, setFormPage] = useState<number>(1);
  const [firstStageName, setFirstStageName] = useState<string>();
  const [firstStageNumb, setFirstStageNumb] = useState<string>();
  const [firstStageEmail, setFirstStageEmail] = useState<string>();

  const [secondStageCardNumb, setSecondStageCardNumb] = useState<string>();
  const [secondStageCardHolder, setSecondStageCardHolder] = useState<string>();
  const [secondStageExpires, setSecondStageExpires] = useState<string>();
  const [secondStageCvv, setSecondStageCvv] = useState<string>();

  const [thirdStageCountry, setThirdStageCountry] = useState<string>();
  const [thirdStageCity, setThirdStageCity] = useState<string>();
  const [thirdStageStreet, setThirdStageStreet] = useState<string>();
  const [thirdStageHome, setThirdStageHome] = useState<string>();

  const [infoByFirstStage, setInfoByFirstStage] = useState<string[]>([]);
  const [infoBySecondStage, setInfoBySecondStage] = useState<string[]>([]);
  const [infoByThirdStage, setInfoByThirdStage] = useState<string[]>([]);

  const [isCheckReady, setIsCheckReady] = useState<boolean>(false);
  const [isOrderReady, setIsOrderReady] = useState<boolean>(false);

  useEffect(() => {
    const getInfoByStage = () => {
      if (formPage === 2) {
        if (firstStageName && firstStageNumb && firstStageEmail) {
          setInfoByFirstStage([
            firstStageName,
            firstStageNumb,
            firstStageEmail,
          ]);
        } else alert("Fill all fields");
      } else if (formPage === 3) {
        if (
          secondStageCardNumb &&
          secondStageCardHolder &&
          secondStageExpires &&
          secondStageCvv
        ) {
          setInfoBySecondStage([
            secondStageCardNumb,
            secondStageCardHolder,
            secondStageExpires,
            secondStageCvv,
          ]);
        } else alert("Fill all fields");
      }
      if (isCheckReady) {
        if (
          thirdStageCountry &&
          thirdStageCity &&
          thirdStageStreet &&
          thirdStageHome
        ) {
          setInfoByThirdStage([
            thirdStageCountry,
            thirdStageCity,
            thirdStageStreet,
            thirdStageHome,
          ]);
          setIsOrderReady(true);
        } else {
          alert("Fill all fields");
          setIsCheckReady(false);
          setIsOrderReady(false);
        }
      }
    };
    getInfoByStage();
    if (isOrderReady) {
      setFillingInfo([infoByFirstStage, infoBySecondStage, infoByThirdStage]);
      // setTimeout(()=>{
      //   onCreateOrder();
      // },1000)

    }
  }, [formPage, isCheckReady, isOrderReady]);

  return (
    <div className={`overlay ${opened ? "overlayVisible" : ""}`}>
      <div className={`createOrder`}>
        <div className="stage">
          <div className="stage__header">
            <h2>User information</h2>
            <img
              onClick={() => onStopCreating()}
              src="../img/cross.png"
              alt="close"
            />
          </div>
          <div
            className={`firstStage__userInfo ${
              formPage !== 1 ? "stageExit" : ""
            }`}
          >
            <div className="userInfo__option">
              <p>Full name</p>
              <input
                onChange={(e) => setFirstStageName(e.target.value)}
                value={firstStageName}
                required
                type="text"
              />
            </div>
            <div className="userInfo__option">
              <p>Fon number</p>
              <input
                onChange={(e) => setFirstStageNumb(e.target.value)}
                value={firstStageNumb}
                required
                type="text"
                placeholder="8(+7)9.."
              />
            </div>
            <div className="userInfo__option">
              <p>Email</p>
              <input
                onChange={(e) => setFirstStageEmail(e.target.value)}
                value={firstStageEmail}
                required
                type="text"
              />
            </div>
          </div>
          <div
            className={`secondStage__cardInfo ${
              formPage === 2 ? "stageInner" : formPage === 3 ? "stageExit" : ""
            }`}
          >
            <div className="cardInfo__option">
              <p>Card number</p>
              <input
                onChange={(e) => setSecondStageCardNumb(e.target.value)}
                value={secondStageCardNumb}
                required
                type="text"
              />
            </div>
            <div className="cardInfo__option">
              <p>Card holder</p>
              <input
                onChange={(e) => setSecondStageCardHolder(e.target.value)}
                value={secondStageCardHolder}
                required
                type="text"
                placeholder="John P"
              />
            </div>
            <div className="cardInfo__options">
              <div>
                <p>Expires</p>
                <input
                  onChange={(e) => setSecondStageExpires(e.target.value)}
                  value={secondStageExpires}
                  required
                  type="text"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <p>CVV</p>
                <input
                  onChange={(e) => setSecondStageCvv(e.target.value)}
                  value={secondStageCvv}
                  required
                  type="text"
                />
              </div>
            </div>
          </div>
          <div
            className={`thirdStage__userInfo ${
              formPage === 3 ? "stageInner" : ""
            }`}
          >
            <div className="userInfo__option">
              <p>Country</p>
              <input
                onChange={(e) => setThirdStageCountry(e.target.value)}
                value={thirdStageCountry}
                required
                type="text"
              />
            </div>
            <div className="userInfo__option">
              <p>City</p>
              <input
                onChange={(e) => setThirdStageCity(e.target.value)}
                value={thirdStageCity}
                required
                type="text"
              />
            </div>
            <div className="userInfo__options">
              <div className="longOption">
                <p>Street</p>
                <input
                  onChange={(e) => setThirdStageStreet(e.target.value)}
                  value={thirdStageStreet}
                  required
                  type="text"
                />
              </div>
              <div className="shotOption">
                <p>Home</p>
                <input
                  onChange={(e) => setThirdStageHome(e.target.value)}
                  value={thirdStageHome}
                  required
                  type="text"
                  placeholder="12(12/3)"
                />
              </div>
            </div>
            <button onClick={() => setIsCheckReady(true)}>Create order</button>
          </div>
          <div className="userActive">
            <button
              className={formPage === 1 ? "visibleBtn" : ""}
              onClick={() => setFormPage((prev) => prev - 1)}
            >
              Back
            </button>
            <button
              className={formPage === 3 ? "visibleBtn" : ""}
              onClick={() => setFormPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatingOrder;
