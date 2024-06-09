import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const AssignmentQuestionUpload = () => {
    const { user } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('instructorEmail', user.email);
        formData.append('questionFile', file);

        fetch('http://localhost:5000/api/assignments/questions', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Uploaded question",
                    icon: "success"
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div className="card shrink-0 w-full mx-auto my-20 max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Question Title</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="Enter title" 
                            name="title" 
                            className="input input-bordered" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Question Description</span>
                        </label>
                        <textarea 
                            name="description" 
                            className="textarea textarea-bordered" 
                            placeholder="Enter description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Upload File</span>
                        </label>
                        <input 
                            type="file" 
                            name="questionFile" 
                            className="input input-bordered" 
                            onChange={handleFileChange} 
                            required 
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Upload Question</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignmentQuestionUpload;
