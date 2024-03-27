

function Information() {
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
      </form>
    </div>
  );
}

export default Information;