import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const CourseUpload = () => {
    const { user } = useContext(AuthContext);
    console.log(user?.email);
    const handleUploadCourse = (e) => {
        e.preventDefault();
        const form = e.target;
        const course_name = form.course_name.value;
        const course_description = form.course_description.value;
        console.log({ course_name, course_description, email: user.email });
        fetch('http://localhost:5000/api/courses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ course_name, course_description, email: user.email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully Uploaded course",
                    icon: "success"
                });
                form.reset()
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <div className="card shrink-0 w-full mx-auto my-20 max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={handleUploadCourse}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Course Name</span>
                        </label>
                        <input type="test" placeholder="Enter Course name" name="course_name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Course Description</span>
                        </label>
                        <textarea name="course_description" className="textarea textarea-bordered" placeholder="Enter course description"></textarea>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Upload Course</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseUpload;