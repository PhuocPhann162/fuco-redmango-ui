

function Information() {
  return (
    <div className="container">
      <div className="w-100 mh-10">

      </div>
    <div className="container row justify-content-evenly align-items-center">
      <div className="col-xl-4">
        <div className="card col-xl-10 ">
          <img src="https://placehold.co/100" className="card-img-top" alt="..." />
          <div className="card-body p-1">
            <button className="btn btn-primary m-1">
              <span className="bi-pencil m-1"/>
              Change Image</button>
            <h5 className="card-title m-1">Name</h5>
          </div>
        </div>
      </div>
      <form className="col-xl-4">
        <div className="col-xl-10">
          <div className="col-xl-10">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail" />
          </div>
          <div className="col-xl-10">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <div className="col-xl-10">
            <label className="form-label">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Information;