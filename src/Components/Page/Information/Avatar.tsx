
function Avatar(AvatarState: any) {
    return (
        <div className="col-xl-4">
            <div className="col-xl-10 ">
                <img src="https://placehold.co/100" className="card-img-top rounded" alt="..." />

                {AvatarState==="changeAvatar" ? <div className="row justify-content-between">
                    <div className="col-xl-6">
                        <button className="btn btn-secondary col-xl-12 mt-1 text-start bg-primary bg-gradient" type="button">
                            <span className="bi-upload" /> Upload Image
                        </button>
                    </div>
                    <div className="col-xl-4">
                        <button className="btn btn-secondary col-xl-12 mt-1 text-start bg-success bg-gradient" type="button">
                            <span className="bi-check2-circle" /> Save
                        </button>
                        <button className="btn btn-secondary col-xl-12 mt-1 text-start bg-dark bg-gradient" type="button">
                            <span className="bi-x-circle" /> Cancel
                        </button>
                    </div>
                </div> : <div className="p-6" />}
            </div>
        </div>
    );
}

export default Avatar;