function InformationCard(InformationState: any) {

  return (
    <form className="col-xl-6">
          <div className="row">
            <div className="col-xl-6">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" id="inputName" />
            </div>
            <div className="col-xl-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail" />
            </div>
            <div className="col-xl-6">
              <label className="form-label">Street Address</label>
              <input type="text" className="form-control" id="inputStreetAddress" />
            </div>
            <div className="col-xl-6">
              <label className="form-label">State</label>
              <input type="text" className="form-control" id="inputStreetAddress" />
            </div>
            <div className="col-xl-6">
              <label className="form-label">City</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="col-xl-6">
              <label className="form-label">Postal Code</label>
              <input type="text" className="form-control" id="inputPostalCode" />
            </div>
          </div>
          <div className="row-xl-5 pe-2">
            <div className="row justify-content-end">
            <button className="btn btn-secondary col-xl-3 mt-3 text-start bg-success bg-gradient" type="button">
              <span className="bi-check2-circle" /> Save
            </button>
            <button className="btn btn-secondary col-xl-3 ms-1 mt-3 text-start bg-dark bg-gradient" type="button">
              <span className="bi-x-circle" /> Cancel
            </button>
            </div>
          </div>
        </form>
  );
}

export default InformationCard;