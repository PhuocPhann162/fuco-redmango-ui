
import React, { useState } from 'react';

interface AvatarProps {
    AvatarState: boolean;
    handleCloseAvatar: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ AvatarState, handleCloseAvatar }) => {
    const [imageSrc, setImageSrc] = useState<string>('https://placehold.co/100');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="col-xl-4">
            {AvatarState ? (
                <div className="col-xl-10 ">
                    <img src={imageSrc} className="card-img-top rounded border border-warning" alt="..." />

                    <div className="row">
                        <div className="col-xl-12">
                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                            <div className="row  p-3 justify-content-end">
                                <button className="btn btn-secondary col-xl-4  text-start bg-success bg-gradient" type="button">
                                    <span className="bi-check2-circle" /> Save
                                </button>
                                <button className="btn btn-secondary col-xl-4 ms-1 text-start bg-dark bg-gradient" type="button"
                                    onClick={handleCloseAvatar}>
                                    <span className="bi-x-circle" /> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="col-xl-10 ">
                    <img src={imageSrc} className="card-img-top rounded" alt="..." />
                    <div className="row-xl-12 h-10" />
                </div>
            )}
        </div>
    );
};

export default Avatar;