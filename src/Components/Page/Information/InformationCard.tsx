import { ProgressBar } from "../../Animation";
interface InformationProps {
  InformationState: boolean;
  handleCloseInformation: () => void;
}
const InformationCard: React.FC<InformationProps> = ({ InformationState, handleCloseInformation }) => {
  const progress = 70;
  const handleSaveInformation = () => {
    console.log('Save Information');
    handleCloseInformation();
  }
  return (
    <form className="col-xl-6 mt-3">

      {InformationState === false ?
        <div className="row">
          <div className="col-xl-6 mt-3">
            <label className="form-label">Name</label>
            <input type="text"
              className="form-control "
              value="Trần Đông Đông" id="Name" />
          </div>
          <div className="col-xl-6 mt-3">
            <label className="form-label">Email</label>
            <input type="text"
              className="form-control "
              value="ongtrandong2@gmail.com" id="Email" />
          </div>
          <div className="col-xl-6 mt-3">
            <label className="form-label">Street Address</label>
            <input type="text"
              className="form-control "
              value="12" id="StreetAddress" />
          </div>
          <div className="col-xl-6 mt-3">
            <label className="form-label">State</label>
            <input type="text"
              className="form-control "
              value="36" id="State" />
          </div>
          <div className="col-xl-6 mt-3">
            <label className="form-label ">City</label>
            <input type="text"
              className="form-control "
              value="Thanh Hoa" id="City" />
          </div>
          <div className="col-xl-6 mt-3">
            <label className="form-label">Postal Code</label>
            <input type="text"
              className="form-control "
              value="212" id="Code" />
          </div>
        </div> :
        <div>
          <div className="row">
            <div className="col-xl-6 mt-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control border-warning" id="inputName" />
            </div>
            <div className="col-xl-6 mt-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control border-warning" id="inputEmail" />
            </div>
            <div className="col-xl-6 mt-3">
              <label className="form-label">Street Address</label>
              <input type="text" className="form-control border-warning" id="inputStreetAddress" />
            </div>
            <div className="col-xl-6 mt-3">
              <label className="form-label">State</label>
              <input type="text" className="form-control border-warning" id="inputStreetAddress" />
            </div>
            <div className="col-xl-6 mt-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control border-warning" id="inputCity" />
            </div>
            <div className="col-xl-6 mt-3">
              <label className="form-label">Postal Code</label>
              <input type="text" className="form-control border-warning" id="inputPostalCode" />
            </div>
          </div>
          <div className="row-xl-5 pe-2">
            <div className="row justify-content-end">
              <button className="btn btn-secondary col-xl-3 mt-3 text-start bg-success bg-gradient" type="button"
                onClick={handleSaveInformation}>
                <span className="bi-check2-circle" /> Save
              </button>
              <button className="btn btn-secondary col-xl-3 ms-1 mt-3 text-start bg-dark bg-gradient" type="button"
                onClick={handleCloseInformation}>
                <span className="bi-x-circle" /> Cancel
              </button>
            </div>
          </div>
        </div>}
        <div className="container row justify-content-center">
        <div className="col-xl-12 ">
          <ProgressBar progress={progress} />
        </div>
      </div>

    </form>
  );
}

export default InformationCard;