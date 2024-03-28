

function Information() {
  return (
    <div className="container">
      <div className="w-100 p-3" />
      <div className="container row justify-content-evenly ">
        <div className="col-xl-4">
          <div className="col-xl-10 ">
            <img src="https://placehold.co/100" className="card-img-top rounded m-2" alt="..." />
            <div className="row justify-content-between">
              <div className="dropdown col-xl-4">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="bi-pencil-fill" /> Edit
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" >Change Avatar</button></li>
                  <li><button className="dropdown-item" >Change Information</button></li>
                </ul>
              </div>
              <div className="col-xl-4 ">
                <div className="row">
                  <button className="btn btn-secondary col-xl-5.5 text-start" type="button">
                    <span className="bi-check2-circle" /> Save
                  </button>
                  <button className="btn btn-secondary col-xl-5.5 mt-1 text-start" type="button">
                    <span className="bi-x-circle" /> Cancel
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
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
          <div className="row justify-content-end">
            <button className="btn btn-secondary col-xl-3 mt-3 text-start" type="button">
              <span className="bi-check2-circle" /> Save
            </button>
            <button className="btn btn-secondary col-xl-3 ms-1 mt-3 text-start" type="button">
              <span className="bi-x-circle" /> Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Information;